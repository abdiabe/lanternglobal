# Deployment

## Recommended hosting: Vercel

The site is a standard Next.js 16 app. Vercel is the simplest host because it supports static pages, the three form API routes, and image optimization with no extra setup.

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, **Add New Project** and import the repository. The framework is detected automatically.
3. Add the environment variables below under **Settings → Environment Variables** (Production and Preview).
4. Deploy. Then add your domain under **Settings → Domains** and follow the DNS instructions.
5. For preview deployments, set `NEXT_PUBLIC_ALLOW_INDEXING=false` in the Preview environment.

Other hosts that run Node.js 20.9+ work too (Netlify, Render, Railway, AWS Amplify, a VPS with `npm run build && npm start`).

## Environment variables

See `.env.example` for the full list with comments.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical domain for metadata, sitemap, Open Graph |
| `RESEND_API_KEY`, `FORMS_FROM_EMAIL`, `INQUIRY_TO_EMAIL` | One delivery channel required | Email delivery of inquiries and messages |
| `CAREERS_TO_EMAIL` | Recommended | Separate recruiting inbox for applications and resumes |
| `INQUIRY_WEBHOOK_URL`, `INQUIRY_WEBHOOK_SECRET` | Optional | Send inquiries to a CRM or automation tool |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Optional | Cloudflare Turnstile spam challenge |
| `NEXT_PUBLIC_SCHEDULING_URL` | Optional | Real booking page for "Schedule a Consultation" |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Optional | `false` blocks all crawling (staging) |

## Setting up email delivery (Resend)

1. Create a Resend account and **verify your sending domain** (adds DNS records: SPF/DKIM).
2. Create an API key with "Sending access" only.
3. Set `RESEND_API_KEY`, `FORMS_FROM_EMAIL` (an address on the verified domain), and `INQUIRY_TO_EMAIL`.
4. Redeploy, submit a test inquiry, and confirm it arrives. The browser shows a success message only after Resend accepts the email.

Applications include the resume as an attachment and are sent only to `CAREERS_TO_EMAIL` (or `INQUIRY_TO_EMAIL` if unset). They are never stored on the web server and never sent to the webhook.

To use another provider (Postmark, SendGrid, SES), replace the fetch call in `src/lib/forms/server.ts` → `deliver()`.

## CRM webhook

If `INQUIRY_WEBHOOK_URL` is set, inquiries and contact messages are POSTed as JSON:

```json
{ "type": "inquiry", "submittedAt": "2026-10-25T12:00:00.000Z", "fields": { "Full name": "…", "Business email": "…" } }
```

The header `X-Webhook-Secret` carries `INQUIRY_WEBHOOK_SECRET` so the receiver can reject forged requests. A submission succeeds if email **or** webhook accepts it.

## Rate limiting

`src/lib/forms/server.ts` uses an in-memory sliding window (5 inquiries per 10 minutes per IP, 3 applications per 30 minutes). This works on a single long-running server. On serverless hosting each instance has its own memory, so limits are approximate. For stricter limits, replace `rateLimit()` with a shared store, for example Upstash Redis with `@upstash/ratelimit`, and keep the same function signature.

## Resume uploads and malware scanning

Uploads are limited to 5 MB, PDF/DOC/DOCX by extension **and** file signature, and are forwarded by email without being written to disk. No antivirus scanning is performed. If you later store resumes (for example in an applicant tracking system or cloud bucket), choose a service with malware scanning and restricted access, and update the privacy policy.

## Security headers

`next.config.ts` sets HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and `Permissions-Policy`. If you add third-party scripts, consider adding a Content Security Policy.

## Verifying a deployment

```bash
npm run build && npm start &          # or point at your deployed URL
BASE_URL=http://localhost:3000 npm test
BASE_URL=http://localhost:3000 npm run check:links
```

Then run Lighthouse or PageSpeed Insights on the homepage, a specialty page, and a blog article to confirm Core Web Vitals on the real host. Performance targets (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1) have not been measured on production infrastructure yet.
