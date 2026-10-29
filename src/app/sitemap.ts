import type { MetadataRoute } from "next";
import { divisions, specialties } from "@/content/divisions";
import { industries } from "@/content/industries";
import { jobs } from "@/content/jobs";
import { blogCategories } from "@/content/blog-categories";
import { getAllPosts, getPostsByCategory } from "@/lib/blog";
import { absoluteUrl } from "@/lib/utils";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const launch = site.launchDate;
  const page = (path: string, priority = 0.6, lastModified: string = launch): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified,
    priority,
  });

  const staticPages = [
    page("/", 1),
    page("/services", 0.9),
    page("/services/directory", 0.8),
    page("/industries", 0.8),
    page("/how-it-works", 0.8),
    page("/why-choose-us", 0.8),
    page("/why-choose-us/education-and-qualifications", 0.8),
    page("/about", 0.7),
    page("/pricing", 0.7),
    page("/security", 0.6),
    page("/hire-a-professional", 0.9),
    page("/specialty-finder", 0.6),
    page("/team-builder", 0.6),
    page("/contact", 0.7),
    page("/faq", 0.6),
    page("/resources", 0.5),
    page("/resources/hiring-guide", 0.6),
    page("/resources/outsourcing-guide", 0.6),
    page("/blog", 0.7),
    page("/careers", 0.7),
    page("/careers/open-positions", 0.6),
    page("/careers/apply", 0.5),
    page("/privacy", 0.2),
    page("/terms", 0.2),
    page("/cookies", 0.2),
  ];

  return [
    ...staticPages,
    ...divisions.map((d) => page(`/services/${d.slug}`, 0.8)),
    ...specialties.map((s) => page(s.href, 0.6)),
    ...industries.map((i) => page(`/industries/${i.slug}`, 0.7)),
    ...getAllPosts().map((p) => page(`/blog/${p.slug}`, 0.6, p.updated ?? p.date)),
    // Only categories with published posts; empty ones are noindexed.
    ...blogCategories.filter((c) => getPostsByCategory(c.slug).length > 0).map((c) => page(`/blog/category/${c.slug}`, 0.4)),
    ...jobs.map((j) => page(`/careers/${j.slug}`, 0.6, j.datePosted)),
  ];
}
