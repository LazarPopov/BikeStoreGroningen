// src/app/[lang]/services/[slug]/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { RelatedLinks } from "@/components/common/related-links";
import { getSiteConfig } from "@/lib/config/get-site-config";
import {
  getServicePageBySlug,
  getServicePagesByCity,
} from "@/data/service-pages";
import { getNeighborhoodPagesByCity } from "@/data/neighborhood-pages";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/config/i18n";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const siteConfig = getSiteConfig("bikes-groningen");
  const pages = getServicePagesByCity(siteConfig.city);

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
  const servicePage = getServicePageBySlug(slug, siteConfig.city);

  if (!servicePage) {
    return {};
  }

  return {
    title: servicePage.metaTitle[lang],
    description: servicePage.metaDescription[lang],
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}/services/${servicePage.slug}`,
      languages: {
        en: `https://${siteConfig.domain}/en/services/${servicePage.slug}`,
        nl: `https://${siteConfig.domain}/nl/services/${servicePage.slug}`,
      },
    },
    openGraph: {
      title: servicePage.metaTitle[lang],
      description: servicePage.metaDescription[lang],
      url: `https://${siteConfig.domain}/${lang}/services/${servicePage.slug}`,
      siteName: siteConfig.siteName,
      type: "website",
      images: servicePage.imageUrl
        ? [
            {
              url: `https://${siteConfig.domain}${servicePage.imageUrl}`,
              alt: servicePage.title[lang],
            },
          ]
        : undefined,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { lang, slug } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getSiteConfig("bikes-groningen");
  const servicePage = getServicePageBySlug(slug, siteConfig.city);

  if (!servicePage) {
    notFound();
  }

  const breadcrumbItems = [
    {
      name: lang === "nl" ? "Home" : "Home",
      href: `/${lang}`,
      url: `https://${siteConfig.domain}/${lang}`,
    },
    {
      name: lang === "nl" ? "Services" : "Services",
      href: `/${lang}/services`,
      url: `https://${siteConfig.domain}/${lang}/services`,
    },
    {
      name: servicePage.shortTitle[lang],
      url: `https://${siteConfig.domain}/${lang}/services/${servicePage.slug}`,
    },
  ];

  const relatedServiceLinks = getServicePagesByCity(siteConfig.city)
    .filter((page) => page.slug !== servicePage.slug)
    .slice(0, 4)
    .map((page) => ({
      label: page.shortTitle[lang],
      href: `/${lang}/services/${page.slug}`,
    }));

  const localPagePriority = [
    "zernike-campus",
    "groningen-station",
    "grote-markt",
    "centrum",
    "korrewegwijk",
    "paddepoel",
  ];

  const relatedNeighborhoodLinks = [...getNeighborhoodPagesByCity(siteConfig.city)]
    .sort((first, second) => {
      const firstIndex = localPagePriority.indexOf(first.slug);
      const secondIndex = localPagePriority.indexOf(second.slug);

      return (
        (firstIndex === -1 ? localPagePriority.length : firstIndex) -
        (secondIndex === -1 ? localPagePriority.length : secondIndex)
      );
    })
    .slice(0, 6)
    .map((page) => ({
      label:
        page.pageType === "landmark"
          ? lang === "nl"
            ? `Fietsenmaker nabij ${page.shortTitle[lang]}`
            : `Bike repair near ${page.shortTitle[lang]}`
          : page.shortTitle[lang],
      href: `/${lang}/buurten/${page.slug}`,
    }));

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <BreadcrumbJsonLd
        items={breadcrumbItems.map(({ name, url }) => ({ name, url }))}
      />

      <div className="mx-auto max-w-5xl space-y-8">
        <SiteHeader siteConfig={siteConfig} lang={lang} />

        <article className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <BreadcrumbNav
            items={breadcrumbItems.map(({ name, href }) => ({ name, href }))}
          />

          <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
            {siteConfig.city} | Services
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            {servicePage.title[lang]}
          </h1>

          {servicePage.imageUrl && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-3xl border border-zinc-200">
              <Image
                src={servicePage.imageUrl}
                alt={servicePage.title[lang]}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <p className="mb-8 text-lg text-zinc-700">
            {servicePage.intro[lang]}
          </p>

          <div className="space-y-8 text-lg leading-8 text-zinc-700">
            {servicePage.paragraphs[lang].map((paragraph, index) => {
              const paragraphImage = servicePage.paragraphImages?.[index];

              return (
                <div key={`${servicePage.slug}-${index}`} className="space-y-4">
                  {paragraphImage && (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-zinc-200">
                      <Image
                        src={paragraphImage}
                        alt={`${servicePage.title[lang]} ${index + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 896px"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <p>{paragraph}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-zinc-100 p-6">
            <h2 className="mb-3 text-2xl font-semibold">
              {lang === "nl" ? "Bel of kom langs" : "Call or visit"}
            </h2>
            <p className="mb-4 text-zinc-700">
              {lang === "nl"
                ? `${siteConfig.googleBusinessProfileName} helpt je direct in de winkel met reparatie, advies en fietsopties in ${siteConfig.city}.`
                : `${siteConfig.googleBusinessProfileName} can help you directly at the shop with repairs, advice, and bike options in ${siteConfig.city}.`}
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
            lang === "nl"
              ? "Gerelateerde servicepagina's"
              : "Related service pages"
          }
          items={relatedServiceLinks}
        />

        <RelatedLinks
          title={
            lang === "nl"
              ? "Lokale pagina's in Groningen"
              : "Local pages in Groningen"
          }
          items={relatedNeighborhoodLinks}
        />

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}
