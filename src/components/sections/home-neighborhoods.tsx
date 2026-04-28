import Link from "next/link";
import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";
import {
  getLandmarkPagesByCity,
  getResidentialNeighborhoodPagesByCity,
} from "@/data/neighborhood-pages";

type HomeNeighborhoodsProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function HomeNeighborhoods({
  siteConfig,
  lang,
}: HomeNeighborhoodsProps) {
  const landmarkPages = getLandmarkPagesByCity(siteConfig.city);
  const neighborhoodPages = getResidentialNeighborhoodPagesByCity(
    siteConfig.city
  ).slice(0, 6);

  return (
    <section
      className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm"
      aria-labelledby="home-neighborhoods-heading"
    >
      <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
        {lang === "nl" ? "Buurten en plekken" : "Areas we serve"}
      </p>

      <h2
        id="home-neighborhoods-heading"
        className="mb-6 text-2xl font-semibold text-zinc-900"
      >
        {lang === "nl"
          ? "Fietsopties rond campussen, station en buurten"
          : "Bike options around campuses, station, and neighborhoods"}
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-zinc-900">
            {lang === "nl" ? "Campussen en drukke plekken" : "Campuses and busy spots"}
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {landmarkPages.map((page) => (
              <article
                key={page.slug}
                className="flex h-full flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-5"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {lang === "nl" ? "Campus of plek" : "Campus or city spot"}
                </p>
                <h4 className="mb-2 text-lg font-semibold text-zinc-900">
                  {page.shortTitle[lang]}
                </h4>

                <p className="mb-4 flex-1 text-zinc-700">
                  {page.intro[lang]}
                </p>

                <Link
                  href={`/${lang}/buurten/${page.slug}`}
                  className="text-sm font-medium text-zinc-900 underline underline-offset-4"
                  aria-label={
                    lang === "nl"
                      ? `Bekijk fietshulp rond ${page.neighborhoodName}`
                      : `View bike help around ${page.neighborhoodName}`
                  }
                >
                  {lang === "nl" ? "Bekijk fietshulp" : "View bike help"}
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-zinc-900">
            {lang === "nl" ? "Buurten" : "Neighborhoods"}
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {neighborhoodPages.map((page) => (
              <article
                key={page.slug}
                className="flex h-full flex-col rounded-xl border border-zinc-200 bg-zinc-50 p-5"
              >
                <h4 className="mb-2 text-lg font-semibold text-zinc-900">
                  {page.shortTitle[lang]}
                </h4>

                <p className="mb-4 flex-1 text-zinc-700">
                  {page.intro[lang]}
                </p>

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
        </div>
      </div>
    </section>
  );
}
