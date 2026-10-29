# Design System

Direction set with the UI UX Pro Max design-system search ("Trust & Authority + Conversion" pattern, accessible and ethical style), adapted to the brand palette in the brief and the Lantern Global logo.

## Tokens (`src/app/globals.css`, `@theme`)

| Token | Value | Use |
| --- | --- | --- |
| `navy-950` | #071126 | Dark sections, footer |
| `navy-900` | #0B1730 | Primary navy, step badges, active tabs |
| `brand` | #2563EB | Primary actions, links, accents |
| `brand-strong` | #1D4ED8 | Hover, eyebrow text, link text (AA on white) |
| `brand-soft` / `brand-tint` | #EFF6FF / #DBEAFE | Soft fills and rings |
| `ink` | #0F172A | Headings |
| `body` | #475569 | Body text |
| `muted` | #64748B | Meta text (AA on white at 14px+) |
| `line` | #E2E8F0 | Borders |
| `surface` | #F8FAFC | Alternating section background |
| `accent` | #0D9488 | Sparingly (professional development) |
| `glow` | #38BDF8 | Lantern-light accents on dark backgrounds only |

## Typography

- **Headings:** Plus Jakarta Sans (variable), heavy weights, tight tracking on large sizes only
- **Body:** Inter (variable), 16px base, 1.65 line height
- Utility classes: `.text-display`, `.text-h2`, `.text-h3`, `.text-lead`, `.eyebrow`
- Both fonts are self-hosted under the SIL Open Font License

## Layout

- `.container-page`: max 80rem with 16/24/32px gutters
- `Section` component: `tone` (white, surface, navy, brand-soft) and `size` (sm, md, lg) spacing
- Cards: `.card` plus `.card-interactive` for lift on hover

## Components

| Component | Location |
| --- | --- |
| Header with mega menu, mobile drawer | `components/layout` |
| Buttons and text links | `components/ui/Button.tsx` |
| Section and heading | `components/ui/Section.tsx` |
| FAQ accordion | `components/ui/Accordion.tsx` |
| Breadcrumbs with schema | `components/ui/Breadcrumbs.tsx` |
| Page hero, CTA banner, notes and lists | `components/sections` |
| Division, industry, specialty, blog cards | `components/cards` |
| Form fields with labels, help, inline errors | `components/forms/Fields.tsx` |

## Motion

- Scroll reveal: 520ms fade with 14px rise, staggered by `delay`; content is visible without JavaScript and for reduced-motion users
- Hover: 200 to 300ms transitions; card lift 3px
- Accordion, menu, and drawer use short keyframes defined only inside `prefers-reduced-motion: no-preference`
- No parallax and no animation that delays content

## Accessibility practices

- Skip link, visible 3px focus rings, landmarks, one `h1` per page
- Every form field has a visible label; errors are inline, linked with `aria-describedby`, and announced
- Keyboard-operable menus, tabs (WAI-ARIA tabs pattern), accordions, and dialogs via Radix
- Decorative icons are `aria-hidden`; meaningful images have descriptive alt text
- Touch targets of at least 40 to 44px for primary controls

An automated and manual WCAG audit (axe, keyboard pass, screen reader pass) is still recommended before launch; see the launch checklist.
