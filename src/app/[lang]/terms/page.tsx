import type { Metadata } from "next";
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
    title:
      lang === "nl"
        ? `Algemene Voorwaarden | ${siteConfig.siteName}`
        : `Terms and Conditions | ${siteConfig.siteName}`,
    description:
      lang === "nl"
        ? `Algemene voorwaarden van ${siteConfig.siteName}.`
        : `Terms and conditions of ${siteConfig.siteName}.`,
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}/terms`,
      languages: {
        en: `https://${siteConfig.domain}/en/terms`,
        nl: `https://${siteConfig.domain}/nl/terms`,
      },
    },
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getSiteConfig("bikes-groningen");

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <SiteHeader siteConfig={siteConfig} lang={lang} />

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
            {lang === "nl" ? "Voorwaarden" : "Terms"}
          </p>

          <h1 className="mb-6 text-4xl font-bold">
            {lang === "nl" ? "Algemene Voorwaarden" : "Terms and Conditions"}
          </h1>

          <div className="space-y-4 text-zinc-700">
            <p>
              {lang === "nl"
                ? `${siteConfig.siteName} is bedoeld als informatie, leadgeneratie en contactplatform voor fietsgerelateerde diensten in ${siteConfig.city}.`
                : `${siteConfig.siteName} is intended as an information, lead generation, and contact platform for bike related services in ${siteConfig.city}.`}
            </p>

            <p>
              {lang === "nl"
                ? "De informatie op de website is bedoeld als algemene informatie en kan later worden aangepast, uitgebreid of vervangen."
                : "The information on the website is provided for general informational purposes and may later be updated, expanded, or replaced."}
            </p>

            <p>
              {lang === "nl"
                ? "Wanneer leads worden doorgestuurd naar een partner of huurder van het platform, kunnen aanvullende voorwaarden van die partij van toepassing zijn."
                : "When leads are routed to a partner or renter of the platform, additional terms of that party may apply."}
            </p>

            <p>
              {lang === "nl"
                ? "Er wordt geen garantie gegeven op beschikbaarheid, prijzen of inhoud van derde partijen, tenzij dat later uitdrukkelijk op de website wordt vermeld."
                : "No guarantee is given regarding third party availability, pricing, or content unless explicitly stated later on the website."}
            </p>

            <p>
              {lang === "nl"
                ? "Door de website te gebruiken, stemt de bezoeker in met deze voorwaarden en met het gebruik van de contactmogelijkheden en formulieren op het platform."
                : "By using the website, the visitor agrees to these terms and to the use of the contact options and forms available on the platform."}
            </p>
          </div>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}