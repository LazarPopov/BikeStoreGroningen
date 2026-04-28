import type { MetadataRoute } from "next";
import { getActiveSiteConfig } from "@/lib/config/get-site-config";

export default function robots(): MetadataRoute.Robots {
  const siteConfig = getActiveSiteConfig();
  const baseUrl = `https://${siteConfig.domain}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/lead-submissions.jsonl"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
