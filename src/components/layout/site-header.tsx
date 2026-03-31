import Link from "next/link";
import { MapPin, Phone, Globe } from "lucide-react";
import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";

type SiteHeaderProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function SiteHeader({ siteConfig, lang }: SiteHeaderProps) {
  const labels =
    lang === "nl"
      ? {
          home: "Home",
          about: "Over",
          contact: "Contact",
          call: "Bel nu",
          location: "Bekijk locatie",
        }
      : {
          home: "Home",
          about: "About",
          contact: "Contact",
          call: "Call now",
          location: "View location",
        };

  const otherLang = lang === "en" ? "nl" : "en";
  const otherLangLabel = lang === "en" ? "Nederlands" : "English";

  const googleMapsUrl = siteConfig.googleBusinessUrl;
  const locationText = `${siteConfig.address}, ${siteConfig.postalCode} ${siteConfig.city}`;

  return (
    <header className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 text-xs font-medium text-zinc-500">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-zinc-900"
          >
            <MapPin size={14} className="text-zinc-400" />
            <span>{locationText}</span>
          </a>

          <a
            href={`tel:${siteConfig.phoneNumber}`}
            className="flex items-center gap-1.5 transition-colors hover:text-zinc-900"
          >
            <Phone size={14} className="text-zinc-400" />
            <span>{siteConfig.phoneNumber}</span>
          </a>
        </div>

        <Link
          href={`/${otherLang}`}
          className="flex items-center gap-1.5 transition-colors hover:text-zinc-900"
        >
          <Globe size={14} className="text-zinc-400" />
          <span>{otherLangLabel}</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href={`/${lang}`} className="text-xl font-bold tracking-tight text-zinc-900">
              {siteConfig.siteName}
            </Link>
            <p className="hidden text-sm text-zinc-500 lg:block">
              {lang === "nl" ? "Kwaliteitsfietsen in Groningen" : "Quality bikes in Groningen"}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-sm font-semibold text-zinc-700">
            <Link href={`/${lang}`} className="hover:text-black">
              {labels.home}
            </Link>
            <Link href={`/${lang}/about`} className="hover:text-black">
              {labels.about}
            </Link>
            <Link href={`/${lang}/contact`} className="hover:text-black">
              {labels.contact}
            </Link>

            <div className="flex items-center gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-lg border border-zinc-200 px-4 py-2 transition-all hover:bg-zinc-50 md:block"
              >
                {labels.location}
              </a>
              <a
                href={`tel:${siteConfig.phoneNumber}`}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-white shadow-sm transition-all hover:bg-black active:scale-95"
              >
                {labels.call}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}