import type { Metadata } from "next";
import { GuidePage } from "@/components/sections/GuidePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Remote Professional Hiring Guide",
  description: "A step-by-step guide to defining, evaluating, selecting, and onboarding a dedicated remote professional.",
  path: "/resources/hiring-guide",
});

export default function HiringGuidePage() {
  return <GuidePage slug="hiring-guide" path="/resources/hiring-guide" crumb="Hiring Guide" />;
}
