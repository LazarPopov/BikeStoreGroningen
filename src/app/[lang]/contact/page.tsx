// src/app/[lang]/contact/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/config/get-site-config";
import { isSupportedLanguage } from "@/lib/config/i18n";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LeadForm } from "@/components/forms/lead-form";

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
    title: `Contact | ${siteConfig.siteName}`,
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
      title: `Contact | ${siteConfig.siteName}`,
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

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <SiteHeader siteConfig={siteConfig} lang={lang} />

        <section className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
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
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
              <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
                {lang === "nl" ? "Contact" : "Contact"}
              </p>

              <h1 className="mb-6 text-4xl font-bold">
                {lang === "nl" ? "Neem contact op" : "Get in Touch"}
              </h1>

              <div className="space-y-4 text-zinc-700">
                <p>
                  <strong>{lang === "nl" ? "Telefoon:" : "Phone:"}</strong>{" "}
                  <a href={`tel:${siteConfig.phoneNumber}`} className="underline">
                    {siteConfig.phoneNumber}
                  </a>
                </p>

                <p>
                  <strong>{lang === "nl" ? "E-mail:" : "Email:"}</strong>{" "}
                  <a href={`mailto:${siteConfig.email}`} className="underline">
                    {siteConfig.email}
                  </a>
                </p>

                <p>
                  <strong>{lang === "nl" ? "Adres:" : "Address:"}</strong>{" "}
                  {siteConfig.address}, {siteConfig.postalCode}, {siteConfig.city}
                </p>

                <p>
                  <strong>
                    {lang === "nl" ? "Contactpersoon:" : "Contact person:"}
                  </strong>{" "}
                  {siteConfig.contactPersonName}
                </p>
              </div>
            </div>
          </div>

          <LeadForm siteConfig={siteConfig} lang={lang} />
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}