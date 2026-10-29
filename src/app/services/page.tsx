import type { Metadata } from "next";
import { Search, Wand2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { DivisionCard } from "@/components/cards/Cards";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { divisions, specialtyCount } from "@/content/divisions";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Professional Staffing Services",
  description: `Explore ${specialtyCount} professional specialties across 12 service divisions, from administration and accounting to software development and engineering.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title="Specialized Support Across Your Organization."
        description={`Whether you're growing your sales pipeline, improving financial operations, developing software, or coordinating projects, explore ${specialtyCount} professional specialties across 12 divisions.`}
        actions={
          <>
            <ButtonLink href="/services/directory" size="lg" arrow>
              Search all specialties
            </ButtonLink>
            <ButtonLink href="/specialty-finder" size="lg" variant="secondary">
              Find your fit
            </ButtonLink>
          </>
        }
      />
      <Section labelledBy="divisions-heading">
        <SectionHeading id="divisions-heading" eyebrow="12 service divisions" title="Choose a Division to Explore" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {divisions.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 3) * 60}>
              <DivisionCard division={d} showSpecialties={4} />
            </Reveal>
          ))}
        </ul>
      </Section>
      <Section tone="surface" size="sm">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card flex flex-col items-start p-7">
            <Search aria-hidden="true" className="h-6 w-6 text-brand-strong" />
            <h2 className="text-h3 mt-4">Know the role you need?</h2>
            <p className="mt-2">Search the full directory by title, degree, skill, software, or industry.</p>
            <ButtonLink href="/services/directory" variant="secondary" className="mt-6" arrow>
              Open the directory
            </ButtonLink>
          </div>
          <div className="card flex flex-col items-start p-7">
            <Wand2 aria-hidden="true" className="h-6 w-6 text-brand-strong" />
            <h2 className="text-h3 mt-4">Not sure where to start?</h2>
            <p className="mt-2">Answer a few questions about your business and the Specialty Finder will suggest relevant roles.</p>
            <ButtonLink href="/specialty-finder" variant="secondary" className="mt-6" arrow>
              Use the Specialty Finder
            </ButtonLink>
          </div>
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
