import Image from "next/image";
import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";

type HomeHeroProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function HomeHero({ siteConfig, lang }: HomeHeroProps) {
  return (
    <section className="rounded-3xl bg-zinc-50 px-6 py-12 sm:px-8 sm:py-16 shadow-sm border border-zinc-100">
      {/* Changed to a 1:1 grid to give the store image equal real estate */}
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500">
            {siteConfig.city} <span className="mx-2 text-zinc-300">|</span> {siteConfig.siteName}
          </p>

          {/* Added text-balance for cleaner typography on varying screen sizes */}
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-zinc-900 md:text-5xl lg:text-6xl text-balance">
            {siteConfig.heroTitle[lang]}
          </h1>

          <p className="mb-8 max-w-xl text-lg text-zinc-600 leading-relaxed">
            {siteConfig.heroSubtitle[lang]}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href={`tel:${siteConfig.phoneNumber}`}
              className="rounded-xl bg-black px-6 py-3.5 text-center font-medium text-white shadow-lg shadow-zinc-200 transition-transform hover:scale-[1.02] active:scale-95"
              eventName="click_call"
              eventParams={{
                placement: "home_hero",
                city: siteConfig.city,
                language: lang,
              }}
            >
              {siteConfig.callToActionText[lang]}
            </TrackedAnchor>

            <TrackedAnchor
              href={`mailto:${siteConfig.email}`}
              className="rounded-xl border-2 border-zinc-200 bg-white px-6 py-3.5 text-center font-medium text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
              eventName="click_email"
              eventParams={{
                placement: "home_hero",
                city: siteConfig.city,
                language: lang,
              }}
            >
              {lang === "nl" ? "E-mail sturen" : "Send Email"}
            </TrackedAnchor>
          </div>
        </div>

        {/* Image Content - Moved to 'fill' with aspect ratio for flawless scaling */}
        <div className="order-1 lg:order-2 relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl shadow-zinc-200/50 border border-zinc-100 group">
          <Image
            src="/images/bikes-groningen-hero.jpg"
            alt="Bicycles in Groningen city center"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>

      </div>
    </section>
  );
}