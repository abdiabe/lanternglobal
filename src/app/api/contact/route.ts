import { contactSchema, fieldErrors } from "@/lib/forms/schemas";
import { clientIp, deliver, deliveryConfigured, json, looksLikeSpam, NOT_CONFIGURED_MESSAGE, rateLimit, verifyTurnstile } from "@/lib/forms/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = await clientIp();
  const limited = rateLimit(`contact:${ip}`, 5);
  if (!limited.ok) {
    return json({ ok: false, message: "Too many submissions. Please wait a few minutes and try again." }, 429, { "Retry-After": String(limited.retryAfter) });
  }

  const raw = await req.text();
  if (raw.length > 16 * 1024) return json({ ok: false, message: "Your message is too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, message: "Please correct the highlighted fields.", errors: fieldErrors(parsed.error) }, 422);
  }
  const d = parsed.data;

  if (looksLikeSpam(d) || !(await verifyTurnstile(d.turnstileToken, ip))) {
    return json({ ok: false, message: "We couldn't verify this submission. Please wait a moment and try again." }, 422);
  }

  if (!deliveryConfigured("contact")) {
    return json({ ok: false, code: "not_configured", message: NOT_CONFIGURED_MESSAGE }, 503);
  }

  const delivered = await deliver({
    kind: "contact",
    subject: `Website message: ${d.topic} from ${d.fullName}`,
    replyTo: d.email,
    fields: [
      ["Full name", d.fullName],
      ["Email", d.email],
      ["Company", d.company],
      ["Phone", d.phone],
      ["Topic", d.topic],
      ["Message", d.message],
      ["Privacy notice acknowledged", "Yes"],
    ],
  });

  if (!delivered) return json({ ok: false, message: "We couldn't deliver your message right now. Please try again shortly." }, 502);
  return json({ ok: true });
}
