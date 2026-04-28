import type { AppLanguage } from "@/lib/config/i18n";
import type { RenterConfig, SiteConfig } from "@/types/site";

export function isRentedSite(
  siteConfig: SiteConfig
): siteConfig is SiteConfig & { rentalMode: "rented"; renter: RenterConfig } {
  return siteConfig.rentalMode === "rented" && Boolean(siteConfig.renter);
}

export function getRenter(siteConfig: SiteConfig): RenterConfig | null {
  return isRentedSite(siteConfig) ? siteConfig.renter : null;
}

export function getDisplayBusinessName(siteConfig: SiteConfig) {
  return getRenter(siteConfig)?.googleBusinessProfileName ?? siteConfig.siteName;
}

export function getContactEmail(siteConfig: SiteConfig) {
  return getRenter(siteConfig)?.email ?? siteConfig.leadEmail;
}

export function getRequestHelpHref(lang: AppLanguage) {
  return `/${lang}/contact#request`;
}

export function getPrimaryCta(siteConfig: SiteConfig, lang: AppLanguage) {
  const renter = getRenter(siteConfig);

  if (renter) {
    return {
      href: `tel:${renter.phoneNumber}`,
      label: lang === "nl" ? "Bel de winkel" : "Call the shop",
      eventName: "click_call",
    };
  }

  return {
    href: getRequestHelpHref(lang),
    label: lang === "nl" ? "Vraag fietshulp aan" : "Request bike help",
    eventName: "click_lead_request",
  };
}

export function getSecondaryCta(siteConfig: SiteConfig, lang: AppLanguage) {
  const renter = getRenter(siteConfig);

  if (renter) {
    return {
      href: renter.googleBusinessUrl,
      label: lang === "nl" ? "Route op Google Maps" : "Directions on Google Maps",
      eventName: "click_google_maps",
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }

  return {
    href: `/${lang}/services`,
    label: lang === "nl" ? "Bekijk fietshulp" : "View bike help",
    eventName: "click_services",
  };
}
