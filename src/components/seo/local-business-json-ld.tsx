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
  const baseUrl = `https://${siteConfig.domain}`;
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
    "@id": `${baseUrl}/#local-business`,
    name: siteConfig.googleBusinessProfileName,
    alternateName: siteConfig.siteName,
    description:
      lang === "nl"
        ? `Fietsenmaker en fietsenwinkel in ${siteConfig.city} voor reparaties, tweedehands fietsen, nieuwe fietsen, sloten en verlichting.`
        : `Bike repair shop and bike store in ${siteConfig.city} for repairs, second-hand bikes, new bikes, locks, and lights.`,
    image: `${baseUrl}/images/bikes-groningen-hero.jpg`,
    url: `${baseUrl}/${lang}`,
    telephone: siteConfig.phoneNumber,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      postalCode: siteConfig.postalCode,
      addressLocality: siteConfig.city,
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.latitude,
      longitude: siteConfig.longitude,
    },
    hasMap: siteConfig.googleBusinessUrl,
    sameAs: [siteConfig.googleBusinessUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.googleReviewRating,
      reviewCount: siteConfig.googleReviewCount,
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
