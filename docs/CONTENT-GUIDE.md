# Content Guide

Everything editable lives in plain files. You do not need to touch page layouts to update content.

## Company information: `src/lib/site.ts`

| Field | What it controls |
| --- | --- |
| `legalName` | Footer copyright and job posting schema. Set to your registered entity, e.g. "Lantern Global LLC". |
| `contact.email`, `contact.phone`, `contact.address` | Shown in the footer and contact page **only when set**. Use verified details only. |
| `contact.responseTime` | Shown on the contact page only when set. Only add a commitment you will keep. |
| `social.*` | Footer social links. Leave `null` until the profile is real and active. |
| `leadership` | The About page leadership section appears only when this array has entries. Each: `{ name, role, bio, photo? }`. Put approved headshots in `public/images/team/`. |
| `launchDate` | Used as the sitemap's last-modified date for static pages. |

`operations` flags in the same file switch copy from "standard being established" to "active" wording. Set a flag to `true` only when the process genuinely exists:

- `degreeVerificationActive`: changes the credential verification text on the education page
- `hipaaProgramDocumented`: adjusts the regulated-industries note on the security page

## Services and specialties: `src/content/divisions/*.ts`

Each division file exports one `Division` with its specialties. To add a specialty, copy an existing entry in the same file:

```ts
{
  slug: "payroll-coordinator",          // URL segment, lowercase with hyphens, unique
  title: "Payroll Coordinator",
  summary: "One or two sentences on what they do for a U.S. company.",
  degrees: ["BS Accountancy"],
  skills: ["Timesheets", "Payroll reconciliation"],
  software: ["Gusto", "ADP"],
  responsibilities: ["…", "…", "…", "…"],
  experience: "Optional override",
  boundary: "Optional scope note",
  keywords: ["optional", "search", "terms"],
}
```

The specialty page, directory, finder, team builder, sitemap, and structured data update automatically. To add a whole division, create a file, export it, and add it to the `divisions` array in `src/content/divisions/index.ts`.

## Industries: `src/content/industries.ts`

`roles` and `exampleTeam[].role` must be specialty slugs. Set `featured: true` to show an industry on the homepage (six are featured now).

## FAQs: `src/content/faqs.ts`

Add questions to the right category. `homeFaqs` controls the homepage list. Keep answers accurate about what is operational.

## Jobs: `src/content/jobs.ts`

The job board shows an empty state while `jobs` is empty. To post a role, add an object matching the `Job` interface. Every posting automatically gets a detail page, an apply link, a sitemap entry, and JobPosting structured data, so every field must be accurate. Remove the posting when it closes (or set `validThrough`). Leave `compensation` out unless an approved range exists.

## Blog: `content/blog/*.md`

Create a Markdown file; the file name becomes the URL slug.

```md
---
title: "How to Hire a Remote Bookkeeper"           # 10 to 120 characters
description: "Search-friendly summary, 50 to 240 characters."
category: "accounting-and-finance"                 # one of the slugs in src/content/blog-categories.ts
date: "2026-11-02"                                 # actual publication date, never backdated
updated: "2026-12-01"                              # optional
author: "Lantern Global Editorial Team"            # optional; use a real person's name only with permission
image: "accounting-calculator"                     # a key from src/content/photos.json
imageAlt: "Optional override for the image alt text"
featured: false                                    # featured post appears first on /blog
draft: false                                       # true keeps it unpublished
disclaimer: "financial"                            # optional: legal | financial | healthcare | general
relatedServices: ["accounting-and-finance"]        # division slugs for the sidebar and CTA
---

Intro paragraph…

## First section
```

- Use `##` for main sections; the table of contents is built from them.
- Tables, checklists, and links use standard GitHub-flavored Markdown.
- Invalid frontmatter stops the build with a message naming the file, so mistakes never go live.
- 14 planned topics are already in the folder as drafts with outlines. Write the article, set `draft: false`, and set `date` to the publication date.
- Preview drafts locally with `SHOW_DRAFTS=true npm run dev`.
- Do not include statistics, studies, or legal requirements without a reliable source.

New categories: add to `src/content/blog-categories.ts`.

If you later want non-technical editors to publish without Git, the Markdown files can be moved into a headless CMS such as Sanity or Keystatic; the `getAllPosts`/`getPost` functions in `src/lib/blog.ts` are the only code that would change.

## Guides and legal pages

- `content/guides/hiring-guide.md`, `content/guides/outsourcing-guide.md`
- `content/legal/privacy.md`, `terms.md`, `cookies.md`. Replace every `[bracketed]` placeholder and have counsel review before launch. Then remove the review banner by deleting `<LegalReviewBanner />` in `src/components/sections/LegalPage.tsx`.

## Images

See [IMAGE-LICENSES.md](IMAGE-LICENSES.md). Never add an image without recording its license in `src/content/photos.json`. Never present a stock photo as an employee, client, or leader.
