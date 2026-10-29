import { applicationSchema, fieldErrors, RESUME_MAX_BYTES, RESUME_TYPES } from "@/lib/forms/schemas";
import { clientIp, deliver, deliveryConfigured, json, looksLikeSpam, NOT_CONFIGURED_MESSAGE, rateLimit, verifyTurnstile } from "@/lib/forms/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Checks the file's leading bytes so a renamed executable cannot pass as a resume. */
function sniff(buf: Buffer): keyof typeof RESUME_TYPES | null {
  if (buf.subarray(0, 5).toString("latin1") === "%PDF-") return "application/pdf";
  if (buf.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))) return "application/msword";
  if (buf.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04])) && buf.includes(Buffer.from("word/"))) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  return null;
}

export async function POST(req: Request) {
  const ip = await clientIp();
  const limited = rateLimit(`apply:${ip}`, 3, 30 * 60 * 1000);
  if (!limited.ok) {
    return json({ ok: false, message: "Too many applications from this connection. Please try again later." }, 429, { "Retry-After": String(limited.retryAfter) });
  }

  const length = Number(req.headers.get("content-length") || 0);
  if (length > RESUME_MAX_BYTES + 64 * 1024) return json({ ok: false, message: "Your resume must be 5 MB or smaller.", errors: { resume: "Your resume must be 5 MB or smaller." } }, 413);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const fields = Object.fromEntries(
    Array.from(form.entries())
      .filter(([, v]) => typeof v === "string")
      .map(([k, v]) => [k, v === "true" ? true : v]),
  );
  const parsed = applicationSchema.safeParse(fields);
  const errors: Record<string, string> = parsed.success ? {} : fieldErrors(parsed.error);

  const file = form.get("resume");
  let resume: { filename: string; content: Buffer } | undefined;
  if (!(file instanceof File) || file.size === 0) {
    errors.resume = "Please attach your resume.";
  } else if (file.size > RESUME_MAX_BYTES) {
    errors.resume = "Your resume must be 5 MB or smaller.";
  } else {
    const content = Buffer.from(await file.arrayBuffer());
    const type = sniff(content);
    const ext = file.name.toLowerCase().match(/\.(pdf|docx?)$/)?.[0];
    if (!type || !ext || RESUME_TYPES[type] !== ext) {
      errors.resume = "Please upload a PDF, DOC, or DOCX file.";
    } else {
      const safeName = file.name.replace(/[^\w.\- ]+/g, "_").slice(-100);
      resume = { filename: safeName, content };
    }
  }

  if (!parsed.success || Object.keys(errors).length) {
    return json({ ok: false, message: "Please correct the highlighted fields.", errors }, 422);
  }
  const d = parsed.data;

  if (looksLikeSpam(d) || !(await verifyTurnstile(d.turnstileToken, ip))) {
    return json({ ok: false, message: "We couldn't verify this submission. Please wait a moment and try again." }, 422);
  }

  if (!deliveryConfigured("application")) {
    return json({ ok: false, code: "not_configured", message: NOT_CONFIGURED_MESSAGE }, 503);
  }

  const delivered = await deliver({
    kind: "application",
    subject: `Application: ${d.role} from ${d.fullName}`,
    replyTo: d.email,
    attachment: resume,
    fields: [
      ["Role applied for", d.role],
      ["Full name", d.fullName],
      ["Email", d.email],
      ["Contact number", d.phone],
      ["City / province", d.location],
      ["Degree", d.degree],
      ["University", d.university],
      ["Graduation year", d.graduationYear],
      ["Confirms completed bachelor's degree", "Yes"],
      ["Experience", d.experience],
      ["Skills", d.skills],
      ["Portfolio / LinkedIn", d.portfolio],
      ["Applicant privacy notice acknowledged", "Yes"],
    ],
  });

  if (!delivered) return json({ ok: false, message: "We couldn't submit your application right now. Please try again shortly." }, 502);
  return json({ ok: true });
}
