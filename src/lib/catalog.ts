import { specialties } from "@/content/divisions";
import { industries } from "@/content/industries";
import { divisions } from "@/content/divisions";
import { unique } from "./utils";

/** Lightweight specialty records for client-side search, finder, and team builder. */
export interface CatalogItem {
  slug: string;
  title: string;
  href: string;
  summary: string;
  division: string;
  divisionName: string;
  degrees: string[];
  degreeFields: string[];
  skills: string[];
  software: string[];
  industries: string[];
  responsibilities: string[];
  keywords: string[];
  tier: string;
  experience?: string;
}

export function degreeField(degree: string) {
  return degree
    .replace(/^(BSBA|BS|BA|BFA)\s+/i, "")
    .replace(/^Bachelor of (Science in |Arts in )?/i, "")
    .replace(/^Juris Doctor$/i, "Law (Juris Doctor)")
    .trim();
}

export function buildCatalog(): CatalogItem[] {
  return specialties.map((s) => {
    const division = divisions.find((d) => d.slug === s.division.slug)!;
    const inds = industries
      .filter((i) => i.roles.includes(s.slug) || i.exampleTeam.some((t) => t.role === s.slug))
      .map((i) => i.slug);
    return {
      slug: s.slug,
      title: s.title,
      href: s.href,
      summary: s.summary,
      division: s.division.slug,
      divisionName: s.division.shortName,
      degrees: s.degrees,
      degreeFields: unique(s.degrees.map(degreeField)),
      skills: s.skills,
      software: s.software,
      industries: unique([...inds, ...(inds.length ? [] : division.industries)]),
      responsibilities: s.responsibilities,
      keywords: s.keywords ?? [],
      tier: s.division.pricingTier,
      experience: s.experience,
    };
  });
}

export function catalogFacets(items: CatalogItem[]) {
  return {
    divisions: divisions.map((d) => ({ value: d.slug, label: d.shortName })),
    industries: industries.map((i) => ({ value: i.slug, label: i.name })),
    degreeFields: unique(items.flatMap((i) => i.degreeFields))
      .filter((f) => !/^Relevant|^Related/i.test(f))
      .sort((a, b) => a.localeCompare(b)),
    software: unique(items.flatMap((i) => i.software)).sort((a, b) => a.localeCompare(b)),
  };
}
