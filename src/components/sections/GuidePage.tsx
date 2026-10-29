import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LongForm } from "@/components/sections/LongForm";
import { loadGuide } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

export async function GuidePage({ slug, path, crumb }: { slug: string; path: string; crumb: string }) {
  const { meta, html, headings } = await loadGuide(slug);
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Resources", path: "/resources" },
          { name: crumb, path },
        ]}
        eyebrow="Guide"
        title={meta.title}
        description={meta.description}
      >
        <p className="mt-6 text-sm text-muted">Updated {formatDate(meta.updated)}</p>
      </PageHero>
      <Section>
        <LongForm toc={headings.map((h) => ({ id: h.id, label: h.text }))}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </LongForm>
      </Section>
      <CtaBanner />
    </>
  );
}
