export type IconName =
  | "briefcase"
  | "megaphone"
  | "calculator"
  | "code"
  | "scale"
  | "stethoscope"
  | "hardhat"
  | "users"
  | "chart"
  | "palette"
  | "truck"
  | "cart"
  | "building"
  | "home"
  | "hotel"
  | "landmark"
  | "network"
  | "package"
  | "key";

export type PricingTier = "administrative" | "specialized" | "technical";

export interface FaqItem {
  q: string;
  a: string;
}

export interface Specialty {
  slug: string;
  title: string;
  /** One or two sentences: what this professional does for a U.S. company. */
  summary: string;
  degrees: string[];
  skills: string[];
  software: string[];
  responsibilities: string[];
  /** Credentials beyond the degree, e.g. coding certification. */
  additionalQualifications?: string[];
  /** Overrides the division's default experience expectation. */
  experience?: string;
  /** Scope or supervision boundary specific to this role. */
  boundary?: string;
  /** Extra search keywords for the specialty finder. */
  keywords?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Division {
  slug: string;
  name: string;
  shortName: string;
  icon: IconName;
  photo: string;
  tagline: string;
  /** Short card description (one sentence). */
  description: string;
  intro: string[];
  idealFor: string[];
  deliverables: string[];
  software: string[];
  qualificationCriteria: string[];
  experience: string;
  boundary?: { title: string; body: string };
  faqs: FaqItem[];
  blogCategory: string;
  industries: string[];
  pricingTier: PricingTier;
  specialties: Specialty[];
  seoTitle: string;
  seoDescription: string;
}

export interface Industry {
  slug: string;
  name: string;
  icon: IconName;
  photo: string;
  headline: string;
  description: string;
  intro: string[];
  audience: string[];
  challenges: { title: string; body: string }[];
  support: { title: string; body: string }[];
  /** Specialty slugs most relevant to this industry. */
  roles: string[];
  tools: string[];
  exampleTeam: { role: string; focus: string }[];
  boundary?: string;
  faqs: FaqItem[];
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
}
