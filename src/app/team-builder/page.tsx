import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { TeamBuilder } from "@/components/interactive/TeamBuilder";
import { buildCatalog } from "@/lib/catalog";
import { divisions } from "@/content/divisions";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Team Builder",
  description: "Sketch a dedicated remote team across specialties, review what each role does, and send the plan to Lantern Global for a quote.",
  path: "/team-builder",
});

export default function TeamBuilderPage() {
  const items = buildCatalog();
  const divs = divisions.map((d) => ({ value: d.slug, label: d.shortName }));
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Team Builder", path: "/team-builder" }]}
        eyebrow="Team builder"
        title="Start With One. Grow Into a Team."
        description="Explore how a team of dedicated professionals could fit together. Add roles, review their responsibilities, and send the plan to us when you're ready."
      />
      <Section size="sm">
        <Suspense fallback={<p className="text-sm text-muted">Loading the team builder…</p>}>
          <TeamBuilder items={items} divisions={divs} />
        </Suspense>
      </Section>
    </>
  );
}
