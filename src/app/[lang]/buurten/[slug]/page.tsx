import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RelatedLinks } from "@/components/common/related-links";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  getNeighborhoodPageBySlugForSite,
  getNeighborhoodPagesForSite,
} from "@/data/neighborhood-pages";
import { getActiveSiteConfig } from "@/lib/config/get-site-config";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/config/i18n";
import {
  getDisplayBusinessName,
  getPrimaryCta,
  getRenter,
  getSecondaryCta,
} from "@/lib/config/site-config-utils";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const siteConfig = getActiveSiteConfig();
  const pages = getNeighborhoodPagesForSite(siteConfig);

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

  const siteConfig = getActiveSiteConfig();
  const neighborhoodPage = getNeighborhoodPageBySlugForSite(slug, siteConfig);

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

  const siteConfig = getActiveSiteConfig();
  const neighborhoodPage = getNeighborhoodPageBySlugForSite(slug, siteConfig);

  if (!neighborhoodPage) {
    notFound();
  }

  const canonicalUrl = `https://${siteConfig.domain}/${lang}/buurten/${neighborhoodPage.slug}`;
  const isDutch = lang === "nl";
  const isLandmark = neighborhoodPage.pageType === "landmark";
  const renter = getRenter(siteConfig);
  const businessName = getDisplayBusinessName(siteConfig);
  const primaryCta = getPrimaryCta(siteConfig, lang);
  const secondaryCta = getSecondaryCta(siteConfig, lang);

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
      label: isDutch
        ? `Fietsreparatie ${siteConfig.city}`
        : `Bike repair in ${siteConfig.city}`,
      href: `/${lang}/services/bike-repair`,
    },
    {
      label: isDutch
        ? `Studentenfietsen ${siteConfig.city}`
        : `Student bikes in ${siteConfig.city}`,
      href: `/${lang}/services/student-bikes`,
    },
    {
      label: isDutch
        ? `Tweedehands fietsen ${siteConfig.city}`
        : `Second-hand bikes in ${siteConfig.city}`,
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
              {renter
                ? isDutch
                  ? "Bel of open de route"
                  : "Call or get directions"
                : isDutch
                  ? "Vraag fietshulp aan"
                  : "Request bike help"}
            </h2>
            <p className="mb-4 text-zinc-700">
              {renter
                ? isLandmark
                  ? isDutch
                    ? `${businessName} helpt fietsers rond ${neighborhoodPage.neighborhoodName} vanuit de winkel aan ${renter.address}.`
                    : `${businessName} helps cyclists around ${neighborhoodPage.neighborhoodName} from the shop on ${renter.address}.`
                  : isDutch
                    ? `${businessName} helpt fietsers uit ${neighborhoodPage.neighborhoodName} bij de winkel aan ${renter.address}.`
                    : `${businessName} helps cyclists from ${neighborhoodPage.neighborhoodName} at the shop on ${renter.address}.`
                : isDutch
                  ? `Beschrijf je fietsvraag rond ${neighborhoodPage.neighborhoodName}, dan kan je aanvraag worden opgepakt met lokale context voor ${siteConfig.city}.`
                  : `Describe your bike question around ${neighborhoodPage.neighborhoodName}, so your request can be handled with local context for ${siteConfig.city}.`}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={primaryCta.href}
                className="inline-block rounded-xl bg-black px-5 py-3 text-center text-white"
              >
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                target={secondaryCta.target}
                rel={secondaryCta.rel}
                className="inline-block rounded-xl border border-zinc-300 bg-white px-5 py-3 text-center font-medium text-zinc-900"
              >
                {secondaryCta.label}
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
