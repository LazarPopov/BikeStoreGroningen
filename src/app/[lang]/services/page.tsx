import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getServicePagesForSite } from "@/data/service-pages";
import { getActiveSiteConfig } from "@/lib/config/get-site-config";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/config/i18n";
import {
  getDisplayBusinessName,
  getPrimaryCta,
  getRenter,
  getSecondaryCta,
} from "@/lib/config/site-config-utils";

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

  const siteConfig = getActiveSiteConfig();
  const businessName = getDisplayBusinessName(siteConfig);
  const isDutch = lang === "nl";
  const title = isDutch
    ? `Fietsenmaker in ${siteConfig.city} | Studenten & expats`
    : `Bike Repair Shop in ${siteConfig.city} | Students & Expats`;
  const description = isDutch
    ? `Ontdek fietsreparatie, tweedehands fietsen, studentenfietsen en accessoires van ${businessName} in ${siteConfig.city}.`
    : `Explore bike repair, second-hand bikes, student bikes, and accessories from ${businessName} in ${siteConfig.city}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}/services`,
      languages: {
        en: `https://${siteConfig.domain}/en/services`,
        nl: `https://${siteConfig.domain}/nl/services`,
      },
    },
  };
}

export default async function ServicesOverviewPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getActiveSiteConfig();
  const services = getServicePagesForSite(siteConfig);
  const businessName = getDisplayBusinessName(siteConfig);
  const renter = getRenter(siteConfig);
  const primaryCta = getPrimaryCta(siteConfig, lang);
  const secondaryCta = getSecondaryCta(siteConfig, lang);
  const isDutch = lang === "nl";

  const breadcrumbItems = [
    {
      name: "Home",
      href: `/${lang}`,
      url: `https://${siteConfig.domain}/${lang}`,
    },
    {
      name: isDutch ? "Diensten" : "Services",
      url: `https://${siteConfig.domain}/${lang}/services`,
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

          <div className="mt-6 max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold text-zinc-900">
              {isDutch
                ? `Fietsdiensten van ${businessName}`
                : `Bike services from ${businessName}`}
            </h1>
            <p className="text-lg text-zinc-700">
              {isDutch
                ? `${siteConfig.siteName} biedt praktische fietshulp voor studenten, expats, forenzen en locals in ${siteConfig.city}: reparatie, studentenfietsen, tweedehands fietsen en accessoires.`
                : `${siteConfig.siteName} offers practical bike help for students, expats, commuters, and locals in ${siteConfig.city}: repair, student bikes, second-hand bikes, and everyday accessories.`}
            </p>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${lang}/services/${service.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-100">
                <Image
                  src={service.imageUrl || siteConfig.heroImagePath}
                  alt={service.title[lang]}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="mb-2 text-2xl font-bold text-zinc-900">
                  {service.title[lang]}
                </h2>
                <p className="mb-6 flex-1 text-zinc-600">
                  {service.excerpt[lang]}
                </p>
                <div className="flex items-center font-medium text-black">
                  <span>{isDutch ? "Bekijk service" : "View service"}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900">
            {isDutch ? "Hulp nodig?" : "Need help?"}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-zinc-700">
            {renter
              ? isDutch
                ? `Bel de winkel of open de route naar ${businessName} voor directe hulp met reparatie, verkoop en accessoires.`
                : `Call the shop or open directions to ${businessName} for direct help with repairs, bike sales, and accessories.`
              : isDutch
                ? `Vertel welke fietshulp je zoekt in ${siteConfig.city}, dan kan je aanvraag met de juiste context worden opgepakt.`
                : `Tell us what bike help you need in ${siteConfig.city}, so your request can be handled with the right context.`}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={primaryCta.href}
              className="inline-block rounded-full bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
            >
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              target={secondaryCta.target}
              rel={secondaryCta.rel}
              className="inline-block rounded-full border border-zinc-300 px-8 py-3 font-medium text-zinc-900 transition-colors hover:bg-white"
            >
              {secondaryCta.label}
            </a>
          </div>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}
