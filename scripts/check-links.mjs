#!/usr/bin/env node
/**
 * Crawls a running site starting from the homepage and sitemap, following
 * every internal link. Reports broken pages, broken assets, duplicate titles,
 * missing meta descriptions, missing h1s, and multiple h1s.
 *
 * Usage: BASE_URL=http://localhost:3000 node scripts/check-links.mjs
 */
const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const SITE_ORIGIN = process.env.SITE_ORIGIN || "https://www.lanternglobal.com";

const seen = new Map(); // path -> status
const queue = ["/"];
const titles = new Map();
const problems = [];
const assets = new Set();

const toPath = (href, from) => {
  try {
    const u = new URL(href, BASE + from);
    if (u.origin !== new URL(BASE).origin && u.origin !== SITE_ORIGIN) return null;
    return u.pathname + (u.search || "");
  } catch {
    return null;
  }
};

async function sitemapPaths() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

for (const p of await sitemapPaths()) queue.push(p);

while (queue.length) {
  const path = queue.shift();
  const clean = path.split("#")[0];
  if (seen.has(clean) || clean.startsWith("/api/")) continue;
  const res = await fetch(BASE + clean, { redirect: "manual" });
  seen.set(clean, res.status);
  if (res.status >= 400) {
    problems.push(`HTTP ${res.status}: ${clean}`);
    continue;
  }
  const type = res.headers.get("content-type") || "";
  if (!type.includes("text/html")) continue;
  const html = await res.text();

  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  if (!title) problems.push(`Missing <title>: ${clean}`);
  else if (titles.has(title) && !clean.includes("?")) problems.push(`Duplicate title "${title}": ${clean} and ${titles.get(title)}`);
  else titles.set(title, clean);
  if (!/<meta name="description" content="[^"]{30,}"/.test(html)) problems.push(`Missing/short meta description: ${clean}`);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${h1s} <h1> elements: ${clean}`);
  if (!/<link rel="canonical"/.test(html) && !clean.includes("?")) problems.push(`Missing canonical: ${clean}`);

  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = m[1];
    if (/^(mailto:|tel:|https?:\/\/(?!www\.lanternglobal\.com))/.test(href) && !href.startsWith(BASE)) continue;
    const p = toPath(href.replace(/&amp;/g, "&"), clean);
    if (p && !seen.has(p.split("#")[0])) queue.push(p);
  }
  for (const m of html.matchAll(/(?:src|href)="(\/(?:_next\/static|images|brand)[^"]+)"/g)) assets.add(m[1].replace(/&amp;/g, "&"));
  for (const m of html.matchAll(/srcSet="([^"]+)"/gi)) for (const part of m[1].split(",")) assets.add(part.trim().split(" ")[0].replace(/&amp;/g, "&"));
}

let assetFailures = 0;
for (const a of assets) {
  if (!a.startsWith("/")) continue;
  const res = await fetch(BASE + a, { method: "GET" });
  if (res.status >= 400) {
    assetFailures++;
    problems.push(`Asset HTTP ${res.status}: ${a}`);
  }
}

console.log(`Pages checked: ${seen.size}`);
console.log(`Assets checked: ${assets.size} (${assetFailures} failed)`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(` - ${p}`);
  process.exit(1);
}
console.log("No problems found.");
