"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, X } from "lucide-react";
import { inquiryStep1, inquiryStep2, inquiryStep3, inquiryStep4, fieldErrors } from "@/lib/forms/schemas";
import { Checkbox, FormAlert, Honeypot, RadioGroup, SelectField, SubmitButton, TextArea, TextField, useRenderedAt } from "./Fields";
import { Turnstile } from "./Turnstile";
import { cn } from "@/lib/utils";

export interface InquiryOptions {
  divisions: { value: string; label: string; specialties: { value: string; label: string }[] }[];
  industries: string[];
  roleTitles: Record<string, string>;
}

export interface InquiryInitial {
  division?: string;
  specialty?: string;
  industry?: string;
  roles?: string[];
  intent?: string;
}

type Values = {
  fullName: string;
  email: string;
  company: string;
  website: string;
  phone: string;
  industry: string;
  division: string;
  specialty: string;
  headcount: string;
  experience: string;
  software: string;
  responsibilities: string;
  roles: string;
  arrangement: string;
  timezone: string;
  hours: string;
  startDate: string;
  budget: string;
  details: string;
  contactMethod: string;
  consent: boolean;
  intent: string;
};

const STEPS = [
  { title: "Company", schema: inquiryStep1, fields: ["fullName", "email", "company", "website", "phone", "industry"] },
  { title: "Staffing needs", schema: inquiryStep2, fields: ["division", "specialty", "headcount", "experience", "software", "responsibilities", "roles"] },
  { title: "Working arrangement", schema: inquiryStep3, fields: ["arrangement", "timezone", "hours", "startDate", "budget"] },
  { title: "Details", schema: inquiryStep4, fields: ["details", "contactMethod", "consent", "intent"] },
] as const;

const intents: Record<string, string> = {
  consultation: "Consultation request",
  quote: "Quote request",
};

