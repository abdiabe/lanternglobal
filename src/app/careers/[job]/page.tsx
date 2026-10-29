import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BriefcaseBusiness, Clock3, GraduationCap, MapPin, Wallet } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList, TagList } from "@/components/sections/Shared";
import { JsonLd } from "@/components/ui/JsonLd";
import { getDivision } from "@/content/divisions";
import { getJob, jobs } from "@/content/jobs";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ job: string }>;

export function generateStaticParams() {
  return jobs.map((j) => ({ job: j.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { job } = await params;
  const j = getJob(job);
  if (!j) return { title: "Position not found", robots: { index: false } };
  return buildMetadata({ title: `${j.title} (${j.workplace})`, description: j.summary, path: `/careers/${j.slug}` });
}

export default async function JobPage({ params }: { params: Params }) {
  const { job } = await params;
  const j = getJob(job);
  if (!j) notFound();
  const dept = getDivision(j.department);
  const comp = j.compensation
    ? `${j.compensation.currency} ${j.compensation.min.toLocaleString()} to ${j.compensation.max.toLocaleString()} per ${j.compensation.period.toLowerCase()}`
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description: `<p>${j.summary}</p><ul>${j.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    datePosted: j.datePosted,
    ...(j.validThrough ? { validThrough: j.validThrough } : {}),
    employmentType: j.arrangement === "Employee" ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: { "@type": "Organization", name: site.legalName ?? site.name, sameAs: site.url },
    educationRequirements: { "@type": "EducationalOccupationalCredential", credentialCategory: "bachelor degree" },
    ...(j.workplace === "Remote"
      ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Philippines" } }
      : { jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: j.location, addressCountry: "PH" } } }),
    ...(j.compensation
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: j.compensation.currency,
            value: { "@type": "QuantitativeValue", minValue: j.compensation.min, maxValue: j.compensation.max, unitText: j.compensation.period },
          },
        }
      : {}),
  };

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Careers", path: "/careers" },
          { name: "Open Positions", path: "/careers/open-positions" },
          { name: j.title, path: `/careers/${j.slug}` },
        ]}
        eyebrow={dept?.shortName ?? "Open position"}
        title={j.title}
        description={j.summary}
        actions={
          <ButtonLink href={`/careers/apply?role=${encodeURIComponent(j.title)}`} size="lg" arrow>
            Apply for this role
          </ButtonLink>
        }
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <div>
              <h2 className="text-h3">Responsibilities</h2>
              <CheckList items={j.responsibilities} className="mt-5" />
            </div>
            <div>
              <h2 className="text-h3">Qualifications</h2>
              <CheckList items={j.qualifications} className="mt-5" />
            </div>
            <div>
              <h2 className="text-h3">Required skills</h2>
              <div className="mt-5">
                <TagList items={j.skills} label="Required skills" />
              </div>
            </div>
          </div>
          <aside className="card h-fit space-y-4 p-6 text-[0.9375rem]">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="h-5 w-5 text-brand" /> {j.location} · {j.workplace}
            </p>
            <p className="flex gap-3">
              <Clock3 aria-hidden="true" className="h-5 w-5 text-brand" /> {j.schedule}
            </p>
            <p className="flex gap-3">
              <BriefcaseBusiness aria-hidden="true" className="h-5 w-5 text-brand" /> {j.arrangement} · {j.experience}
            </p>
            <p className="flex gap-3">
              <GraduationCap aria-hidden="true" className="h-5 w-5 text-brand" /> {j.requiredDegree}
            </p>
            {comp && (
              <p className="flex gap-3">
                <Wallet aria-hidden="true" className="h-5 w-5 text-brand" /> {comp}
              </p>
            )}
            <p className="text-sm text-muted">Posted {formatDate(j.datePosted)}</p>
            <ButtonLink href={`/careers/apply?role=${encodeURIComponent(j.title)}`} className="w-full">
              Apply now
            </ButtonLink>
          </aside>
        </div>
      </Section>
      <JsonLd data={jsonLd} />
    </>
  );
}
