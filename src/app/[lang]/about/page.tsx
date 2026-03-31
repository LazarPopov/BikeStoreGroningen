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
        ? `Over | ${siteConfig.siteName}`
        : `About | ${siteConfig.siteName}`,
    description:
      lang === "nl"
        ? `Meer informatie over ${siteConfig.siteName} in ${siteConfig.city}.`
        : `Learn more about ${siteConfig.siteName} in ${siteConfig.city}.`,
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}/about`,
      languages: {
        en: `https://${siteConfig.domain}/en/about`,
        nl: `https://${siteConfig.domain}/nl/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getSiteConfig("bikes-groningen");

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <SiteHeader siteConfig={siteConfig} lang={lang} />

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
            {lang === "nl" ? "Over ons" : "About Us"}
          </p>

          <h1 className="mb-6 text-4xl font-bold">
            {lang === "nl"
              ? `Over ${siteConfig.siteName}`
              : `About ${siteConfig.siteName}`}
          </h1>

          <div className="space-y-4 text-zinc-700">
            <p>
              {lang === "nl"
                ? `${siteConfig.siteName} is opgezet als een lokaal platform voor mensen die in ${siteConfig.city} een fiets zoeken.`
                : `${siteConfig.siteName} is built as a local platform for people looking for a bike in ${siteConfig.city}.`}
            </p>

            <p>
              {lang === "nl"
                ? "De website is bedoeld voor studenten, expats en dagelijkse fietsers die snel lokale opties willen vinden voor fietsen, reparatie en accessoires."
                : "The website is designed for students, expats, and daily riders who want to quickly find local options for bikes, repairs, and accessories."}
            </p>

            <p>
              {lang === "nl"
                ? "De inhoud, contactgegevens en bedrijfsinformatie moeten later makkelijk aangepast kunnen worden voor een andere partner of huurder."
                : "The content, contact details, and business information should later be easy to swap for another partner or renter."}
            </p>

            <p>
              <strong>
                {lang === "nl" ? "Contactpersoon:" : "Contact person:"}
              </strong>{" "}
              {siteConfig.contactPersonName}
            </p>
          </div>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}