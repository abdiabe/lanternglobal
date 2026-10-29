"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ArrowRight, ChevronDown, Compass, LayoutGrid } from "lucide-react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import type { NavGroup } from "@/content/navigation";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header({ nav, specialtyCount }: { nav: NavGroup[]; specialtyCount: number }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  // Contact and Careers move into the overflow on mid-width screens to keep the bar uncluttered.
  const desktopNav = nav.filter((g) => g.label !== "Contact");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled ? "border-line bg-white/90 shadow-[0_1px_12px_rgb(15_23_42/0.06)] backdrop-blur-md" : "border-transparent bg-white",
      )}
    >
      <div className="container-page relative flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <NavigationMenu.Root aria-label="Main" className="hidden xl:block" delayDuration={80}>
          <NavigationMenu.List className="flex items-center gap-0.5">
            {desktopNav.map((group) =>
              group.items ? (
                <NavigationMenu.Item key={group.label} value={group.label}>
                  <NavigationMenu.Trigger
                    className={cn(
                      "group inline-flex h-10 cursor-pointer items-center gap-1 rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors",
                      isActive(group.href) ? "text-brand-strong" : "text-ink hover:bg-surface",
                      "data-[state=open]:bg-surface",
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                    <MegaPanel group={group} specialtyCount={specialtyCount} />
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ) : (
                <NavigationMenu.Item key={group.label}>
                  <NavigationMenu.Link asChild active={isActive(group.href)}>
                    <Link
                      href={group.href}
                      className={cn(
                        "inline-flex h-10 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors",
                        isActive(group.href) ? "text-brand-strong" : "text-ink hover:bg-surface",
                      )}
                    >
                      {group.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ),
            )}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              "hidden h-10 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors xl:inline-flex",
              isActive("/contact") ? "text-brand-strong" : "text-ink hover:bg-surface",
            )}
          >
            Contact
          </Link>
          <Link href="/hire-a-professional" className={buttonClasses("primary", "sm", "whitespace-nowrap max-[419px]:hidden")}>
            Hire a Professional
          </Link>
          <MobileNav nav={nav} specialtyCount={specialtyCount} />
        </div>
      </div>
    </header>
  );
}

function MegaPanel({ group, specialtyCount }: { group: NavGroup; specialtyCount: number }) {
  if (group.kind === "services") {
    return (
      <div className="animate-menu-in grid w-[min(66rem,calc(100vw-3rem))] grid-cols-[1fr_17rem] overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
        <div className="p-6">
          <p className="eyebrow mb-4">Service divisions</p>
          <ul className="grid grid-cols-3 gap-1">
            {group.items?.map((d) => (
              <li key={d.href}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={d.href}
                    className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-strong ring-1 ring-brand-tint transition-colors group-hover:bg-brand group-hover:text-white">
                      {d.icon && <Icon name={d.icon} className="h-[18px] w-[18px]" strokeWidth={1.75} />}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{d.label}</span>
                      <span className="mt-0.5 block text-xs leading-snug text-muted">{d.meta}</span>
                    </span>
                  </Link>
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between bg-navy-950 p-6 text-slate-300">
          <div>
            <LayoutGrid aria-hidden="true" className="h-6 w-6 text-glow" />
            <p className="mt-3 font-display text-lg font-bold text-white">{specialtyCount} professional specialties</p>
            <p className="mt-2 text-sm leading-relaxed">Search every role by skill, degree, software, or industry.</p>
          </div>
          <div className="mt-6 space-y-2">
            <NavigationMenu.Link asChild>
              <Link href="/services/directory" className={buttonClasses("light", "sm", "w-full")}>
                Browse the directory
              </Link>
            </NavigationMenu.Link>
            <NavigationMenu.Link asChild>
              <Link href="/specialty-finder" className={buttonClasses("outline-light", "sm", "w-full")}>
                Try the Specialty Finder
              </Link>
            </NavigationMenu.Link>
          </div>
        </div>
      </div>
    );
  }

  if (group.kind === "industries") {
    return (
      <div className="animate-menu-in grid w-[min(54rem,calc(100vw-3rem))] grid-cols-[1fr_16rem] overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
        <div className="p-6">
          <p className="eyebrow mb-4">Industries we support</p>
          <ul className="grid grid-cols-2 gap-1">
            {group.items?.map((i) => (
              <li key={i.href}>
                <NavigationMenu.Link asChild>
                  <Link href={i.href} className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface">
                    {i.icon && <Icon name={i.icon} className="h-4 w-4 text-brand-strong" strokeWidth={1.75} />}
                    {i.label}
                  </Link>
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between bg-surface p-6">
          <div>
            <Compass aria-hidden="true" className="h-6 w-6 text-brand-strong" />
            <p className="mt-3 font-display text-base font-bold text-ink">Built around how your industry works</p>
            <p className="mt-2 text-sm leading-relaxed text-body">Each page covers real operational challenges, relevant roles, and the tools teams use.</p>
          </div>
          <NavigationMenu.Link asChild>
            <Link href="/industries" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline">
              All industries <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </NavigationMenu.Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-menu-in w-[28rem] overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-lift">
      <ul className="grid gap-0.5">
        {group.items?.map((item) => (
          <li key={item.href}>
            <NavigationMenu.Link asChild>
              <Link href={item.href} className="block rounded-xl px-4 py-3 transition-colors hover:bg-surface">
                <span className="block text-sm font-semibold text-ink">{item.label}</span>
                {item.description && <span className="mt-0.5 block text-xs text-muted">{item.description}</span>}
              </Link>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
