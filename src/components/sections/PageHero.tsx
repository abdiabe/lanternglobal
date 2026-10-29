import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  photo,
  photoPosition,
  aside,
  tone = "light",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  photo?: string;
  photoPosition?: string;
  aside?: ReactNode;
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  const hasSide = Boolean(photo || aside);
  return (
    <section className={cn("relative overflow-hidden", dark ? "on-dark bg-navy-950 text-slate-300" : "bg-surface")}>
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", dark ? "bg-grid-dark" : "bg-grid opacity-70")} />
      {dark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand/25 blur-3xl"
        />
      )}
      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} dark={dark} className="mb-8" />}
        <div className={cn("grid items-center gap-10 lg:gap-14", hasSide && "lg:grid-cols-[1.1fr_1fr]")}>
          <div className={cn(!hasSide && "max-w-3xl")}>
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h1 className={cn("text-display", dark && "text-white")}>{title}</h1>
            {description && <div className={cn("text-lead mt-5 max-w-2xl", dark ? "text-slate-300" : "text-body")}>{description}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {children}
          </div>
          {photo && (
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-black/5">
                <Photo id={photo} priority sizes="(min-width: 1024px) 40vw, 100vw" position={photoPosition} />
              </div>
              <div aria-hidden="true" className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-[1.75rem] bg-brand-tint/60" />
            </div>
          )}
          {aside && !photo && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
