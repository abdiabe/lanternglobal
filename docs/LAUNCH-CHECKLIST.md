# Implementation & Launch Checklist

Status as of 2026-10-25. ✅ complete · ⚙️ needs configuration · ⚖️ needs business or legal verification

## Built and verified

| Item | Status | Notes |
| --- | --- | --- |
| Homepage with all 12 sections | ✅ | Hero, standards strip, 12 divisions, degree framework, process, featured industries, comparison, team scaling, industry tabs, FAQ, blog preview, final CTA |
| 12 service division pages | ✅ | Hero, overview, specialties, degrees, criteria, tools, deliverables, industries, onboarding, FAQs, related posts, CTA |
| 124 specialty pages | ✅ | Generated from structured data in `src/content/divisions` |
| Searchable specialty directory | ✅ | Filters: keyword, division, industry, degree field, software; shareable URLs |
| 12 industry pages | ✅ | Industry-specific challenges, support, roles, example team, tools, boundaries, FAQs |
| How It Works, Why Choose Us, Education & Qualifications, About, Pricing, Security | ✅ | |
| FAQ page | ✅ | 32 questions in 10 categories, searchable |
| Contact page | ✅ | Separate path for job seekers |
| Multi-step inquiry form | ✅ | 4 steps plus confirmation, prefilled from specialty, industry, division, team, or intent links |
| Specialty Finder and Team Builder | ✅ | Driven by the real catalog; send selections to the inquiry form |
| Careers, open positions, job detail, application | ✅ | Empty state while no jobs are posted; resume upload with type, size, and signature checks |
| Blog index, category pages, article template | ✅ | Search, category filter, pagination, TOC, share links, related posts, service CTA |
| 6 published launch articles | ✅ | Dated at launch, not backdated |
| 14 draft articles with outlines | ✅ | Unpublished until written |
| Hiring and Outsourcing guides | ✅ | |
| Privacy, Terms, Cookie policy templates | ✅ ⚖️ | Bracketed placeholders and legal review banner |
| SEO: metadata, canonical, sitemap, robots, OG image, JSON-LD | ✅ | See SEO-PLAN.md |
| 34 licensed photos with manifest | ✅ | Pexels License verified per photo page on 2026-10-25 |
| Responsive layouts | ✅ | Checked at 390px and 1440px for horizontal overflow on 28 routes |
| Accessibility | ✅ | axe-core WCAG 2.2 AA automated scan: 0 violations on 30 routes. Manual screen reader testing not yet done |
| Production build, TypeScript, ESLint | ✅ | All passing |
| Form API tests | ✅ | 14 tests: validation, consent, honeypot, timing, size limit, rate limit, file signature, unconfigured refusal, and successful delivery against a mock email API |
| Link and metadata crawl | ✅ | 480 URLs and 296 assets, no broken links, no duplicate titles, one h1 per page |

## Needs configuration before launch ⚙️

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain
- [ ] Verify a sending domain in Resend and set `RESEND_API_KEY`, `FORMS_FROM_EMAIL`, `INQUIRY_TO_EMAIL`, `CAREERS_TO_EMAIL`
- [ ] Submit a real test inquiry, contact message, and application on the deployed site
- [ ] Optional: `INQUIRY_WEBHOOK_URL` for CRM, Turnstile keys, `NEXT_PUBLIC_SCHEDULING_URL`
- [ ] Optional: shared rate limiting (Upstash) if hosting on serverless
- [ ] Verify the domain in Google Search Console and submit the sitemap
- [ ] Measure Core Web Vitals on the production host (not yet measured)

## Needs business information ⚖️

- [ ] `legalName`, verified email, phone, and U.S. address in `src/lib/site.ts`
- [ ] Social profile URLs, only if active
- [ ] Leadership names, roles, bios, and approved photos (section stays hidden until added)
- [ ] Confirm the operating and employment structure for Philippine professionals (employee, contractor, or partner entity) and align agreements, FAQs, and job postings with it
- [ ] Decide verification and screening providers, then set the `operations` flags in `site.ts` to `true` only when active
- [ ] Written service agreement covering schedule, holidays, IP assignment, confidentiality, replacement terms, and data handling
- [ ] Security policies marked "Policy in development" on `/security`: device standard, incident escalation
- [ ] First real job postings in `src/content/jobs.ts`

## Needs legal review ⚖️

- [ ] Privacy Policy, Terms of Use, Cookie Policy (fill placeholders, then remove the review banner)
- [ ] Healthcare: Business Associate Agreement template and safeguards before any PHI access
- [ ] Legal support: confirm supervision language suits target jurisdictions
- [ ] Outbound calling/texting roles: TCPA and consent procedures for clients
- [ ] Philippine labor law compliance for schedules, night work, and benefits (applies to the operating entity)
- [ ] Applicant data handling under the Philippine Data Privacy Act of 2012

## Claims intentionally not made

The site does not claim SOC 2, ISO 27001, or HIPAA certification, insurance coverage, government approval, client logos, testimonials, statistics, savings figures, a founding date, or an employee count. Keep it that way until each claim is documented.
