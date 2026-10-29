import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
export const metadata: Metadata = { ...buildMetadata({
        title: "Cookie Policy",
        description: "How the Lantern Global website uses cookies and similar technologies.",
        path: "/cookies",
    }), robots: { index: false, follow: true } };
export default function CookiesPage() {
    return <LegalPage slug="cookies" path="/cookies"/>;
}
