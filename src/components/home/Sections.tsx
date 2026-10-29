import Link from "next/link";
import {
  BadgeCheck,
  BookOpenCheck,
  Briefcase,
  Check,
  ClipboardCheck,
  GraduationCap,
  Landmark,
  MessagesSquare,
  Minus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { ButtonLink, TextLink } from "@/components/ui/Button";

export function TrustStrip() {
  const items = [
    { icon: GraduationCap, title: "Bachelor's Degree or Higher", body: "The minimum academic standard for every professional." },
    { icon: ClipboardCheck, title: "Role-Specific Skills Assessment", body: "Practical evaluation matched to the actual job." },
    { icon: UserCheck, title: "Dedicated Professionals", body: "Assigned to your business, not shared across accounts." },
    { icon: Landmark, title: "U.S.-Based Client Relationships", body: "Contract with a U.S. company and a clear point of contact." },
    { icon: TrendingUp, title: "Flexible Team Growth", body: "Start with one and add specialties as you grow." },
  ];
  return (
    <section aria-label="Our standards" className="border-y border-line bg-surface">
      <div className="container-page py-10">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {items.map(({ icon: I, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 60} className="flex items-start gap-3 lg:flex-col lg:gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-strong shadow-card ring-1 ring-line">
                <I aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-[0.9375rem] font-bold leading-snug text-ink">{title}</p>
                <p className="mt-1 text-sm leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const framework = [
  { icon: GraduationCap, title: "Educational qualifications", body: "A completed bachelor's degree or higher, relevant to the specialization." },
  { icon: Briefcase, title: "Professional experience", body: "Experience reviewed against the level the role requires." },
  { icon: Wrench, title: "Technical skills", body: "Hands-on ability with the tools and systems you use." },
  { icon: MessagesSquare, title: "Communication", body: "Written and spoken English assessed for the role's needs." },
  { icon: BookOpenCheck, title: "Role-specific assessments", body: "Practical exercises based on real tasks." },
  { icon: ShieldCheck, title: "Verification and screening", body: "Appropriate credential verification and screening, confirmed for each placement." },
];

export function DegreeAdvantage() {
  return (
    <section aria-labelledby="degree-heading" className="on-dark relative overflow-hidden bg-navy-950 py-20 text-slate-300 sm:py-28">
      <div aria-hidden="true" className="bg-grid-dark pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-brand/20 blur-3xl" />
      <div className="container-page relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">The Bachelor&apos;s-Degree Advantage</p>
          <h2 id="degree-heading" className="text-h2 mt-4 text-white">
            Education Is Our Starting Standard. Expertise Is What Sets Our Talent Apart.
          </h2>
          <p className="text-lead mt-6">
            We require a completed bachelor&apos;s degree or higher for every professional we hire or place. We also evaluate relevant
            technical skills, communication, experience, and job-specific capabilities.
          </p>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-slate-400">
            A degree does not guarantee competence on its own. It tells us a candidate has completed rigorous study in a relevant
            discipline. The rest of our framework tests whether they can do the job you need done.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/why-choose-us/education-and-qualifications" variant="light" arrow>
              Our education standard
            </ButtonLink>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[1.75rem] bg-white/[0.04] p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">Recruitment framework</p>
              <span className="rounded-full bg-glow/15 px-3 py-1 text-xs font-semibold text-glow">6 stages</span>
            </div>
            <ol className="relative mt-8 space-y-6">
              <span aria-hidden="true" className="absolute bottom-3 left-[1.375rem] top-3 w-px bg-gradient-to-b from-glow via-brand to-transparent" />
              {framework.map(({ icon: I, title, body }, i) => (
                <Reveal as="li" key={title} delay={i * 70} className="relative flex gap-5">
                  <span className="relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-800 text-glow ring-1 ring-white/15">
                    <I aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="pt-1">
                    <p className="font-display font-bold text-white">
                      <span className="mr-2 text-glow/80 tabular-nums">0{i + 1}</span>
                      {title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">{body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <div className="mt-8 flex items-center gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <UserCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-glow" />
              <p className="text-sm text-slate-200">Finalists are then interviewed by you before any placement is confirmed.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { title: "Tell Us What You Need", body: "Describe your business, responsibilities, required skills, working hours, and expectations." },
  { title: "We Identify Qualified Talent", body: "We source and evaluate candidates based on the agreed requirements." },
  { title: "Meet Your Professional", body: "You participate in selecting a suitable professional and confirming the service arrangement." },
  { title: "Work and Grow Together", body: "Your professional supports your business while we provide the agreed administrative and operational support." },
];

export function HowItWorksPreview() {
  return (
    <Section labelledBy="how-heading">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading id="how-heading" eyebrow="How dedicated staffing works" title="Your Dedicated Professional, Without the Complexity." />
        <TextLink href="/how-it-works" className="shrink-0">
          See the full process
        </TextLink>
      </div>
      <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <span aria-hidden="true" className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-brand via-brand-tint to-transparent lg:block" />
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 90} className="relative">
            <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 font-display text-lg font-extrabold text-white shadow-lift">
              {i + 1}
            </span>
            <h3 className="text-h3 mt-6">{s.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed">{s.body}</p>
          </Reveal>
        ))}
      </ol>
      <div className="mt-12">
        <ButtonLink href="/hire-a-professional" arrow>
          Start Building Your Team
        </ButtonLink>
      </div>
    </Section>
  );
}

const comparison: { topic: string; traditional: string; ours: string; mark: "yes" | "partial" }[] = [
  { topic: "Candidate sourcing", traditional: "You post jobs, search platforms, and sort applicants yourself.", ours: "We source candidates against your written requirements.", mark: "yes" },
  { topic: "Qualification assessment", traditional: "Self-reported resumes, varied screening.", ours: "Bachelor's degree minimum plus role-specific assessment.", mark: "yes" },
  { topic: "Recruitment coordination", traditional: "You schedule, follow up, and manage every step.", ours: "We coordinate the process and present finalists.", mark: "yes" },
  { topic: "Dedicated staffing", traditional: "Freelancers often split time across many clients.", ours: "One professional assigned to your business.", mark: "yes" },
  { topic: "Workforce administration", traditional: "You handle contracts, payments, and records directly.", ours: "We handle the administration defined in your agreement.", mark: "yes" },
  { topic: "Operational support", traditional: "Little support if problems arise.", ours: "Ongoing check-ins and help resolving issues.", mark: "yes" },
  { topic: "Scaling capacity", traditional: "Every new hire starts the process from scratch.", ours: "Add professionals across specialties through one partner.", mark: "yes" },
  { topic: "Commercial point of contact", traditional: "Individuals, often across borders.", ours: "A U.S. company and a clear point of contact.", mark: "yes" },
];

export function Comparison() {
  return (
    <Section tone="surface" labelledBy="compare-heading">
      <SectionHeading
        id="compare-heading"
        eyebrow="Why businesses choose us"
        title="A Managed Staffing Model, Not a Job Board."
        description="Compare hiring independent remote workers on your own with working through a dedicated professional staffing partner."
        align="center"
      />
      <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <table className="w-full border-collapse text-left text-[0.9375rem]">
          <caption className="sr-only">Traditional independent hiring compared with Lantern Global&apos;s dedicated staffing model</caption>
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-line">
              <th scope="col" className="w-[22%] px-6 py-5 text-sm font-bold text-ink">
                Topic
              </th>
              <th scope="col" className="px-6 py-5 text-sm font-bold text-muted">
                Traditional Independent Hiring
              </th>
              <th scope="col" className="bg-brand-soft/70 px-6 py-5 text-sm font-bold text-brand-strong">
                Our Dedicated Professional Staffing Model
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.topic} className="block border-b border-line last:border-b-0 md:table-row">
                <th scope="row" className="block px-6 pb-1 pt-5 font-semibold text-ink md:table-cell md:py-5">
                  {row.topic}
                </th>
                <td className="flex items-start gap-2.5 px-6 py-2 text-body md:table-cell md:py-5">
                  <span className="inline-flex items-start gap-2.5">
                    <Minus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                    <span>
                      <span className="sr-only md:hidden">Traditional hiring: </span>
                      {row.traditional}
                    </span>
                  </span>
                </td>
                <td className="flex items-start gap-2.5 bg-brand-soft/40 px-6 pb-5 pt-2 text-ink md:table-cell md:py-5">
                  <span className="inline-flex items-start gap-2.5">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      <span className="sr-only md:hidden">Lantern Global: </span>
                      {row.ours}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-sm text-muted">
        Legal, tax, and HR responsibilities are not eliminated for clients. The division of responsibilities depends on your signed
        agreement and the lawful operating structure for your placement.
      </p>
    </Section>
  );
}

const teamRoles = [
  { title: "Executive Assistant", slug: "virtual-assistance-and-administration/executive-assistant", start: true },
  { title: "Bookkeeper", slug: "accounting-and-finance/bookkeeping-specialist" },
  { title: "Sales Development Representative", slug: "sales-and-marketing/sales-development-representative" },
  { title: "Digital Marketing Specialist", slug: "sales-and-marketing/digital-marketing-specialist" },
  { title: "Operations Coordinator", slug: "business-operations/operations-coordinator" },
  { title: "Software Developer", slug: "technology-and-it/full-stack-software-developer" },
];

export function TeamScaling() {
  return (
    <Section labelledBy="scale-heading">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading
            id="scale-heading"
            eyebrow="Team scaling"
            title="Start With One. Grow Into a Team."
            description="Most clients begin with a single dedicated professional for their most pressing need. Once the working relationship is established, adding roles in other specialties follows the same proven process."
          />
          <ul className="mt-8 space-y-3 text-[0.9375rem] text-ink">
            {["One partner across every specialty", "Consistent onboarding for each new role", "Professionals who can collaborate as a team"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <BadgeCheck aria-hidden="true" className="h-5 w-5 text-brand" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/team-builder" arrow>
              Try the Team Builder
            </ButtonLink>
          </div>
        </div>

        <div className="relative rounded-[1.75rem] border border-line bg-surface p-6 sm:p-8">
          <p className="sr-only">Illustration: your business starting with an executive assistant and growing to six dedicated professionals across specialties.</p>
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 rounded-[inherit] opacity-60" />
          <div className="relative">
            <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-navy-900 px-5 py-3.5 text-white shadow-lift">
              <Users aria-hidden="true" className="h-5 w-5 text-glow" />
              <span className="font-display font-bold">Your Business</span>
            </div>
            <svg aria-hidden="true" className="mx-auto block h-10 w-full max-w-md text-brand/40" viewBox="0 0 400 40" preserveAspectRatio="none">
              <path d="M200 0v20M60 20h280M60 20v20M200 20v20M340 20v20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-dash" />
            </svg>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {teamRoles.map((r, i) => (
                <Reveal as="li" key={r.title} delay={i * 80}>
                  <Link
                    href={`/services/${r.slug}`}
                    className={`group flex h-full flex-col rounded-xl p-4 transition-all hover:-translate-y-0.5 ${
                      r.start ? "bg-brand text-white shadow-glow" : "bg-white text-ink shadow-card ring-1 ring-line hover:ring-brand-tint"
                    }`}
                  >
                    <span className={`text-[0.65rem] font-bold uppercase tracking-wider ${r.start ? "text-white" : "text-muted"}`}>
                      {r.start ? "Start here" : `Add later · ${i + 1}`}
                    </span>
                    <span className="mt-1.5 text-sm font-semibold leading-snug">{r.title}</span>
                  </Link>
                </Reveal>
              ))}
            </ul>
            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-brand" /> Illustrative team. Your roles depend on your needs.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
