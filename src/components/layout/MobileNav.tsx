"use client";

import Link from "next/link";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Menu, X } from "lucide-react";
import type { NavGroup } from "@/content/navigation";
import { Logo } from "./Logo";
import { buttonClasses } from "@/components/ui/Button";

export function MobileNav({ nav, specialtyCount }: { nav: NavGroup[]; specialtyCount: number }) {
  const [open, setOpen] = useState(false);

  // Close the drawer when any link inside it is followed.
  const closeOnLink = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink ring-1 ring-inset ring-line transition-colors hover:bg-surface xl:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-fade-in fixed inset-0 z-[60] bg-navy-950/50 backdrop-blur-sm" />
        <Dialog.Content
          className="animate-drawer-in fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl focus:outline-none"
          aria-describedby={undefined}
          onClick={closeOnLink}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-line px-4 sm:px-6">
            <Logo />
            <Dialog.Title className="sr-only">Site menu</Dialog.Title>
            <Dialog.Close
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-inset ring-line hover:bg-surface"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <Accordion.Root type="single" collapsible className="divide-y divide-line">
              {nav.map((group) =>
                group.items ? (
                  <Accordion.Item key={group.label} value={group.label}>
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between py-4 text-left text-base font-semibold text-ink">
                        {group.label}
                        <ChevronDown aria-hidden="true" className="h-5 w-5 text-muted transition-transform group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[acc-up_200ms_ease-out] data-[state=open]:animate-[acc-down_240ms_ease-out]">
                      <ul className="grid gap-0.5 pb-4">
                        <li>
                          <Link href={group.href} className="block rounded-lg px-3 py-2.5 text-[0.9375rem] font-semibold text-brand-strong hover:bg-surface">
                            {group.kind === "services" ? `All services (${specialtyCount} specialties)` : `All ${group.label.toLowerCase()}`}
                          </Link>
                        </li>
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className="block rounded-lg px-3 py-2.5 text-[0.9375rem] text-body hover:bg-surface hover:text-ink">
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                ) : (
                  <div key={group.label}>
                    <Link href={group.href} className="block py-4 text-base font-semibold text-ink hover:text-brand-strong">
                      {group.label}
                    </Link>
                  </div>
                ),
              )}
            </Accordion.Root>
          </nav>
          <div className="space-y-2 border-t border-line p-4 sm:p-6">
            <Link href="/hire-a-professional" className={buttonClasses("primary", "md", "w-full")}>
              Hire a Professional
            </Link>
            <Link href="/services" className={buttonClasses("secondary", "md", "w-full")}>
              Explore Our Services
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
