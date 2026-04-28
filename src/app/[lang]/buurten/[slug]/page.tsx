import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RelatedLinks } from "@/components/common/related-links";
import { getSiteConfig } from "@/lib/config/get-site-config";
import {
  getNeighborhoodPageBySlug,
  getNeighborhoodPagesByCity,
} from "@/data/neighborhood-pages";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/config/i18n";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const siteConfig = getSiteConfig("bikes-groningen");
  const pages = getNeighborhoodPagesByCity(siteConfig.city);

  return SUPPORTED_LANGUAGES.flatMap((lang) =>
    pages.map((page) => ({
      lang,
      slug: page.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isSupportedLanguage(lang)) {
    return {};
  }

  const siteConfig = getSiteConfig("bikes-groningen");
  const neighborhoodPage = getNeighborhoodPageBySlug(slug, siteConfig.city);

  if (!neighborhoodPage) {
    return {};
  }

  const canonicalUrl = `https://${siteConfig.domain}/${lang}/buurten/${neighborhoodPage.slug}`;

  return {
    title: neighborhoodPage.metaTitle[lang],
    description: neighborhoodPage.metaDescription[lang],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://${siteConfig.domain}/en/buurten/${neighborhoodPage.slug}`,
        nl: `https://${siteConfig.domain}/nl/buurten/${neighborhoodPage.slug}`,
        "x-default": `https://${siteConfig.domain}/en/buurten/${neighborhoodPage.slug}`,
      },
    },
    openGraph: {
      title: neighborhoodPage.metaTitle[lang],
      description: neighborhoodPage.metaDescription[lang],
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      locale: lang === "nl" ? "nl_NL" : "en_US",
      type: "article",
      images: neighborhoodPage.imagePath
        ? [
            {
              url: `https://${siteConfig.domain}${neighborhoodPage.imagePath}`,
              width: 1200,
              height: 630,
              alt: neighborhoodPage.title[lang],
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: neighborhoodPage.metaTitle[lang],
      description: neighborhoodPage.metaDescription[lang],
      images: neighborhoodPage.imagePath
        ? [`https://${siteConfig.domain}${neighborhoodPage.imagePath}`]
        : undefined,
    },
  };
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { lang, slug } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getSiteConfig("bikes-groningen");
  const neighborhoodPage = getNeighborhoodPageBySlug(slug, siteConfig.city);

  if (!neighborhoodPage) {
    notFound();
  }

  const canonicalUrl = `https://${siteConfig.domain}/${lang}/buurten/${neighborhoodPage.slug}`;
  const isDutch = lang === "nl";
  const isLandmark = neighborhoodPage.pageType === "landmark";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: neighborhoodPage.title[lang],
    description: neighborhoodPage.metaDescription[lang],
    url: canonicalUrl,
    inLanguage: lang,
    about: {
      "@type": "Place",
      name: `${neighborhoodPage.neighborhoodName}, ${siteConfig.city}`,
    },
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.siteName,
      url: `https://${siteConfig.domain}`,
    },
  };

  const relatedServiceLinks = [
    {
      label: isDutch ? "Fietsreparatie Groningen" : "Bike repair in Groningen",
      href: `/${lang}/services/bike-repair`,
    },
    {
      label: isDutch ? "Studentenfietsen Groningen" : "Student bikes in Groningen",
      href: `/${lang}/services/student-bikes`,
    },
    {
      label: isDutch ? "Tweedehands fietsen Groningen" : "Second-hand bikes in Groningen",
      href: `/${lang}/services/second-hand-bikes`,
    },
    {
      label: isDutch ? "Sloten en verlichting" : "Locks and lights",
      href: `/${lang}/services/bike-accessories`,
    },
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl space-y-8">
        <SiteHeader siteConfig={siteConfig} lang={lang} />

        <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
            {siteConfig.city} |{" "}
            {isLandmark
              ? isDutch
                ? "Bekende plek"
                : "Known city spot"
              : isDutch
                ? "Buurt"
                : "Neighborhood"}
          </p>

          <h1 className="mb-4 text-4xl font-bold text-zinc-900">
            {neighborhoodPage.title[lang]}
          </h1>

          <p className="mb-8 text-lg text-zinc-700">
            {neighborhoodPage.intro[lang]}
          </p>

          <div className="space-y-4 text-lg leading-8 text-zinc-700">
            {neighborhoodPage.paragraphs[lang].map((paragraph, index) => (
              <p key={`${neighborhoodPage.slug}-${index}`}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-zinc-100 p-6">
            <h2 className="mb-3 text-2xl font-semibold">
              {isDutch ? "Bel of open de route" : "Call or get directions"}
            </h2>
            <p className="mb-4 text-zinc-700">
              {isLandmark
                ? isDutch
                  ? `${siteConfig.googleBusinessProfileName} helpt fietsers rond ${neighborhoodPage.neighborhoodName} vanuit de winkel aan ${siteConfig.address}.`
                  : `${siteConfig.googleBusinessProfileName} helps cyclists around ${neighborhoodPage.neighborhoodName} from the shop on ${siteConfig.address}.`
                : isDutch
                  ? `${siteConfig.googleBusinessProfileName} helpt fietsers uit ${neighborhoodPage.neighborhoodName} bij de winkel aan ${siteConfig.address}.`
                  : `${siteConfig.googleBusinessProfileName} helps cyclists from ${neighborhoodPage.neighborhoodName} at the shop on ${siteConfig.address}.`}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${siteConfig.phoneNumber}`}
                className="inline-block rounded-xl bg-black px-5 py-3 text-center text-white"
              >
                {lang === "nl" ? "Bel de winkel" : "Call the shop"}
              </a>
              <a
                href={siteConfig.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl border border-zinc-300 bg-white px-5 py-3 text-center font-medium text-zinc-900"
              >
                {lang === "nl" ? "Route op Google Maps" : "Directions on Google Maps"}
              </a>
            </div>
          </div>
        </article>

        <RelatedLinks
          title={
            isDutch
              ? "Handige services voor deze locatie"
              : "Useful services for this area"
          }
          items={relatedServiceLinks}
        />

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}
