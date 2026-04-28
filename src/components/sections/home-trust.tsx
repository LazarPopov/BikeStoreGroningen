import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";

type HomeTrustProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function HomeTrust({ siteConfig, lang }: HomeTrustProps) {
  const items =
    lang === "nl"
      ? [
          `Lokaal gericht op ${siteConfig.city}`,
          "Voor studenten, expats en dagelijkse fietsers",
          "Geschikt voor nieuwe en tweedehands fietsen",
          "Praktische contactmogelijkheden",
        ]
      : [
          `Locally focused on ${siteConfig.city}`,
          "Built for students, expats, and daily riders",
          "Suitable for new and used bike questions",
          "Practical contact options",
        ];

  return (
    <section className="py-4">
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <p className="text-base font-medium">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-6">
        <h2 className="mb-3 text-2xl font-semibold">
          {lang === "nl" ? "Werkgebied" : "Service Area"}
        </h2>

        <p className="text-zinc-700">
          {lang === "nl"
            ? `We richten ons op ${siteConfig.city} en buurten zoals ${siteConfig.neighborhoods.join(", ")}.`
            : `We focus on ${siteConfig.city} and neighborhoods such as ${siteConfig.neighborhoods.join(", ")}.`}
        </p>
      </div>
    </section>
  );
}
