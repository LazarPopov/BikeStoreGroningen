import { bikesAmsterdamConfig } from "@/data/sites/bikes-amsterdam";
import { bikesGroningenConfig } from "@/data/sites/bikes-groningen";
import { bikesRotterdamConfig } from "@/data/sites/bikes-rotterdam";
import type { SiteConfig } from "@/types/site";

const SITE_CONFIGS: Record<string, SiteConfig> = {
  "bikes-amsterdam": bikesAmsterdamConfig,
  "bikes-groningen": bikesGroningenConfig,
  "bikes-rotterdam": bikesRotterdamConfig,
};

export function getSiteConfig(siteKey: string = "bikes-groningen"): SiteConfig {
  const siteConfig = SITE_CONFIGS[siteKey];

  if (!siteConfig) {
    throw new Error(`No site config found for siteKey: ${siteKey}`);
  }

  return siteConfig;
}

export function getActiveSiteConfig(): SiteConfig {
  const siteKey = process.env.BIKE_SITE_KEY || "bikes-groningen";

  return getSiteConfig(siteKey);
}

export function getAllSiteConfigs() {
  return Object.values(SITE_CONFIGS);
}
