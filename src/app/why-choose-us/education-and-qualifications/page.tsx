import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Briefcase, FileCheck2, GraduationCap, MessagesSquare, Sprout, Target } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading, Reveal } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { InfoNote } from "@/components/sections/Shared";
import { getSpecialtyBySlug } from "@/content/divisions";
import { buildMetadata } from "@/lib/seo";
import { operations } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Education & Qualification Standards",
  description:
    "Every Lantern Global professional holds a completed bachelor's degree or higher. Learn how we combine education with role-specific skills, communication, and experience.",
  path: "/why-choose-us/education-and-qualifications",
});

const pillars = [
  { icon: GraduationCap, title: "University education", body: "Candidates must hold a completed bachelor's degree or higher from a recognized institution. This is our minimum requirement for every professional placement." },
  { icon: Target, title: "Relevant specialization", body: "We look at how a candidate's academic background relates to the intended role, for example accountancy for bookkeeping or civil engineering for estimating." },
  { icon: BookOpenCheck, title: "Practical skills", body: "Candidates demonstrate that they can perform real job tasks through exercises designed around the role and the tools it uses." },
  { icon: MessagesSquare, title: "Professional communication", body: "Written and spoken communication is assessed against what the role and client actually require, from email-only work to client-facing calls." },
  { icon: Briefcase, title: "Relevant experience", body: "Specialized positions require appropriate professional experience. Entry-level roles focus more heavily on demonstrated skills and potential." },
];

const mapping = [
  ["BS Computer Science", "full-stack-software-developer", "Software Developer"],
  ["BS Accountancy", "bookkeeping-specialist", "Bookkeeping Specialist"],
  ["BS Legal Management", "paralegal-assistant", "Paralegal Assistant"],
  ["BS Nursing", "medical-virtual-assistant", "Healthcare Administrative Specialist"],
  ["BS Civil Engineering", "construction-estimator", "Construction Estimator"],
  ["BSBA Marketing Management", "digital-marketing-specialist", "Digital Marketing Specialist"],
  ["BS Information Systems", "data-analyst", "Data Analyst"],
  ["BS Psychology", "talent-acquisition-specialist", "Recruitment Specialist"],
  ["BS Architecture", "revit-bim-modeler", "BIM Modeler"],
  ["Bachelor of Multimedia Arts", "video-editor", "Video Editor"],
] as const;

export default function EducationPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Why Choose Us", path: "/why-choose-us" },
          { name: "Education & Qualifications", path: "/why-choose-us/education-and-qualifications" },
        ]}
        eyebrow="Education and qualifications"
        title="A Higher Standard Starts With Higher Education."
        description="Our professional workforce is built around a clear educational requirement: a completed bachelor's degree or higher, combined with role-specific skills and professional capability."
        photo="team-conference-room"
        actions={
          <ButtonLink href="/hire-a-professional" size="lg" arrow>
            Find a Qualified Professional
          </ButtonLink>
        }
      />

      <Section labelledBy="pillars-heading">
        <SectionHeading
          id="pillars-heading"
          eyebrow="What we evaluate"
          title="Education Opens the Door. Capability Earns the Placement."
          description="A degree tells us a candidate completed rigorous study in a relevant field. It does not, on its own, prove they can do your job. That is why it is the starting point of our evaluation, not the end."
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: I, title, body }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 60} className="card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-strong ring-1 ring-brand-tint">
                <I aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed">{body}</p>
            </Reveal>
          ))}
          <Reveal as="li" delay={120} className="card border-dashed bg-surface p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-strong ring-1 ring-line">
              <FileCheck2 aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-lg font-bold">Credential verification</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed">
              {operations.degreeVerificationActive
                ? "Degrees are verified with the issuing institution or an approved verification service before placement."
                : "Credential verification is part of the recruitment standard we are establishing. The specific verification steps that apply to your placement are confirmed with you in writing before you make a decision."}
            </p>
          </Reveal>
        </ul>
      </Section>

      <Section tone="surface" labelledBy="mapping-heading">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              id="mapping-heading"
              eyebrow="Degree to role"
              title="How Academic Backgrounds Map to Specialties"
              description="Examples of how a relevant degree aligns with a specialty. Related fields can qualify when paired with demonstrated skills."
            />
            <ButtonLink href="/services/directory" variant="secondary" className="mt-8" arrow>
              Search by degree background
            </ButtonLink>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <table className="w-full text-left text-[0.9375rem]">
              <caption className="sr-only">Examples of bachelor&apos;s degrees and the specialties they align with</caption>
              <thead className="bg-navy-900 text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 text-sm font-semibold">
                    Bachelor&apos;s degree
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-semibold">
                    Example specialty
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {mapping.map(([deg, slug, label]) => {
                  const s = getSpecialtyBySlug(slug);
                  return (
                    <tr key={deg} className="hover:bg-surface">
                      <td className="px-5 py-3.5 font-medium text-ink">
                        <span className="inline-flex items-center gap-2">
                          <GraduationCap aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
                          {deg}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {s ? (
                          <Link href={s.href} className="group inline-flex items-center gap-1.5 font-medium text-brand-strong hover:underline">
                            {label}
                            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        ) : (
                          label
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section labelledBy="growth-heading">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent ring-1 ring-teal-100">
            <Sprout aria-hidden="true" className="h-7 w-7" />
          </span>
          <div>
            <h2 id="growth-heading" className="text-h2">
              Ongoing Professional Development
            </h2>
            <p className="text-lead mt-4">
              Our goal is a workforce that keeps getting better: professionals who stay current with the tools they use, deepen their
              specialties, and grow into larger responsibilities with their clients.
            </p>
            <p className="mt-4 leading-relaxed">
              We intend to support that growth through feedback, shared resources, and encouragement of relevant certifications. These
              are company goals, and we will describe specific training programs only once they are in place.
            </p>
            <InfoNote className="mt-6">
              Nursing, legal, accounting, and engineering graduates work in support roles only. Degrees do not authorize anyone to
              practice a licensed profession in the United States. See each division page for scope details.
            </InfoNote>
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Find a Qualified Professional"
        description="Tell us the role and the academic background you'd value most. We'll explain how we'd approach the search."
        primaryLabel="Find a Qualified Professional"
      />
    </>
  );
}
