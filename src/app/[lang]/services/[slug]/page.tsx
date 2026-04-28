import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { RelatedLinks } from "@/components/common/related-links";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  getNeighborhoodPagesForSite,
} from "@/data/neighborhood-pages";
import {
  getServicePageBySlugForSite,
  getServicePagesForSite,
} from "@/data/service-pages";
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
  const pages = getServicePagesForSite(siteConfig);

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
  const servicePage = getServicePageBySlugForSite(slug, siteConfig);

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

  const siteConfig = getActiveSiteConfig();
  const servicePage = getServicePageBySlugForSite(slug, siteConfig);

  if (!servicePage) {
    notFound();
  }

  const isDutch = lang === "nl";
  const renter = getRenter(siteConfig);
  const businessName = getDisplayBusinessName(siteConfig);
  const primaryCta = getPrimaryCta(siteConfig, lang);
  const secondaryCta = getSecondaryCta(siteConfig, lang);

  const breadcrumbItems = [
    {
      name: "Home",
      href: `/${lang}`,
      url: `https://${siteConfig.domain}/${lang}`,
    },
    {
      name: isDutch ? "Diensten" : "Services",
      href: `/${lang}/services`,
      url: `https://${siteConfig.domain}/${lang}/services`,
    },
    {
      name: servicePage.shortTitle[lang],
      url: `https://${siteConfig.domain}/${lang}/services/${servicePage.slug}`,
    },
  ];

  const relatedServiceLinks = getServicePagesForSite(siteConfig)
    .filter((page) => page.slug !== servicePage.slug)
    .slice(0, 4)
    .map((page) => ({
      label: page.shortTitle[lang],
      href: `/${lang}/services/${page.slug}`,
    }));

  const relatedNeighborhoodLinks = getNeighborhoodPagesForSite(siteConfig)
    .slice(0, 6)
    .map((page) => ({
      label:
        page.pageType === "landmark"
          ? isDutch
            ? `Fietshulp nabij ${page.shortTitle[lang]}`
            : `Bike help near ${page.shortTitle[lang]}`
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
            {siteConfig.city} | {isDutch ? "Diensten" : "Services"}
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            {servicePage.title[lang]}
          </h1>

          {servicePage.imageUrl ? (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-3xl border border-zinc-200">
              <Image
                src={servicePage.imageUrl}
                alt={servicePage.title[lang]}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          <p className="mb-8 text-lg text-zinc-700">
            {servicePage.intro[lang]}
          </p>

          <div className="space-y-8 text-lg leading-8 text-zinc-700">
            {servicePage.paragraphs[lang].map((paragraph, index) => {
              const paragraphImage = servicePage.paragraphImages?.[index];

              return (
                <div key={`${servicePage.slug}-${index}`} className="space-y-4">
                  {paragraphImage ? (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-zinc-200">
                      <Image
                        src={paragraphImage}
                        alt={`${servicePage.title[lang]} ${index + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 896px"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}

                  <p>{paragraph}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-zinc-100 p-6">
            <h2 className="mb-3 text-2xl font-semibold">
              {renter
                ? isDutch
                  ? "Bel of kom langs"
                  : "Call or visit"
                : isDutch
                  ? "Vraag fietshulp aan"
                  : "Request bike help"}
            </h2>
            <p className="mb-4 text-zinc-700">
              {renter
                ? isDutch
                  ? `${businessName} helpt je direct in de winkel met reparatie, advies en fietsopties in ${siteConfig.city}.`
                  : `${businessName} can help you directly at the shop with repairs, advice, and bike options in ${siteConfig.city}.`
                : isDutch
                  ? `Vertel wat je nodig hebt voor ${servicePage.shortTitle[lang].toLowerCase()} in ${siteConfig.city}.`
                  : `Tell us what you need for ${servicePage.shortTitle[lang].toLowerCase()} in ${siteConfig.city}.`}
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
            isDutch ? "Gerelateerde servicepagina's" : "Related service pages"
          }
          items={relatedServiceLinks}
        />

        <RelatedLinks
          title={isDutch ? "Fietshulp per buurt en plek" : "Bike help by area"}
          items={relatedNeighborhoodLinks}
        />

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}
