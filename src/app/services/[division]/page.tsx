import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SpecialtyCard } from "@/components/cards/Cards";
import { BlogCard } from "@/components/cards/BlogCard";
import { FaqAccordion } from "@/components/ui/Accordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BoundaryNote, CheckList, OnboardingSteps, TagList } from "@/components/sections/Shared";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { divisions, getDivision, specialties } from "@/content/divisions";
import { getIndustry } from "@/content/industries";
import { getPostsForDivision } from "@/lib/blog";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { unique } from "@/lib/utils";

export function generateStaticParams() {
  return divisions.map((d) => ({ division: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ division: string }> }): Promise<Metadata> {
  const { division } = await params;
  const d = getDivision(division);
  if (!d) return {};
  return buildMetadata({ title: d.seoTitle, description: d.seoDescription, path: `/services/${d.slug}`, image: undefined });
}

export default async function DivisionPage({ params }: { params: Promise<{ division: string }> }) {
  const { division } = await params;
  const d = getDivision(division);
  if (!d) notFound();

  const specs = specialties.filter((s) => s.division.slug === d.slug);
  const degrees = unique(d.specialties.flatMap((s) => s.degrees)).slice(0, 18);
  const skills = unique(d.specialties.flatMap((s) => s.skills)).slice(0, 24);
  const inds = d.industries.map(getIndustry).filter(Boolean);
  const posts = getPostsForDivision(d.slug, d.blogCategory);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: d.shortName, path: `/services/${d.slug}` },
        ]}
        eyebrow={d.name}
        title={d.tagline}
        description={d.description}
        photo={d.photo}
        actions={
          <>
            <ButtonLink href={`/hire-a-professional?division=${d.slug}`} size="lg" arrow>
              Discuss Your Staffing Needs
            </ButtonLink>
            <ButtonLink href="#specialties" size="lg" variant="secondary">
              View {d.specialties.length} specialties
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="overview-heading">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="overview-heading" eyebrow="Overview" title={`What ${d.shortName} Professionals Do for U.S. Companies`} />
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed">
              {d.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="card self-start bg-surface p-7">
            <h3 className="text-h3">Well suited to</h3>
            <CheckList items={d.idealFor} className="mt-5" />
          </div>
        </div>
      </Section>

      <Section tone="surface" id="specialties" labelledBy="specialties-heading">
        <SectionHeading
          id="specialties-heading"
          eyebrow="Available specialties"
          title={`${d.specialties.length} ${d.shortName} Specialties`}
          description="Each specialty page explains responsibilities, relevant degrees, tools, and qualification criteria."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 50}>
              <SpecialtyCard specialty={s} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="qual-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="qual-heading" eyebrow="Relevant bachelor's degrees" title="Academic Backgrounds We Recruit From" />
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {degrees.map((deg) => (
                <li key={deg} className="flex items-center gap-2.5 rounded-xl bg-surface px-4 py-3 text-sm font-medium text-ink ring-1 ring-line">
                  <GraduationCap aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
                  {deg}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">Related degrees may qualify when paired with demonstrated skills.</p>
          </div>
          <div>
            <h2 className="text-h3">Candidate qualification criteria</h2>
            <CheckList items={d.qualificationCriteria} className="mt-5" />
            <h3 className="mt-8 text-base font-bold">Experience levels</h3>
            <p className="mt-2 leading-relaxed">{d.experience}</p>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="tools-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="tools-heading" eyebrow="Software and technical skills" title="Tools Your Professional Can Work In" />
            <div className="mt-8">
              <TagList items={d.software} label="Common software" />
            </div>
            <h3 className="mt-10 text-base font-bold">Core skills across this division</h3>
            <div className="mt-4">
              <TagList items={skills} label="Core skills" />
            </div>
          </div>
          <div>
            <h2 className="text-h3">Typical tasks and deliverables</h2>
            <CheckList items={d.deliverables} className="mt-5" />
            {d.boundary && (
              <BoundaryNote title={d.boundary.title} className="mt-10">
                {d.boundary.body}
              </BoundaryNote>
            )}
          </div>
        </div>
      </Section>

      {inds.length > 0 && (
        <Section labelledBy="industries-heading" size="sm">
          <SectionHeading id="industries-heading" eyebrow="Industries served" title="Where These Professionals Make an Impact" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {inds.map((ind) => (
              <li key={ind!.slug}>
                <Link
                  href={`/industries/${ind!.slug}`}
                  className="card card-interactive group flex items-center justify-between gap-3 px-4 py-4 text-sm font-semibold text-ink"
                >
                  <span className="flex items-center gap-2.5">
                    <Icon name={ind!.icon} className="h-4 w-4 text-brand-strong" />
                    {ind!.name}
                  </span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="surface" labelledBy="onboarding-heading">
        <SectionHeading
          id="onboarding-heading"
          eyebrow="How onboarding works"
          title="A Structured Start for Every Placement"
          description="Onboarding follows the same steps for every specialty, adjusted to your systems and the complexity of the role."
        />
        <div className="mt-10">
          <OnboardingSteps />
        </div>
      </Section>

      <Section labelledBy="faq-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-heading" eyebrow="FAQs" title={`${d.shortName} Questions`} />
          <FaqAccordion items={d.faqs} />
        </div>
      </Section>

      {posts.length > 0 && (
        <Section tone="surface" labelledBy="posts-heading">
          <SectionHeading id="posts-heading" eyebrow="Related reading" title="From the Blog" />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBanner
        title={`Ready to Add a Dedicated ${d.shortName} Professional?`}
        description="Tell us about the responsibilities, tools, and schedule. We'll outline how we would approach your search."
        primaryLabel="Discuss Your Staffing Needs"
        primaryHref={`/hire-a-professional?division=${d.slug}`}
      />
      <JsonLd data={serviceJsonLd({ name: d.name, description: d.seoDescription, path: `/services/${d.slug}` })} />
    </>
  );
}
