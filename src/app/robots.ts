import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/config/get-site-config"; // Adjust path if needed

export default function robots(): MetadataRoute.Robots {
  // Assuming your config passes the correct domain for the current site
  const siteConfig = getSiteConfig("bikes-groningen"); 
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