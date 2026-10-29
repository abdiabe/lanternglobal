import type { Metadata } from "next";
import { GuidePage } from "@/components/sections/GuidePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Practical Guide to Outsourcing Professional Work",
  description: "How to decide what to outsource, compare outsourcing models, manage risk, and structure a lasting working relationship.",
  path: "/resources/outsourcing-guide",
});

export default function OutsourcingGuidePage() {
  return <GuidePage slug="outsourcing-guide" path="/resources/outsourcing-guide" crumb="Outsourcing Guide" />;
}
