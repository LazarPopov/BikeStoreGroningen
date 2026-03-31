import { bikesGroningenConfig } from "@/data/sites/bikes-groningen";
import type { SiteConfig } from "@/types/site";

const SITE_CONFIGS: Record<string, SiteConfig> = {
  "bikes-groningen": bikesGroningenConfig,
};

export function getSiteConfig(siteKey: string = "bikes-groningen"): SiteConfig {
  const siteConfig = SITE_CONFIGS[siteKey];

  if (!siteConfig) {
    throw new Error(`No site config found for siteKey: ${siteKey}`);
  }

  return siteConfig;
}