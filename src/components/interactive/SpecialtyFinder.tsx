"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import type { CatalogItem } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const CHALLENGES = [
  { id: "admin", label: "Inbox, calendar, and admin overload", divisions: ["virtual-assistance-and-administration"], keywords: ["calendar", "inbox", "scheduling", "document"] },
  { id: "books", label: "Bookkeeping and financial reporting", divisions: ["accounting-and-finance"], keywords: ["reconciliations", "invoices", "reporting"] },
  { id: "leads", label: "Not enough leads or sales follow-up", divisions: ["sales-and-marketing"], keywords: ["prospecting", "lead", "appointment"] },
  { id: "marketing", label: "Marketing campaigns and content", divisions: ["sales-and-marketing", "creative-and-design"], keywords: ["campaign", "content", "seo", "social"] },
  { id: "support", label: "Customer support volume", divisions: ["ecommerce-and-customer-experience"], keywords: ["support", "tickets", "customer"] },
  { id: "dev", label: "Software development or QA backlog", divisions: ["technology-and-it"], keywords: ["react", "api", "testing", "developer"] },
  { id: "it", label: "IT support and systems administration", divisions: ["technology-and-it"], keywords: ["help desk", "troubleshooting", "cloud", "user administration"] },
  { id: "construction", label: "Estimating, drafting, or project paperwork", divisions: ["engineering-and-construction"], keywords: ["takeoff", "cad", "rfi", "submittals"] },
  { id: "ops", label: "Scheduling, dispatch, or vendor coordination", divisions: ["business-operations"], keywords: ["dispatch", "vendor", "work order", "scheduling"] },
  { id: "hiring", label: "Hiring and onboarding workload", divisions: ["human-resources-and-recruiting"], keywords: ["sourcing", "interview", "onboarding"] },
  { id: "data", label: "Reporting, dashboards, and data", divisions: ["data-and-analytics"], keywords: ["dashboards", "sql", "reporting", "power bi"] },
  { id: "legal", label: "Legal intake and case administration", divisions: ["legal-support"], keywords: ["intake", "case", "contract", "billing"] },
  { id: "health", label: "Patient scheduling, billing, or authorizations", divisions: ["healthcare-administration"], keywords: ["patient", "claims", "authorization", "eligibility"] },
] as const;

const WORK_TYPES = [
  { id: "coordination", label: "Administrative and coordination", divisions: ["virtual-assistance-and-administration", "business-operations"] },
  { id: "customer", label: "Customer-facing", divisions: ["ecommerce-and-customer-experience", "sales-and-marketing"] },
  { id: "finance", label: "Financial", divisions: ["accounting-and-finance"] },
  { id: "technical", label: "Technical or engineering", divisions: ["technology-and-it", "data-and-analytics", "engineering-and-construction"] },
  { id: "creative", label: "Creative and content", divisions: ["creative-and-design"] },
  { id: "regulated", label: "Legal or healthcare support", divisions: ["legal-support", "healthcare-administration"] },
  { id: "people", label: "People and recruiting", divisions: ["human-resources-and-recruiting"] },
  { id: "unsure", label: "Not sure", divisions: [] as string[] },
] as const;

const LEVELS = ["Entry level", "Mid-level", "Senior", "Not sure"] as const;

interface Result {
  item: CatalogItem;
  score: number;
  reasons: string[];
}

