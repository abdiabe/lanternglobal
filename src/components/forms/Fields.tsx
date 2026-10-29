"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  help?: ReactNode;
  required?: boolean;
  className?: string;
}

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="field-label">
      {label}
      {required ? (
        <span className="ml-0.5 text-danger" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-1.5 text-xs font-normal text-muted">(optional)</span>
      )}
    </label>
  );
}

function Meta({ id, error, help }: { id: string; error?: string; help?: ReactNode }) {
  return (
    <>
      {help && !error && (
        <p id={`${id}-help`} className="field-help">
          {help}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error flex items-center gap-1.5">
          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /> {error}
        </p>
      )}
    </>
  );
}

function describedBy(id: string, error?: string, help?: ReactNode) {
  return error ? `${id}-error` : help ? `${id}-help` : undefined;
}

export function TextField({
  label,
  name,
  error,
  help,
  required,
  className,
  type = "text",
  value,
  onChange,
  onBlur,
  autoComplete,
  placeholder,
  inputMode,
  maxLength,
}: BaseProps & {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric";
  maxLength?: number;
}) {
  const id = useId();
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, help)}
        className="field-input"
      />
      <Meta id={id} error={error} help={help} />
    </div>
  );
}

export function TextArea({
  label,
  name,
  error,
  help,
  required,
  className,
  value,
  onChange,
  onBlur,
  rows = 4,
  maxLength,
  placeholder,
}: BaseProps & { value: string; onChange: (v: string) => void; onBlur?: () => void; rows?: number; maxLength?: number; placeholder?: string }) {
  const id = useId();
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, help)}
        className="field-input min-h-[7rem] resize-y"
      />
      <div className="flex justify-between gap-4">
        <Meta id={id} error={error} help={help} />
        {maxLength && <p className="field-help ml-auto shrink-0 tabular-nums">{value.length.toLocaleString()} / {maxLength.toLocaleString()}</p>}
      </div>
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  help,
  required,
  className,
  value,
  onChange,
  options,
  placeholder = "Select an option",
}: BaseProps & {
  value: string;
  onChange: (v: string) => void;
  options: ({ value: string; label: string } | { group: string; options: { value: string; label: string }[] })[];
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <Label id={id} label={label} required={required} />
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, help)}
        className="field-input cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((o) =>
          "group" in o ? (
            <optgroup key={o.group} label={o.group}>
              {o.options.map((x) => (
                <option key={x.value} value={x.value}>
                  {x.label}
                </option>
              ))}
            </optgroup>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ),
        )}
      </select>
      <Meta id={id} error={error} help={help} />
    </div>
  );
}

export function RadioGroup({
  label,
  name,
  error,
  required,
  className,
  value,
  onChange,
  options,
}: BaseProps & { value: string; onChange: (v: string) => void; options: { value: string; label: string; hint?: string }[] }) {
  const id = useId();
  return (
    <fieldset className={className} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="field-label">
        {label}
        {required && (
          <span className="ml-0.5 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className="mt-1 grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors",
              value === o.value ? "border-brand bg-brand-soft ring-1 ring-brand" : "border-slate-300 bg-white hover:border-slate-400",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="mt-0.5 h-4 w-4 accent-[var(--color-brand)]"
            />
            <span>
              <span className="block font-semibold text-ink">{o.label}</span>
              {o.hint && <span className="mt-0.5 block text-xs text-muted">{o.hint}</span>}
            </span>
          </label>
        ))}
      </div>
      <Meta id={id} error={error} />
    </fieldset>
  );
}

export function Checkbox({
  name,
  checked,
  onChange,
  error,
  children,
  required,
}: {
  name: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
          aria-required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded accent-[var(--color-brand)]"
        />
        <span>{children}</span>
      </label>
      <Meta id={id} error={error} />
    </div>
  );
}

/** Hidden honeypot field. Labeled for screen readers to skip; bots tend to fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="company_url" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}

export function FormAlert({ tone, children, focus }: { tone: "error" | "success" | "info"; children: ReactNode; focus?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focus) ref.current?.focus();
  }, [focus]);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-xl p-4 text-sm leading-relaxed outline-none",
        tone === "error" && "bg-danger-soft text-danger ring-1 ring-red-200",
        tone === "success" && "bg-success-soft text-success ring-1 ring-emerald-200",
        tone === "info" && "bg-brand-soft text-slate-700 ring-1 ring-brand-tint",
      )}
    >
      {tone === "success" ? <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0" /> : <AlertCircle aria-hidden="true" className="h-5 w-5 shrink-0" />}
      <div>{children}</div>
    </div>
  );
}

export function SubmitButton({ pending, children, className }: { pending: boolean; children: ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn(
        "inline-flex min-h-[3.25rem] cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 font-semibold text-white shadow-[0_8px_20px_-8px_rgb(37_99_235/0.6)] transition-colors hover:bg-brand-strong disabled:cursor-wait disabled:opacity-70",
        className,
      )}
    >
      {pending && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

/** Tracks when the form was rendered so the server can reject instant bot submissions. */
export function useRenderedAt() {
  const [t] = useState(() => Date.now());
  return t;
}
