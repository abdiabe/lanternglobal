# Lantern Global Website

Marketing website for **Lantern Global**, focused on reliable virtual support for U.S. small businesses, with intended global talent sourcing.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict) |
| Styling | Tailwind CSS 4 with design tokens in `src/app/globals.css` |
| Components | Hand-built components on Radix primitives (navigation menu, dialog, accordion) and Lucide icons |
| Content | Typed TypeScript data for services and industries; Markdown with validated frontmatter for blog, guides, and legal pages |
| Forms | Route handlers with Zod validation, honeypot, timing check, rate limiting, optional Turnstile, delivery by Resend email and/or webhook |
| Fonts | Self-hosted Inter body text and system Georgia serif headlines |

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in values when you have them
npm run dev                  # http://localhost:3000
```

Forms will show "Submissions are not open yet" until email or webhook delivery is configured. That is intentional: the site never shows a success message for a submission that was not delivered.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (validates all blog frontmatter and image keys) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core web vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript with no emit |
| `npm test` | Content checks and form API tests (start a production server first and set `BASE_URL`) |
| `npm run check:links` | Crawls every page and asset for broken links, missing metadata, and heading issues (`BASE_URL` required) |
| `node scripts/generate-image-manifest.mjs` | Regenerates `docs/IMAGE-LICENSES.md` |

## Project structure

```
content/
  blog/            Markdown articles (drafts have draft: true)
  guides/          Hiring and outsourcing guides
  legal/           Privacy, terms, cookie policy (pending legal review)
public/
  brand/           Logo, mark, icons
  images/photos/   Licensed photos (see docs/IMAGE-LICENSES.md)
src/
  app/             Routes, API handlers, sitemap, robots, OG image
  components/      layout, ui, cards, sections, home, forms, interactive
  content/         divisions/, industries.ts, faqs.ts, jobs.ts, navigation, photos.json
  lib/             site config, SEO helpers, blog loader, catalog, form schemas and server helpers
docs/              Deployment, content guide, SEO plan, image licenses, launch checklist
scripts/           Link checker, manifest generator
tests/             Node test runner suites
```

## Documentation

- [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md): what is done, what needs configuration, what needs business or legal verification
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): hosting, environment variables, email, rate limiting, domains
- [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md): editing company info, services, industries, jobs, blog posts, FAQs, images
- [docs/SEO-PLAN.md](docs/SEO-PLAN.md): page-to-keyword map, structured data, indexing rules
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md): tokens, typography, components, motion, accessibility
- [docs/IMAGE-LICENSES.md](docs/IMAGE-LICENSES.md): license record for every photo

## Redesign review (October 2026)

The active experience focuses on U.S. small businesses with intended sourcing across the Philippines, Kenya, Egypt, and South Africa. See **docs/REDESIGN-REVIEW.md** for business confirmations, scope, and verification. See **docs/ASSET-NOTES.md** for the supplied logo and reviewed stock imagery.

The new main routes are `/roles`, `/for/[slug]`, `/industries`, and `/book-a-call`. Legacy catalog and finder URLs redirect to the consolidated experience. The matcher and core role content live in `src/content/matcher.ts`.

The brief form uses the existing contact endpoint. Without delivery configuration it offers a local `.txt` brief download and does not claim to send anything. Final legal policies, verified contacts, and operating terms must be approved before launch. Legal draft source files remain preserved, but their placeholders are not rendered publicly.

Development preview: `npm run dev -- --hostname 127.0.0.1`.