export function SpecialtyFinder({ items, industries }: { items: CatalogItem[]; industries: { value: string; label: string }[] }) {
  const [industry, setIndustry] = useState("");
  const [challenges, setChallenges] = useState<string[]>([]);
  const [workType, setWorkType] = useState("");
  const [skills, setSkills] = useState("");
  const [level, setLevel] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) => setChallenges((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const results = useMemo<Result[]>(() => {
    const ch = CHALLENGES.filter((c) => challenges.includes(c.id));
    const wt = WORK_TYPES.find((w) => w.id === workType);
    const terms = skills
      .toLowerCase()
      .split(/[,;\n]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 1);
    const indLabel = industries.find((i) => i.value === industry)?.label;

    return items
      .map((item) => {
        let score = 0;
        const reasons: string[] = [];
        const hay = [item.title, item.summary, ...item.skills, ...item.software, ...item.keywords, ...item.responsibilities].join(" ").toLowerCase();

        if (industry && item.industries.includes(industry)) {
          score += 3;
          reasons.push(`Common in ${indLabel}`);
        }
        for (const c of ch) {
          if ((c.divisions as readonly string[]).includes(item.division)) {
            score += 3;
            const kw = c.keywords.filter((k) => hay.includes(k));
            score += Math.min(kw.length, 2);
            if (!reasons.some((r) => r.startsWith("Addresses"))) reasons.push(`Addresses: ${c.label.toLowerCase()}`);
          }
        }
        if (wt && (wt.divisions as readonly string[]).includes(item.division)) {
          score += 2;
          reasons.push(`${wt.label} work`);
        }
        const matched = terms.filter((t) => hay.includes(t));
        if (matched.length) {
          score += matched.length * 3;
          reasons.push(`Matches ${matched.slice(0, 3).join(", ")}`);
        }
        if (level === "Entry level" && item.experience && /expected|two or more|typically/i.test(item.experience)) score -= 2;
        return { item, score, reasons };
      })
      .filter((r) => r.score >= 3)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 8);
  }, [items, industries, industry, challenges, workType, skills, level]);

  const canSubmit = Boolean(industry || challenges.length || workType || skills.trim());

  const reset = () => {
    setIndustry("");
    setChallenges([]);
    setWorkType("");
    setSkills("");
    setLevel("");
    setSubmitted(false);
    setPicked([]);
  };

  const selectedRoles = picked.length ? picked : results.slice(0, 3).map((r) => r.item.slug);
  const hireHref = `/hire-a-professional?roles=${selectedRoles.join(",")}${industry ? `&industry=${industry}` : ""}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          document.getElementById("finder-results")?.focus();
        }}
        className="card space-y-8 p-6 sm:p-8"
        aria-label="Describe your needs"
      >
        <div>
          <label htmlFor="sf-industry" className="field-label">
            1. Your industry
          </label>
          <select id="sf-industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="field-input">
            <option value="">Select your industry</option>
            {industries.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </div>

        <fieldset>
          <legend className="field-label">2. Business challenges (choose any)</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {CHALLENGES.map((c) => {
              const on = challenges.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(c.id)}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    on ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-slate-300 hover:ring-brand",
                  )}
                >
                  {on && <Check aria-hidden="true" className="h-3.5 w-3.5" />}
                  {c.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="field-label">3. Type of work</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {WORK_TYPES.map((w) => (
              <label
                key={w.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition-colors",
                  workType === w.id ? "border-brand bg-brand-soft ring-1 ring-brand" : "border-slate-300 hover:border-slate-400",
                )}
              >
                <input type="radio" name="workType" value={w.id} checked={workType === w.id} onChange={() => setWorkType(w.id)} className="h-4 w-4 accent-[var(--color-brand)]" />
                <span className="font-medium text-ink">{w.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="sf-skills" className="field-label">
            4. Required skills or software
          </label>
          <input id="sf-skills" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. QuickBooks, AppFolio, React" className="field-input" aria-describedby="sf-skills-help" />
          <p id="sf-skills-help" className="field-help">
            Separate items with commas.
          </p>
        </div>

        <fieldset>
          <legend className="field-label">5. Preferred experience</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <label key={l} className={cn("cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1", level === l ? "bg-navy-900 text-white ring-navy-900" : "bg-white text-ink ring-slate-300 hover:ring-slate-400")}>
                <input type="radio" name="level" value={l} checked={level === l} onChange={() => setLevel(l)} className="sr-only" />
                {l}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap gap-3 border-t border-line pt-6">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex min-h-[3.25rem] cursor-pointer items-center gap-2 rounded-full bg-brand px-7 font-semibold text-white hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles aria-hidden="true" className="h-4 w-4" /> Show recommended specialties
          </button>
          <button type="button" onClick={reset} className="inline-flex min-h-[3.25rem] cursor-pointer items-center gap-2 rounded-full px-5 font-semibold text-ink ring-1 ring-line hover:bg-surface">
            <RotateCcw aria-hidden="true" className="h-4 w-4" /> Reset
          </button>
        </div>
      </form>

      <section id="finder-results" tabIndex={-1} aria-live="polite" aria-labelledby="finder-results-heading" className="outline-none lg:sticky lg:top-28 lg:self-start">
        <h2 id="finder-results-heading" className="text-h3">
          {submitted ? "Recommended specialties" : "Your recommendations will appear here"}
        </h2>
        {!submitted ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-surface p-8 text-sm leading-relaxed">
            Answer any of the questions and select <strong>Show recommended specialties</strong>. Recommendations come directly from our
            catalog of specialties and their documented skills, software, and industries.
          </div>
        ) : results.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-surface p-8 text-sm leading-relaxed">
            We couldn&apos;t match those answers to a specialty. Try choosing a business challenge or a different skill, or{" "}
            <Link href="/hire-a-professional" className="font-semibold text-brand-strong underline">
              describe your needs to us
            </Link>
            .
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm text-muted">Select the roles you want to discuss, then send them to us.</p>
            <ul className="mt-5 space-y-3">
              {results.map(({ item, reasons }) => {
                const on = picked.includes(item.slug);
                return (
                  <li key={item.slug} className={cn("rounded-2xl bg-white p-5 ring-1 transition-shadow", on ? "shadow-card ring-brand" : "ring-line")}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-brand-strong">{item.divisionName}</p>
                        <Link href={item.href} className="mt-1 block font-bold text-ink hover:text-brand-strong">
                          {item.title}
                        </Link>
                      </div>
                      <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-sm font-medium text-ink">
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => setPicked((p) => (on ? p.filter((x) => x !== item.slug) : [...p, item.slug]))}
                          className="h-4 w-4 accent-[var(--color-brand)]"
                        />
                        Select
                      </label>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{item.summary}</p>
                    {reasons.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {reasons.map((r) => (
                          <li key={r} className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand-strong">
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={hireHref} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand-strong">
                {picked.length ? `Discuss ${picked.length} selected` : "Discuss these roles"} <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href={`/team-builder?add=${selectedRoles.join(",")}`} className="inline-flex min-h-11 items-center rounded-full px-5 font-semibold text-ink ring-1 ring-line hover:bg-surface">
                Open in Team Builder
              </Link>
            </div>
            {level && level !== "Not sure" && <p className="mt-4 text-xs text-muted">Preferred experience: {level}. Mention this in your inquiry so we can match the right candidates.</p>}
          </>
        )}
      </section>
    </div>
  );
}
