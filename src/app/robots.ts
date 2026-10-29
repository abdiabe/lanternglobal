import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  // Set NEXT_PUBLIC_ALLOW_INDEXING=false on preview or staging deployments to keep them out of search.
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === "false") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
