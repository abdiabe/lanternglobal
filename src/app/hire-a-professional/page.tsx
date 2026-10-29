import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, GraduationCap, Lock, MessagesSquare } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InquiryForm, type InquiryOptions } from "@/components/forms/InquiryForm";
import { divisions, getSpecialtyBySlug, specialties } from "@/content/divisions";
import { industries } from "@/content/industries";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Hire a Professional",
  description: "Tell us about the role you need filled. Lantern Global will follow up to discuss dedicated professional staffing tailored to your business.",
  path: "/hire-a-professional",
});

type SP = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.slice(0, 200);

export default async function HirePage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const options: InquiryOptions = {
    divisions: divisions.map((d) => ({ value: d.slug, label: d.shortName, specialties: d.specialties.map((s) => ({ value: s.slug, label: s.title })) })),
    industries: [...industries.map((i) => i.name), "Other"],
    roleTitles: Object.fromEntries(specialties.map((s) => [s.slug, s.title])),
  };

  const division = one(sp.division);
  const specialty = one(sp.specialty);
  const industrySlug = one(sp.industry);
  const roles = (one(sp.roles) ?? "")
    .split(",")
    .map((r) => r.trim())
    .filter((r) => getSpecialtyBySlug(r))
    .slice(0, 12);

  const initial = {
    division: division && divisions.some((d) => d.slug === division) ? division : undefined,
    specialty: specialty && getSpecialtyBySlug(specialty) ? specialty : undefined,
    industry: industries.find((i) => i.slug === industrySlug)?.name,
    roles: roles.length ? roles : undefined,
    intent: one(sp.intent),
  };

  return (
    <div className="bg-surface">
      <div className="container-page py-10 sm:py-14">
        <Breadcrumbs items={[{ name: "Hire a Professional", path: "/hire-a-professional" }]} className="mb-8" />
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-14">
          <div>
            <p className="eyebrow">Hire a professional</p>
            <h1 className="text-h2 mt-3 sm:text-[2.75rem]">Tell Us About the Role You Need</h1>
            <p className="text-lead mt-4 max-w-2xl">
              Four short steps. We&apos;ll review your requirements and follow up to discuss candidates, schedule, and pricing. There is no
              obligation to proceed.
            </p>
            <div className="mt-10">
              <InquiryForm options={options} initial={initial} />
            </div>
          </div>
          <aside className="space-y-5 lg:pt-28">
            <div className="card p-6">
              <h2 className="text-base font-bold">What happens next</h2>
              <ol className="mt-4 space-y-4 text-sm">
                {[
                  { icon: MessagesSquare, t: "We review your requirements and reach out to schedule a conversation." },
                  { icon: GraduationCap, t: "We define the role profile together, including degree fields and skills." },
                  { icon: CalendarClock, t: "We source and evaluate candidates, then you interview finalists." },
                ].map(({ icon: I, t }) => (
                  <li key={t} className="flex gap-3">
                    <I aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
            {site.schedulingUrl && (
              <div className="card p-6">
                <h2 className="text-base font-bold">Prefer to talk first?</h2>
                <a href={site.schedulingUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex font-semibold text-brand-strong underline underline-offset-2">
                  Schedule a consultation
                </a>
              </div>
            )}
            <div className="flex gap-3 rounded-2xl bg-white/60 p-5 text-sm ring-1 ring-line">
              <Lock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <p>
                Your information is used only to respond to your inquiry. Read our{" "}
                <Link href="/privacy" className="font-semibold text-brand-strong underline underline-offset-2">
                  privacy policy
                </Link>
                .
              </p>
            </div>
            <p className="px-1 text-sm">
              Looking for a job?{" "}
              <Link href="/careers" className="font-semibold text-brand-strong underline underline-offset-2">
                Visit our careers page
              </Link>{" "}
              instead.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
