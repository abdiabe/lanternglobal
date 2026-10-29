import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqSearch } from "@/components/interactive/FaqSearch";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { allFaqs, faqCategories } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about qualifications, dedicated staffing, working hours, pricing, security, recruitment, and careers at Lantern Global.",
  path: "/faq",
});

// FAQPage rich results are limited by Google to authoritative government and health sites,
// so no FAQ structured data is emitted here. See docs/SEO-PLAN.md.
export default function FaqPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
        eyebrow="Frequently asked questions"
        title="Answers to Common Questions"
        description={`${allFaqs.length} answers about qualifications, dedicated staffing, working hours, pricing, security, recruitment, and careers.`}
      />
      <Section>
        <FaqSearch categories={faqCategories} />
      </Section>
      <CtaBanner title="Still Have Questions?" description="We're happy to talk through your situation and answer anything not covered here." primaryLabel="Contact Us" primaryHref="/contact" />
    </>
  );
}
