import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Globe2,
  GraduationCap,
  Landmark,
  Layers,
  ListChecks,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Comparison } from "@/components/home/Sections";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { InfoNote } from "@/components/sections/Shared";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Why Choose Lantern Global",
  description:
    "Degree-holding professionals, specialized recruitment, dedicated staffing, and a U.S. commercial partner. See what makes Lantern Global's staffing model different.",
  path: "/why-choose-us",
});

const reasons = [
  { icon: GraduationCap, title: "Bachelor's degree or higher", body: "A completed bachelor's degree is the minimum educational requirement for our professional workforce, without exception.", href: "/why-choose-us/education-and-qualifications" },
  { icon: Layers, title: "Specialized professional talent", body: "We recruit for defined disciplines across 12 divisions, not simply generic virtual assistants.", href: "/services/directory" },
  { icon: UserCheck, title: "Dedicated staffing", body: "Your professional supports your business, learns your systems, and becomes part of your team.", href: "/how-it-works" },
  { icon: ClipboardCheck, title: "Rigorous candidate evaluation", body: "Our framework covers education, experience, technical skills, communication, role-specific assessments, and appropriate verification and screening.", href: "/why-choose-us/education-and-qualifications" },
  { icon: Landmark, title: "U.S.-based business relationship", body: "You contract with a U.S. company and have a clear commercial point of contact.", href: "/about" },
  { icon: Globe2, title: "Philippines-based talent", body: "Access skilled Filipino professionals across business, technology, finance, healthcare administration, engineering, and more.", href: "/about#philippines" },
  { icon: TrendingUp, title: "Flexible growth", body: "Start with one professional and expand into a team across specialties.", href: "/team-builder" },
  { icon: ListChecks, title: "Structured operations", body: "Clear onboarding, communication norms, performance expectations, and support processes.", href: "/how-it-works" },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Why Choose Us", path: "/why-choose-us" }]}
        eyebrow="Why choose us"
        title="A Professionally Managed Staffing Solution, Built on Higher Standards."
        description="We are not a bargain-basement VA marketplace. We connect U.S. businesses with educated, specialized professionals and support the relationship from the first conversation onward."
        photo="office-laptop-window"
        actions={
          <ButtonLink href="/hire-a-professional" size="lg" arrow>
            Hire a Professional
          </ButtonLink>
        }
      />

      <Section labelledBy="reasons-heading">
        <SectionHeading id="reasons-heading" eyebrow="Our differentiators" title="Eight Reasons Businesses Work With Us" align="center" />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: I, title, body, href }, i) => (
            <Reveal as="li" key={title} delay={(i % 4) * 60}>
              <article className="card card-interactive group relative flex h-full flex-col p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-glow">
                  <I aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-base font-bold">
                  <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
                    {title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed">{body}</p>
                <span className="mt-auto pt-4">
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
                </span>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Comparison />

      <Section labelledBy="honesty-heading">
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="honesty-heading" eyebrow="Our commitment to accuracy" title="Standards We Hold Ourselves To" />
          <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed">
            <p>
              We are a new company, and we would rather earn your trust than overstate our track record. You will not find invented
              client logos, testimonials, statistics, or certifications on this website.
            </p>
            <p>
              The standards described here are the foundation of our service model. Where a specific process, such as a particular
              verification step or screening provider, applies to your placement, we confirm it with you in writing before you decide.
            </p>
          </div>
          <InfoNote className="mt-8">
            We do not hold SOC 2, ISO 27001, or HIPAA certification, and we do not claim them. See our{" "}
            <Link href="/security" className="font-semibold text-brand-strong underline underline-offset-2">
              security and confidentiality approach
            </Link>
            .
          </InfoNote>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
