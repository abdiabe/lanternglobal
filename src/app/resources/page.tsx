import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, FileQuestion, Newspaper, UsersRound, Wand2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BlogCard } from "@/components/cards/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resources",
  description: "Guides, articles, FAQs, and interactive tools for businesses building dedicated remote teams.",
  path: "/resources",
});

const items = [
  { icon: BookOpen, title: "Hiring Guide", body: "Define, evaluate, and onboard a remote professional step by step.", href: "/resources/hiring-guide" },
  { icon: Compass, title: "Outsourcing Guide", body: "Decide what to outsource, compare models, and manage risk.", href: "/resources/outsourcing-guide" },
  { icon: Newspaper, title: "Blog", body: "Practical articles on staffing, operations, and growth.", href: "/blog" },
  { icon: FileQuestion, title: "FAQs", body: "Straight answers about qualifications, hours, pricing, and security.", href: "/faq" },
  { icon: Wand2, title: "Specialty Finder", body: "Match your challenges to the right professional specialties.", href: "/specialty-finder" },
  { icon: UsersRound, title: "Team Builder", body: "Sketch a team across specialties and send it to us.", href: "/team-builder" },
];

export default function ResourcesPage() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Resources", path: "/resources" }]}
        eyebrow="Resources"
        title="Guidance for Building a Remote Team"
        description="Practical guides, articles, and tools to help you plan, hire, and work with dedicated professionals."
      />
      <Section>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: I, title, body, href }) => (
            <li key={href}>
              <Link href={href} className="card card-interactive group flex h-full flex-col p-6">
                <I aria-hidden="true" className="h-6 w-6 text-brand" />
                <span className="mt-4 text-lg font-bold text-ink">{title}</span>
                <span className="mt-1.5 text-sm leading-relaxed">{body}</span>
                <ArrowRight aria-hidden="true" className="mt-auto h-4 w-4 translate-y-3 text-brand transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      {posts.length > 0 && (
        <Section tone="surface" labelledBy="latest-heading">
          <SectionHeading id="latest-heading" eyebrow="Latest articles" title="From the Blog" />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
