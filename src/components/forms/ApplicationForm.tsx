"use client";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { CheckCircle2, FileUp, X } from "lucide-react";
import { applicationSchema, fieldErrors, RESUME_MAX_BYTES } from "@/lib/forms/schemas";
import { Checkbox, FormAlert, Honeypot, SubmitButton, TextArea, TextField, useRenderedAt } from "./Fields";
import { Turnstile } from "./Turnstile";
import { cn } from "@/lib/utils";
const ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export function ApplicationForm({ role: initialRole }: {
    role?: string;
}) {
    const renderedAt = useRenderedAt();
    const topRef = useRef<HTMLDivElement>(null);
    const [v, setV] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        degree: "",
        university: "",
        graduationYear: "",
        degreeCompleted: false,
        experience: "",
        skills: "",
        portfolio: "",
        role: initialRole ?? "",
        consent: false,
    });
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState<{
        title: string;
        message: string;
    } | null>(null);
    const [done, setDone] = useState(false);
    const [pending, setPending] = useState(false);
    const [honeypot, setHoneypot] = useState("");
    const [token, setToken] = useState("");
    const onToken = useCallback((t: string) => setToken(t), []);
    const set = <K extends keyof typeof v>(k: K) => (val: (typeof v)[K]) => {
        setV((p) => ({ ...p, [k]: val }));
        if (errors[k])
            setErrors((e) => ({ ...e, [k]: "" }));
    };
    const pickFile = (f: File | null) => {
        setErrors((e) => ({ ...e, resume: "" }));
        if (!f)
            return setFile(null);
        if (f.size > RESUME_MAX_BYTES)
            return setErrors((e) => ({ ...e, resume: "Your resume must be 5 MB or smaller." }));
        if (!/\.(pdf|docx?)$/i.test(f.name))
            return setErrors((e) => ({ ...e, resume: "Please upload a PDF, DOC, or DOCX file." }));
        setFile(f);
    };
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        const local = applicationSchema.safeParse({ ...v, elapsed: 99999 });
        const errs = local.success ? {} : fieldErrors(local.error);
        if (!file)
            errs.resume = "Please attach your resume.";
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setPending(true);
        try {
            const fd = new FormData();
            Object.entries(v).forEach(([k, val]) => fd.append(k, String(val)));
            fd.append("resume", file!);
            fd.append("company_url", honeypot);
            fd.append("elapsed", String(Date.now() - renderedAt));
            if (token)
                fd.append("turnstileToken", token);
            const res = await fetch("/api/apply", { method: "POST", body: fd });
            const data = (await res.json().catch(() => ({}))) as {
                ok?: boolean;
                message?: string;
                code?: string;
                errors?: Record<string, string>;
            };
            if (res.ok && data.ok) {
                setDone(true);
                topRef.current?.scrollIntoView({ behavior: "smooth" });
                return;
            }
            if (data.errors)
                setErrors(data.errors);
            setFormError({
                title: data.code === "not_configured" ? "Applications are not open yet" : "Your application was not submitted",
                message: data.message ?? "Something went wrong. Please try again.",
            });
        }
        catch {
            setFormError({ title: "Your application was not submitted", message: "We couldn't reach the server. Check your connection and try again." });
        }
        finally {
            setPending(false);
        }
    };
    if (done) {
        return (<div ref={topRef} role="status" className="card p-8 text-center sm:p-12">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success">
          <CheckCircle2 aria-hidden="true" className="h-7 w-7"/>
        </span>
        <h2 className="mt-5 text-2xl font-bold">Application received</h2>
        <p className="mx-auto mt-3 max-w-lg leading-relaxed">
          Thank you for applying. Our recruiting team will review your application and contact you by email if your background matches
          a current or upcoming role.
        </p>
        <Link href="/careers/open-positions" className="mt-8 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-line hover:bg-surface">
          View open positions
        </Link>
      </div>);
    }
    return (<div ref={topRef} className="scroll-mt-28">
      <form onSubmit={submit} noValidate className="card relative space-y-8 p-6 sm:p-8">
        <Honeypot value={honeypot} onChange={setHoneypot}/>
        {formError && (<FormAlert tone="error" focus>
            <p className="font-semibold">{formError.title}</p>
            <p className="mt-1">{formError.message}</p>
          </FormAlert>)}

        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-display text-lg font-bold text-ink">About you</legend>
          <TextField label="Full name" name="fullName" required value={v.fullName} onChange={set("fullName")} error={errors.fullName} autoComplete="name" maxLength={120}/>
          <TextField label="Email" name="email" type="email" inputMode="email" required value={v.email} onChange={set("email")} error={errors.email} autoComplete="email" maxLength={254}/>
          <TextField label="Contact number" name="phone" type="tel" inputMode="tel" required value={v.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" maxLength={40} placeholder="+63"/>
          <TextField label="City, region, and country" name="location" required value={v.location} onChange={set("location")} error={errors.location} autoComplete="address-level2" maxLength={120} placeholder="e.g. Quezon City, Metro Manila"/>
        </fieldset>

        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-display text-lg font-bold text-ink">Education</legend>
          <TextField label="Degree title" name="degree" required value={v.degree} onChange={set("degree")} error={errors.degree} maxLength={160} placeholder="e.g. BS Accountancy"/>
          <TextField label="University" name="university" required value={v.university} onChange={set("university")} error={errors.university} maxLength={200}/>
          <TextField label="Graduation year" name="graduationYear" inputMode="numeric" value={v.graduationYear} onChange={set("graduationYear")} error={errors.graduationYear} maxLength={4}/>
          <div className="sm:col-span-2">
            <Checkbox name="degreeCompleted" checked={v.degreeCompleted} onChange={set("degreeCompleted")} error={errors.degreeCompleted} required>
              I have completed a bachelor&apos;s degree or higher.
            </Checkbox>
          </div>
        </fieldset>

        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-display text-lg font-bold text-ink">Experience and skills</legend>
          <TextField className="sm:col-span-2" label="Role applied for" name="role" required value={v.role} onChange={set("role")} error={errors.role} maxLength={160} help="A specific opening or the type of role you are interested in."/>
          <TextArea className="sm:col-span-2" label="Professional experience" name="experience" required value={v.experience} onChange={set("experience")} error={errors.experience} maxLength={3000} rows={5}/>
          <TextArea className="sm:col-span-2" label="Key skills and software" name="skills" required value={v.skills} onChange={set("skills")} error={errors.skills} maxLength={800} rows={3} placeholder="e.g. QuickBooks Online, reconciliations, Excel"/>
          <TextField className="sm:col-span-2" label="Portfolio or LinkedIn" name="portfolio" type="url" inputMode="url" value={v.portfolio} onChange={set("portfolio")} error={errors.portfolio} maxLength={300}/>
          <div className="sm:col-span-2">
            <p className="field-label">
              Resume <span className="text-danger" aria-hidden="true">*</span>
            </p>
            <label htmlFor="resume" className={cn("flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors", errors.resume ? "border-danger bg-danger-soft" : "border-slate-300 bg-surface hover:border-brand hover:bg-brand-soft")}>
              <FileUp aria-hidden="true" className="h-7 w-7 text-brand"/>
              <span className="text-sm font-semibold text-ink">{file ? "Replace file" : "Choose a file"}</span>
              <span className="text-xs text-muted">PDF, DOC, or DOCX up to 5 MB</span>
              <input id="resume" name="resume" type="file" accept={ACCEPT} className="sr-only" aria-invalid={errors.resume ? true : undefined} aria-describedby={errors.resume ? "resume-error" : undefined} onChange={(e) => pickFile(e.target.files?.[0] ?? null)}/>
            </label>
            {file && (<p className="mt-2 flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm text-ink ring-1 ring-line">
                <span className="truncate">{file.name}</span>
                <button type="button" onClick={() => setFile(null)} className="cursor-pointer rounded p-1 text-muted hover:text-danger" aria-label="Remove file">
                  <X aria-hidden="true" className="h-4 w-4"/>
                </button>
              </p>)}
            {errors.resume && (<p id="resume-error" className="field-error">
                {errors.resume}
              </p>)}
          </div>
        </fieldset>

        <div className="space-y-4 border-t border-line pt-6">
          <p className="text-sm text-muted">
            Please do not upload government IDs, transcripts, or other sensitive documents here. If additional verification is needed later
            in the process, we will request it through a secure channel.
          </p>
          <Checkbox name="consent" checked={v.consent} onChange={set("consent")} error={errors.consent} required>
            I have read the{" "}
            <Link href="/privacy#information-for-job-applicants" target="_blank" className="font-semibold text-brand-strong underline underline-offset-2">
              applicant privacy notice
            </Link>{" "}
            and agree that Lantern Global may use my information to evaluate me for current and future roles.
          </Checkbox>
          <Turnstile onToken={onToken}/>
          <SubmitButton pending={pending} className="w-full sm:w-auto">
            {pending ? "Submitting…" : "Submit application"}
          </SubmitButton>
        </div>
      </form>
    </div>);
}
