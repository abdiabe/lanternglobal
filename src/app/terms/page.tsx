import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "The terms that govern use of the Lantern Global website.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage slug="terms" path="/terms" />;
}
