import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { blogCategories } from "@/content/blog-categories";
import { photo } from "./photos";
import { renderMarkdown } from "./markdown";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const categorySlugs = blogCategories.map((c) => c.slug) as [string, ...string[]];

/** Frontmatter schema. A post that fails validation stops the build with a clear message. */
const frontmatterSchema = z.object({
  title: z.string().min(10).max(120),
  description: z.string().min(50).max(240),
  category: z.enum(categorySlugs),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  updated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  author: z.string().default("Lantern Global Editorial Team"),
  image: z.string(),
  imageAlt: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  disclaimer: z.enum(["legal", "financial", "healthcare", "general"]).optional(),
  relatedServices: z.array(z.string()).default([]),
});

export type PostMeta = z.infer<typeof frontmatterSchema> & {
  slug: string;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string; headings: { id: string; text: string }[] };

function readFiles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

function parse(file: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in content/blog/${file}: ${result.error.message}`);
  }
  photo(result.data.image); // throws if the featured image is not a licensed photo key
  const words = content.split(/\s+/).filter(Boolean).length;
  const meta: PostMeta = {
    ...result.data,
    slug: file.replace(/\.md$/, ""),
    readingMinutes: Math.max(1, Math.round(words / 230)),
  };
  return { meta, content };
}

const showDrafts = process.env.NODE_ENV === "development" && process.env.SHOW_DRAFTS === "true";

let cache: PostMeta[] | null = null;

/** Published posts, newest first. Drafts are never included in production builds. */
export function getAllPosts(): PostMeta[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const posts = readFiles()
    .map((f) => parse(f).meta)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  cache = posts;
  return posts;
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((p) => p.category === category);
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = `${slug}.md`;
  if (!readFiles().includes(file)) return null;
  const { meta, content } = parse(file);
  if (meta.draft && !showDrafts) return null;

  const { html, headings } = await renderMarkdown(content);
  return { ...meta, html, headings };
}

export function getRelatedPosts(post: PostMeta, count = 3) {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = all.filter((p) => p.category === post.category);
  const rest = all.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}

export function getPostsForDivision(divisionSlug: string, blogCategory: string, count = 3) {
  const all = getAllPosts();
  const direct = all.filter((p) => p.relatedServices.includes(divisionSlug));
  const cat = all.filter((p) => p.category === blogCategory && !direct.includes(p));
  return [...direct, ...cat].slice(0, count);
}
