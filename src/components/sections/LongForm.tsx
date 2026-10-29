import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Two-column long-form layout with an on-page table of contents. Used for guides and legal pages. */
export function LongForm({
  toc,
  children,
  className,
}: {
  toc: { id: string; label: string }[];
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16", className)}>
      <nav aria-label="On this page" className="hidden lg:block">
        <div className="sticky top-28">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">On this page</p>
          <ol className="mt-4 space-y-1 border-l border-line">
            {toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-body hover:border-brand hover:text-brand-strong">
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>
      <div className="prose prose-article max-w-[46rem]">{children}</div>
    </div>
  );
}

export function LegalReviewBanner() {
  return (
    <div role="note" className="not-prose mb-10 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
      <strong>Template pending legal review.</strong> This document is a draft framework, not legal advice. Items in [brackets] must be
      completed, and the full text should be reviewed by qualified counsel before the site launches.
    </div>
  );
}
