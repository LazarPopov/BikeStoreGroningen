"use client";

import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import type { AppLanguage } from "@/lib/config/i18n";
import {
  getPrimaryCta,
  getRenter,
  getSecondaryCta,
} from "@/lib/config/site-config-utils";
import type { SiteConfig } from "@/types/site";

type StickyMobileContactBarProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function StickyMobileContactBar({
  siteConfig,
  lang,
}: StickyMobileContactBarProps) {
  const renter = getRenter(siteConfig);
  const primaryCta = getPrimaryCta(siteConfig, lang);
  const secondaryCta = getSecondaryCta(siteConfig, lang);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl gap-3">
        <TrackedAnchor
          href={primaryCta.href}
          className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white"
          eventName={primaryCta.eventName}
          eventParams={{
            placement: "sticky_mobile_bar",
            city: siteConfig.city,
            language: lang,
          }}
        >
          {renter ? (lang === "nl" ? "Bel nu" : "Call now") : primaryCta.label}
        </TrackedAnchor>

        <TrackedAnchor
          href={secondaryCta.href}
          target={secondaryCta.target}
          rel={secondaryCta.rel}
          className="flex min-h-12 flex-1 items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900"
          eventName={secondaryCta.eventName}
          eventParams={{
            placement: "sticky_mobile_bar",
            city: siteConfig.city,
            language: lang,
          }}
        >
          {secondaryCta.label}
        </TrackedAnchor>
      </div>
    </div>
  );
}
