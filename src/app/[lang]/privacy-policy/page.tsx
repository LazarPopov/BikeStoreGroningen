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
        ? `Privacybeleid | ${siteConfig.siteName}`
        : `Privacy Policy | ${siteConfig.siteName}`,
    description:
      lang === "nl"
        ? `Privacybeleid van ${siteConfig.siteName}.`
        : `Privacy policy of ${siteConfig.siteName}.`,
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}/privacy-policy`,
      languages: {
        en: `https://${siteConfig.domain}/en/privacy-policy`,
        nl: `https://${siteConfig.domain}/nl/privacy-policy`,
      },
    },
  };
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
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
            {lang === "nl" ? "Privacy" : "Privacy"}
          </p>

          <h1 className="mb-6 text-4xl font-bold">
            {lang === "nl" ? "Privacybeleid" : "Privacy Policy"}
          </h1>

          <div className="space-y-4 text-zinc-700">
            <p>
              {lang === "nl"
                ? `${siteConfig.siteName} kan persoonsgegevens verzamelen wanneer een bezoeker contact opneemt of een leadformulier invult.`
                : `${siteConfig.siteName} may collect personal data when a visitor gets in touch or fills in a lead form.`}
            </p>

            <p>
              {lang === "nl"
                ? "Deze gegevens kunnen bestaan uit naam, e mailadres, telefoonnummer, stad, voorkeuren en aanvullende informatie die de bezoeker zelf doorgeeft."
                : "This data may include name, email address, phone number, city, preferences, and any additional information provided by the visitor."}
            </p>

            <p>
              {lang === "nl"
                ? "De gegevens worden gebruikt om contact op te nemen, aanvragen te verwerken, leads door te sturen naar de juiste partner en de dienstverlening te verbeteren."
                : "The data is used to respond to inquiries, process requests, route leads to the correct partner, and improve the service."}
            </p>

            <p>
              {lang === "nl"
                ? "De exacte bewaartermijn, verwerkers en tools kunnen later worden aangepast wanneer de live infrastructuur definitief is ingesteld."
                : "The exact retention period, processors, and tools may later be updated once the live infrastructure is fully configured."}
            </p>

            <p>
              {lang === "nl"
                ? "Voor verzoeken rondom privacy of gegevensverwijdering kan contact worden opgenomen via het vermelde e mailadres op deze website."
                : "For privacy related requests or deletion requests, visitors can contact the email address listed on this website."}
            </p>
          </div>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}