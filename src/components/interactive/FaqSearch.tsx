"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FaqAccordion } from "@/components/ui/Accordion";
import type { FaqCategory } from "@/content/faqs";
import { cn } from "@/lib/utils";

export function FaqSearch({ categories }: { categories: FaqCategory[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return categories
      .filter((c) => cat === "all" || c.slug === cat)
      .map((c) => ({
        ...c,
        items: c.items.filter((it) => {
          if (!terms.length) return true;
          const hay = `${it.q} ${it.a}`.toLowerCase();
          return terms.every((t) => hay.includes(t));
        }),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, q, cat]);

  const total = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
      <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <label htmlFor="faq-q" className="field-label">
          Search questions
        </label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input id="faq-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. hours, degree" className="field-input pl-11" />
        </div>
        <nav aria-label="FAQ categories" className="mt-6">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
            {[{ slug: "all", name: "All categories" }, ...categories].map((c) => (
              <li key={c.slug} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setCat(c.slug)}
                  aria-pressed={cat === c.slug}
                  className={cn(
                    "w-full cursor-pointer rounded-full px-4 py-2 text-left text-sm font-medium transition-colors lg:rounded-lg",
                    cat === c.slug ? "bg-navy-900 text-white" : "bg-surface text-ink hover:bg-brand-soft lg:bg-transparent",
                  )}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="min-w-0">
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {total} {total === 1 ? "question" : "questions"}
        </p>
        {filtered.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-surface p-10 text-center">
            No questions match your search. Try another word, or <Link href="/contact" className="font-semibold text-brand-strong underline">ask us directly</Link>.
          </p>
        ) : (
          <div className="mt-4 space-y-10">
            {filtered.map((c) => (
              <section key={c.slug} aria-labelledby={`faq-${c.slug}`}>
                <h2 id={`faq-${c.slug}`} className="text-h3">
                  {c.name}
                </h2>
                <FaqAccordion items={c.items} className="mt-4" />
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
