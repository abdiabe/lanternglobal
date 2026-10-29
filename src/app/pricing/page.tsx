import type { Metadata } from "next";
import Link from "next/link";
import { Check, Cpu, Layers, LayoutList } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/Accordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { divisions } from "@/content/divisions";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Pricing for Dedicated Professionals",
  description:
    "Transparent, customized pricing for dedicated professionals across administrative, specialized, and technical roles. Request a quote for your requirements.",
  path: "/pricing",
});

const tiers = [
  {
    key: "administrative",
    icon: LayoutList,
    name: "Administrative Support",
    summary: "Dedicated administrative and business support professionals.",
    includes: ["Executive and administrative assistants", "Project coordination", "Research, document control, and data entry", "CRM and records administration"],
  },
  {
    key: "specialized",
    icon: Layers,
    name: "Specialized Professional Support",
    summary: "Accounting, marketing, sales, HR, legal administrative support, healthcare administration, operations, creative, and customer experience specialists.",
    includes: ["Bookkeeping, AP/AR, and reporting", "Sales development and digital marketing", "Legal and healthcare administrative support", "Operations, HR, creative, and customer experience roles"],
    featured: true,
  },
  {
    key: "technical",
    icon: Cpu,
    name: "Technical & Advanced Professional Support",
    summary: "Software developers, analysts, engineers, advanced IT specialists, and other highly specialized professionals.",
    includes: ["Software development and QA", "Cloud, DevOps, and IT infrastructure", "Data analytics and business intelligence", "Engineering, CAD, BIM, and estimating"],
  },
] as const;

const factors = [
  "The specialty and the complexity of the work",
  "Required years and type of experience",
  "Full-time or part-time arrangement",
  "Working hours, including U.S.-aligned schedules",
  "Specific software or certifications required",
  "Scope of administrative and operational support",
];

const faqs = [
  { q: "Why don't you publish fixed prices?", a: "Roles vary widely in skills, experience, and schedule. A single price list would either overcharge for simpler roles or understate specialized ones. A written quote based on your actual requirements is more accurate." },
  { q: "What is included in a quote?", a: "Your quote will state the role, schedule, pricing, and any fees or terms clearly in writing before you commit. Nothing is added later that was not in the quote." },
  { q: "Can I start part-time?", a: "Part-time arrangements can be discussed for many roles. Availability depends on the specialty and candidate market." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Pricing", path: "/pricing" }]}
        eyebrow="Pricing"
        title="Transparent, Customized Pricing"
        description="Every role is different, so we quote each placement on its actual requirements. Here's how our service tiers are structured and what shapes the price."
        actions={
          <ButtonLink href="/hire-a-professional?intent=quote" size="lg" arrow>
            Request a Quote
          </ButtonLink>
        }
      />

      <Section labelledBy="tiers-heading">
        <SectionHeading id="tiers-heading" eyebrow="Service tiers" title="Three Tiers, Quoted to Your Role" align="center" />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map(({ key, icon: I, name, summary, includes, ...rest }) => {
            const featured = "featured" in rest && rest.featured;
            const divs = divisions.filter((d) => d.pricingTier === key);
            return (
              <li
                key={key}
                className={cn(
                  "relative flex flex-col rounded-[1.5rem] p-7 sm:p-8",
                  featured ? "on-dark bg-navy-950 text-slate-300 shadow-lift" : "card",
                )}
              >
                <I aria-hidden="true" className={cn("h-7 w-7", featured ? "text-glow" : "text-brand")} />
                <h3 className={cn("mt-5 text-xl font-bold", featured && "text-white")}>{name}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed">{summary}</p>
                <p className={cn("mt-6 font-display text-2xl font-extrabold", featured ? "text-white" : "text-ink")}>Custom quote</p>
                <p className="text-sm">Based on role, experience, and schedule</p>
                <ul className="mt-6 space-y-3 text-[0.9375rem]">
                  {includes.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <Check aria-hidden="true" className={cn("mt-0.5 h-5 w-5 shrink-0", featured ? "text-glow" : "text-brand")} />
                      <span className={featured ? "text-slate-200" : "text-ink"}>{it}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs">
                  Divisions:{" "}
                  {divs.map((d, i) => (
                    <span key={d.slug}>
                      <Link href={`/services/${d.slug}`} className="underline underline-offset-2 hover:no-underline">
                        {d.shortName}
                      </Link>
                      {i < divs.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <div className="mt-auto pt-8">
                  <ButtonLink href={`/hire-a-professional?intent=quote&tier=${key}`} variant={featured ? "light" : "primary"} className="w-full" arrow>
                    Request a Quote
                  </ButtonLink>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="factors-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="factors-heading" eyebrow="What shapes your price" title="Factors We Consider" />
            <ul className="mt-8 grid gap-3">
              {factors.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-xl bg-white p-4 text-[0.9375rem] text-ink ring-1 ring-line">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h3">Pricing questions</h2>
            <FaqAccordion items={faqs} className="mt-5" />
          </div>
        </div>
      </Section>

      <CtaBanner title="Get a Quote for Your Role" description="Share the role and schedule you have in mind. We'll respond with a written quote and next steps." primaryLabel="Request a Quote" primaryHref="/hire-a-professional?intent=quote" />
    </>
  );
}
