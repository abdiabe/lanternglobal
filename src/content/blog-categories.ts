/** Blog categories. Kept free of other imports so client components can use it cheaply. */
export const blogCategories = [
  { slug: "virtual-staffing", name: "Virtual Staffing" },
  { slug: "outsourcing-strategy", name: "Outsourcing Strategy" },
  { slug: "hiring-and-recruitment", name: "Hiring & Recruitment" },
  { slug: "business-operations", name: "Business Operations" },
  { slug: "technology-and-ai", name: "Technology & AI" },
  { slug: "accounting-and-finance", name: "Accounting & Finance" },
  { slug: "healthcare-administration", name: "Healthcare Administration" },
  { slug: "legal-support", name: "Legal Support" },
  { slug: "construction-and-engineering", name: "Construction & Engineering" },
  { slug: "sales-and-marketing", name: "Sales & Marketing" },
  { slug: "philippine-talent", name: "Philippine Talent" },
  { slug: "business-growth", name: "Business Growth" },
] as const;

export type BlogCategorySlug = (typeof blogCategories)[number]["slug"];

export function getBlogCategory(slug: string) {
  return blogCategories.find((c) => c.slug === slug);
}
