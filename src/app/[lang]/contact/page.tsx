// src/app/[lang]/contact/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/config/get-site-config";
import { isSupportedLanguage } from "@/lib/config/i18n";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    return {};
  }

  const siteConfig = getSiteConfig("bikes-groningen");

  return {
    // FIXED: Removed manual siteName to prevent double branding!
    title: "Contact",
    description:
      lang === "nl"
        ? `Neem contact op met ${siteConfig.siteName} in ${siteConfig.city}.`
        : `Contact ${siteConfig.siteName} in ${siteConfig.city}.`,
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}/contact`,
      languages: {
        en: `https://${siteConfig.domain}/en/contact`,
        nl: `https://${siteConfig.domain}/nl/contact`,
      },
    },
    openGraph: {
      // FIXED: Removed manual siteName here as well
      title: "Contact",
      description:
        lang === "nl"
          ? `Neem contact op met ${siteConfig.siteName} in ${siteConfig.city}.`
          : `Contact ${siteConfig.siteName} in ${siteConfig.city}.`,
      url: `https://${siteConfig.domain}/${lang}/contact`,
      siteName: siteConfig.siteName,
      type: "website",
      images: [
        {
          url: `https://${siteConfig.domain}/images/bikes-groningen-hero.jpg`,
          alt:
            lang === "nl"
              ? `${siteConfig.siteName} contactpagina`
              : `${siteConfig.siteName} contact page`,
        },
      ],
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getSiteConfig("bikes-groningen");
  const isDutch = lang === "nl";

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <SiteHeader siteConfig={siteConfig} lang={lang} />

        <section className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/bikes-groningen-hero.jpg"
                  alt={
                    lang === "nl"
                      ? `Fietsen in ${siteConfig.city}`
                      : `Bikes in ${siteConfig.city}`
                  }
                  fill
                  preload
                  className="object-cover"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
              <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
                {isDutch ? "Contact" : "Contact"}
              </p>

              <h1 className="mb-6 text-4xl font-bold">
                {isDutch ? "Bel of kom langs" : "Call or visit the shop"}
              </h1>

              <p className="mb-6 text-zinc-700">
                {isDutch
                  ? `${siteConfig.googleBusinessProfileName} helpt fietsers in ${siteConfig.city} met reparaties, tweedehands fietsen, nieuwe fietsen, sloten en verlichting.`
                  : `${siteConfig.googleBusinessProfileName} helps cyclists in ${siteConfig.city} with repairs, second-hand bikes, new bikes, locks, and lights.`}
              </p>

              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${siteConfig.phoneNumber}`}
                  className="rounded-xl bg-zinc-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-black"
                >
                  {isDutch ? "Bel de winkel" : "Call the shop"}
                </a>
                <a
                  href={siteConfig.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-zinc-300 px-5 py-3 text-center font-semibold text-zinc-900 transition hover:bg-zinc-50"
                >
                  {isDutch ? "Route op Google Maps" : "Directions on Google Maps"}
                </a>
              </div>

              <div className="space-y-4 text-zinc-700">
                <p>
                  <strong>{isDutch ? "Telefoon:" : "Phone:"}</strong>{" "}
                  <a href={`tel:${siteConfig.phoneNumber}`} className="underline">
                    {siteConfig.phoneNumber}
                  </a>
                </p>

                <p>
                  <strong>{isDutch ? "E-mail:" : "Email:"}</strong>{" "}
                  <a href={`mailto:${siteConfig.email}`} className="underline">
                    {siteConfig.email}
                  </a>
                </p>

                <p>
                  <strong>{isDutch ? "Adres:" : "Address:"}</strong>{" "}
                  {siteConfig.address}, {siteConfig.postalCode}, {siteConfig.city}
                </p>

                <p>
                  <strong>
                    {isDutch ? "Winkel:" : "Shop:"}
                  </strong>{" "}
                  {siteConfig.contactPersonName}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <iframe
                src={siteConfig.mapEmbedUrl}
                title={isDutch ? "Kaart van De Twee Wielen" : "Map of De Twee Wielen"}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0"
              />
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
                {isDutch ? "Openingstijden" : "Opening hours"}
              </h2>
              <div className="space-y-3">
                {siteConfig.openingHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between border-b border-zinc-200 pb-2 text-zinc-700 last:border-b-0"
                  >
                    <span className="font-medium text-zinc-900">{item.day}</span>
                    <span>
                      {item.open === "Closed" || item.close === "Closed"
                        ? isDutch
                          ? "Gesloten"
                          : "Closed"
                        : `${item.open} - ${item.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}
