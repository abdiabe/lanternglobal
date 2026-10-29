import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark, className, size = "md" }: { dark?: boolean; className?: string; size?: "md" | "lg" }) {
  const mark = size === "lg" ? 52 : 42;
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5 rounded-lg", className)}>
      <Image
        src="/brand/lantern-mark-256.png"
        alt=""
        width={mark}
        height={mark}
        priority
        className="h-auto transition-transform duration-300 group-hover:-rotate-3"
        style={{ width: mark }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-extrabold tracking-tight",
            size === "lg" ? "text-[1.6rem]" : "text-[1.35rem]",
            dark ? "text-white" : "text-navy-900",
          )}
        >
          Lantern
        </span>{" "}
        <span
          className={cn(
            "mt-1 pl-0.5 font-display text-[0.62rem] font-semibold uppercase tracking-[0.42em]",
            dark ? "text-glow" : "text-brand-strong",
          )}
        >
          Global
        </span>
        <span className="sr-only">, home</span>
      </span>
    </Link>
  );
}
