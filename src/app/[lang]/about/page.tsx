import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/config/get-site-config";
import { isSupportedLanguage } from "@/lib/config/i18n";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

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

  const siteConfig = getSiteConfig("bikes-groningen");

  return {
    title:
      lang === "nl"
        ? `Over ${siteConfig.googleBusinessProfileName} | ${siteConfig.siteName}`
        : `About ${siteConfig.googleBusinessProfileName} | ${siteConfig.siteName}`,
    description:
      lang === "nl"
        ? `${siteConfig.googleBusinessProfileName} in ${siteConfig.city}. Lees meer over tweedehands fietsen, reparatie, nieuwe fietsen, accessoires, studentenfietsen en goedkope fietsen in ${siteConfig.city}.`
        : `${siteConfig.googleBusinessProfileName} in ${siteConfig.city}. Learn more about second hand bikes, repair, new bikes, accessories, student bikes, and cheap bikes in ${siteConfig.city}.`,
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}/about`,
      languages: {
        en: `https://${siteConfig.domain}/en/about`,
        nl: `https://${siteConfig.domain}/nl/about`,
      },
    },
    openGraph: {
      title:
        lang === "nl"
          ? `Over ${siteConfig.googleBusinessProfileName} in ${siteConfig.city}`
          : `About ${siteConfig.googleBusinessProfileName} in ${siteConfig.city}`,
      description:
        lang === "nl"
          ? `${siteConfig.googleBusinessProfileName} helpt studenten, expats en dagelijkse fietsers in ${siteConfig.city} met tweedehands fietsen, reparaties, nieuwe fietsen en accessoires.`
          : `${siteConfig.googleBusinessProfileName} helps students, expats, and daily riders in ${siteConfig.city} with second hand bikes, repairs, new bikes, and accessories.`,
      url: `https://${siteConfig.domain}/${lang}/about`,
      siteName: siteConfig.siteName,
      locale: lang === "nl" ? "nl_NL" : "en_US",
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getSiteConfig("bikes-groningen");
  const isDutch = lang === "nl";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BikeStore",
    name: siteConfig.googleBusinessProfileName,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      postalCode: siteConfig.postalCode,
      addressCountry: "NL",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.googleReviewRating,
      reviewCount: siteConfig.googleReviewCount,
    },
  };

  const serviceLinks = [
    {
      href: `/${lang}/services/second-hand`,
      title: isDutch
        ? `Tweedehands fietsen in ${siteConfig.city}`
        : `Second hand bikes in ${siteConfig.city}`,
      description: isDutch
        ? "Volledig refurbished, studentvriendelijke fietsen vanaf €120."
        : "Fully refurbished, student friendly bikes starting from €120.",
    },
    {
      href: `/${lang}/services/repair`,
      title: isDutch
        ? `Fietsreparatie in ${siteConfig.city}`
        : `Bike repair in ${siteConfig.city}`,
      description: isDutch
        ? "Snelle reparaties, vaak klaar binnen 24 uur. Kleine fixes vanaf €15."
        : "Fast repairs, often ready within 24 hours. Small fixes from €15.",
    },
    {
      href: `/${lang}/services/new-bikes`,
      title: isDutch
        ? `Nieuwe fietsen in ${siteConfig.city}`
        : `New bikes in ${siteConfig.city}`,
      description: isDutch
        ? "Kwaliteitsfietsen voor de stad vanaf €450."
        : "Quality city bikes starting from €450.",
    },
    {
      href: `/${lang}/services/accessories`,
      title: isDutch
        ? `Fietsaccessoires in ${siteConfig.city}`
        : `Bike accessories in ${siteConfig.city}`,
      description: isDutch
        ? "ART-goedgekeurde sloten, verlichting en directe afhaalopties."
        : "ART approved locks, lights, and immediate pickup options.",
    },
    {
      href: `/${lang}/services/student-bikes`,
      title: isDutch
        ? `Studentenfietsen in ${siteConfig.city}`
        : `Student bikes in ${siteConfig.city}`,
      description: isDutch
        ? "Praktische Groningen-proof fietsen voor dagelijks gebruik."
        : "Practical Groningen proof bikes for daily use.",
    },
    {
      href: `/${lang}/services/cheap-bikes`,
      title: isDutch
        ? `Goedkope fietsen in ${siteConfig.city}`
        : `Cheap bikes in ${siteConfig.city}`,
      description: isDutch
        ? "Budgetvriendelijke opties zonder in te leveren op basisveiligheid."
        : "Budget friendly options without compromising basic safety.",
    },
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl space-y-8">
        <SiteHeader siteConfig={siteConfig} lang={lang} />

        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="relative h-[260px] w-full md:h-[360px]">
            <Image
              src="/images/bikes-groningen-hero.jpg"
              alt="bike-store-groningen"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="p-8">
            <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
              {isDutch ? "Over ons" : "About Us"}
            </p>

            <h1 className="mb-4 text-4xl font-bold text-zinc-900">
              {isDutch
                ? `Over ${siteConfig.googleBusinessProfileName}`
                : `About ${siteConfig.googleBusinessProfileName}`}
            </h1>

            <p className="max-w-4xl text-lg text-zinc-700">
              {isDutch ? (
                <>
                  {siteConfig.siteName} is het lokale platform voor mensen die in{" "}
                  {siteConfig.city} een fiets zoeken. Via onze huidige
                  fietspartner {siteConfig.googleBusinessProfileName} helpen we
                  studenten, expats en dagelijkse fietsers met{" "}
                  <Link
                    href={`/${lang}/services/second-hand`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    tweedehands fietsen in {siteConfig.city}
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/repair`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    fietsreparatie in {siteConfig.city}
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/new-bikes`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    nieuwe fietsen in {siteConfig.city}
                  </Link>{" "}
                  en lokale fietshulp.
                </>
              ) : (
                <>
                  {siteConfig.siteName} is the local platform for people looking
                  for a bike in {siteConfig.city}. Through our current bike
                  partner {siteConfig.googleBusinessProfileName}, we help
                  students, expats, and daily riders with{" "}
                  <Link
                    href={`/${lang}/services/second-hand`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    second hand bikes in {siteConfig.city}
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/repair`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    bike repair in {siteConfig.city}
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/new-bikes`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    new bikes in {siteConfig.city}
                  </Link>
                  , and local bike support.
                </>
              )}
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm lg:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
              {isDutch
                ? `Jouw betrouwbare partner voor fietsen in ${siteConfig.city}`
                : `Your reliable partner for cycling in ${siteConfig.city}`}
            </h2>

            <div className="space-y-4 text-zinc-700">
              <p>
                {isDutch
                  ? `${siteConfig.googleBusinessProfileName} is er voor eerstejaarsstudenten, internationale studenten, expats en locals die snel een goede fiets of betrouwbare reparatie nodig hebben. In een fietsstad als ${siteConfig.city} is een werkende fiets geen luxe maar een basisbehoefte.`
                  : `${siteConfig.googleBusinessProfileName} is here for first year students, international students, expats, and locals who need a good bike or a reliable repair quickly. In a cycling city like ${siteConfig.city}, a working bike is not a luxury but a basic need.`}
              </p>

              <p>
                {isDutch ? (
                  <>
                    Zoek je een betaalbare optie voor dagelijks gebruik? Bekijk
                    dan onze pagina's voor{" "}
                    <Link
                      href={`/${lang}/services/student-bikes`}
                      className="font-medium text-zinc-900 underline underline-offset-4"
                    >
                      studentenfietsen in {siteConfig.city}
                    </Link>{" "}
                    en{" "}
                    <Link
                      href={`/${lang}/services/cheap-bikes`}
                      className="font-medium text-zinc-900 underline underline-offset-4"
                    >
                      goedkope fietsen in {siteConfig.city}
                    </Link>
                    . Deze zijn extra relevant voor studenten die tussen de
                    binnenstad, het station en Zernike fietsen.
                  </>
                ) : (
                  <>
                    Looking for an affordable option for daily use? Explore our{" "}
                    <Link
                      href={`/${lang}/services/student-bikes`}
                      className="font-medium text-zinc-900 underline underline-offset-4"
                    >
                      student bikes in {siteConfig.city}
                    </Link>{" "}
                    and{" "}
                    <Link
                      href={`/${lang}/services/cheap-bikes`}
                      className="font-medium text-zinc-900 underline underline-offset-4"
                    >
                      cheap bikes in {siteConfig.city}
                    </Link>{" "}
                    pages. These are especially relevant for students cycling
                    between the city center, the station, and Zernike.
                  </>
                )}
              </p>

              <p>
                {isDutch ? (
                  <>
                    Bezoekers die hun fiets direct willen verbeteren of
                    beveiligen kunnen ook terecht op onze pagina voor{" "}
                    <Link
                      href={`/${lang}/services/accessories`}
                      className="font-medium text-zinc-900 underline underline-offset-4"
                    >
                      fietsaccessoires in {siteConfig.city}
                    </Link>
                    . Daar sluiten sloten, lampen en andere stadsbenodigdheden
                    logisch aan op de hoofdvraag naar fietsen en reparatie.
                  </>
                ) : (
                  <>
                    Visitors who want to upgrade or secure their bike can also
                    explore our{" "}
                    <Link
                      href={`/${lang}/services/accessories`}
                      className="font-medium text-zinc-900 underline underline-offset-4"
                    >
                      bike accessories in {siteConfig.city}
                    </Link>{" "}
                    page. Locks, lights, and other city essentials connect
                    naturally to the main demand for bikes and repair.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
              {isDutch ? "Contact en locatie" : "Contact and location"}
            </h2>

            <div className="space-y-3 text-zinc-700">
              <p>
                <strong>{isDutch ? "Partner:" : "Partner:"}</strong>{" "}
                {siteConfig.googleBusinessProfileName}
              </p>
              <p>
                <strong>{isDutch ? "Contactpersoon:" : "Contact person:"}</strong>{" "}
                {siteConfig.contactPersonName}
              </p>
              <p>
                <strong>{isDutch ? "Adres:" : "Address:"}</strong>{" "}
                {siteConfig.address}, {siteConfig.postalCode},{" "}
                {siteConfig.city}, {siteConfig.country}
              </p>
              <p>
                <strong>{isDutch ? "Telefoon:" : "Phone:"}</strong>{" "}
                <a
                  href={`tel:${siteConfig.phoneNumber}`}
                  className="text-zinc-900 underline underline-offset-4"
                >
                  {siteConfig.phoneNumber}
                </a>
              </p>
              <p>
                <strong>{isDutch ? "E-mail:" : "Email:"}</strong>{" "}
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                    "Bike Store Groningen"
                  )}`}
                  className="text-zinc-900 underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <strong>Google:</strong>{" "}
                <a
                  href={siteConfig.googleBusinessUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-900 underline underline-offset-4"
                >
                  {isDutch ? "Bekijk bedrijfsprofiel" : "View business profile"}
                </a>
              </p>
              <p>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                    isDutch
                      ? siteConfig.whatsappPrefilledMessage.nl
                      : siteConfig.whatsappPrefilledMessage.en
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-900 underline underline-offset-4"
                >
                  {siteConfig.whatsappNumber}
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-wide text-zinc-500">
              {isDutch ? "Onze services" : "Our services"}
            </p>
            <h2 className="text-2xl font-semibold text-zinc-900">
              {isDutch
                ? `Alles voor fietsers in ${siteConfig.city}`
                : `Everything for cyclists in ${siteConfig.city}`}
            </h2>
            <p className="mt-3 max-w-3xl text-zinc-700">
              {isDutch
                ? `Deze interne links helpen bezoekers en zoekmachines beter begrijpen dat ${siteConfig.siteName} relevant is voor tweedehands fietsen, reparaties, nieuwe fietsen, accessoires, studentenfietsen en goedkope fietsen in ${siteConfig.city}.`
                : `These internal links help both visitors and search engines understand that ${siteConfig.siteName} is relevant for second hand bikes, repair, new bikes, accessories, student bikes, and cheap bikes in ${siteConfig.city}.`}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceLinks.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-zinc-300 hover:bg-white"
              >
                <h3 className="mb-2 text-lg font-semibold text-zinc-900">
                  {service.title}
                </h3>
                <p className="text-zinc-700">{service.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
              {isDutch ? "Waarom mensen hier komen" : "Why people come here"}
            </h2>

            <ul className="space-y-3 text-zinc-700">
              <li>
                {isDutch
                  ? "Tweedehands fietsen en nieuwe fietsen voor verschillende budgetten en gebruikssituaties."
                  : "Second hand bikes and new bikes for different budgets and use cases."}
              </li>
              <li>
                {isDutch
                  ? "Snelle lokale reparaties voor dagelijkse fietsproblemen in Groningen."
                  : "Fast local repair for everyday cycling problems in Groningen."}
              </li>
              <li>
                {isDutch
                  ? "Studentenfietsen en goedkope fietsen voor praktische ritten naar Zernike of het centrum."
                  : "Student bikes and cheap bikes for practical rides to Zernike or the city center."}
              </li>
              <li>
                {isDutch
                  ? "Accessoires zoals sloten en verlichting voor veilig stadsgebruik."
                  : "Accessories like locks and lights for safer city use."}
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
              {isDutch ? "Openingstijden" : "Opening hours"}
            </h2>

            <div className="space-y-3">
              {siteConfig.openingHours.map((item) => (
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
        </section>

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
              <strong>{siteConfig.googleReviewRating.toFixed(1)}</strong> / 5
              {" · "}
              {siteConfig.googleReviewCount} Google reviews
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {siteConfig.reviews.map((review) => (
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

        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
            {isDutch ? "Lokaal in Groningen" : "Local in Groningen"}
          </h2>

          <div className="space-y-4 text-zinc-700">
            <p>
              {isDutch
                ? `${siteConfig.googleBusinessProfileName} is gevestigd aan ${siteConfig.address}, ${siteConfig.postalCode} in ${siteConfig.city}. Deze locatie maakt het een praktische keuze voor mensen die in of rond ${siteConfig.neighborhoods.join(", ")} wonen, studeren of dagelijks fietsen.`
                : `${siteConfig.googleBusinessProfileName} is located at ${siteConfig.address}, ${siteConfig.postalCode} in ${siteConfig.city}. This makes it a practical option for people living, studying, or cycling daily in and around ${siteConfig.neighborhoods.join(", ")}.`}
            </p>

            <p>
              {isDutch ? (
                <>
                  Op de site gebruiken we de titel "{siteConfig.heroTitle.nl}"
                  en de ondertitel "{siteConfig.heroSubtitle.nl}" om direct
                  duidelijk te maken wat bezoekers kunnen verwachten. Lees ook
                  meer over{" "}
                  <Link
                    href={`/${lang}/services/second-hand`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    tweedehands fietsen
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/repair`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    reparatie
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/new-bikes`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    nieuwe fietsen
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/student-bikes`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    studentenfietsen
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/cheap-bikes`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    goedkope fietsen
                  </Link>{" "}
                  en{" "}
                  <Link
                    href={`/${lang}/services/accessories`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    accessoires
                  </Link>
                  .
                </>
              ) : (
                <>
                  On the site we use the title "{siteConfig.heroTitle.en}" and
                  the subtitle "{siteConfig.heroSubtitle.en}" to make it
                  immediately clear what visitors can expect. You can also read
                  more about{" "}
                  <Link
                    href={`/${lang}/services/second-hand`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    second hand bikes
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/repair`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    repair
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/new-bikes`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    new bikes
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/student-bikes`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    student bikes
                  </Link>
                  ,{" "}
                  <Link
                    href={`/${lang}/services/cheap-bikes`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    cheap bikes
                  </Link>
                  , and{" "}
                  <Link
                    href={`/${lang}/services/accessories`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    accessories
                  </Link>
                  .
                </>
              )}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={siteConfig.googleBusinessUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white"
              >
                {isDutch ? "Bekijk op Google Maps" : "View on Google Maps"}
              </a>

              <a
                href={siteConfig.mapEmbedUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900"
              >
                {isDutch ? "Open kaart" : "Open map"}
              </a>
            </div>
          </div>
        </section>

        <SiteFooter siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}