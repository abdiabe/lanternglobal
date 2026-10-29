import type { Metadata } from "next";
import { Globe2, GraduationCap, Laptop, Sprout, Users } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/Accordion";
import { InfoNote } from "@/components/sections/Shared";
import { divisions } from "@/content/divisions";
import { faqCategories } from "@/content/faqs";
import { jobs } from "@/content/jobs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers for University-Educated Professionals in the Philippines",
  description:
    "Build your career supporting U.S. businesses. Lantern Global recruits university-educated Philippine professionals across accounting, technology, healthcare administration, engineering, and more.",
  path: "/careers",
});

const aspirations = [
  { icon: Sprout, title: "Professional growth", body: "Roles that use your degree and let you deepen a specialty over time." },
  { icon: Globe2, title: "International collaboration", body: "Work directly with U.S. businesses and learn how they operate." },
  { icon: GraduationCap, title: "Skills development", body: "Exposure to modern tools, processes, and industries." },
  { icon: Users, title: "Meaningful work", body: "Be a dedicated part of a client's team, not one of many anonymous contractors." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Careers", path: "/careers" }]}
        eyebrow="Careers"
        title="Build Your Career With a Global Professional Team."
        description="We connect qualified Philippine professionals with opportunities to support U.S. businesses across specialized industries."
        photo="office-desk-team"
        actions={
          <>
            <ButtonLink href="/careers/open-positions" size="lg" arrow>
              View open positions{jobs.length ? ` (${jobs.length})` : ""}
            </ButtonLink>
            <ButtonLink href="/careers/apply" size="lg" variant="secondary">
              Submit your application
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="req-heading" size="sm">
        <div className="on-dark flex flex-col gap-6 rounded-[1.75rem] bg-navy-950 p-8 text-slate-300 sm:flex-row sm:items-center sm:p-10">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-glow">
            <GraduationCap aria-hidden="true" className="h-7 w-7" />
          </span>
          <div>
            <h2 id="req-heading" className="font-display text-2xl font-bold text-white">
              Qualification requirement
            </h2>
            <p className="mt-2 text-lg">A completed bachelor&apos;s degree or higher is required for professional positions.</p>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="why-heading">
        <SectionHeading
          id="why-heading"
          eyebrow="Why work with us"
          title="Your Education. Your Expertise. Your Next Opportunity."
          description="Explore opportunities to apply your professional skills while supporting international business teams."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aspirations.map(({ icon: I, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 60} className="card p-6">
              <I aria-hidden="true" className="h-6 w-6 text-brand" />
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </ul>
        <InfoNote className="mt-8">
          These describe what we are building toward. Specific compensation, benefits, schedules, work location, and employment or
          contractor arrangements are stated in each job posting and offer, and are never promised in advance.
        </InfoNote>
      </Section>

      <Section labelledBy="fields-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading id="fields-heading" eyebrow="Fields we recruit in" title="Twelve Professional Divisions" />
            <p className="mt-5 leading-relaxed">
              We recruit graduates whose degrees align with real client needs. Explore the divisions to see the skills and software each
              role uses.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <Laptop aria-hidden="true" className="h-5 w-5 text-brand" /> Many roles support U.S. clients remotely.
            </div>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {divisions.map((d) => (
              <li key={d.slug} className="rounded-xl bg-surface px-4 py-3 text-sm ring-1 ring-line">
                <span className="font-semibold text-ink">{d.shortName}</span>
                <span className="mt-0.5 block text-xs text-muted">{d.specialties.slice(0, 3).map((s) => s.title).join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface" labelledBy="careers-faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="careers-faq" eyebrow="Applicant FAQs" title="Questions From Candidates" />
          <FaqAccordion items={faqCategories.find((c) => c.slug === "careers")!.items} />
        </div>
      </Section>
    </>
  );
}
