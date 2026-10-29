import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Info } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BlogCard } from "@/components/cards/BlogCard";
import { ShareButtons } from "@/components/interactive/ShareButtons";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { getBlogCategory } from "@/content/blog-categories";
import { getDivision } from "@/content/divisions";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { photo } from "@/lib/photos";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: photo(post.image).src,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
}

const disclaimers: Record<string, string> = {
  legal: "This article is general information, not legal advice. Consult a licensed attorney about your situation.",
  financial: "This article is general information, not financial, tax, or accounting advice. Consult a qualified professional.",
  healthcare: "This article is general information, not medical or compliance advice. Consult qualified professionals about your obligations.",
  general: "This article is general information, not legal or professional advice. Requirements vary by situation.",
};

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const cat = getBlogCategory(post.category);
  const related = getRelatedPosts(post, 3);
  const service = post.relatedServices.map(getDivision).find(Boolean);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const img = photo(post.image);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [absoluteUrl(img.src)],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: url,
  };

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-surface">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="container-page relative py-10 sm:py-14">
            <Breadcrumbs
              className="mb-8"
              items={[
                { name: "Blog", path: "/blog" },
                ...(cat ? [{ name: cat.name, path: `/blog/category/${cat.slug}` }] : []),
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
            />
            <div className="mx-auto max-w-3xl text-center">
              {cat && (
                <Link href={`/blog/category/${cat.slug}`} className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-strong ring-1 ring-brand-tint">
                  {cat.name}
                </Link>
              )}
              <h1 className="mt-5 text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] font-extrabold leading-[1.1]">{post.title}</h1>
              <p className="text-lead mt-5">{post.description}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
                <span>{post.author}</span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays aria-hidden="true" className="h-4 w-4" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                {post.updated && post.updated !== post.date && (
                  <span>
                    Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="h-4 w-4" /> {post.readingMinutes} min read
                </span>
              </div>
            </div>
            <div className="relative mx-auto mt-10 aspect-[16/8] max-w-5xl overflow-hidden rounded-[1.75rem] shadow-lift">
              <Photo id={post.image} alt={post.imageAlt} priority sizes="(min-width: 1024px) 64rem, 100vw" />
            </div>
          </div>
        </header>

        <div className="container-page py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_16rem]">
            <div className="min-w-0">
              {post.headings.length >= 3 && (
                <details className="mb-10 rounded-2xl bg-surface p-5 ring-1 ring-line lg:hidden">
                  <summary className="cursor-pointer font-semibold text-ink">Table of contents</summary>
                  <ol className="mt-3 space-y-2 text-sm">
                    {post.headings.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="text-brand-strong hover:underline">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}
              <div className="prose prose-article max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
              {post.disclaimer && (
                <p className="mt-10 flex gap-3 rounded-xl bg-surface p-4 text-sm text-body ring-1 ring-line">
                  <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {disclaimers[post.disclaimer]}
                </p>
              )}
              <div className="mt-10 border-t border-line pt-8">
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {post.headings.length >= 3 && (
                  <nav aria-label="Table of contents">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">In this article</p>
                    <ol className="mt-4 space-y-1 border-l border-line">
                      {post.headings.map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-body hover:border-brand hover:text-brand-strong">
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                {service && (
                  <div className="rounded-2xl bg-navy-950 p-5 text-sm text-slate-300">
                    <p className="font-display font-bold text-white">{service.shortName} professionals</p>
                    <p className="mt-1.5 leading-relaxed">{service.description}</p>
                    <Link href={`/services/${service.slug}`} className="mt-3 inline-flex font-semibold text-glow hover:underline">
                      Explore the service
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <Section tone="surface" labelledBy="related-heading">
          <SectionHeading id="related-heading" eyebrow="Keep reading" title="Related Articles" />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBanner
        title={service ? `Need a Dedicated ${service.shortName} Professional?` : undefined}
        primaryHref={service ? `/hire-a-professional?division=${service.slug}` : undefined}
      />
      <JsonLd data={jsonLd} />
    </>
  );
}
