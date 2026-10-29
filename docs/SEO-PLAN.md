# SEO Plan

## Technical foundation (implemented)

- Unique `<title>` and meta description on every page (verified by `npm run check:links`, which flags duplicates)
- Canonical URL on every page from `NEXT_PUBLIC_SITE_URL`
- Open Graph and Twitter card metadata; a generated 1200×630 social image (`/opengraph-image`); blog posts use their featured photo
- `sitemap.xml` generated from content data (static pages, 12 divisions, 124 specialties, 12 industries, published posts, non-empty blog categories, jobs)
- `robots.txt` allows everything except `/api/`; `NEXT_PUBLIC_ALLOW_INDEXING=false` blocks staging
- Empty blog category pages are `noindex` until they have posts
- Semantic HTML with one `<h1>` per page and ordered headings
- Breadcrumbs with `BreadcrumbList` structured data on all inner pages
- Self-hosted fonts, responsive AVIF/WebP images with explicit dimensions, static generation for nearly every page

## Structured data

| Type | Where | Notes |
| --- | --- | --- |
| Organization | Every page | Email, phone, and social profiles are added automatically once set in `site.ts` |
| Service | Division, specialty, and industry pages | Provider references the Organization |
| Article | Blog posts | Organization as author unless a real author is set |
| BreadcrumbList | All inner pages | |
| JobPosting | Each job detail page | Only generated from real entries in `jobs.ts` |

Deliberately **not** used:

- **Review / AggregateRating:** there are no genuine reviews.
- **FAQPage:** Google limits FAQ rich results to well-known government and health sites, so the markup would add no benefit.
- **LocalBusiness:** no verified address yet. Add `address` to the Organization schema once you have one.

## Page-to-keyword map

Each search intent maps to one primary page to avoid cannibalization. Supporting pages link to the primary.

| Primary page | Primary intent | Supporting content |
| --- | --- | --- |
| `/` | professional virtual staffing; university-educated remote professionals Philippines | All divisions |
| `/services/virtual-assistance-and-administration` | dedicated virtual assistants Philippines; outsourced administrative services | VA guide article, VA vs specialist article |
| `/services/virtual-assistance-and-administration/executive-assistant` | hire a remote executive assistant | |
| `/services/accounting-and-finance` | remote bookkeeping professionals | Accounting firm draft article |
| `/industries/accounting-and-financial-services` | outsourced bookkeeping for CPA firms | |
| `/services/technology-and-it` | hire remote software developers Philippines | Developer hiring draft article |
| `/services/legal-support` | remote paralegal and legal administrative support | |
| `/industries/law-firms` | outsourced legal administrative support for law firms | Law firm draft article |
| `/services/engineering-and-construction` | remote construction estimators, CAD and BIM drafting | |
| `/industries/construction-and-trades` | back-office support for contractors | Construction draft article |
| `/industries/property-management` | virtual assistants for property management | Property management article |
| `/services/sales-and-marketing` | remote sales development representatives; digital marketing | SDR draft article |
| `/services/business-operations` | dedicated remote business operations support | Operations coordinator draft article |
| `/services/healthcare-administration` | remote medical billing and healthcare administrative support | |
| `/why-choose-us/education-and-qualifications` | university-educated virtual assistants | Degrees article |
| `/resources/outsourcing-guide` | how to outsource professional work | Outsourcing mistakes and cost drafts |
| `/resources/hiring-guide` | how to hire a remote professional | Onboarding and evaluation articles |

Each of the 124 specialty pages targets "hire a dedicated remote [specialty]" with a unique title and description generated from its summary.

## Content roadmap

Publish the 14 draft articles over time, one or two a month, each linking to its primary service or industry page. Prioritize: true cost of a VA, evaluating skills before hiring, accounting firms, law firms, construction, software developers.

## After launch

1. Verify the domain in Google Search Console and Bing Webmaster Tools; submit `/sitemap.xml`.
2. Watch Search Console coverage and Core Web Vitals reports.
3. Add genuine client testimonials or case studies only with written permission; do not mark them up as reviews unless they meet Google's guidelines.
4. Build a Google Business Profile once a verified U.S. address exists.
