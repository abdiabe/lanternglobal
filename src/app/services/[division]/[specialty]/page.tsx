import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, BriefcaseBusiness, GraduationCap, Wrench } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { SpecialtyCard } from "@/components/cards/Cards";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BoundaryNote, CheckList, InfoNote, TagList } from "@/components/sections/Shared";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { getDivision, getSpecialty, relatedSpecialties, specialties } from "@/content/divisions";
import { industries } from "@/content/industries";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";

type Params = Promise<{ division: string; specialty: string }>;

export function generateStaticParams() {
  return specialties.map((s) => ({ division: s.division.slug, specialty: s.slug }));
}

export const dynamicParams = false;

function seo(s: NonNullable<ReturnType<typeof getSpecialty>>) {
  return {
    title: s.seoTitle ?? `Hire a Dedicated Remote ${s.title}`,
    description:
      s.seoDescription ??
      `${s.summary} Dedicated ${s.title.toLowerCase()} professionals with a bachelor's degree or higher, through a U.S.-based staffing partner.`.slice(0, 300),
  };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { division, specialty } = await params;
  const s = getSpecialty(division, specialty);
  if (!s) return {};
  const m = seo(s);
  return buildMetadata({ ...m, path: s.href });
}

export default async function SpecialtyPage({ params }: { params: Params }) {
  const { division, specialty } = await params;
  const s = getSpecialty(division, specialty);
  const d = getDivision(division);
  if (!s || !d) notFound();

  const inds = industries.filter((i) => i.roles.includes(s.slug) || i.exampleTeam.some((t) => t.role === s.slug));
  const fallbackInds = inds.length ? inds : industries.filter((i) => d.industries.includes(i.slug));
  const related = relatedSpecialties(s, 3);
  const boundary = s.boundary ?? d.boundary?.body;

  return (
    <>
      <section className="on-dark relative overflow-hidden bg-navy-950 text-slate-300">
        <div aria-hidden="true" className="bg-grid-dark pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-3xl" />
        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <Breadcrumbs
            dark
            className="mb-8"
            items={[
              { name: "Services", path: "/services" },
              { name: d.shortName, path: `/services/${d.slug}` },
              { name: s.title, path: s.href },
            ]}
          />
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow inline-flex items-center gap-2">
                <Icon name={d.icon} className="h-4 w-4" /> {d.shortName}
              </p>
              <h1 className="text-display mt-4 text-white">{s.title}</h1>
              <p className="text-lead mt-5 max-w-2xl">{s.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/hire-a-professional?specialty=${s.slug}`} variant="light" size="lg" arrow>
                  Request a {s.title}
                </ButtonLink>
                <ButtonLink href={`/team-builder?add=${s.slug}`} variant="outline-light" size="lg">
                  Add to a team
                </ButtonLink>
              </div>
            </div>
            <dl className="grid gap-4 rounded-2xl bg-white/[0.05] p-6 ring-1 ring-white/10">
              <div>
                <dt className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <GraduationCap aria-hidden="true" className="h-5 w-5 shrink-0 text-glow" />
                  Minimum education
                </dt>
                <dd className="mt-0.5 pl-8 text-sm text-white">Bachelor&apos;s degree or higher</dd>
              </div>
              <div>
                <dt className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <BriefcaseBusiness aria-hidden="true" className="h-5 w-5 shrink-0 text-glow" />
                  Experience
                </dt>
                <dd className="mt-0.5 pl-8 text-sm text-white">{s.experience ?? "Matched to the level your role requires."}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Wrench aria-hidden="true" className="h-5 w-5 shrink-0 text-glow" />
                  Common tools
                </dt>
                <dd className="mt-0.5 pl-8 text-sm text-white">{s.software.slice(0, 4).join(", ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <Section labelledBy="role-heading">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="role-heading" eyebrow="What they do" title={`How a ${s.title} Supports Your Business`} />
            <p className="mt-6 text-[1.0625rem] leading-relaxed">
              {s.summary} Working as a dedicated member of your team, your {s.title.toLowerCase()} follows your processes, works
              inside your systems, and reports to the person you designate.
            </p>
            <h3 className="mt-10 text-h3">Typical responsibilities</h3>
            <CheckList items={s.responsibilities} className="mt-5" />
            {boundary && (
              <BoundaryNote title="Scope and supervision" className="mt-10">
                {boundary}
              </BoundaryNote>
            )}
          </div>
          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="flex items-center gap-2 text-base font-bold">
                <GraduationCap aria-hidden="true" className="h-5 w-5 text-brand" /> Relevant bachelor&apos;s degrees
              </h2>
              <ul className="mt-4 space-y-2 text-[0.9375rem] text-ink">
                {s.degrees.map((deg) => (
                  <li key={deg}>{deg}</li>
                ))}
                <li className="text-sm text-muted">or a closely related discipline</li>
              </ul>
            </div>
            {s.additionalQualifications && (
              <div className="card p-6">
                <h2 className="flex items-center gap-2 text-base font-bold">
                  <Award aria-hidden="true" className="h-5 w-5 text-brand" /> Additional qualifications
                </h2>
                <CheckList items={s.additionalQualifications} className="mt-4" />
              </div>
            )}
            <div className="card p-6">
              <h2 className="text-base font-bold">Key skills</h2>
              <div className="mt-4">
                <TagList items={s.skills} label="Key skills" />
              </div>
              <h2 className="mt-6 text-base font-bold">Software and systems</h2>
              <div className="mt-4">
                <TagList items={s.software} label="Software" />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="surface" labelledBy="eval-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="eval-heading" eyebrow="Candidate evaluation" title="How Candidates for This Role Are Evaluated" />
            <CheckList items={d.qualificationCriteria} className="mt-8" />
            <InfoNote className="mt-6">
              A degree is our minimum requirement, not a guarantee of fit. You interview finalists and make the final selection.
            </InfoNote>
          </div>
          <div>
            <h2 className="text-h3">Industries that commonly use this role</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {fallbackInds.slice(0, 6).map((ind) => (
                <li key={ind.slug}>
                  <Link href={`/industries/${ind.slug}`} className="card card-interactive flex items-center gap-3 p-4 text-sm font-semibold text-ink">
                    <Icon name={ind.icon} className="h-4 w-4 text-brand-strong" />
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section labelledBy="related-heading">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading id="related-heading" eyebrow="Related specialties" title={`More in ${d.shortName}`} />
            <Link href={`/services/${d.slug}`} className="text-sm font-semibold text-brand-strong hover:underline">
              All {d.specialties.length} {d.shortName} specialties
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <SpecialtyCard specialty={r} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBanner
        title={`Looking for a Dedicated ${s.title}?`}
        description="Share the responsibilities, tools, and schedule. We'll follow up to discuss your requirements and next steps."
        primaryLabel={`Request a ${s.title}`}
        primaryHref={`/hire-a-professional?specialty=${s.slug}`}
      />
      <JsonLd data={serviceJsonLd({ name: `Dedicated ${s.title}`, description: seo(s).description, path: s.href })} />
    </>
  );
}
