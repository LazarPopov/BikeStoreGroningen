import type { AppLanguage } from "@/lib/config/i18n";
import {
  getDisplayBusinessName,
  getPrimaryCta,
  getRenter,
  getSecondaryCta,
} from "@/lib/config/site-config-utils";
import type { SiteConfig } from "@/types/site";

type HomeLocationProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function HomeLocation({ siteConfig, lang }: HomeLocationProps) {
  const renter = getRenter(siteConfig);
  const businessName = getDisplayBusinessName(siteConfig);
  const primaryCta = getPrimaryCta(siteConfig, lang);
  const secondaryCta = getSecondaryCta(siteConfig, lang);

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
            ? `${businessName} helpt fietsers in ${siteConfig.city} met reparatie, tweedehands fietsen, nieuwe fietsen en accessoires.`
            : `${businessName} helps cyclists in ${siteConfig.city} with repairs, second-hand bikes, new bikes, and accessories.`}
        </p>

        <div className="mb-4 space-y-2 text-zinc-700">
          {renter ? (
            <>
              <p>
                <strong>{lang === "nl" ? "Adres:" : "Address:"}</strong>{" "}
                {renter.address}, {renter.postalCode}, {siteConfig.city}
              </p>

              <p>
                <strong>{lang === "nl" ? "Google profiel:" : "Google profile:"}</strong>{" "}
                {renter.googleBusinessProfileName}
              </p>

              <p>
                <strong>{lang === "nl" ? "Reviews:" : "Reviews:"}</strong>{" "}
                {renter.googleReviewRating}/5 ({renter.googleReviewCount})
              </p>
            </>
          ) : (
            <p>
              <strong>{lang === "nl" ? "Stad:" : "City:"}</strong>{" "}
              {siteConfig.city}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={primaryCta.href}
            className="inline-block rounded-xl bg-black px-5 py-3 text-center text-white"
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            target={secondaryCta.target}
            rel={secondaryCta.rel}
            className="inline-block rounded-xl border border-zinc-300 px-5 py-3 text-center font-medium text-zinc-900"
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>

      {renter ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
          <iframe
            src={renter.mapEmbedUrl}
            title={lang === "nl" ? `Kaart van ${siteConfig.city}` : `Map of ${siteConfig.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full border-0"
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <h3 className="mb-3 text-xl font-semibold text-zinc-900">
            {lang === "nl" ? `Vraag fietshulp aan in ${siteConfig.city}` : `Request bike help in ${siteConfig.city}`}
          </h3>
          <p className="text-zinc-700">
            {lang === "nl"
              ? `Vertel ons welke reparatie, fiets of accessoires je zoekt, zodat je aanvraag bij de juiste fietshulp voor ${siteConfig.city} terechtkomt.`
              : `Tell us which repair, bike, or accessories you need so your request can be matched with bike help in ${siteConfig.city}.`}
          </p>
        </div>
      )}
    </section>
  );
}
