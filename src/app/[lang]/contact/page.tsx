import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LeadForm } from "@/components/forms/lead-form";
import { getActiveSiteConfig } from "@/lib/config/get-site-config";
import { isSupportedLanguage } from "@/lib/config/i18n";
import {
  getContactEmail,
  getDisplayBusinessName,
  getPrimaryCta,
  getRenter,
  getSecondaryCta,
} from "@/lib/config/site-config-utils";

type PageProps = {
  params: Promise<{ lang: string }>;
};

function isClosed(value: string) {
  return value.toLowerCase() === "closed";
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

  return {
    title: "Contact",
    description: isDutch
      ? `Neem contact op met ${businessName} voor fietshulp in ${siteConfig.city}.`
      : `Contact ${businessName} for bike help in ${siteConfig.city}.`,
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}/contact`,
      languages: {
        en: `https://${siteConfig.domain}/en/contact`,
        nl: `https://${siteConfig.domain}/nl/contact`,
      },
    },
    openGraph: {
      title: "Contact",
      description: isDutch
        ? `Neem contact op met ${businessName} voor fietshulp in ${siteConfig.city}.`
        : `Contact ${businessName} for bike help in ${siteConfig.city}.`,
      url: `https://${siteConfig.domain}/${lang}/contact`,
      siteName: siteConfig.siteName,
      type: "website",
      images: [
        {
          url: `https://${siteConfig.domain}${siteConfig.heroImagePath}`,
          alt: isDutch
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

  const siteConfig = getActiveSiteConfig();
  const renter = getRenter(siteConfig);
  const businessName = getDisplayBusinessName(siteConfig);
  const contactEmail = getContactEmail(siteConfig);
  const primaryCta = getPrimaryCta(siteConfig, lang);
  const secondaryCta = getSecondaryCta(siteConfig, lang);
  const isDutch = lang === "nl";

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <SiteHeader siteConfig={siteConfig} lang={lang} />

        <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10]">
                <Image
                  src={siteConfig.heroImagePath}
                  alt={
                    isDutch
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

              <h1 className="mb-6 text-4xl font-bold text-zinc-900">
                {renter
                  ? isDutch
                    ? "Bel of kom langs"
                    : "Call or visit the shop"
                  : isDutch
                    ? `Vraag fietshulp aan in ${siteConfig.city}`
                    : `Request bike help in ${siteConfig.city}`}
              </h1>

              <p className="mb-6 text-zinc-700">
                {isDutch
                  ? `${businessName} helpt met fietsreparatie, tweedehands fietsen, studentenfietsen, sloten, verlichting en praktische fietsvragen in ${siteConfig.city}.`
                  : `${businessName} helps with bike repair, second-hand bikes, student bikes, locks, lights, and practical cycling questions in ${siteConfig.city}.`}
              </p>

              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={primaryCta.href}
                  className="rounded-xl bg-zinc-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-black"
                >
                  {primaryCta.label}
                </a>
                <a
                  href={secondaryCta.href}
                  target={secondaryCta.target}
                  rel={secondaryCta.rel}
                  className="rounded-xl border border-zinc-300 px-5 py-3 text-center font-semibold text-zinc-900 transition hover:bg-zinc-50"
                >
                  {secondaryCta.label}
                </a>
              </div>

              <div className="space-y-4 text-zinc-700">
                {renter ? (
                  <>
                    <p>
                      <strong>{isDutch ? "Telefoon:" : "Phone:"}</strong>{" "}
                      <a
                        href={`tel:${renter.phoneNumber}`}
                        className="underline"
                      >
                        {renter.phoneNumber}
                      </a>
                    </p>
                    <p>
                      <strong>{isDutch ? "Adres:" : "Address:"}</strong>{" "}
                      {renter.address}, {renter.postalCode}, {siteConfig.city}
                    </p>
                    <p>
                      <strong>{isDutch ? "Winkel:" : "Shop:"}</strong>{" "}
                      {renter.contactPersonName}
                    </p>
                  </>
                ) : (
                  <p>
                    <strong>{isDutch ? "Plaats:" : "City:"}</strong>{" "}
                    {siteConfig.city}, {siteConfig.country}
                  </p>
                )}

                <p>
                  <strong>{isDutch ? "E-mail:" : "Email:"}</strong>{" "}
                  <a href={`mailto:${contactEmail}`} className="underline">
                    {contactEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {renter ? (
              <>
                <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                  <iframe
                    src={renter.mapEmbedUrl}
                    title={
                      isDutch
                        ? `Kaart van ${businessName}`
                        : `Map of ${businessName}`
                    }
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
                    {renter.openingHours.map((item) => (
                      <div
                        key={item.day}
                        className="flex items-center justify-between border-b border-zinc-200 pb-2 text-zinc-700 last:border-b-0"
                      >
                        <span className="font-medium text-zinc-900">
                          {item.day}
                        </span>
                        <span>
                          {isClosed(item.open) || isClosed(item.close)
                            ? isDutch
                              ? "Gesloten"
                              : "Closed"
                            : `${item.open} - ${item.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <section id="request">
                <Suspense
                  fallback={
                    <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
                      <p className="text-zinc-700">
                        {isDutch
                          ? "Aanvraagformulier laden..."
                          : "Loading request form..."}
                      </p>
                    </div>
                  }
                >
                  <LeadForm siteConfig={siteConfig} lang={lang} />
                </Suspense>
              </section>
            )}
          </div>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}
