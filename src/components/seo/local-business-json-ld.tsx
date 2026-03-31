import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";

type LocalBusinessJsonLdProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function LocalBusinessJsonLd({
  siteConfig,
  lang,
}: LocalBusinessJsonLdProps) {
  const openingHoursSpecification = siteConfig.openingHours
    .filter((item) => item.open !== "Closed" && item.close !== "Closed")
    .map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.day,
      opens: item.open,
      closes: item.close,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BikeStore",
    name: siteConfig.siteName,
    url: `https://${siteConfig.domain}/${lang}`,
    telephone: siteConfig.phoneNumber,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      postalCode: siteConfig.postalCode,
      addressLocality: siteConfig.city,
      addressCountry: siteConfig.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.latitude,
      longitude: siteConfig.longitude,
    },
    hasMap: siteConfig.googleBusinessUrl,
    areaServed: siteConfig.neighborhoods.map((neighborhood) => ({
      "@type": "Place",
      name: `${neighborhood}, ${siteConfig.city}`,
    })),
    openingHoursSpecification,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}