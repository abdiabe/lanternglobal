import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items, dark, className }: { items: Crumb[]; dark?: boolean; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={cn("font-medium", dark ? "text-white" : "text-ink")}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.path}
                      className={cn(
                        "rounded-sm underline-offset-4 hover:underline",
                        dark ? "text-slate-300 hover:text-white" : "text-muted hover:text-brand-strong",
                      )}
                    >
                      {c.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className={cn("h-3.5 w-3.5", dark ? "text-slate-500" : "text-slate-400")} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
