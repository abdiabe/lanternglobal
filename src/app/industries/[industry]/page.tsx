import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, Lightbulb } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SpecialtyCard } from "@/components/cards/Cards";
import { FaqAccordion } from "@/components/ui/Accordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BoundaryNote, CheckList, TagList } from "@/components/sections/Shared";
import { JsonLd } from "@/components/ui/JsonLd";
import { getSpecialtyBySlug } from "@/content/divisions";
import { getIndustry, industries } from "@/content/industries";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";

type Params = Promise<{ industry: string }>;

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { industry } = await params;
  const ind = getIndustry(industry);
  if (!ind) return {};
  return buildMetadata({ title: ind.seoTitle, description: ind.seoDescription, path: `/industries/${ind.slug}` });
}

export default async function IndustryPage({ params }: { params: Params }) {
  const { industry } = await params;
  const ind = getIndustry(industry);
  if (!ind) notFound();

  const roles = ind.roles.map(getSpecialtyBySlug).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const team = ind.exampleTeam.map((m) => ({ ...m, spec: getSpecialtyBySlug(m.role)! }));
  const teamQuery = team.map((t) => t.role).join(",");

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Industries", path: "/industries" },
          { name: ind.name, path: `/industries/${ind.slug}` },
        ]}
        eyebrow={ind.name}
        title={ind.headline}
        description={ind.description}
        photo={ind.photo}
        actions={
          <>
            <ButtonLink href={`/hire-a-professional?industry=${ind.slug}`} size="lg" arrow>
              Speak With Our Team
            </ButtonLink>
            <ButtonLink href={`/team-builder?add=${teamQuery}`} size="lg" variant="secondary">
              Build an example team
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="context-heading">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="context-heading" eyebrow="The operational reality" title={`Where ${ind.name} Teams Lose Time`} />
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed">
              {ind.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="card self-start bg-surface p-7">
            <h3 className="text-h3">Who we support</h3>
            <CheckList items={ind.audience} className="mt-5" />
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="challenges-heading">
        <SectionHeading id="challenges-heading" eyebrow="Common challenges" title="What Gets in the Way" />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {ind.challenges.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 2) * 70} className="card flex gap-4 p-6">
              <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <h3 className="text-base font-bold">{c.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="support-heading">
        <SectionHeading id="support-heading" eyebrow="How dedicated professionals help" title="Practical Support for Daily Operations" />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {ind.support.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 2) * 70} className="flex gap-4 rounded-2xl bg-brand-soft/60 p-6 ring-1 ring-brand-tint">
              <Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" />
              <div>
                <h3 className="text-base font-bold">{c.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate-700">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        {ind.boundary && (
          <BoundaryNote title="Professional boundaries" className="mt-10">
            {ind.boundary}
          </BoundaryNote>
        )}
      </Section>

      <Section tone="navy" labelledBy="team-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="eyebrow">Example team</p>
            <h2 id="team-heading" className="text-h2 mt-4 text-white">
              One Business, Several Dedicated Specialists
            </h2>
            <p className="text-lead mt-5">
              An illustrative {ind.name.toLowerCase()} team. Start with the role that relieves the most pressure, then add others as
              you grow.
            </p>
            <ButtonLink href={`/team-builder?add=${teamQuery}`} variant="light" className="mt-8" arrow>
              Customize this team
            </ButtonLink>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {team.map((t, i) => (
              <li key={t.role} className="rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10">
                <span className="font-display text-xs font-bold text-glow tabular-nums">0{i + 1}</span>
                <p className="mt-2 font-semibold text-white">{t.spec.title}</p>
                <p className="mt-1 text-sm text-slate-300">{t.focus}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="roles-heading">
        <SectionHeading
          id="roles-heading"
          eyebrow="Relevant specialties"
          title={`Professionals Who Fit ${ind.name}`}
          description="Each role links to its responsibilities, relevant degrees, and qualification criteria."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((s) => (
            <li key={s.slug}>
              <SpecialtyCard specialty={s} showDivision />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="tools-heading" size="sm">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <h2 id="tools-heading" className="text-h3">
              Systems teams commonly use
            </h2>
            <p className="mt-2 text-sm">Platform experience is matched to your stack where candidates have demonstrated it.</p>
          </div>
          <TagList items={ind.tools} label={`${ind.name} tools`} />
        </div>
      </Section>

      <Section labelledBy="faq-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-heading" eyebrow="FAQs" title={`${ind.name} Questions`} />
          <FaqAccordion items={ind.faqs} />
        </div>
      </Section>

      <CtaBanner
        title={`Let's Talk About Your ${ind.name} Operations`}
        description="Tell us where your team is stretched. We'll suggest the roles that fit and explain how a dedicated professional would work with you."
        primaryLabel="Speak With Our Team"
        primaryHref={`/hire-a-professional?industry=${ind.slug}`}
      />
      <JsonLd data={serviceJsonLd({ name: `Dedicated professional staffing for ${ind.name}`, description: ind.seoDescription, path: `/industries/${ind.slug}` })} />
    </>
  );
}
