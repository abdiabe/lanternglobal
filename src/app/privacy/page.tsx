import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Lantern Global collects, uses, shares, and protects information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage slug="privacy" path="/privacy" />;
}
