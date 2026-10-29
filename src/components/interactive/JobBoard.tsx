"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BriefcaseBusiness, Clock3, GraduationCap, Inbox, MapPin } from "lucide-react";
import type { Job } from "@/content/jobs";

export function JobBoard({ jobs, departments }: { jobs: Job[]; departments: Record<string, string> }) {
  const [dept, setDept] = useState("");
  const [spec, setSpec] = useState("");

  const specs = useMemo(() => Array.from(new Set(jobs.filter((j) => !dept || j.department === dept).map((j) => j.specialization))).sort(), [jobs, dept]);
  const list = jobs.filter((j) => (!dept || j.department === dept) && (!spec || j.specialization === spec));

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-[1.75rem] border border-dashed border-slate-300 bg-surface px-6 py-16 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand ring-1 ring-line">
          <Inbox aria-hidden="true" className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-2xl font-bold">No open positions right now</h2>
        <p className="mx-auto mt-3 max-w-lg leading-relaxed">
          We post roles here as client requirements are confirmed. You are welcome to submit a general application so we can consider you
          for upcoming opportunities in your field.
        </p>
        <Link href="/careers/apply" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand-strong">
          Submit a general application
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="card grid gap-4 p-5 sm:grid-cols-2">
        <div>
          <label htmlFor="job-dept" className="field-label">
            Department
          </label>
          <select
            id="job-dept"
            value={dept}
            onChange={(e) => {
              setDept(e.target.value);
              setSpec("");
            }}
            className="field-input"
          >
            <option value="">All departments</option>
            {Array.from(new Set(jobs.map((j) => j.department))).map((d) => (
              <option key={d} value={d}>
                {departments[d] ?? d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="job-spec" className="field-label">
            Specialization
          </label>
          <select id="job-spec" value={spec} onChange={(e) => setSpec(e.target.value)} className="field-input">
            <option value="">All specializations</option>
            {specs.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted">
        {list.length} {list.length === 1 ? "opening" : "openings"}
      </p>
      <ul className="mt-4 space-y-4">
        {list.map((j) => (
          <li key={j.slug}>
            <article className="card card-interactive relative p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-strong">{departments[j.department] ?? j.department}</p>
              <h2 className="mt-1.5 text-lg font-bold">
                <Link href={`/careers/${j.slug}`} className="after:absolute after:inset-0">
                  {j.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm">{j.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                <li className="flex items-center gap-1.5">
                  <MapPin aria-hidden="true" className="h-4 w-4" /> {j.location} · {j.workplace}
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock3 aria-hidden="true" className="h-4 w-4" /> {j.schedule}
                </li>
                <li className="flex items-center gap-1.5">
                  <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" /> {j.arrangement}
                </li>
                <li className="flex items-center gap-1.5">
                  <GraduationCap aria-hidden="true" className="h-4 w-4" /> {j.requiredDegree}
                </li>
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
