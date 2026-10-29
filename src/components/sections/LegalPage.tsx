import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { LegalReviewBanner, LongForm } from "@/components/sections/LongForm";
import { loadGuide } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

export async function LegalPage({ slug, path }: { slug: string; path: string }) {
  const { meta, html, headings } = await loadGuide(slug, "legal");
  return (
    <>
      <PageHero breadcrumbs={[{ name: meta.title, path }]} eyebrow="Legal" title={meta.title} description={meta.description}>
        <p className="mt-6 text-sm text-muted">Last updated {formatDate(meta.updated)}</p>
      </PageHero>
      <Section>
        <LongForm toc={headings.map((h) => ({ id: h.id, label: h.text }))}>
          <LegalReviewBanner />
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </LongForm>
      </Section>
    </>
  );
}
