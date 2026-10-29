import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/cards/BlogCard";
import { BlogIndex } from "@/components/interactive/BlogIndex";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { blogCategories } from "@/content/navigation";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog: Remote Staffing, Outsourcing, and Operations",
  description:
    "Practical articles on hiring dedicated remote professionals, outsourcing strategy, operations, and working with talent in the Philippines.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Blog", path: "/blog" }]}
        eyebrow="Blog"
        title="Insights for Building a Remote Team"
        description="Practical guidance on hiring, onboarding, and working with dedicated remote professionals."
      >
        <nav aria-label="Blog categories" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {blogCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/blog/category/${c.slug}`} className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-line hover:ring-brand">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {featured && (
        <Section size="sm" labelledBy="featured-heading">
          <h2 id="featured-heading" className="sr-only">
            Featured article
          </h2>
          <BlogCard post={featured} featured priority />
        </Section>
      )}

      <Section tone="surface" labelledBy="all-heading">
        <h2 id="all-heading" className="text-h3 mb-8">
          All articles
        </h2>
        <BlogIndex posts={rest} categories={[...blogCategories]} />
      </Section>

      <CtaBanner title="Ready to Put These Ideas Into Practice?" description="Tell us about the work you want to delegate. We'll help you define the role and find the right professional." />
    </>
  );
}
