import Link from "next/link";
import { ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";
import type { Division, Industry } from "@/content/types";
import type { SpecialtyWithDivision } from "@/content/divisions";
import { IconTile } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

export function DivisionCard({ division, showSpecialties = 3 }: { division: Division; showSpecialties?: number }) {
  return (
    <article className="card card-interactive group relative flex h-full flex-col p-6">
      <IconTile name={division.icon} />
      <h3 className="text-h3 mt-5">
        <Link href={`/services/${division.slug}`} className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">
          {division.shortName}
        </Link>
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed">{division.description}</p>
      {showSpecialties > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm text-ink" aria-label={`Example ${division.shortName} specialties`}>
          {division.specialties.slice(0, showSpecialties).map((s) => (
            <li key={s.slug} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
              {s.title}
            </li>
          ))}
        </ul>
      )}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-strong">
        {division.specialties.length} specialties
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </article>
  );
}

export function IndustryCard({ industry, variant = "photo" }: { industry: Industry; variant?: "photo" | "compact" }) {
  if (variant === "compact") {
    return (
      <article className="card card-interactive group relative flex items-start gap-4 p-5">
        <IconTile name={industry.icon} />
        <div>
          <h3 className="text-base font-bold">
            <Link href={`/industries/${industry.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {industry.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm leading-relaxed">{industry.description}</p>
        </div>
      </article>
    );
  }
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-navy-900 shadow-card ring-1 ring-black/5">
      <div className="relative aspect-[4/3]">
        <Photo
          id={industry.photo}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-xl font-bold text-white">
          <Link href={`/industries/${industry.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {industry.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-200">{industry.description}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-glow">
          Explore <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export function SpecialtyCard({ specialty, className, showDivision = false }: { specialty: SpecialtyWithDivision; className?: string; showDivision?: boolean }) {
  return (
    <article className={cn("card card-interactive group relative flex h-full flex-col p-5", className)}>
      {showDivision && <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-strong">{specialty.division.shortName}</p>}
      <h3 className="text-base font-bold leading-snug">
        <Link href={specialty.href} className="after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none">
          {specialty.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed">{specialty.summary}</p>
      <p className="mt-auto flex items-start gap-2 pt-4 text-xs text-muted">
        <GraduationCap aria-hidden="true" className="mt-px h-4 w-4 shrink-0 text-brand" />
        <span>{specialty.degrees.slice(0, 2).join(", ")}</span>
      </p>
    </article>
  );
}

export function Pill({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" | "brand" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        tone === "dark" && "bg-white/10 text-slate-200 ring-1 ring-white/15",
        tone === "light" && "bg-white text-ink ring-1 ring-line",
        tone === "brand" && "bg-brand-soft text-brand-strong ring-1 ring-brand-tint",
      )}
    >
      {children}
    </span>
  );
}
