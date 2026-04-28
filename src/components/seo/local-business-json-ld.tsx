import type { AppLanguage } from "@/lib/config/i18n";
import { getRenter } from "@/lib/config/site-config-utils";
import type { SiteConfig } from "@/types/site";

type LocalBusinessJsonLdProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function LocalBusinessJsonLd({
  siteConfig,
  lang,
}: LocalBusinessJsonLdProps) {
  const renter = getRenter(siteConfig);

  if (!renter) {
    return null;
  }

  const baseUrl = `https://${siteConfig.domain}`;
  const openingHoursSpecification = renter.openingHours
    .filter((item) => item.open !== "Closed" && item.close !== "Closed")
    .map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.day,
      opens: item.open,
      closes: item.close,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["BikeStore", "LocalBusiness"],
    "@id": `${baseUrl}/#local-business`,
    name: renter.googleBusinessProfileName,
    alternateName: siteConfig.siteName,
    description:
      lang === "nl"
        ? `Fietsenmaker en fietsenwinkel in ${siteConfig.city} voor reparaties, tweedehands fietsen, nieuwe fietsen, sloten en verlichting.`
        : `Bike repair shop and bike store in ${siteConfig.city} for repairs, second-hand bikes, new bikes, locks, and lights.`,
    image: `${baseUrl}${siteConfig.heroImagePath}`,
    url: `${baseUrl}/${lang}`,
    telephone: renter.phoneNumber,
    email: renter.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: renter.address,
      postalCode: renter.postalCode,
      addressLocality: siteConfig.city,
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: renter.latitude,
      longitude: renter.longitude,
    },
    hasMap: renter.googleBusinessUrl,
    sameAs: [renter.googleBusinessUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: renter.googleReviewRating,
      reviewCount: renter.googleReviewCount,
    },
    areaServed: [
      {
        "@type": "City",
        name: siteConfig.city,
      },
      ...siteConfig.neighborhoods.map((neighborhood) => ({
        "@type": "Place",
        name: `${neighborhood}, ${siteConfig.city}`,
      })),
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: lang === "nl" ? "Fietsreparatie" : "Bike repair",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: lang === "nl" ? "Tweedehands fietsen" : "Second-hand bikes",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: lang === "nl" ? "Nieuwe fietsen" : "New bikes",
        },
      },
    ],
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
