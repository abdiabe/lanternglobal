import type { Metadata } from "next";
import { Building2, Clock3, UserRound } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/Accordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { CheckList, InfoNote } from "@/components/sections/Shared";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How Dedicated Professional Staffing Works",
  description:
    "From the first consultation to scaling your team: the 12-step process for finding, onboarding, and working with a dedicated professional through Lantern Global.",
  path: "/how-it-works",
});

const phases = [
  {
    name: "Define",
    steps: [
      { title: "Initial consultation", body: "A conversation about your business, where your team is stretched, and what success would look like in the first few months." },
      { title: "Requirements discovery", body: "We go deeper on responsibilities, tools, working hours, communication style, and any industry or compliance requirements." },
      { title: "Job description and skills profile", body: "We write a clear role profile with required degree fields, skills, software, and experience, and you approve it before sourcing begins." },
    ],
  },
  {
    name: "Find",
    steps: [
      { title: "Candidate sourcing", body: "We recruit university-educated professionals in the Philippines who match the approved profile." },
      { title: "Candidate screening", body: "Candidates are evaluated against our framework: education, experience, technical skills, communication, role-specific assessments, and appropriate verification and screening." },
      { title: "Client interview and selection", body: "You interview the finalists we present and choose the professional who fits your team." },
    ],
  },
  {
    name: "Launch",
    steps: [
      { title: "Agreement and onboarding", body: "We confirm the service agreement, including schedule, responsibilities, and terms, then plan the first weeks together." },
      { title: "Systems and access setup", body: "Your team creates individual accounts with role-based permissions in your systems. We recommend least-privilege access from day one." },
      { title: "Service launch", body: "Your professional starts with a documented set of first responsibilities and expands as confidence grows." },
    ],
  },
  {
    name: "Grow",
    steps: [
      { title: "Ongoing communication", body: "Regular check-ins with you and your professional keep priorities clear and surface issues early." },
      { title: "Performance reviews", body: "Structured feedback conversations review quality, responsiveness, and goals, and agree on improvements." },
      { title: "Scaling or adjusting the team", body: "Add professionals in other specialties, adjust schedules, or change scope as your business evolves." },
    ],
  },
];

const tzFaqs = [
  {
    q: "Can my professional work during U.S. business hours?",
    a: "Yes. The Philippines is 12 hours ahead of U.S. Eastern Time during daylight saving time and 13 hours ahead otherwise, so U.S. business hours fall overnight in the Philippines. Many Philippine professionals work U.S.-aligned schedules. Night work, rest periods, and related pay rules are handled according to applicable Philippine labor law and defined in your agreement.",
  },
  {
    q: "What if we only need a few hours of overlap?",
    a: "That works well for many roles. A shared window for meetings and handoffs, with the remaining hours for independent work, can make work progress around the clock.",
  },
  {
    q: "How are holidays handled?",
    a: "U.S. and Philippine holiday coverage is agreed in advance and written into the service agreement.",
  },
];

export default function HowItWorksPage() {
  const offsets = phases.map((_, i) => phases.slice(0, i).reduce((sum, ph) => sum + ph.steps.length, 0));
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "How It Works", path: "/how-it-works" }]}
        eyebrow="How it works"
        title="Tell Us What You Need. We'll Help You Find the Right Professional."
        description="From defining responsibilities to identifying suitable candidates and coordinating onboarding, our approach is designed to make building a remote team more manageable."
        photo="video-call-collaboration"
        actions={
          <ButtonLink href="/hire-a-professional" size="lg" arrow>
            Start with a consultation
          </ButtonLink>
        }
      />

      <Section labelledBy="journey-heading">
        <SectionHeading id="journey-heading" eyebrow="The client journey" title="Twelve Steps, Four Phases" align="center" />
        <div className="mx-auto mt-14 max-w-4xl space-y-14">
          {phases.map((phase, pi) => (
            <div key={phase.name}>
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-brand-strong">{phase.name}</p>
              <ol className="relative mt-6 space-y-5 border-l-2 border-brand-tint pl-8 sm:pl-10">
                {phase.steps.map((s, si) => {
                  const n = offsets[pi] + si + 1;
                  return (
                    <Reveal as="li" key={s.title} className="relative">
                      <span className="absolute -left-[3.19rem] top-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-bold text-white ring-4 ring-white sm:-left-[3.69rem]">
                        {n}
                      </span>
                      <div className="card p-5 sm:p-6">
                        <h3 className="text-base font-bold sm:text-lg">{s.title}</h3>
                        <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{s.body}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="navy" labelledBy="dedicated-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">The dedicated staffing model</p>
            <h2 id="dedicated-heading" className="text-h2 mt-4 text-white">
              One Professional. One Business. A Focused Working Relationship.
            </h2>
            <p className="text-lead mt-5">
              Dedicated staffing means your assigned professional supports your business under the agreed arrangement, rather than being
              routinely shared among unrelated client accounts. That focus is what lets them learn your systems and become a real part of
              your team.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: Building2, title: "Your business", body: "Directs daily priorities and reviews the work." },
              { icon: UserRound, title: "Your professional", body: "Works inside your systems as a dedicated team member." },
              { icon: Clock3, title: "Lantern Global", body: "Provides the agreed recruitment, administrative, and operational support." },
            ].map(({ icon: I, title, body }) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10">
                <I aria-hidden="true" className="h-6 w-6 shrink-0 text-glow" />
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="agreement-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="agreement-heading" eyebrow="Defined in writing" title="What Your Agreement Sets Out" />
            <p className="mt-5 leading-relaxed">
              Every placement is governed by a written agreement. The details below are defined there, not assumed, so both sides know
              exactly how the relationship works.
            </p>
            <CheckList
              className="mt-6"
              items={[
                "Working schedule and time zone alignment",
                "Supervision and day-to-day direction",
                "The legal employment or engagement arrangement",
                "Holidays, leave, and coverage",
                "Responsibilities of each party",
                "Confidentiality, data handling, and intellectual property",
              ]}
            />
            <InfoNote className="mt-6">
              Legal, tax, and HR responsibilities depend on the signed agreement and the lawful operating structure for your placement.
            </InfoNote>
          </div>
          <div>
            <h2 className="text-h3">U.S. time-zone coverage</h2>
            <FaqAccordion items={tzFaqs} className="mt-5" />
          </div>
        </div>
      </Section>

      <CtaBanner title="Ready to Take the First Step?" description="The process starts with a conversation about your business. There is no obligation to proceed." />
    </>
  );
}
