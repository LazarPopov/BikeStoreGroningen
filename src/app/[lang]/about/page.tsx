import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getNeighborhoodPagesForSite } from "@/data/neighborhood-pages";
import { getServicePagesForSite } from "@/data/service-pages";
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
    title: isDutch ? `Over ${businessName}` : `About ${businessName}`,
    description: isDutch
      ? `${businessName} helpt studenten, expats en dagelijkse fietsers in ${siteConfig.city} met reparatie, tweedehands fietsen, studentenfietsen en accessoires.`
      : `${businessName} helps students, expats, and daily riders in ${siteConfig.city} with repair, second-hand bikes, student bikes, and accessories.`,
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}/about`,
      languages: {
        en: `https://${siteConfig.domain}/en/about`,
        nl: `https://${siteConfig.domain}/nl/about`,
      },
    },
    openGraph: {
      title: isDutch
        ? `Over ${businessName} in ${siteConfig.city}`
        : `About ${businessName} in ${siteConfig.city}`,
      description: isDutch
        ? `${businessName} helpt fietsers in ${siteConfig.city} met praktische reparatie- en fietskoopvragen.`
        : `${businessName} helps cyclists in ${siteConfig.city} with practical repair and bike-buying questions.`,
      url: `https://${siteConfig.domain}/${lang}/about`,
      siteName: siteConfig.siteName,
      locale: isDutch ? "nl_NL" : "en_US",
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getActiveSiteConfig();
  const businessName = getDisplayBusinessName(siteConfig);
  const renter = getRenter(siteConfig);
  const contactEmail = getContactEmail(siteConfig);
  const services = getServicePagesForSite(siteConfig);
  const localPages = getNeighborhoodPagesForSite(siteConfig).slice(0, 6);
  const primaryCta = getPrimaryCta(siteConfig, lang);
  const secondaryCta = getSecondaryCta(siteConfig, lang);
  const isDutch = lang === "nl";

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <SiteHeader siteConfig={siteConfig} lang={lang} />

        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="relative h-[260px] w-full md:h-[360px]">
            <Image
              src={siteConfig.heroImagePath}
              alt={
                isDutch
                  ? `Fietshulp in ${siteConfig.city}`
                  : `Bike help in ${siteConfig.city}`
              }
              fill
              preload
              className="object-cover"
            />
          </div>

          <div className="p-8">
            <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
              {isDutch ? "Over ons" : "About us"}
            </p>
            <h1 className="mb-4 text-4xl font-bold text-zinc-900">
              {isDutch ? `Over ${businessName}` : `About ${businessName}`}
            </h1>
            <p className="max-w-4xl text-lg leading-8 text-zinc-700">
              {isDutch
                ? `${businessName} richt zich op praktische fietshulp in ${siteConfig.city}: reparatievragen, tweedehands fietsen, studentenfietsen, sloten, verlichting en advies voor dagelijks fietsen.`
                : `${businessName} focuses on practical bike help in ${siteConfig.city}: repair questions, second-hand bikes, student bikes, locks, lights, and advice for everyday cycling.`}
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm lg:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
              {isDutch
                ? `Voor studenten, expats en locals in ${siteConfig.city}`
                : `For students, expats, and locals in ${siteConfig.city}`}
            </h2>
            <div className="space-y-4 text-zinc-700">
              <p>
                {isDutch
                  ? `Een werkende fiets is in ${siteConfig.city} essentieel voor studie, werk, boodschappen, stationritten en dagelijkse afspraken. Daarom is de site gericht op duidelijke fietshulp en lokale informatie die past bij dagelijks gebruik.`
                  : `A working bike is essential in ${siteConfig.city} for study, work, groceries, station trips, and everyday plans. That is why this site is focused on clear bike help and local information for everyday use.`}
              </p>
              <p>
                {isDutch
                  ? `Nieuw in de stad? Je kunt hulp zoeken voor een betrouwbare tweedehands fiets, een studentenfiets, fietsreparatie of accessoires die passen bij druk dagelijks gebruik.`
                  : `New in town? You can look for help with a reliable used bike, a student bike, bike repair, or accessories that fit busy daily use.`}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
              {renter
                ? isDutch
                  ? "Contact en locatie"
                  : "Contact and location"
                : isDutch
                  ? "Aanvraag"
                  : "Request"}
            </h2>

            <div className="space-y-3 text-zinc-700">
              <div className="grid gap-3 pb-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a
                  href={primaryCta.href}
                  className="rounded-xl bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  {primaryCta.label}
                </a>
                <a
                  href={secondaryCta.href}
                  target={secondaryCta.target}
                  rel={secondaryCta.rel}
                  className="rounded-xl border border-zinc-300 px-4 py-3 text-center text-sm font-semibold text-zinc-900"
                >
                  {secondaryCta.label}
                </a>
              </div>

              <p>
                <strong>{renter ? "Partner:" : isDutch ? "Website:" : "Site:"}</strong>{" "}
                {businessName}
              </p>

              {renter ? (
                <>
                  <p>
                    <strong>{isDutch ? "Adres:" : "Address:"}</strong>{" "}
                    {renter.address}, {renter.postalCode}, {siteConfig.city},{" "}
                    {siteConfig.country}
                  </p>
                  <p>
                    <strong>{isDutch ? "Telefoon:" : "Phone:"}</strong>{" "}
                    <a
                      href={`tel:${renter.phoneNumber}`}
                      className="text-zinc-900 underline underline-offset-4"
                    >
                      {renter.phoneNumber}
                    </a>
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
                <a
                  href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                    siteConfig.siteName
                  )}`}
                  className="text-zinc-900 underline underline-offset-4"
                >
                  {contactEmail}
                </a>
              </p>

              {renter ? (
                <p>
                  <strong>Google:</strong>{" "}
                  <a
                    href={renter.googleBusinessUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-900 underline underline-offset-4"
                  >
                    {isDutch ? "Bekijk bedrijfsprofiel" : "View business profile"}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-wide text-zinc-500">
              {isDutch ? "Services" : "Services"}
            </p>
            <h2 className="text-2xl font-semibold text-zinc-900">
              {isDutch
                ? `Alles voor fietsers in ${siteConfig.city}`
                : `Everything for cyclists in ${siteConfig.city}`}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${lang}/services/${service.slug}`}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-zinc-300 hover:bg-white"
              >
                <h3 className="mb-2 text-lg font-semibold text-zinc-900">
                  {service.title[lang]}
                </h3>
                <p className="text-zinc-700">{service.excerpt[lang]}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
              {isDutch ? "Waarom dit werkt" : "Why this works"}
            </h2>
            <ul className="space-y-3 text-zinc-700">
              <li>
                {isDutch
                  ? `Gerichte servicepagina's voor reparatie, studentenfietsen, tweedehands fietsen en accessoires in ${siteConfig.city}.`
                  : `Focused service pages for repair, student bikes, second-hand bikes, and accessories in ${siteConfig.city}.`}
              </li>
              <li>
                {isDutch
                  ? "Sterke student- en expatpositionering voor mensen die snel praktische hulp zoeken."
                  : "Strong student and expat positioning for people who need practical help quickly."}
              </li>
              <li>
                {isDutch
                  ? "Lokale pagina's voor buurten en plekken waar fietszoekintentie logisch is."
                  : "Local pages for neighborhoods and places where bike search intent is natural."}
              </li>
            </ul>
          </div>

          {renter ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
                {isDutch ? "Openingstijden" : "Opening hours"}
              </h2>

              <div className="space-y-3">
                {renter.openingHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between border-b border-zinc-100 pb-2 text-zinc-700 last:border-b-0"
                  >
                    <span className="font-medium text-zinc-900">{item.day}</span>
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
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
                {isDutch ? "Aanvragen via de site" : "Requests through the site"}
              </h2>
              <p className="text-zinc-700">
                {isDutch
                  ? `Gebruik de contactpagina om je fietsprobleem, gewenste fietstype, budget en dagelijkse route door te geven.`
                  : `Use the contact page to share your bike problem, preferred bike type, budget, and daily route.`}
              </p>
            </div>
          )}
        </section>

        {renter && renter.reviews.length > 0 ? (
          <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-zinc-500">
                  {isDutch ? "Vertrouwen" : "Trust"}
                </p>
                <h2 className="text-2xl font-semibold text-zinc-900">
                  {isDutch ? "Wat klanten zeggen" : "What customers say"}
                </h2>
              </div>

              <p className="text-zinc-700">
                <strong>{renter.googleReviewRating.toFixed(1)}</strong> / 5{" "}
                {renter.googleReviewCount} Google reviews
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {renter.reviews.map((review) => (
                <article
                  key={`${review.reviewerName}-${review.rating}`}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-zinc-900">
                      {review.reviewerName}
                    </h3>
                    <span className="text-sm text-zinc-600">
                      {review.rating}/5
                    </span>
                  </div>
                  <p className="mb-3 text-zinc-700">{review.reviewText}</p>
                  <p className="text-sm text-zinc-500">{review.source}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
            {isDutch
              ? `Lokaal in ${siteConfig.city}`
              : `Local in ${siteConfig.city}`}
          </h2>

          <div className="space-y-4 text-zinc-700">
            <p>
              {renter
                ? isDutch
                  ? `${businessName} is gevestigd aan ${renter.address}, ${renter.postalCode} in ${siteConfig.city}. Dat maakt de winkel praktisch voor fietsers uit ${siteConfig.neighborhoods.join(", ")}.`
                  : `${businessName} is located at ${renter.address}, ${renter.postalCode} in ${siteConfig.city}. That makes the shop practical for cyclists from ${siteConfig.neighborhoods.join(", ")}.`
                : isDutch
                  ? `${siteConfig.siteName} richt lokale fietshulp op buurten en drukke plekken in ${siteConfig.city}, zodat je aanvraag meteen de juiste context heeft.`
                  : `${siteConfig.siteName} focuses local bike help around neighborhoods and busy places in ${siteConfig.city}, so your request starts with the right context.`}
            </p>

            {localPages.length > 0 ? (
              <div className="flex flex-wrap gap-3 pt-2">
                {localPages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${lang}/buurten/${page.slug}`}
                    className="rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900"
                  >
                    {page.shortTitle[lang]}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}
