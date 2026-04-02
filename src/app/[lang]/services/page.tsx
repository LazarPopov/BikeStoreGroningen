import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { getSiteConfig } from "@/lib/config/get-site-config";
import { getServicePagesByCity } from "@/data/service-pages";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/config/i18n";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

  if (!isSupportedLanguage(lang)) return {};

  const siteConfig = getSiteConfig("bikes-groningen");
  
  const title = lang === "nl" 
    ? `Fietsdiensten in ${siteConfig.city} | Reparaties & Verkoop` 
    : `Bike Services in ${siteConfig.city} | Repairs & Sales`;
    
  const description = lang === "nl"
    ? `Ontdek alle fietsdiensten van ${siteConfig.googleBusinessProfileName} in ${siteConfig.city}. Van goedkope studentenfietsen en tweedehands opties tot snelle reparaties.`
    : `Explore all bike services by ${siteConfig.googleBusinessProfileName} in ${siteConfig.city}. From cheap student bikes and second-hand options to fast repairs.`;

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

  const siteConfig = getSiteConfig("bikes-groningen");
  const services = getServicePagesByCity(siteConfig.city);
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
                ? `Fietsdiensten van ${siteConfig.googleBusinessProfileName}` 
                : `Bike Services by ${siteConfig.googleBusinessProfileName}`}
            </h1>
            <p className="text-lg text-zinc-700">
              {isDutch
                ? `${siteConfig.siteName} biedt een compleet pakket aan oplossingen voor elke fietser in ${siteConfig.city}. Of je nu op zoek bent naar een goedkope studentenfiets of een vakkundige reparatie.`
                : `${siteConfig.siteName} offers a complete range of solutions for every cyclist in ${siteConfig.city}. Whether you are looking for a cheap student bike or professional repairs.`}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${lang}/services/${service.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-[16/9] w-full overflow-hidden border-b border-zinc-100">
                <img
                  src={service.imageUrl}
                  alt={service.title[lang]}
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

        {/* Bottom CTA for Contact */}
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900">
            {isDutch ? "Hulp nodig?" : "Need help?"}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-zinc-700">
            {isDutch
              ? "Weet je niet zeker welke dienst je nodig hebt of wil je direct een afspraak maken? Onze experts staan voor je klaar."
              : "Not sure which service you need or want to book an appointment directly? Our experts are here to help."}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block rounded-full bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-zinc-800"
          >
            {isDutch ? "Neem contact op" : "Contact us"}
          </Link>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}