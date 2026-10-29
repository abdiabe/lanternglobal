"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { contactSchema, fieldErrors } from "@/lib/forms/schemas";
import { Checkbox, FormAlert, Honeypot, SelectField, SubmitButton, TextArea, TextField, useRenderedAt } from "./Fields";
import { Turnstile } from "./Turnstile";

const topics = ["Staffing inquiry", "Pricing question", "Partnership", "Press or media", "Other"];

export function ContactForm() {
  const renderedAt = useRenderedAt();
  const [v, setV] = useState({ fullName: "", email: "", company: "", phone: "", topic: "", message: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ tone: "error" | "success"; title: string; message: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState("");
  const onToken = useCallback((t: string) => setToken(t), []);

  const set = <K extends keyof typeof v>(k: K) => (val: (typeof v)[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const local = contactSchema.safeParse({ ...v, elapsed: 99999 });
    if (!local.success) {
      setErrors(fieldErrors(local.error));
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, company_url: honeypot, elapsed: Date.now() - renderedAt, turnstileToken: token || undefined }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; code?: string; errors?: Record<string, string> };
      if (res.ok && data.ok) {
        setStatus({ tone: "success", title: "Message received", message: "Thank you. Our team received your message and will follow up." });
        setV({ fullName: "", email: "", company: "", phone: "", topic: "", message: "", consent: false });
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus({
          tone: "error",
          title: data.code === "not_configured" ? "Submissions are not open yet" : "Your message was not sent",
          message: data.message ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({ tone: "error", title: "Your message was not sent", message: "We couldn't reach the server. Check your connection and try again." });
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="card relative grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      {status && (
        <div className="sm:col-span-2">
          <FormAlert tone={status.tone} focus>
            <p className="font-semibold">{status.title}</p>
            <p className="mt-1">{status.message}</p>
          </FormAlert>
        </div>
      )}
      <TextField label="Full name" name="fullName" required value={v.fullName} onChange={set("fullName")} error={errors.fullName} autoComplete="name" maxLength={120} />
      <TextField label="Email" name="email" type="email" inputMode="email" required value={v.email} onChange={set("email")} error={errors.email} autoComplete="email" maxLength={254} />
      <TextField label="Company" name="company" value={v.company} onChange={set("company")} error={errors.company} autoComplete="organization" maxLength={160} />
      <TextField label="Phone" name="phone" type="tel" inputMode="tel" value={v.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" maxLength={40} />
      <SelectField className="sm:col-span-2" label="Topic" name="topic" required value={v.topic} onChange={set("topic")} error={errors.topic} options={topics.map((t) => ({ value: t, label: t }))} />
      <TextArea className="sm:col-span-2" label="Message" name="message" required value={v.message} onChange={set("message")} error={errors.message} maxLength={4000} rows={6} />
      <div className="sm:col-span-2">
        <Checkbox name="consent" checked={v.consent} onChange={set("consent")} error={errors.consent} required>
          I have read the{" "}
          <Link href="/privacy" target="_blank" className="font-semibold text-brand-strong underline underline-offset-2">
            privacy notice
          </Link>{" "}
          and agree that Lantern Global may use this information to respond to me.
        </Checkbox>
      </div>
      <div className="sm:col-span-2">
        <Turnstile onToken={onToken} />
      </div>
      <div className="sm:col-span-2">
        <SubmitButton pending={pending} className="w-full sm:w-auto">
          {pending ? "Sending…" : "Send message"}
        </SubmitButton>
      </div>
    </form>
  );
}
