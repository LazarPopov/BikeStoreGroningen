import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  getLandmarkPagesByCity,
  getResidentialNeighborhoodPagesByCity,
} from "@/data/neighborhood-pages";
import { getSiteConfig } from "@/lib/config/get-site-config";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/config/i18n";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    return {};
  }

  const siteConfig = getSiteConfig("bikes-groningen");
  const isDutch = lang === "nl";
  const title = isDutch
    ? `Fietsenmaker per buurt en plek in ${siteConfig.city}`
    : `Bike repair by area in ${siteConfig.city}`;
  const description = isDutch
    ? `Bekijk fietsreparatie, tweedehands fietsen en lokale fietshulp van ${siteConfig.googleBusinessProfileName} per buurt, campus en bekende plek in ${siteConfig.city}.`
    : `Find bike repair, second-hand bikes, and local cycling support from ${siteConfig.googleBusinessProfileName} by neighborhood, campus, and landmark in ${siteConfig.city}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}/buurten`,
      languages: {
        en: `https://${siteConfig.domain}/en/buurten`,
        nl: `https://${siteConfig.domain}/nl/buurten`,
        "x-default": `https://${siteConfig.domain}/en/buurten`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://${siteConfig.domain}/${lang}/buurten`,
      siteName: siteConfig.siteName,
      locale: isDutch ? "nl_NL" : "en_US",
      type: "website",
    },
  };
}

export default async function NeighborhoodsOverviewPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getSiteConfig("bikes-groningen");
  const landmarkPages = getLandmarkPagesByCity(siteConfig.city);
  const residentialPages = getResidentialNeighborhoodPagesByCity(siteConfig.city);
  const isDutch = lang === "nl";

  const breadcrumbItems = [
    {
      name: "Home",
      href: `/${lang}`,
      url: `https://${siteConfig.domain}/${lang}`,
    },
    {
      name: isDutch ? "Buurten" : "Neighborhoods",
      url: `https://${siteConfig.domain}/${lang}/buurten`,
    },
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <BreadcrumbJsonLd
        items={breadcrumbItems.map(({ name, url }) => ({ name, url }))}
      />

      <div className="mx-auto max-w-6xl space-y-8">
        <SiteHeader siteConfig={siteConfig} lang={lang} />

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <BreadcrumbNav
            items={breadcrumbItems.map(({ name, href }) => ({ name, href }))}
          />

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
                {siteConfig.city} | {isDutch ? "Buurten en plekken" : "Areas we serve"}
              </p>
              <h1 className="mb-4 max-w-3xl text-4xl font-bold text-zinc-900">
                {isDutch
                  ? `Fietsenmaker per buurt en bekende plek in ${siteConfig.city}`
                  : `Bike repair by neighborhood and landmark in ${siteConfig.city}`}
              </h1>
              <p className="max-w-3xl text-lg text-zinc-700">
                {isDutch
                  ? `${siteConfig.siteName} helpt fietsers uit wijken, campussen en drukke plekken in ${siteConfig.city} met reparatie, tweedehands fietsen, sloten, verlichting en praktische lokale fietshulp.`
                  : `${siteConfig.siteName} helps cyclists across ${siteConfig.city} neighborhoods, campuses, and busy landmarks with repairs, second-hand bikes, locks, lights, and practical local cycling support.`}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                <MapPin className="h-4 w-4" />
                <span>{isDutch ? "Hoofdlocatie" : "Main location"}</span>
              </div>
              <p className="font-medium text-zinc-900">
                {siteConfig.googleBusinessProfileName}
              </p>
              <p className="mt-1 text-zinc-700">
                {siteConfig.address}, {siteConfig.postalCode},{" "}
                {siteConfig.city}
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <p className="text-sm uppercase tracking-wide text-zinc-500">
              {isDutch ? "Campus, station en centrum" : "Campus, station, and center"}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">
              {isDutch ? "Campussen, station en centrum" : "Campus, station, and city center"}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {landmarkPages.map((neighborhood) => (
              <article
                key={neighborhood.slug}
                className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
              >
                <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
                  {isDutch ? "Fietshulp in de buurt" : "Nearby bike help"}
                </p>
                <h3 className="mb-3 text-2xl font-bold text-zinc-900">
                  {neighborhood.shortTitle[lang]}
                </h3>
                <p className="mb-6 flex-1 text-zinc-700">
                  {neighborhood.intro[lang]}
                </p>
                <Link
                  href={`/${lang}/buurten/${neighborhood.slug}`}
                  className="inline-flex items-center gap-2 font-medium text-zinc-900 underline underline-offset-4"
                >
                  {isDutch ? "Bekijk fietshulp" : "View bike help"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5">
            <p className="text-sm uppercase tracking-wide text-zinc-500">
              {isDutch ? "Wijken" : "Neighborhoods"}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">
              {isDutch ? "Buurtpagina's met unieke lokale context" : "Neighborhood pages with local context"}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {residentialPages.map((neighborhood) => (
            <article
              key={neighborhood.slug}
              className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
            >
              <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
                {siteConfig.city}
              </p>
              <h2 className="mb-3 text-2xl font-bold text-zinc-900">
                {neighborhood.shortTitle[lang]}
              </h2>
              <p className="mb-6 flex-1 text-zinc-700">
                {neighborhood.intro[lang]}
              </p>
              <Link
                href={`/${lang}/buurten/${neighborhood.slug}`}
                className="inline-flex items-center gap-2 font-medium text-zinc-900 underline underline-offset-4"
              >
                {isDutch ? "Bekijk buurtpagina" : "View neighborhood page"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900">
            {isDutch
              ? "Niet zeker welke hulp je nodig hebt?"
              : "Not sure which help you need?"}
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-zinc-700">
            {isDutch
              ? "Bel De Twee Wielen of open de route voor snelle hulp met reparatie, aankoopadvies of accessoires voor dagelijks fietsen in Groningen."
              : "Call De Twee Wielen or open directions for quick help with repairs, buying advice, or accessories for everyday cycling in Groningen."}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${siteConfig.phoneNumber}`}
              className="inline-flex justify-center rounded-xl bg-zinc-900 px-6 py-3 font-medium text-white transition hover:bg-black"
            >
              {isDutch ? "Bel de winkel" : "Call the shop"}
            </a>
            <a
              href={siteConfig.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-900 transition hover:bg-zinc-50"
            >
              {isDutch ? "Route op Google Maps" : "Directions on Google Maps"}
            </a>
          </div>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}
