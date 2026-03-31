import Link from "next/link";
import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";
import { getNeighborhoodPagesByCity } from "@/data/neighborhood-pages";

type HomeNeighborhoodsProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function HomeNeighborhoods({
  siteConfig,
  lang,
}: HomeNeighborhoodsProps) {
  const pages = getNeighborhoodPagesByCity(siteConfig.city);

  return (
    <section
      className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm"
      aria-labelledby="home-neighborhoods-heading"
    >
      <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
        {lang === "nl" ? "Buurten" : "Neighborhoods"}
      </p>

      <h2
        id="home-neighborhoods-heading"
        className="mb-6 text-2xl font-semibold text-zinc-900"
      >
        {lang === "nl"
          ? "Fietsopties per buurt in Groningen"
          : "Bike options by neighborhood in Groningen"}
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {pages.map((page) => (
          <article
            key={page.slug}
            className="flex h-full flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-5"
          >
            <h3 className="mb-2 text-lg font-semibold text-zinc-900">
              {page.shortTitle[lang]}
            </h3>

            <p className="mb-4 flex-1 text-zinc-700">{page.intro[lang]}</p>

            <Link
              href={`/${lang}/buurten/${page.slug}`}
              className="text-sm font-medium text-zinc-900 underline underline-offset-4"
              aria-label={
                lang === "nl"
                  ? `Bekijk de buurtpagina voor ${page.neighborhoodName}`
                  : `View the neighborhood page for ${page.neighborhoodName}`
              }
            >
              {lang === "nl" ? "Bekijk buurtpagina" : "View neighborhood page"}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}