import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { SpecialtyFinder } from "@/components/interactive/SpecialtyFinder";
import { buildCatalog } from "@/lib/catalog";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Specialty Finder: What Kind of Professional Do You Need?",
  description: "Answer five quick questions about your industry, challenges, and required skills to see which professional specialties fit your business.",
  path: "/specialty-finder",
});

export default function SpecialtyFinderPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Specialty Finder", path: "/specialty-finder" }]}
        eyebrow="Specialty finder"
        title="What Kind of Professional Does Your Business Need?"
        description="Answer a few questions. Recommendations are drawn from our catalog of specialties, based on documented skills, software, and industries."
      />
      <Section size="sm">
        <SpecialtyFinder items={buildCatalog()} industries={industries.map((i) => ({ value: i.slug, label: i.name }))} />
      </Section>
    </>
  );
}
