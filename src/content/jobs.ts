/**
 * Job postings for the careers portal.
 *
 * Only add real, approved openings. The job board shows an empty state when
 * this list is empty, which is correct before launch. JobPosting structured
 * data is generated automatically for every entry, so each field must be
 * accurate. See docs/CONTENT-GUIDE.md#jobs.
 */
export interface Job {
  slug: string;
  title: string;
  /** Division slug from src/content/divisions. */
  department: string;
  specialization: string;
  location: string;
  workplace: "Remote" | "On-site" | "Hybrid";
  schedule: string;
  arrangement: "Employee" | "Independent contractor";
  experience: string;
  requiredDegree: string;
  skills: string[];
  /** Leave undefined unless an approved range exists. */
  compensation?: { min: number; max: number; currency: "PHP" | "USD"; period: "MONTH" | "YEAR" | "HOUR" };
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  datePosted: string;
  validThrough?: string;
}

export const jobs: Job[] = [];

export function getJob(slug: string) {
  return jobs.find((j) => j.slug === slug);
}
