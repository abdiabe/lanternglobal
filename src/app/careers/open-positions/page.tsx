import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { JobBoard } from "@/components/interactive/JobBoard";
import { divisions } from "@/content/divisions";
import { jobs } from "@/content/jobs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Open Positions",
  description: "Current openings for university-educated professionals in the Philippines supporting U.S. businesses.",
  path: "/careers/open-positions",
});

export default function OpenPositionsPage() {
  const departments = Object.fromEntries(divisions.map((d) => [d.slug, d.shortName]));
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Careers", path: "/careers" },
          { name: "Open Positions", path: "/careers/open-positions" },
        ]}
        eyebrow="Open positions"
        title="Current Opportunities"
        description="A completed bachelor's degree or higher is required for professional positions. Each listing states its schedule, arrangement, and requirements."
      />
      <Section size="sm">
        <JobBoard jobs={jobs} departments={departments} />
      </Section>
    </>
  );
}
