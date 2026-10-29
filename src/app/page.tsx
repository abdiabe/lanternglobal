import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustStrip, DegreeAdvantage, HowItWorksPreview, Comparison, TeamScaling } from "@/components/home/Sections";
import { IndustryTabs, type IndustryTabData } from "@/components/home/IndustryTabs";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { DivisionCard, IndustryCard } from "@/components/cards/Cards";
import { BlogCard } from "@/components/cards/BlogCard";
import { FaqAccordion } from "@/components/ui/Accordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { divisions, getSpecialtyBySlug, specialtyCount } from "@/content/divisions";
import { featuredIndustries, getIndustry } from "@/content/industries";
import { homeFaqs } from "@/content/faqs";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Dedicated, University-Educated Professionals from the Philippines",
    description:
      "Lantern Global is a U.S.-based staffing partner connecting American businesses with dedicated, degree-holding professionals in the Philippines across 12 specialties.",
    path: "/",
  }),
  title: { absolute: "Lantern Global | Dedicated, University-Educated Professionals from the Philippines" },
};

function tabData(): IndustryTabData[] {
  return ["property-management", "construction-and-trades", "healthcare-organizations", "technology-companies"].map((slug) => {
    const ind = getIndustry(slug)!;
    return {
      slug,
      name: ind.name,
      headline: ind.headline,
      team: ind.exampleTeam.map((m) => {
        const s = getSpecialtyBySlug(m.role)!;
        return { title: s.title, href: s.href, focus: m.focus, summary: s.summary };
      }),
    };
  });
}

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <TrustStrip />

      <Section labelledBy="specialties-heading">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="specialties-heading"
            eyebrow="Our professional specialties"
            title="Specialized Talent for Every Part of Your Business"
            description="Explore a broad range of professional services designed to support your daily operations, strengthen your capabilities, and help your company grow."
          />
          <TextLink href="/services/directory" className="shrink-0">
            Search all {specialtyCount} specialties
          </TextLink>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {divisions.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 4) * 60}>
              <DivisionCard division={d} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <DegreeAdvantage />
      <HowItWorksPreview />

      <Section tone="surface" labelledBy="industries-heading">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="industries-heading"
            eyebrow="Featured industries"
            title="Support Shaped Around How Your Industry Works"
            description="Every industry has its own systems, rhythms, and rules. Our industry pages explain the real operational challenges and the professionals who help."
          />
          <TextLink href="/industries" className="shrink-0">
            All 12 industries
          </TextLink>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredIndustries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={(i % 3) * 70}>
              <IndustryCard industry={ind} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Comparison />
      <TeamScaling />

      <Section tone="brand-soft" labelledBy="capabilities-heading">
        <SectionHeading
          id="capabilities-heading"
          eyebrow="Industries and capabilities"
          title="Several Specialists. One Business. Working Together."
          description="See how dedicated professionals in different specialties can support a single company. Each team is illustrative; yours is built around your needs."
        />
        <div className="mt-10">
          <IndustryTabs data={tabData()} />
        </div>
      </Section>

      <Section labelledBy="faq-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="faq-heading"
              eyebrow="Frequently asked questions"
              title="Clear Answers Before You Commit"
              description="Straight answers about qualifications, schedules, management, and pricing."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/faq" variant="secondary" arrow>
                All FAQs
              </ButtonLink>
            </div>
          </div>
          <FaqAccordion items={homeFaqs} />
        </div>
      </Section>

      {posts.length > 0 && (
        <Section tone="surface" labelledBy="blog-heading">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              id="blog-heading"
              eyebrow="From the blog"
              title="Practical Guidance for Building a Remote Team"
            />
            <TextLink href="/blog" className="shrink-0">
              Read the blog
            </TextLink>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 80}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
