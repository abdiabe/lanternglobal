import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "white" | "surface" | "navy" | "brand-soft";

const tones: Record<Tone, string> = {
  white: "bg-white",
  surface: "bg-surface",
  navy: "bg-navy-950 text-slate-300 on-dark",
  "brand-soft": "bg-brand-soft/60",
};

export function Section({
  children,
  tone = "white",
  className,
  id,
  labelledBy,
  size = "md",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
  size?: "sm" | "md" | "lg";
}) {
  const pad = size === "sm" ? "py-14 sm:py-16" : size === "lg" ? "py-20 sm:py-28" : "py-16 sm:py-24";
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative", tones[tone], pad, className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  as: As = "h2",
  className,
  dark,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <As id={id} className={cn("text-h2", dark && "text-white")}>
        {title}
      </As>
      {description && (
        <div className={cn("text-lead mt-4", dark ? "text-slate-300" : "text-body")}>{description}</div>
      )}
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
}) {
  return (
    <As className={cn("reveal", className)} style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}>
      {children}
    </As>
  );
}
