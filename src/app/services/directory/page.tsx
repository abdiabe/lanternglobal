import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ServiceDirectory } from "@/components/interactive/ServiceDirectory";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { buildCatalog, catalogFacets } from "@/lib/catalog";
import { specialtyCount } from "@/content/divisions";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Directory of Professional Specialties",
  description: `Search all ${specialtyCount} professional specialties by role, division, degree background, software, and industry.`,
  path: "/services/directory",
});

export default function DirectoryPage() {
  const items = buildCatalog();
  const facets = catalogFacets(items);
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: "Directory", path: "/services/directory" },
        ]}
        eyebrow="Specialty directory"
        title="Find the Right Professional Specialty"
        description={`Search ${specialtyCount} specialties by role, skill, degree background, software, or industry.`}
      />
      <Section size="sm" className="pt-10 sm:pt-12">
        <Suspense
          fallback={
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className="card block p-4 text-sm font-semibold text-ink hover:text-brand-strong">
                    {it.title}
                    <span className="mt-1 block text-xs font-normal text-muted">{it.divisionName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          }
        >
          <ServiceDirectory items={items} facets={facets} />
        </Suspense>
      </Section>
      <CtaBanner title="Don't See Exactly What You Need?" description="Describe the role in your own words. We'll tell you how we can help and which specialties fit." primaryLabel="Describe Your Role" />
    </>
  );
}
