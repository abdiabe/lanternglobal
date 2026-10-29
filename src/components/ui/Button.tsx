import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg" | "sm";
const base = "group inline-flex items-center justify-center gap-2 rounded-sm text-center font-semibold transition-[background-color,color,box-shadow,transform,border-color] duration-200 ease-out cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px";
const variants: Record<Variant, string> = {
    primary: "bg-glow text-navy-950 hover:bg-brand-tint",
    secondary: "bg-white text-ink ring-1 ring-inset ring-line hover:ring-slate-300 hover:bg-surface",
    ghost: "text-brand-strong hover:bg-brand-soft",
    light: "bg-white text-navy-900 hover:bg-brand-soft",
    "outline-light": "text-white ring-1 ring-inset ring-white/30 hover:bg-white/10 hover:ring-white/50",
};
const sizes: Record<Size, string> = {
    sm: "min-h-10 px-4 py-2 text-sm",
    md: "min-h-11 px-5 py-2.5 text-[0.9375rem]",
    lg: "min-h-[3.25rem] px-7 py-3 text-base",
};
export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
    return cn(base, variants[variant], sizes[size], className);
}
interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
    variant?: Variant;
    size?: Size;
    arrow?: boolean;
    className?: string;
    children: ReactNode;
}
export function ButtonLink({ variant = "primary", size = "md", arrow, className, children, ...props }: ButtonLinkProps) {
    return (<Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && (<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"/>)}
    </Link>);
}
export function TextLink({ href, children, className }: {
    href: string;
    children: ReactNode;
    className?: string;
}) {
    return (<Link href={href} className={cn("group inline-flex items-center gap-1.5 font-semibold text-brand-strong hover:text-brand underline-offset-4 hover:underline", className)}>
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"/>
    </Link>);
}
