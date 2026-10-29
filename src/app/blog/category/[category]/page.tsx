import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/cards/BlogCard";
import { blogCategories, getBlogCategory } from "@/content/navigation";
import { getPostsByCategory } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category } = await params;
  const c = getBlogCategory(category);
  if (!c) return {};
  const posts = getPostsByCategory(category);
  return buildMetadata({
    title: `${c.name} Articles`,
    description: `Articles from Lantern Global about ${c.name.toLowerCase()} for businesses working with dedicated remote professionals.`,
    path: `/blog/category/${c.slug}`,
    // Empty category pages are kept out of search results until they have content.
    noindex: posts.length === 0,
  });
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  const c = getBlogCategory(category);
  if (!c) notFound();
  const posts = getPostsByCategory(category);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Blog", path: "/blog" },
          { name: c.name, path: `/blog/category/${c.slug}` },
        ]}
        eyebrow="Blog category"
        title={c.name}
        description={`${posts.length} ${posts.length === 1 ? "article" : "articles"}`}
      >
        <nav aria-label="Other categories" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {blogCategories.map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/blog/category/${x.slug}`}
                  aria-current={x.slug === c.slug ? "page" : undefined}
                  className={
                    x.slug === c.slug
                      ? "inline-flex rounded-full bg-navy-900 px-3.5 py-1.5 text-sm font-semibold text-white"
                      : "inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-line hover:ring-brand"
                  }
                >
                  {x.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>
      <Section>
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-surface p-12 text-center">
            <p className="font-display text-lg font-bold text-ink">Articles coming soon</p>
            <p className="mt-2">We haven&apos;t published in this category yet.</p>
            <Link href="/blog" className="mt-5 inline-flex font-semibold text-brand-strong underline underline-offset-2">
              Browse all articles
            </Link>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
