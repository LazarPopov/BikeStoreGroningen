import type { MetadataRoute } from "next";
import { SUPPORTED_LANGUAGES } from "@/lib/config/i18n";
import { getSiteConfig } from "@/lib/config/get-site-config";
import { getServicePagesByCity } from "@/data/service-pages";
import { getNeighborhoodPagesByCity } from "@/data/neighborhood-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteConfig = getSiteConfig("bikes-groningen");
  
  // NOTE: Ensure your siteConfig.domain is set to "www.bikestoregroningen.nl" 
  // so it matches your live URLs!
  const baseUrl = `https://${siteConfig.domain}`;

  // 1. Added "/services" and "/buurten" so the index pages are indexed by Google
  const staticRoutes = ["", "/about", "/contact", "/blog", "/services", "/buurten"] as const;

  const staticEntries: MetadataRoute.Sitemap = SUPPORTED_LANGUAGES.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    }))
  );

  // 2. Maps all individual service pages (e.g., /services/repair)
  const serviceEntries: MetadataRoute.Sitemap = SUPPORTED_LANGUAGES.flatMap((lang) =>
    getServicePagesByCity(siteConfig.city).map((page) => ({
      url: `${baseUrl}/${lang}/services/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  );

  // 3. Maps all individual neighborhood pages (e.g., /buurten/vinkhuizen)
  const neighborhoodEntries: MetadataRoute.Sitemap = SUPPORTED_LANGUAGES.flatMap((lang) =>
    getNeighborhoodPagesByCity(siteConfig.city).map((page) => ({
      url: `${baseUrl}/${lang}/buurten/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  return [...staticEntries, ...serviceEntries, ...neighborhoodEntries];
}