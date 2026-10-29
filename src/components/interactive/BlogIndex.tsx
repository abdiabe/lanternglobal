"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { BlogCard, type BlogCardData } from "@/components/cards/BlogCard";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

export function BlogIndex({ posts, categories }: { posts: BlogCardData[]; categories: { slug: string; name: string }[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (!terms.length) return true;
      const hay = `${p.title} ${p.description}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [posts, q, cat]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const usedCats = categories.filter((c) => posts.some((p) => p.category === c.slug));

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full max-w-md">
          <label htmlFor="blog-q" className="field-label">
            Search articles
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              id="blog-q"
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search by keyword"
              className="field-input pl-11"
            />
          </div>
        </div>
        <div role="group" aria-label="Filter by category" className="flex gap-2 overflow-x-auto pb-1">
          {[{ slug: "all", name: "All" }, ...usedCats].map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={cat === c.slug}
              onClick={() => {
                setCat(c.slug);
                setPage(1);
              }}
              className={cn(
                "shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                cat === c.slug ? "bg-navy-900 text-white" : "bg-white text-ink ring-1 ring-line hover:bg-surface",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
      </p>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-surface p-10 text-center">No articles match your search.</p>
      ) : (
        <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      )}

      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage(current - 1)}
            disabled={current === 1}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-line hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === current ? "page" : undefined}
              className={cn("h-11 min-w-11 cursor-pointer rounded-full px-3 text-sm font-semibold", n === current ? "bg-navy-900 text-white" : "ring-1 ring-line hover:bg-surface")}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(current + 1)}
            disabled={current === pages}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-line hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </nav>
      )}
    </div>
  );
}
