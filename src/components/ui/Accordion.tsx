"use client";

import * as A from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/types";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
  className,
  headingLevel = 3,
}: {
  items: FaqItem[];
  className?: string;
  headingLevel?: 2 | 3 | 4;
}) {
  const H = `h${headingLevel}` as "h3";
  return (
    <A.Root type="multiple" className={cn("divide-y divide-line rounded-2xl border border-line bg-white", className)}>
      {items.map((item, i) => (
        <A.Item key={item.q} value={`item-${i}`} className="group">
          <A.Header asChild>
            <H className="m-0">
              <A.Trigger className="flex w-full cursor-pointer items-start justify-between gap-6 px-5 py-5 text-left font-sans text-base font-semibold tracking-normal text-ink transition-colors hover:text-brand-strong sm:px-6">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong transition-transform duration-300 group-data-[state=open]:rotate-45"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </A.Trigger>
            </H>
          </A.Header>
          <A.Content className="overflow-hidden text-body data-[state=closed]:animate-[acc-up_220ms_ease-out] data-[state=open]:animate-[acc-down_260ms_cubic-bezier(0.22,1,0.36,1)]">
            <p className="px-5 pb-5 leading-relaxed sm:px-6">{item.a}</p>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
