/**
 * Central company configuration.
 *
 * Anything set to `null` is intentionally hidden on the public site until a
 * verified value is supplied. Do not replace these with invented values.
 * See docs/CONTENT-GUIDE.md for how each field is used.
 */
export const site = {
  name: "Lantern Global",
  /** Registered legal entity name, e.g. "Lantern Global LLC". Shown in legal pages and the footer once verified. */
  legalName: null as string | null,
  tagline: "Exceptional Talent. Dedicated to Your Business.",
  altTagline: "University-Educated Professionals. Global Talent. American Business Solutions.",
  description:
    "Lantern Global is a U.S.-based professional staffing and outsourcing company connecting American businesses with dedicated, university-educated professionals in the Philippines.",
  /** Production URL, no trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.lanternglobal.com").replace(/\/$/, ""),
  contact: {
    /** Verified business email for client inquiries. */
    email: null as string | null,
    /** Verified email for candidates. */
    careersEmail: null as string | null,
    /** Verified U.S. business phone, display format. */
    phone: null as string | null,
    /** Verified U.S. business address lines. */
    address: null as string[] | null,
    /** Established response window, e.g. "within one business day". Leave null until it is an actual commitment. */
    responseTime: null as string | null,
  },
  /** Public scheduling page (Calendly, Cal.com, HubSpot Meetings). Leave null to route consultation CTAs to the inquiry form. */
  schedulingUrl: (process.env.NEXT_PUBLIC_SCHEDULING_URL || null) as string | null,
  /** Only add real, active profiles. Empty entries are not rendered. */
  social: {
    linkedin: null as string | null,
    facebook: null as string | null,
    x: null as string | null,
  },
  /** Leadership is hidden until real people and approved bios/photos are supplied. */
  leadership: [] as { name: string; role: string; bio: string; photo?: string }[],
  launchDate: "2026-10-25",
} as const;

export type Site = typeof site;

/**
 * Operational status flags. These control wording across the site so that
 * future-state standards are never presented as already active. Flip a flag
 * to `true` only when the process genuinely exists and is documented.
 */
export const operations = {
  degreeVerificationActive: false,
  backgroundScreeningActive: false,
  skillsAssessmentsActive: false,
  replacementPolicyPublished: false,
  hipaaProgramDocumented: false,
  securityPolicyDocumented: false,
} as const;
