"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GraduationCap, RotateCcw, Search, SearchX } from "lucide-react";
import type { CatalogItem } from "@/lib/catalog";

interface Facets {
  divisions: { value: string; label: string }[];
  industries: { value: string; label: string }[];
  degreeFields: string[];
  software: string[];
}

const norm = (s: string) => s.toLowerCase().normalize("NFKD");

export function ServiceDirectory({ items, facets }: { items: CatalogItem[]; facets: Facets }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [q, setQ] = useState(params.get("q") ?? "");
  const [division, setDivision] = useState(params.get("division") ?? "");
  const [industry, setIndustry] = useState(params.get("industry") ?? "");
  const [degree, setDegree] = useState(params.get("degree") ?? "");
  const [software, setSoftware] = useState(params.get("software") ?? "");

  // Keep the URL shareable without adding history entries on every keystroke.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const sp = new URLSearchParams();
      if (q) sp.set("q", q);
      if (division) sp.set("division", division);
      if (industry) sp.set("industry", industry);
      if (degree) sp.set("degree", degree);
      if (software) sp.set("software", software);
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 300);
    return () => window.clearTimeout(t);
  }, [q, division, industry, degree, software, pathname, router]);

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    const sw = norm(software.trim());
    return items.filter((it) => {
      if (division && it.division !== division) return false;
      if (industry && !it.industries.includes(industry)) return false;
      if (degree && !it.degreeFields.includes(degree)) return false;
      if (sw && !it.software.some((s) => norm(s).includes(sw))) return false;
      if (terms.length) {
        const hay = norm([it.title, it.summary, it.divisionName, ...it.skills, ...it.software, ...it.keywords, ...it.degrees].join(" "));
        return terms.every((t) => hay.includes(t));
      }
      return true;
    });
  }, [items, q, division, industry, degree, software]);

  const active = Boolean(q || division || industry || degree || software);
  const reset = () => {
    setQ("");
    setDivision("");
    setIndustry("");
    setDegree("");
    setSoftware("");
  };

  return (
    <div>
      <form role="search" aria-label="Filter specialties" onSubmit={(e) => e.preventDefault()} className="card grid gap-4 p-5 sm:p-6 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <label htmlFor="dir-q" className="field-label">
            Search by role, skill, or keyword
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              id="dir-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. QuickBooks, React, prior authorization, takeoffs"
              className="field-input pl-11"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="lg:col-span-3">
          <label htmlFor="dir-division" className="field-label">
            Division
          </label>
          <select id="dir-division" value={division} onChange={(e) => setDivision(e.target.value)} className="field-input">
            <option value="">All divisions</option>
            {facets.divisions.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-3">
          <label htmlFor="dir-industry" className="field-label">
            Industry
          </label>
          <select id="dir-industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="field-input">
            <option value="">All industries</option>
            {facets.industries.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-3">
          <label htmlFor="dir-degree" className="field-label">
            Degree background
          </label>
          <select id="dir-degree" value={degree} onChange={(e) => setDegree(e.target.value)} className="field-input">
            <option value="">Any degree field</option>
            {facets.degreeFields.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-3">
          <label htmlFor="dir-software" className="field-label">
            Software expertise
          </label>
          <input
            id="dir-software"
            list="dir-software-list"
            value={software}
            onChange={(e) => setSoftware(e.target.value)}
            placeholder="e.g. Salesforce"
            className="field-input"
            autoComplete="off"
          />
          <datalist id="dir-software-list">
            {facets.software.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>
      </form>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink" aria-live="polite" role="status">
          {results.length} {results.length === 1 ? "specialty" : "specialties"} {active ? "match your filters" : "available"}
        </p>
        {active && (
          <button type="button" onClick={reset} className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-brand-strong hover:bg-brand-soft">
            <RotateCcw aria-hidden="true" className="h-4 w-4" /> Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-surface px-6 py-16 text-center">
          <SearchX aria-hidden="true" className="h-8 w-8 text-muted" />
          <p className="mt-4 font-display text-lg font-bold text-ink">No specialties match those filters</p>
          <p className="mt-2 max-w-md text-sm">
            Try a broader keyword or clear a filter. If the role you need is not listed, describe it in an inquiry and we will tell you
            whether we can help.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-line hover:bg-surface">
              Clear filters
            </button>
            <Link href="/hire-a-professional" className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-strong">
              Describe your role
            </Link>
          </div>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((it) => (
            <li key={it.href} className="min-w-0">
              <article className="card card-interactive group relative flex h-full flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-strong">{it.divisionName}</p>
                <h2 className="mt-2 text-base font-bold leading-snug">
                  <Link href={it.href} className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">
                    {it.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed">{it.summary}</p>
                <p className="mt-auto flex items-start gap-2 pt-4 text-xs text-muted">
                  <GraduationCap aria-hidden="true" className="mt-px h-4 w-4 shrink-0 text-brand" />
                  {it.degrees.slice(0, 3).join(", ")}
                </p>
                <p className="mt-2 line-clamp-1 text-xs text-muted">{it.software.slice(0, 4).join(" · ")}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
