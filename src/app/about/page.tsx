import type { Metadata } from "next";
import Image from "next/image";
import { Award, Eye, Handshake, Lock, RefreshCw, Scale, ShieldCheck, Target, UsersRound, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Lantern Global",
  description:
    "Lantern Global connects American businesses with educated, skilled, and dependable professionals in the Philippines through a U.S.-based staffing relationship.",
  path: "/about",
});

const values = [
  { icon: Scale, title: "Integrity", body: "We say what is true, including what we have not done yet." },
  { icon: Award, title: "Professional Excellence", body: "We hold our work and our professionals to a high bar." },
  { icon: GraduationCap, title: "Education", body: "We believe in the value of rigorous study and continued learning." },
  { icon: Target, title: "Accountability", body: "We own our commitments and fix problems quickly." },
  { icon: Handshake, title: "Partnership", body: "We succeed when our clients and professionals both succeed." },
  { icon: RefreshCw, title: "Continuous Improvement", body: "We review, learn, and get better with every placement." },
  { icon: UsersRound, title: "Respect for People", body: "Our professionals are skilled colleagues, never disposable labor." },
  { icon: Lock, title: "Security and Confidentiality", body: "We treat client information with care and discretion." },
];

function LeadershipGrid() {
  if (site.leadership.length === 0) return null;
  return (
    <Section tone="surface" labelledBy="leadership-heading">
      <SectionHeading id="leadership-heading" eyebrow="Leadership" title="The People Behind Lantern Global" />
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.leadership.map((p) => (
          <li key={p.name} className="card overflow-hidden">
            {p.photo && (
              <div className="relative aspect-[4/3] bg-surface">
                <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-sm font-semibold text-brand-strong">{p.role}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">{p.bio}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About us"
        title="Building Better Businesses Through Exceptional People."
        description="Lantern Global is a U.S.-based professional staffing and outsourcing company. We connect American businesses with dedicated, university-educated professionals in the Philippines."
        photo="team-conference-room"
      />

      <Section labelledBy="mission-heading">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="on-dark relative overflow-hidden rounded-[1.75rem] bg-navy-950 p-8 text-slate-300 sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand/30 blur-3xl" />
            <Target aria-hidden="true" className="relative h-7 w-7 text-glow" />
            <h2 id="mission-heading" className="relative mt-5 font-display text-2xl font-bold text-white">
              Our Mission
            </h2>
            <p className="relative mt-3 text-lg leading-relaxed">
              To connect American businesses with educated, skilled, and dependable professionals who help organizations operate more
              effectively and grow with confidence.
            </p>
          </div>
          <div className="rounded-[1.75rem] bg-brand-soft p-8 ring-1 ring-brand-tint sm:p-10">
            <Eye aria-hidden="true" className="h-7 w-7 text-brand-strong" />
            <h2 className="mt-5 font-display text-2xl font-bold">Our Vision</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              To become a trusted partner for companies seeking dedicated professional talent and reliable global business support.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="approach-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading id="approach-heading" eyebrow="Our approach" title="A U.S. Partner. Philippine Talent. One Working Relationship." />
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed">
              <p>
                Our clients contract with a U.S. company, so they have a familiar commercial relationship and a clear point of contact
                for questions, changes, and concerns.
              </p>
              <p>
                Our professionals are based in the Philippines and recruited for specific disciplines. Every one holds a completed
                bachelor&apos;s degree or higher and is evaluated on the skills their role actually requires.
              </p>
              <p>
                Between the two, we handle the work that makes international staffing hard: sourcing and evaluating candidates,
                coordinating onboarding, administering the working relationship as agreed, and staying involved after launch.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-lift">
            <Photo id="video-conference-office" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </div>
      </Section>

      <Section labelledBy="philippines-heading" id="philippines">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div className="relative order-last aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-lift lg:order-first">
            <Photo id="philippines-makati-skyline" sizes="(min-width: 1024px) 45vw, 100vw" />
            <p className="absolute bottom-3 left-3 rounded-full bg-navy-950/75 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              Makati, Metro Manila
            </p>
          </div>
          <div>
            <SectionHeading id="philippines-heading" eyebrow="Why the Philippines?" title="A Deep Professional Talent Market" />
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed">
              <p>
                English is one of the Philippines&apos; official languages and is widely used in higher education, government, and
                business. That makes day-to-day collaboration with U.S. teams practical across written and spoken work.
              </p>
              <p>
                The country has a well-established outsourcing and professional services industry, along with universities producing
                graduates in accountancy, nursing, engineering, information technology, business, and many other fields.
              </p>
              <p>
                We focus on that university-educated segment of the talent market and on matching people to work that uses their
                training, which we believe leads to better outcomes for clients and more meaningful careers for professionals.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="values-heading">
        <SectionHeading id="values-heading" eyebrow="Our values" title="What We Stand For" align="center" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: I, title, body }, i) => (
            <Reveal as="li" key={title} delay={(i % 4) * 60} className="card p-6">
              <I aria-hidden="true" className="h-6 w-6 text-brand" strokeWidth={1.75} />
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-muted">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-brand" />
          We do not publish invented histories, client logos, or testimonials.
        </p>
      </Section>

      <LeadershipGrid />

      <CtaBanner />
    </>
  );
}
