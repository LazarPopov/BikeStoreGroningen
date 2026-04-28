import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveSiteConfig } from "@/lib/config/get-site-config";
import { isSupportedLanguage } from "@/lib/config/i18n";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  getDisplayBusinessName,
  getRenter,
} from "@/lib/config/site-config-utils";

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

  const siteConfig = getActiveSiteConfig();
  const renter = getRenter(siteConfig);

return {
    title:
      lang === "nl"
        ? `Algemene Voorwaarden`
        : `Terms and Conditions`,
    description:
      renter
        ? lang === "nl"
          ? `Bekijk de algemene voorwaarden van ${siteConfig.siteName}. Duidelijke afspraken over fietsaankopen, reparaties en lokale services.`
          : `View the terms and conditions of ${siteConfig.siteName}. Clear agreements on bike purchases, repairs, and local bicycle services.`
        : lang === "nl"
          ? `Bekijk de algemene voorwaarden van ${siteConfig.siteName} voor fietshulpaanvragen in ${siteConfig.city}.`
          : `View the terms and conditions of ${siteConfig.siteName} for bike help requests in ${siteConfig.city}.`,
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

  const siteConfig = getActiveSiteConfig();
  const businessName = getDisplayBusinessName(siteConfig);
  const renter = getRenter(siteConfig);

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
                ? `${siteConfig.siteName} is bedoeld als informatie- en contactwebsite voor fietsgerelateerde diensten van ${businessName} in ${siteConfig.city}.`
                : `${siteConfig.siteName} is intended as an information and contact website for bike related services from ${businessName} in ${siteConfig.city}.`}
            </p>

            <p>
              {lang === "nl"
                ? "De informatie op de website is bedoeld als algemene informatie en kan later worden aangepast, uitgebreid of vervangen."
                : "The information on the website is provided for general informational purposes and may later be updated, expanded, or replaced."}
            </p>

            <p>
              {renter
                ? lang === "nl"
                  ? `Voor aankopen, reparaties en winkelbezoeken kunnen aanvullende voorwaarden van ${businessName} gelden.`
                  : `For purchases, repairs, and shop visits, additional terms from ${businessName} may apply.`
                : lang === "nl"
                  ? "Voor aanvragen via de website kunnen aanvullende afspraken gelden zodra een verzoek wordt opgepakt."
                  : "For requests through the website, additional agreements may apply once an inquiry is handled."}
            </p>

            <p>
              {renter
                ? lang === "nl"
                  ? "Er wordt geen garantie gegeven op actuele beschikbaarheid of prijzen, tenzij dat uitdrukkelijk door de winkel wordt bevestigd."
                  : "No guarantee is given regarding current availability or prices unless explicitly confirmed by the shop."
                : lang === "nl"
                  ? "Er wordt geen garantie gegeven op beschikbaarheid, prijzen of reactietermijnen, tenzij dat uitdrukkelijk wordt bevestigd."
                  : "No guarantee is given regarding availability, prices, or response times unless explicitly confirmed."}
            </p>

            <p>
              {lang === "nl"
                ? "Door de website te gebruiken, stemt de bezoeker in met deze voorwaarden en met het gebruik van de contactmogelijkheden op de website."
                : "By using the website, the visitor agrees to these terms and to the use of the contact options available on the website."}
            </p>
          </div>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}
