// src/components/sections/home-services.tsx

import Image from "next/image";
import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";
import { ArrowRight } from "lucide-react";
import {
  getLocalizedServiceCta,
  getServicePagesByCity,
} from "@/data/service-pages";
import { TrackedLink } from "@/components/analytics/tracked-link";

type HomeServicesProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function HomeServices({ siteConfig, lang }: HomeServicesProps) {
  const pages = getServicePagesByCity(siteConfig.city);

  const labels = {
    title: lang === "nl" ? "Onze Diensten" : "Our Services",
    subtitle:
      lang === "nl"
        ? "Reparatie, studentenfietsen, tweedehands fietsen en accessoires voor dagelijks fietsen in Groningen."
        : "Repairs, student bikes, second-hand bikes, and accessories for everyday cycling in Groningen.",
  };

  return (
    <section className="py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
          {labels.title}
        </h2>

        <p className="mt-4 max-w-2xl text-lg text-zinc-600">
          {labels.subtitle}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {pages.map((page) => (
          <article
            key={page.slug}
            className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={page.imageUrl || "/images/services.jpg"}
                alt={page.shortTitle[lang]}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="mb-2 text-xl font-bold text-zinc-900">
                {page.shortTitle[lang]}
              </h3>

              <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-600">
                {page.excerpt[lang]}
              </p>

              <TrackedLink
                href={`/${lang}/services/${page.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                eventName="click_service_card"
                eventParams={{
                  placement: "home_services",
                  service_slug: page.slug,
                  city: siteConfig.city,
                  language: lang,
                }}
              >
                {getLocalizedServiceCta(lang)}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </TrackedLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
