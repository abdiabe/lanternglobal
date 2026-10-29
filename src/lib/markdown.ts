import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

/** Markdown to HTML for trusted, repository-owned content only (blog posts, guides). */
export async function renderMarkdown(content: string) {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify)
    .process(content);
  const raw = String(processed);
  const headings = Array.from(raw.matchAll(/<h2 id="([^"]+)"><a[^>]*>(.*?)<\/a><\/h2>/g)).map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, "").replace(/&#x26;/g, "&").replace(/&amp;/g, "&"),
  }));
  const html = raw.replace(/<table>/g, '<div class="overflow-x-auto"><table>').replace(/<\/table>/g, "</table></div>");
  return { html, headings };
}

export async function loadGuide(slug: string, dir: "guides" | "legal" = "guides") {
  const file = path.join(process.cwd(), "content", dir, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const { html, headings } = await renderMarkdown(content);
  return { meta: data as { title: string; description: string; updated: string }, html, headings };
}
