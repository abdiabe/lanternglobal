"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IndustryTabData {
  slug: string;
  name: string;
  headline: string;
  team: { title: string; href: string; focus: string; summary: string }[];
}

/** Accessible tabs (WAI-ARIA tabs pattern) showing how several professionals can support one business. */
export function IndustryTabs({ data }: { data: IndustryTabData[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % data.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + data.length) % data.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = data.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const current = data[active];

  return (
    <div>
      <div role="tablist" aria-label="Example industries" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {data.map((d, i) => (
          <button
            key={d.slug}
            ref={(el) => {
              tabsRef.current[i] = el;
            }}
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "shrink-0 cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
              active === i ? "bg-navy-900 text-white shadow-card" : "bg-white text-ink ring-1 ring-line hover:bg-surface",
            )}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${active}`}
        tabIndex={0}
        key={current.slug}
        className="animate-menu-in mt-6 rounded-[1.75rem] border border-line bg-white p-6 shadow-card sm:p-8"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-strong">Example team · {current.name}</p>
            <p className="mt-2 max-w-xl font-display text-xl font-bold text-ink">{current.headline}</p>
          </div>
          <Link href={`/industries/${current.slug}`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline">
            {current.name} details <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {current.team.map((m, i) => (
            <li key={m.href} className="relative flex flex-col rounded-2xl bg-surface p-5 ring-1 ring-line">
              <span className="font-display text-xs font-bold text-brand tabular-nums">0{i + 1}</span>
              <Link href={m.href} className="mt-2 font-semibold leading-snug text-ink hover:text-brand-strong">
                {m.title}
              </Link>
              <p className="mt-1 text-sm font-medium text-brand-strong">{m.focus}</p>
              <p className="mt-2 text-sm leading-relaxed">{m.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
