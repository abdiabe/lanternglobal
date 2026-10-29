import "server-only";
import { headers } from "next/headers";

/**
 * Server-side helpers for public form endpoints: rate limiting, spam checks,
 * optional Cloudflare Turnstile verification, and delivery to email and/or a
 * CRM webhook. Secrets are read from environment variables only and are never
 * sent to the browser. See docs/DEPLOYMENT.md for configuration.
 */

// ---------------------------------------------------------------- rate limit
// In-memory sliding window. Suitable for a single server instance. On
// serverless or multi-instance hosting, replace with a shared store such as
// Upstash Redis (see docs/DEPLOYMENT.md#rate-limiting).
const buckets = new Map<string, number[]>();

export async function clientIp() {
  const h = await headers();
  return (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "unknown").trim();
}

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { ok: false as const, retryAfter: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return { ok: true as const };
}

// --------------------------------------------------------------- spam checks
export function looksLikeSpam(input: { company_url?: string; elapsed?: number }) {
  if (input.company_url) return true; // honeypot filled
  if (typeof input.elapsed === "number" && input.elapsed < 2500) return true; // submitted implausibly fast
  return false;
}

export async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured; honeypot, timing, and rate limits still apply.
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

// ------------------------------------------------------------------ delivery
export interface Delivery {
  kind: "inquiry" | "contact" | "application";
  subject: string;
  replyTo: string;
  fields: [label: string, value: string | undefined][];
  attachment?: { filename: string; content: Buffer };
}

export function deliveryConfigured(kind: Delivery["kind"]) {
  const email = Boolean(process.env.RESEND_API_KEY && process.env.FORMS_FROM_EMAIL && recipient(kind));
  const webhook = Boolean(process.env.INQUIRY_WEBHOOK_URL) && kind !== "application";
  return email || webhook;
}

function recipient(kind: Delivery["kind"]) {
  return kind === "application" ? process.env.CAREERS_TO_EMAIL || process.env.INQUIRY_TO_EMAIL : process.env.INQUIRY_TO_EMAIL;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Sends the submission. Returns true only when at least one configured channel
 * accepted it, so the browser never shows a success message for a lost submission.
 */
export async function deliver(d: Delivery): Promise<boolean> {
  const results: boolean[] = [];

  if (process.env.RESEND_API_KEY && process.env.FORMS_FROM_EMAIL && recipient(d.kind)) {
    const rows = d.fields
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => `<tr><th align="left" style="padding:6px 12px;vertical-align:top">${esc(k)}</th><td style="padding:6px 12px;white-space:pre-wrap">${esc(String(v))}</td></tr>`)
      .join("");
    const text = d.fields
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    try {
      const res = await fetch(`${process.env.RESEND_API_BASE || "https://api.resend.com"}/emails`, {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.FORMS_FROM_EMAIL,
          to: recipient(d.kind)!.split(",").map((s) => s.trim()),
          reply_to: d.replyTo,
          subject: d.subject,
          html: `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
          text,
          ...(d.attachment ? { attachments: [{ filename: d.attachment.filename, content: d.attachment.content.toString("base64") }] } : {}),
        }),
      });
      results.push(res.ok);
      if (!res.ok) console.error(`[forms] Resend rejected ${d.kind} submission: HTTP ${res.status}`);
    } catch (err) {
      console.error(`[forms] Email delivery failed for ${d.kind}:`, err instanceof Error ? err.message : err);
      results.push(false);
    }
  }

  // Optional CRM or automation webhook (HubSpot workflow, Zapier, Make, n8n). Not used for applications,
  // because applicant data and resumes should go only to the recruiting inbox or an ATS you control.
  if (process.env.INQUIRY_WEBHOOK_URL && d.kind !== "application") {
    try {
      const res = await fetch(process.env.INQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.INQUIRY_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.INQUIRY_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify({ type: d.kind, submittedAt: new Date().toISOString(), fields: Object.fromEntries(d.fields) }),
      });
      results.push(res.ok);
      if (!res.ok) console.error(`[forms] Webhook rejected ${d.kind}: HTTP ${res.status}`);
    } catch (err) {
      console.error(`[forms] Webhook delivery failed for ${d.kind}:`, err instanceof Error ? err.message : err);
      results.push(false);
    }
  }

  return results.some(Boolean);
}

export function json(body: Record<string, unknown>, status = 200, extra?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...extra },
  });
}

export const NOT_CONFIGURED_MESSAGE =
  "Online submissions are not available yet because the form delivery service has not been configured. Your information was not sent.";
