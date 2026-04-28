import type { MetadataRoute } from "next";
import { SUPPORTED_LANGUAGES } from "@/lib/config/i18n";
import { getActiveSiteConfig } from "@/lib/config/get-site-config";
import { getServicePagesForSite } from "@/data/service-pages";
import { getNeighborhoodPagesForSite } from "@/data/neighborhood-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteConfig = getActiveSiteConfig();
  const baseUrl = `https://${siteConfig.domain}`;

  const staticRoutes = ["", "/about", "/contact", "/services", "/buurten"] as const;

  const staticEntries: MetadataRoute.Sitemap = SUPPORTED_LANGUAGES.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    }))
  );

  // 2. Maps all individual service pages (e.g., /services/bike-repair)
  const serviceEntries: MetadataRoute.Sitemap = SUPPORTED_LANGUAGES.flatMap((lang) =>
    getServicePagesForSite(siteConfig).map((page) => ({
      url: `${baseUrl}/${lang}/services/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  );

  // 3. Maps all individual neighborhood pages (e.g., /buurten/vinkhuizen)
  const neighborhoodEntries: MetadataRoute.Sitemap = SUPPORTED_LANGUAGES.flatMap((lang) =>
    getNeighborhoodPagesForSite(siteConfig).map((page) => ({
      url: `${baseUrl}/${lang}/buurten/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  return [...staticEntries, ...serviceEntries, ...neighborhoodEntries];
}
