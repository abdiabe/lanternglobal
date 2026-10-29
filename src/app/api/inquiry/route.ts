import { inquirySchema, fieldErrors } from "@/lib/forms/schemas";
import { clientIp, deliver, deliveryConfigured, json, looksLikeSpam, NOT_CONFIGURED_MESSAGE, rateLimit, verifyTurnstile } from "@/lib/forms/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 32 * 1024;

export async function POST(req: Request) {
  const ip = await clientIp();
  const limited = rateLimit(`inquiry:${ip}`, 5);
  if (!limited.ok) {
    return json({ ok: false, message: "Too many submissions. Please wait a few minutes and try again." }, 429, { "Retry-After": String(limited.retryAfter) });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json({ ok: false, message: "Your submission is too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, message: "Please correct the highlighted fields.", errors: fieldErrors(parsed.error) }, 422);
  }
  const d = parsed.data;

  if (looksLikeSpam(d) || !(await verifyTurnstile(d.turnstileToken, ip))) {
    return json({ ok: false, message: "We couldn't verify this submission. Please wait a moment and try again." }, 422);
  }

  if (!deliveryConfigured("inquiry")) {
    return json({ ok: false, code: "not_configured", message: NOT_CONFIGURED_MESSAGE }, 503);
  }

  const delivered = await deliver({
    kind: "inquiry",
    subject: `New staffing inquiry: ${d.company} (${d.division})`,
    replyTo: d.email,
    fields: [
      ["Type", d.intent || "Hire a professional"],
      ["Full name", d.fullName],
      ["Business email", d.email],
      ["Company", d.company],
      ["Website", d.website],
      ["Phone", d.phone],
      ["Industry", d.industry],
      ["Service division", d.division],
      ["Specialty", d.specialty],
      ["Team roles", d.roles],
      ["Number of professionals", d.headcount],
      ["Experience", d.experience],
      ["Software", d.software],
      ["Responsibilities", d.responsibilities],
      ["Arrangement", d.arrangement],
      ["U.S. time zone", d.timezone],
      ["Working hours", d.hours],
      ["Expected start", d.startDate],
      ["Budget range", d.budget],
      ["Additional details", d.details],
      ["Preferred contact", d.contactMethod],
      ["Privacy notice acknowledged", "Yes"],
    ],
  });

  if (!delivered) {
    return json({ ok: false, message: "We couldn't deliver your inquiry right now. Please try again shortly." }, 502);
  }
  return json({ ok: true });
}
