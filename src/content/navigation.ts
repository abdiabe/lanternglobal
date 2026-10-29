import { divisions } from "./divisions";
import { industries } from "./industries";

import type { IconName } from "./types";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: IconName;
  meta?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  items?: NavLink[];
  kind?: "services" | "industries" | "resources";
}

/**
 * Lightweight navigation data. Built on the server and passed to client
 * components as props so the full service catalog is never bundled into
 * client JavaScript.
 */
export const mainNav: NavGroup[] = [
  {
    label: "Services",
    href: "/services",
    kind: "services",
    items: divisions.map((d) => ({
      label: d.shortName,
      href: `/services/${d.slug}`,
      icon: d.icon,
      meta: `${d.specialties.length} specialties`,
    })),
  },
  {
    label: "Industries",
    href: "/industries",
    kind: "industries",
    items: industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}`, icon: i.icon })),
  },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "About", href: "/about" },
  {
    label: "Resources",
    href: "/resources",
    kind: "resources",
    items: [
      { label: "Blog", href: "/blog", description: "Practical guides on remote staffing and operations" },
      { label: "Frequently Asked Questions", href: "/faq", description: "Answers about qualifications, hours, and contracts" },
      { label: "Hiring Guide", href: "/resources/hiring-guide", description: "How to define, evaluate, and onboard a remote role" },
      { label: "Outsourcing Guide", href: "/resources/outsourcing-guide", description: "Deciding what to outsource and how to structure it" },
      { label: "Specialty Finder", href: "/specialty-finder", description: "Match your needs to the right professional" },
      { label: "Team Builder", href: "/team-builder", description: "Sketch a team and send it to us" },
    ],
  },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  services: divisions.slice(0, 9).map((d) => ({ label: d.shortName, href: `/services/${d.slug}` })),
  company: [
    { label: "About Us", href: "/about" },
    { label: "Why Choose Us", href: "/why-choose-us" },
    { label: "Education Standard", href: "/why-choose-us/education-and-qualifications" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "/security" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faq" },
    { label: "Outsourcing Guide", href: "/resources/outsourcing-guide" },
    { label: "Hiring Guide", href: "/resources/hiring-guide" },
    { label: "Specialty Finder", href: "/specialty-finder" },
    { label: "All Specialties", href: "/services/directory" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export { blogCategories, getBlogCategory, type BlogCategorySlug } from "./blog-categories";
