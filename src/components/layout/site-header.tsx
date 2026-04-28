"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Globe } from "lucide-react";
import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function SiteHeader({ siteConfig, lang }: SiteHeaderProps) {
  const pathname = usePathname();
  
  const labels =
    lang === "nl"
      ? {
          home: "Home",
          services: "Diensten",
          neighborhoods: "Buurten",
          about: "Over",
          contact: "Contact",
          call: "Bel nu",
          location: "Locatie",
        }
      : {
          home: "Home",
          services: "Services",
          neighborhoods: "Areas",
          about: "About",
          contact: "Contact",
          call: "Call now",
          location: "Location",
        };

  const otherLang = lang === "en" ? "nl" : "en";
  const otherLangLabel = lang === "en" ? "NL" : "EN";

  const googleMapsUrl = siteConfig.googleBusinessUrl;
  const locationText = `${siteConfig.address}, ${siteConfig.city}`;

  const isServicesActive = pathname?.includes(`/${lang}/services`);
  const isNeighborhoodsActive = pathname?.includes(`/${lang}/buurten`);

  return (
    <header className="flex flex-col gap-3">
      {/* Top Bar: Contact & Lang */}
      <div className="flex items-center justify-between gap-3 px-4 text-[11px] font-medium uppercase tracking-wider text-zinc-500 md:text-xs">
        <div className="flex items-center gap-4">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-zinc-900"
          >
            <MapPin size={13} className="text-zinc-400" />
            <span className="hidden sm:inline">{locationText}</span>
            <span className="sm:hidden">{siteConfig.city}</span>
          </a>

          <a
            href={`tel:${siteConfig.phoneNumber}`}
            className="flex items-center gap-1.5 transition-colors hover:text-zinc-900"
          >
            <Phone size={13} className="text-zinc-400" />
            <span>{siteConfig.phoneNumber}</span>
          </a>
        </div>

        <Link
          href={`/${otherLang}`}
          className="flex items-center gap-1.5 font-bold text-zinc-900 transition-colors hover:opacity-70"
        >
          <Globe size={13} className="text-zinc-400" />
          <span>{otherLangLabel}</span>
        </Link>
      </div>

      {/* Main Nav */}
      <div className="rounded-2xl border border-zinc-200 bg-white/80 px-6 py-4 shadow-sm backdrop-blur-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href={`/${lang}`} className="text-xl font-black tracking-tight text-zinc-900">
              {siteConfig.siteName}
            </Link>
            <p className="hidden text-[10px] font-bold uppercase tracking-widest text-zinc-400 lg:block">
              {lang === "nl" ? "De fietsspecialist van Groningen" : "Groningen's Bicycle Specialists"}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-zinc-600">
            <Link 
              href={`/${lang}`} 
              className={cn("transition-colors hover:text-black", pathname === `/${lang}` && "text-black")}
            >
              {labels.home}
            </Link>
            
            <Link 
              href={`/${lang}/services`} 
              className={cn(
                "flex items-center gap-1 transition-colors hover:text-black",
                isServicesActive && "text-black underline decoration-zinc-300 underline-offset-8"
              )}
            >
              {labels.services}
            </Link>

            <Link
              href={`/${lang}/buurten`}
              className={cn(
                "transition-colors hover:text-black",
                isNeighborhoodsActive &&
                  "text-black underline decoration-zinc-300 underline-offset-8"
              )}
            >
              {labels.neighborhoods}
            </Link>

            <Link 
              href={`/${lang}/about`} 
              className={cn("transition-colors hover:text-black", pathname?.includes("/about") && "text-black")}
            >
              {labels.about}
            </Link>
            
            <Link 
              href={`/${lang}/contact`} 
              className={cn("transition-colors hover:text-black", pathname?.includes("/contact") && "text-black")}
            >
              {labels.contact}
            </Link>

            <div className="ml-auto flex items-center gap-2 md:ml-0">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-xl border border-zinc-200 px-4 py-2 text-xs transition-all hover:bg-zinc-50 md:block"
              >
                {labels.location}
              </a>
              <a
                href={`tel:${siteConfig.phoneNumber}`}
                className="rounded-xl bg-zinc-900 px-5 py-2 text-xs text-white shadow-lg transition-all hover:bg-black hover:shadow-xl active:scale-95"
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