export function InquiryForm({ options, initial }: { options: InquiryOptions; initial: InquiryInitial }) {
  const renderedAt = useRenderedAt();
  const topRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<{ message: string; notConfigured?: boolean } | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);

  const initialDivision =
    initial.division ??
    (initial.specialty ? options.divisions.find((d) => d.specialties.some((s) => s.value === initial.specialty))?.value : undefined) ??
    (initial.roles?.length ? "multiple" : "");

  const [v, setV] = useState<Values>({
    fullName: "",
    email: "",
    company: "",
    website: "",
    phone: "",
    industry: initial.industry ?? "",
    division: initialDivision ?? "",
    specialty: initial.specialty ?? "",
    headcount: initial.roles?.length ? (initial.roles.length >= 6 ? "6+" : initial.roles.length >= 4 ? "4-5" : initial.roles.length >= 2 ? "2-3" : "1") : "",
    experience: "",
    software: "",
    responsibilities: "",
    roles: (initial.roles ?? []).map((r) => options.roleTitles[r] ?? r).join(", "),
    arrangement: "",
    timezone: "",
    hours: "",
    startDate: "",
    budget: "",
    details: "",
    contactMethod: "",
    consent: false,
    intent: initial.intent && intents[initial.intent] ? intents[initial.intent] : "",
  });

  const set = <K extends keyof Values>(k: K) => (val: Values[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k as string]: "" }));
  };

  const specialtyOptions = useMemo(() => {
    if (v.division && v.division !== "multiple" && v.division !== "not-sure") {
      return options.divisions.find((d) => d.value === v.division)?.specialties ?? [];
    }
    return [];
  }, [v.division, options.divisions]);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const validateStep = (i: number) => {
    const r = STEPS[i].schema.safeParse(v);
    if (r.success) return true;
    setErrors(fieldErrors(r.error));
    return false;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setErrors({});
    setStep((s) => s + 1);
    scrollTop();
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
    scrollTop();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (step < STEPS.length - 1) return next();
    if (!validateStep(step)) return;
    setPending(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...v,
          division: options.divisions.find((d) => d.value === v.division)?.label ?? (v.division === "multiple" ? "Multiple specialties" : "Not sure yet"),
          specialty: specialtyOptions.find((s) => s.value === v.specialty)?.label ?? v.specialty,
          company_url: honeypot,
          elapsed: Date.now() - renderedAt,
          turnstileToken: token || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; code?: string; errors?: Record<string, string> };
      if (res.ok && data.ok) {
        setDone(true);
        scrollTop();
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        const firstStep = STEPS.findIndex((s) => s.fields.some((f) => data.errors?.[f]));
        if (firstStep >= 0) setStep(firstStep);
      }
      setFormError({ message: data.message ?? "Something went wrong. Please try again.", notConfigured: data.code === "not_configured" });
    } catch {
      setFormError({ message: "We couldn't reach the server. Check your connection and try again." });
    } finally {
      setPending(false);
    }
  };

  if (done) {
    return (
      <div ref={topRef} className="card p-8 text-center sm:p-12" role="status">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success">
          <CheckCircle2 aria-hidden="true" className="h-7 w-7" />
        </span>
        <h2 className="text-h3 mt-5 text-2xl">Thank you. Your inquiry was received.</h2>
        <p className="mx-auto mt-3 max-w-lg leading-relaxed">
          We&apos;ll review your requirements and contact you by your preferred method to discuss next steps. A copy of your inquiry was
          delivered to our team.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/how-it-works" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-line hover:bg-surface">
            See what happens next
          </Link>
          <Link href="/blog" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-line hover:bg-surface">
            Read the blog
          </Link>
        </div>
      </div>
    );
  }

  const divisionOptions = [
    ...options.divisions.map((d) => ({ value: d.value, label: d.label })),
    { value: "multiple", label: "Multiple specialties or a team" },
    { value: "not-sure", label: "Not sure yet" },
  ];

  return (
    <div ref={topRef} className="scroll-mt-28">
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-2" aria-current={i === step ? "step" : undefined}>
            <span className={cn("h-1.5 rounded-full transition-colors", i <= step ? "bg-brand" : "bg-line")} />
            <span className={cn("flex items-center gap-1.5 text-xs font-semibold", i === step ? "text-brand-strong" : i < step ? "text-ink" : "text-muted")}>
              {i < step ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <span className="tabular-nums">{i + 1}.</span>}
              <span className="hidden sm:inline">{s.title}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {STEPS.length}: {STEPS[step].title}
      </p>

      <form onSubmit={submit} noValidate className="card relative p-6 sm:p-8">
        <Honeypot value={honeypot} onChange={setHoneypot} />
        <h2 className="text-h3">
          <span className="text-brand-strong">Step {step + 1} of 4.</span> {STEPS[step].title}
        </h2>

        {formError && (
          <div className="mt-6">
            <FormAlert tone="error" focus>
              <p className="font-semibold">{formError.notConfigured ? "Submissions are not open yet" : "Your inquiry was not sent"}</p>
              <p className="mt-1">{formError.message}</p>
            </FormAlert>
          </div>
        )}

        {v.intent && step === 0 && (
          <div className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand-strong ring-1 ring-brand-tint">
            <span className="font-semibold">{v.intent}</span>
            <button type="button" onClick={() => set("intent")("")} className="cursor-pointer rounded-full p-1 hover:bg-white" aria-label="Remove request type">
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {step === 0 && (
            <>
              <TextField label="Full name" name="fullName" required value={v.fullName} onChange={set("fullName")} error={errors.fullName} autoComplete="name" maxLength={120} />
              <TextField label="Business email" name="email" type="email" inputMode="email" required value={v.email} onChange={set("email")} error={errors.email} autoComplete="email" maxLength={254} />
              <TextField label="Company name" name="company" required value={v.company} onChange={set("company")} error={errors.company} autoComplete="organization" maxLength={160} />
              <TextField label="Company website" name="website" type="url" inputMode="url" value={v.website} onChange={set("website")} error={errors.website} autoComplete="url" placeholder="example.com" maxLength={300} />
              <TextField label="Phone number" name="phone" type="tel" inputMode="tel" value={v.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" maxLength={40} />
              <SelectField label="Industry" name="industry" required value={v.industry} onChange={set("industry")} error={errors.industry} options={options.industries.map((i) => ({ value: i, label: i }))} />
            </>
          )}

          {step === 1 && (
            <>
              <SelectField
                label="Service division"
                name="division"
                required
                value={v.division}
                onChange={(val) => {
                  set("division")(val);
                  set("specialty")("");
                }}
                error={errors.division}
                options={divisionOptions}
              />
              <SelectField
                label="Specialty"
                name="specialty"
                value={v.specialty}
                onChange={set("specialty")}
                error={errors.specialty}
                options={specialtyOptions}
                placeholder={specialtyOptions.length ? "Select a specialty" : "Choose a division first"}
              />
              {v.roles && (
                <div className="sm:col-span-2">
                  <p className="field-label">Roles from your team plan</p>
                  <p className="rounded-xl bg-surface px-4 py-3 text-sm text-ink ring-1 ring-line">{v.roles}</p>
                </div>
              )}
              <SelectField
                label="Number of professionals"
                name="headcount"
                required
                value={v.headcount}
                onChange={set("headcount")}
                error={errors.headcount}
                options={[
                  { value: "1", label: "1" },
                  { value: "2-3", label: "2 to 3" },
                  { value: "4-5", label: "4 to 5" },
                  { value: "6+", label: "6 or more" },
                  { value: "Not sure", label: "Not sure yet" },
                ]}
              />
              <SelectField
                label="Required experience"
                name="experience"
                required
                value={v.experience}
                onChange={set("experience")}
                error={errors.experience}
                options={[
                  { value: "Entry level", label: "Entry level" },
                  { value: "Mid-level (2 to 5 years)", label: "Mid-level (2 to 5 years)" },
                  { value: "Senior (5+ years)", label: "Senior (5+ years)" },
                  { value: "Open to recommendations", label: "Open to recommendations" },
                ]}
              />
              <TextField
                className="sm:col-span-2"
                label="Important software skills"
                name="software"
                value={v.software}
                onChange={set("software")}
                error={errors.software}
                placeholder="e.g. QuickBooks Online, HubSpot, AppFolio"
                maxLength={400}
              />
              <TextArea
                className="sm:col-span-2"
                label="Primary responsibilities"
                name="responsibilities"
                required
                value={v.responsibilities}
                onChange={set("responsibilities")}
                error={errors.responsibilities}
                maxLength={3000}
                rows={5}
                help="What would this professional do in a typical week?"
              />
            </>
          )}

          {step === 2 && (
            <>
              <RadioGroup
                className="sm:col-span-2"
                label="Full-time or part-time"
                name="arrangement"
                required
                value={v.arrangement}
                onChange={set("arrangement")}
                error={errors.arrangement}
                options={[
                  { value: "Full-time", label: "Full-time" },
                  { value: "Part-time", label: "Part-time" },
                  { value: "Not sure yet", label: "Not sure yet", hint: "We can recommend based on the workload" },
                ]}
              />
              <SelectField
                label="Preferred U.S. time zone"
                name="timezone"
                required
                value={v.timezone}
                onChange={set("timezone")}
                error={errors.timezone}
                options={["Eastern", "Central", "Mountain", "Pacific", "Alaska", "Hawaii", "Flexible or partial overlap"].map((t) => ({ value: t, label: t }))}
              />
              <TextField label="Desired working hours" name="hours" value={v.hours} onChange={set("hours")} error={errors.hours} placeholder="e.g. 9am to 5pm ET, Mon to Fri" maxLength={120} />
              <SelectField
                label="Expected start date"
                name="startDate"
                value={v.startDate}
                onChange={set("startDate")}
                error={errors.startDate}
                options={["As soon as possible", "Within 1 month", "In 1 to 3 months", "In 3+ months", "Just exploring"].map((t) => ({ value: t, label: t }))}
              />
              <SelectField
                label="Monthly budget range"
                name="budget"
                value={v.budget}
                onChange={set("budget")}
                error={errors.budget}
                options={["Under $1,500", "$1,500 to $3,000", "$3,000 to $5,000", "$5,000 to $10,000", "Over $10,000", "Prefer to discuss"].map((t) => ({ value: t, label: t }))}
                help="Optional. Helps us recommend realistic options."
              />
            </>
          )}

          {step === 3 && (
            <>
              <TextArea
                className="sm:col-span-2"
                label="Anything else we should know?"
                name="details"
                value={v.details}
                onChange={set("details")}
                error={errors.details}
                maxLength={4000}
                rows={5}
                help="Requirements, compliance considerations, questions, or context."
              />
              <RadioGroup
                className="sm:col-span-2"
                label="Preferred contact method"
                name="contactMethod"
                required
                value={v.contactMethod}
                onChange={set("contactMethod")}
                error={errors.contactMethod}
                options={[
                  { value: "Email", label: "Email" },
                  { value: "Phone", label: "Phone", hint: v.phone ? undefined : "Please add a phone number in step 1" },
                  { value: "Video call", label: "Video call" },
                ]}
              />
              <div className="rounded-xl bg-surface p-4 text-sm ring-1 ring-line sm:col-span-2">
                <p className="font-semibold text-ink">Summary</p>
                <dl className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                  {[
                    ["Company", v.company],
                    ["Industry", v.industry],
                    ["Division", divisionOptions.find((d) => d.value === v.division)?.label],
                    ["Specialty", specialtyOptions.find((s) => s.value === v.specialty)?.label],
                    ["Professionals", v.headcount],
                    ["Arrangement", `${v.arrangement}${v.timezone ? `, ${v.timezone}` : ""}`],
                  ]
                    .filter(([, val]) => val)
                    .map(([k, val]) => (
                      <div key={k} className="flex gap-2">
                        <dt className="text-muted">{k}:</dt>
                        <dd className="font-medium text-ink">{val}</dd>
                      </div>
                    ))}
                </dl>
              </div>
              <div className="sm:col-span-2">
                <Checkbox name="consent" checked={v.consent} onChange={set("consent")} error={errors.consent} required>
                  I have read the{" "}
                  <Link href="/privacy" target="_blank" className="font-semibold text-brand-strong underline underline-offset-2">
                    privacy notice
                  </Link>{" "}
                  and agree that Lantern Global may use this information to respond to my inquiry.
                </Checkbox>
              </div>
              <div className="sm:col-span-2">
                <Turnstile onToken={onToken} />
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={back} className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 font-semibold text-ink ring-1 ring-line hover:bg-surface">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <button type="submit" className="inline-flex min-h-[3.25rem] cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 font-semibold text-white hover:bg-brand-strong">
              Continue <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : (
            <SubmitButton pending={pending}>{pending ? "Sending…" : "Submit inquiry"}</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}
