import type { Metadata } from "next";
import { AlertOctagon, FileLock2, KeyRound, Laptop, LogOut, Mail, ShieldCheck, Signature, UserCog, FileText, Scale, ClipboardList } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BoundaryNote, InfoNote } from "@/components/sections/Shared";
import { operations } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Security & Confidentiality",
  description:
    "How Lantern Global approaches role-based access, confidentiality agreements, device security, offboarding, and data protection, with a clear distinction between active controls and policies in development.",
  path: "/security",
});

type Status = "client" | "standard" | "developing";

const statusLabel: Record<Status, string> = {
  client: "Controlled by you",
  standard: "Our policy",
  developing: "Policy in development",
};

const topics: { icon: typeof ShieldCheck; title: string; body: string; status: Status }[] = [
  { icon: KeyRound, title: "Role-based access", body: "Professionals use individual accounts created in your systems with only the permissions their role requires. Shared logins are discouraged.", status: "client" },
  { icon: Signature, title: "Confidentiality agreements", body: "Professionals sign confidentiality obligations covering client information before they start work.", status: "standard" },
  { icon: Mail, title: "Secure communication", body: "Work communication happens in your approved channels, such as your email domain, Slack, or Teams, rather than personal accounts.", status: "client" },
  { icon: UserCog, title: "Business account management", body: "Accounts belong to your organization. You can audit, change, or revoke them at any time.", status: "client" },
  { icon: Laptop, title: "Device security", body: "Baseline device requirements such as supported operating systems, screen locks, disk encryption, and up-to-date antivirus are being formalized as a written policy.", status: "developing" },
  { icon: FileLock2, title: "Data handling responsibilities", body: "Rules on where data may be stored, downloaded, or printed are set per client and documented during onboarding.", status: "standard" },
  { icon: ClipboardList, title: "Client onboarding", body: "Access needs, tools, and data rules are documented in a checklist before work begins.", status: "standard" },
  { icon: LogOut, title: "Access removal", body: "When an assignment ends, access should be revoked on the last day. Your administrators can remove access instantly, and our offboarding checklist covers our side.", status: "standard" },
  { icon: AlertOctagon, title: "Incident escalation", body: "A written escalation path for suspected security incidents, including notification timelines, is being formalized and will be included in client agreements.", status: "developing" },
  { icon: FileText, title: "Privacy policies", body: "Our website privacy policy explains how we handle inquiry and applicant data. It is pending legal review before launch.", status: "developing" },
  { icon: Scale, title: "Contractual data protection", body: "Confidentiality, data protection, and intellectual property terms are part of every service agreement. Regulated industries may require additional agreements.", status: "standard" },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Security", path: "/security" }]}
        eyebrow="Security and confidentiality"
        title="Protecting Your Information Is Part of the Job."
        description="Remote professionals often work inside your systems and see confidential information. Here's how we approach that responsibility, stated honestly, including what is still being formalized."
        tone="dark"
      />

      <Section labelledBy="controls-heading">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="controls-heading"
            eyebrow="Our approach"
            title="Safeguards and Their Status"
            description="Lantern Global is a new company. Items marked “Our policy” are commitments we apply to every placement. Items marked “Policy in development” are still being written and will be shared in writing once finalized. Items marked “Controlled by you” rely on settings in your own systems."
          />
          <ul className="flex flex-wrap gap-2 text-xs font-semibold" aria-label="Legend">
            {(Object.keys(statusLabel) as Status[]).map((s) => (
              <li key={s} className={cn("rounded-full px-3 py-1.5", badge(s))}>
                {statusLabel[s]}
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topics.map(({ icon: I, title, body, status }) => (
            <li key={title} className="card flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <I aria-hidden="true" className="h-6 w-6 text-brand" strokeWidth={1.75} />
                <span className={cn("rounded-full px-2.5 py-1 text-[0.7rem] font-semibold", badge(status))}>{statusLabel[status]}</span>
              </div>
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="claims-heading">
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="claims-heading" eyebrow="What we do not claim" title="Certifications and Guarantees" />
          <p className="mt-5 text-[1.0625rem] leading-relaxed">
            Lantern Global does not currently hold, and does not claim, any of the following: SOC 2 attestation, ISO 27001
            certification, HIPAA certification, a fully audited security infrastructure, government approval, or specific insurance
            coverage. We also do not guarantee legal compliance on your behalf or claim a record of zero security incidents.
          </p>
          <BoundaryNote title="Regulated industries" className="mt-8">
            Healthcare, legal, financial, and other regulated clients may need additional agreements and safeguards, such as a Business
            Associate Agreement for protected health information
            {operations.hipaaProgramDocumented ? "." : ", before any access is granted."} We will review your requirements with you and
            your compliance advisors before work begins.
          </BoundaryNote>
          <InfoNote className="mt-6">
            Recommendation: keep sensitive data in your own systems, grant least-privilege access, enable multi-factor authentication,
            and review access regularly. These practices protect you regardless of who your staffing partner is.
          </InfoNote>
        </div>
      </Section>

      <CtaBanner title="Have Specific Security Requirements?" description="Tell us about your environment and obligations. We'll discuss how a placement can be structured around them." primaryLabel="Speak With Our Team" primaryHref="/contact" showConsultation={false} />
    </>
  );
}

function badge(s: Status) {
  return s === "client"
    ? "bg-brand-soft text-brand-strong ring-1 ring-brand-tint"
    : s === "standard"
      ? "bg-success-soft text-success ring-1 ring-emerald-200"
      : "bg-amber-50 text-amber-800 ring-1 ring-amber-200";
}
