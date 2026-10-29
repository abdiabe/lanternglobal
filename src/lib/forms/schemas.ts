import { z } from "zod";

/**
 * Shared validation for client and server. The server always re-validates;
 * client checks exist only to give faster feedback.
 */

const trimmed = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const required = (label: string, max = 200) => trimmed(max).min(1, `${label} is required.`);
const optional = (max = 200) => trimmed(max).optional().or(z.literal(""));

const email = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .max(254)
  .email("Please enter a valid email address.");

const phone = z
  .string()
  .trim()
  .max(40)
  .regex(/^[+()\d\s.-]*$/, "Please use digits, spaces, and + ( ) - only.")
  .optional()
  .or(z.literal(""));

const url = z
  .string()
  .trim()
  .max(300)
  .refine((v) => !v || /^https?:\/\/[^\s]+\.[^\s]+$/i.test(v) || /^[^\s]+\.[^\s]+$/.test(v), "Please enter a valid website address.")
  .optional()
  .or(z.literal(""));

/** Anti-spam fields included in every public form. */
export const antiSpam = z.object({
  /** Honeypot. Real people never see or fill this field. */
  company_url: z.string().max(0).optional().or(z.literal("")),
  /** Milliseconds since the form was rendered. */
  elapsed: z.coerce.number().int().nonnegative().optional(),
  turnstileToken: z.string().max(4096).optional(),
});

export const inquiryStep1 = z.object({
  fullName: required("Full name", 120),
  email,
  company: required("Company name", 160),
  website: url,
  phone,
  industry: required("Industry", 80),
});

export const inquiryStep2 = z.object({
  division: required("Service division", 80),
  specialty: optional(120),
  headcount: required("Number of professionals", 20),
  experience: required("Experience level", 60),
  software: optional(400),
  responsibilities: required("Primary responsibilities", 3000).min(20, "Please describe the main responsibilities in a sentence or two."),
  roles: optional(1200),
});

export const inquiryStep3 = z.object({
  arrangement: required("Full-time or part-time preference", 40),
  timezone: required("Preferred U.S. time zone", 40),
  hours: optional(120),
  startDate: optional(40),
  budget: optional(80),
});

export const inquiryStep4 = z.object({
  details: optional(4000),
  contactMethod: required("Preferred contact method", 20),
  consent: z.literal(true, { error: "Please acknowledge the privacy notice to continue." }),
  intent: optional(40),
});

export const inquirySchema = inquiryStep1.and(inquiryStep2).and(inquiryStep3).and(inquiryStep4).and(antiSpam);
export type InquiryInput = z.infer<typeof inquirySchema>;

export const contactSchema = z
  .object({
    fullName: required("Full name", 120),
    email,
    company: optional(160),
    phone,
    topic: required("Topic", 60),
    message: required("Message", 4000).min(10, "Please add a little more detail."),
    consent: z.literal(true, { error: "Please acknowledge the privacy notice to continue." }),
  })
  .and(antiSpam);
export type ContactInput = z.infer<typeof contactSchema>;

const currentYear = new Date().getFullYear();

export const applicationSchema = z
  .object({
    fullName: required("Full name", 120),
    email,
    phone: required("Contact number", 40).regex(/^[+()\d\s.-]+$/, "Please use digits, spaces, and + ( ) - only."),
    location: required("City and province", 120),
    degree: required("Degree title", 160),
    university: required("University", 200),
    graduationYear: z
      .string()
      .trim()
      .regex(/^(19|20)\d{2}$/, "Please enter a four-digit year.")
      .refine((y) => Number(y) <= currentYear, "Graduation year cannot be in the future.")
      .optional()
      .or(z.literal("")),
    degreeCompleted: z.literal(true, { error: "A completed bachelor's degree or higher is required for professional positions." }),
    experience: required("Professional experience", 3000).min(20, "Please summarize your experience in a sentence or two."),
    skills: required("Skills", 800),
    portfolio: url,
    role: required("Role applied for", 160),
    consent: z.literal(true, { error: "Please acknowledge the applicant privacy notice to continue." }),
  })
  .and(antiSpam);
export type ApplicationInput = z.infer<typeof applicationSchema>;

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_TYPES = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
} as const;

/** Flattens zod issues into a { field: message } map for inline errors. */
export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
