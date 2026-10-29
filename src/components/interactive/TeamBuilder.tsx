"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Minus, Plus, Search, Users } from "lucide-react";
import type { CatalogItem } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const MAX = 12;

export function TeamBuilder({ items, divisions }: { items: CatalogItem[]; divisions: { value: string; label: string }[] }) {
  const params = useSearchParams();
  const [team, setTeam] = useState<string[]>(() =>
    Array.from(
      new Set(
        (params.get("add") ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter((s) => items.some((i) => i.slug === s)),
      ),
    ).slice(0, MAX),
  );
  const [q, setQ] = useState("");
  const [division, setDivision] = useState(divisions[0]?.value ?? "");


  const bySlug = useMemo(() => new Map(items.map((i) => [i.slug, i])), [items]);
  const visible = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter((i) => (t ? `${i.title} ${i.skills.join(" ")} ${i.software.join(" ")}`.toLowerCase().includes(t) : i.division === division));
  }, [items, q, division]);

  const toggle = (slug: string) =>
    setTeam((t) => (t.includes(slug) ? t.filter((s) => s !== slug) : t.length >= MAX ? t : [...t, slug]));

  const members = team.map((s) => bySlug.get(s)!).filter(Boolean);
  const divisionsUsed = new Set(members.map((m) => m.divisionName));

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div className="min-w-0">
        <div className="card p-5 sm:p-6">
          <label htmlFor="tb-q" className="field-label">
            Search roles
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input id="tb-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. bookkeeper, React, dispatch" className="field-input pl-11" />
          </div>
          {!q && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Browse by division">
              {divisions.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  aria-pressed={division === d.value}
                  onClick={() => setDivision(d.value)}
                  className={cn("shrink-0 cursor-pointer rounded-full px-3.5 py-2 text-xs font-semibold", division === d.value ? "bg-navy-900 text-white" : "bg-surface text-ink hover:bg-brand-soft")}
                >
                  {d.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2" aria-label="Available roles">
          {visible.map((i) => {
            const on = team.includes(i.slug);
            const full = !on && team.length >= MAX;
            return (
              <li key={i.slug}>
                <button
                  type="button"
                  onClick={() => toggle(i.slug)}
                  disabled={full}
                  aria-pressed={on}
                  className={cn(
                    "flex h-full w-full cursor-pointer items-start gap-3 rounded-xl p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50",
                    on ? "bg-brand-soft ring-2 ring-brand" : "bg-white ring-1 ring-line hover:ring-brand-tint hover:shadow-card",
                  )}
                >
                  <span className={cn("mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full", on ? "bg-brand text-white" : "bg-surface text-brand-strong ring-1 ring-line")}>
                    {on ? <Minus aria-hidden="true" className="h-3.5 w-3.5" /> : <Plus aria-hidden="true" className="h-3.5 w-3.5" />}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{i.title}</span>
                    {q && <span className="mt-0.5 block text-xs text-muted">{i.divisionName}</span>}
                    <span className="sr-only">{on ? "Remove from team" : "Add to team"}</span>
                  </span>
                </button>
              </li>
            );
          })}
          {visible.length === 0 && <li className="text-sm text-muted">No roles match that search.</li>}
        </ul>
      </div>

      <section aria-labelledby="tb-team" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <div className="on-dark overflow-hidden rounded-[1.75rem] bg-navy-950 text-slate-300">
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 id="tb-team" className="flex items-center gap-2 font-display text-xl font-bold text-white">
                <Users aria-hidden="true" className="h-5 w-5 text-glow" /> Your team
              </h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white" aria-live="polite">
                {members.length} {members.length === 1 ? "role" : "roles"}
                {divisionsUsed.size > 1 ? ` · ${divisionsUsed.size} divisions` : ""}
              </span>
            </div>
          </div>
          {members.length === 0 ? (
            <p className="p-6 text-sm leading-relaxed">Add roles from the list to sketch your team. You can start with one and grow from there.</p>
          ) : (
            <ol className="max-h-[32rem] space-y-3 overflow-y-auto p-6">
              {members.map((m, idx) => (
                <li key={m.slug} className="rounded-xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-glow">
                        {idx === 0 ? "Start here" : `Role ${idx + 1}`} · {m.divisionName}
                      </p>
                      <Link href={m.href} className="mt-1 block font-semibold text-white hover:underline">
                        {m.title}
                      </Link>
                    </div>
                    <button type="button" onClick={() => toggle(m.slug)} className="cursor-pointer rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white" aria-label={`Remove ${m.title}`}>
                      <Minus aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs leading-relaxed">
                    {m.responsibilities.slice(0, 3).map((r) => (
                      <li key={r}>· {r}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          )}
          <div className="space-y-3 border-t border-white/10 p-6">
            {members.length > 0 ? (
              <Link href={`/hire-a-professional?roles=${team.join(",")}`} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-white font-semibold text-navy-900 hover:bg-brand-soft">
                Send this team to us <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            ) : (
              <p className="text-center text-xs text-slate-400">Add at least one role to send your team.</p>
            )}
            <p className="text-center text-xs text-slate-400">No pricing or savings are estimated here. We&apos;ll provide a written quote after reviewing your needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
