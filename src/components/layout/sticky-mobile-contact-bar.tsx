"use client";

import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";

type StickyMobileContactBarProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function StickyMobileContactBar({
  siteConfig,
  lang,
}: StickyMobileContactBarProps) {
  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.whatsappPrefilledMessage[lang]
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl gap-3">
        <TrackedAnchor
          href={whatsappHref}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white"
          eventName="click_whatsapp"
          eventParams={{
            placement: "sticky_mobile_bar",
            city: siteConfig.city,
            language: lang,
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
          >
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.8h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.22-3.74.98 1-3.65-.24-.37a9.8 9.8 0 0 1-1.5-5.26C2.21 6.47 6.63 2.05 12.06 2.05c2.63 0 5.1 1.02 6.96 2.9a9.78 9.78 0 0 1 2.87 6.95c0 5.43-4.42 9.85-9.82 9.85Zm5.4-7.37c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.68.15-.2.3-.78.99-.95 1.2-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.24-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.52 0 1.48 1.08 2.92 1.23 3.12.15.2 2.12 3.25 5.13 4.56.72.31 1.28.5 1.72.63.72.23 1.37.2 1.88.12.57-.08 1.8-.74 2.06-1.46.25-.72.25-1.33.18-1.46-.08-.13-.28-.2-.58-.35Z" />
          </svg>
          <span>{lang === "nl" ? "WhatsApp" : "WhatsApp"}</span>
        </TrackedAnchor>

        {/* <TrackedAnchor
          href={`tel:${siteConfig.phoneNumber}`}
          className="flex min-h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900"
          eventName="click_call"
          eventParams={{
            placement: "sticky_mobile_bar",
            city: siteConfig.city,
            language: lang,
          }}
        >
          {lang === "nl" ? "Bel" : "Call"}
        </TrackedAnchor> */}
      </div>
    </div>
  );
}