import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/lead-submissions.jsonl"],
    },
    sitemap: "https://bikesgroningen.nl/sitemap.xml",
  };
}