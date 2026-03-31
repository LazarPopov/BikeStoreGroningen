import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
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
            {siteConfig.city} | {neighborhoodPage.neighborhoodName}
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
        </article>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}