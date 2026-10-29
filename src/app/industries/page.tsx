import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Reveal } from "@/components/ui/Section";
import { IndustryCard } from "@/components/cards/Cards";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Support",
  description:
    "Dedicated professional support for property management, construction, logistics, law firms, accounting, healthcare, technology, e-commerce, agencies, real estate, and hospitality.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Industries", path: "/industries" }]}
        eyebrow="Industries"
        title="Professional Support Built Around Your Industry"
        description="Each industry has its own systems, regulations, and daily rhythms. Explore the challenges we help with and the specialists who fit your operations."
        actions={
          <ButtonLink href="/specialty-finder" size="lg" variant="secondary" arrow>
            Match roles to your industry
          </ButtonLink>
        }
      />
      <Section>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={(i % 3) * 60}>
              <IndustryCard industry={ind} />
            </Reveal>
          ))}
        </ul>
      </Section>
      <CtaBanner />
    </>
  );
}
