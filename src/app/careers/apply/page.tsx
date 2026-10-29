import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Apply",
  description: "Apply to Lantern Global. A completed bachelor's degree or higher is required for professional positions.",
  path: "/careers/apply",
});

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function ApplyPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const role = (Array.isArray(sp.role) ? sp.role[0] : sp.role)?.slice(0, 160);
  return (
    <div className="bg-surface">
      <div className="container-page py-10 sm:py-14">
        <Breadcrumbs
          className="mb-8"
          items={[
            { name: "Careers", path: "/careers" },
            { name: "Apply", path: "/careers/apply" },
          ]}
        />
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div>
            <p className="eyebrow">Candidate application</p>
            <h1 className="text-h2 mt-3">Apply to Lantern Global</h1>
            <p className="text-lead mt-4 max-w-2xl">
              A completed bachelor&apos;s degree or higher is required for professional positions. This form takes about five minutes.
            </p>
            <div className="mt-10">
              <ApplicationForm role={role} />
            </div>
          </div>
          <aside className="space-y-5 lg:pt-28">
            <div className="card p-6 text-sm leading-relaxed">
              <ShieldCheck aria-hidden="true" className="h-6 w-6 text-brand" />
              <h2 className="mt-3 text-base font-bold">How we handle your information</h2>
              <p className="mt-2">
                We collect only what we need to evaluate your application. Your resume is sent directly to our recruiting team and is not
                published or shared with clients without your knowledge.
              </p>
              <Link href="/privacy#information-for-job-applicants" className="mt-3 inline-flex font-semibold text-brand-strong underline underline-offset-2">
                Applicant privacy notice
              </Link>
            </div>
            <p className="px-1 text-sm">
              Hiring for your business?{" "}
              <Link href="/hire-a-professional" className="font-semibold text-brand-strong underline underline-offset-2">
                Use the client form
              </Link>
              .
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
