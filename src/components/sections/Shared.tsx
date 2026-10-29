import { CheckCircle2, Info, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BoundaryNote({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <aside className={cn("flex gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6", className)} aria-label={title}>
      <ShieldAlert aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
      <div>
        <p className="font-display font-bold text-ink">{title}</p>
        <div className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate-700">{children}</div>
      </div>
    </aside>
  );
}

export function InfoNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex gap-3 rounded-xl bg-brand-soft p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-brand-tint", className)}>
      <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-strong" />
      <div>{children}</div>
    </div>
  );
}

export function CheckList({ items, className, columns = 1 }: { items: string[]; className?: string; columns?: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-[0.9375rem] text-ink">
          <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <span className="leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-line">
          {t}
        </li>
      ))}
    </ul>
  );
}

const onboarding = [
  { title: "Kickoff and access", body: "We agree on first responsibilities, and your team creates accounts with role-based permissions in your systems." },
  { title: "Documented handoff", body: "You share processes, templates, and examples. Your professional turns them into a working checklist." },
  { title: "Supported first weeks", body: "Early check-ins catch questions quickly. Work starts with lower-risk tasks and expands as trust builds." },
  { title: "Ongoing review", body: "Regular feedback conversations keep quality and priorities aligned as your needs evolve." },
];

export function OnboardingSteps() {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {onboarding.map((s, i) => (
        <li key={s.title} className="card relative p-6">
          <span className="font-display text-sm font-extrabold text-brand tabular-nums">Step {i + 1}</span>
          <h3 className="mt-2 text-base font-bold">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
