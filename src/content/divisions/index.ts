import type { Division, Specialty } from "../types";
import { administration } from "./administration";
import { operations } from "./operations";
import { salesMarketing } from "./sales-marketing";
import { accounting } from "./accounting";
import { technology } from "./technology";
import { legal } from "./legal";
import { healthcare } from "./healthcare";
import { engineering } from "./engineering";
import { creative } from "./creative";
import { hr } from "./hr";
import { data } from "./data";
import { ecommerce } from "./ecommerce";

/** Order matches the main navigation. */
export const divisions: Division[] = [
  administration,
  operations,
  salesMarketing,
  accounting,
  technology,
  legal,
  healthcare,
  engineering,
  creative,
  hr,
  data,
  ecommerce,
];

export interface SpecialtyWithDivision extends Specialty {
  division: Pick<Division, "slug" | "name" | "shortName" | "icon" | "pricingTier" | "experience">;
  href: string;
}

export const specialties: SpecialtyWithDivision[] = divisions.flatMap((d) =>
  d.specialties.map((s) => ({
    ...s,
    division: {
      slug: d.slug,
      name: d.name,
      shortName: d.shortName,
      icon: d.icon,
      pricingTier: d.pricingTier,
      experience: d.experience,
    },
    href: `/services/${d.slug}/${s.slug}`,
  })),
);

export function getDivision(slug: string) {
  return divisions.find((d) => d.slug === slug);
}

export function getSpecialty(divisionSlug: string, slug: string) {
  return specialties.find((s) => s.division.slug === divisionSlug && s.slug === slug);
}

export function getSpecialtyBySlug(slug: string) {
  return specialties.find((s) => s.slug === slug);
}

export function relatedSpecialties(spec: SpecialtyWithDivision, count = 3) {
  const siblings = specialties.filter((s) => s.division.slug === spec.division.slug && s.slug !== spec.slug);
  const idx = siblings.length ? Math.abs(hash(spec.slug)) % siblings.length : 0;
  return [...siblings.slice(idx), ...siblings.slice(0, idx)].slice(0, count);
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h;
}

export const specialtyCount = specialties.length;
