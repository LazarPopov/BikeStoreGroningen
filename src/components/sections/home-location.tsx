import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";

type HomeLocationProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function HomeLocation({ siteConfig, lang }: HomeLocationProps) {
  return (
    <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
          {lang === "nl" ? "Locatie" : "Location"}
        </p>

        <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
          {lang === "nl"
            ? `Fietsenmaker in ${siteConfig.city}`
            : `Bike repair shop in ${siteConfig.city}`}
        </h2>

        <p className="mb-4 text-zinc-700">
          {lang === "nl"
            ? `${siteConfig.googleBusinessProfileName} helpt fietsers in ${siteConfig.city} met reparatie, tweedehands fietsen, nieuwe fietsen en accessoires. Bel de winkel of open de route op Google Maps.`
            : `${siteConfig.googleBusinessProfileName} helps cyclists in ${siteConfig.city} with repairs, second-hand bikes, new bikes, and accessories. Call the shop or open directions on Google Maps.`}
        </p>

        <div className="mb-4 space-y-2 text-zinc-700">
          <p>
            <strong>{lang === "nl" ? "Adres:" : "Address:"}</strong>{" "}
            {siteConfig.address}, {siteConfig.postalCode}, {siteConfig.city}
          </p>

          <p>
            <strong>{lang === "nl" ? "Google profiel:" : "Google profile:"}</strong>{" "}
            {siteConfig.googleBusinessProfileName}
          </p>

          <p>
            <strong>{lang === "nl" ? "Reviews:" : "Reviews:"}</strong>{" "}
            {siteConfig.googleReviewRating}/5 ({siteConfig.googleReviewCount})
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${siteConfig.phoneNumber}`}
            className="inline-block rounded-xl bg-black px-5 py-3 text-center text-white"
          >
            {lang === "nl" ? "Bel de winkel" : "Call the shop"}
          </a>
          <a
            href={siteConfig.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl border border-zinc-300 px-5 py-3 text-center font-medium text-zinc-900"
          >
            {lang === "nl" ? "Route op Google Maps" : "Directions on Google Maps"}
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
        <iframe
          src={siteConfig.mapEmbedUrl}
          title={lang === "nl" ? "Kaart van Groningen" : "Map of Groningen"}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[320px] w-full border-0"
        />
      </div>
    </section>
  );
}
