import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";

type StickyWhatsAppButtonProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function StickyWhatsAppButton({
  siteConfig,
  lang,
}: StickyWhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.whatsappPrefilledMessage[lang]
  )}`;

  const label =
    lang === "nl" ? "Open WhatsApp chat" : "Open WhatsApp chat";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-6 right-6 z-50 hidden h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105 hover:shadow-xl md:flex"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-white"
        aria-hidden="true"
      >
        <path d="M19.11 17.2c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.35-.79-.7-1.32-1.57-1.48-1.84-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22 0 1.31.96 2.58 1.09 2.76.13.18 1.88 2.86 4.55 4.01.64.27 1.14.43 1.53.55.64.2 1.22.17 1.68.1.51-.08 1.58-.65 1.8-1.27.22-.62.22-1.16.16-1.27-.07-.11-.24-.18-.51-.31Z" />
        <path d="M16.02 3.2C9.02 3.2 3.34 8.88 3.34 15.88c0 2.23.58 4.4 1.68 6.32L3.2 28.8l6.78-1.78a12.62 12.62 0 0 0 6.04 1.54h.01c7 0 12.68-5.68 12.68-12.68 0-3.39-1.32-6.58-3.72-8.97A12.58 12.58 0 0 0 16.02 3.2Zm0 23.23h-.01a10.5 10.5 0 0 1-5.34-1.46l-.38-.22-4.02 1.05 1.07-3.92-.25-.4a10.51 10.51 0 0 1-1.61-5.61c0-5.8 4.72-10.52 10.53-10.52 2.81 0 5.45 1.09 7.43 3.08a10.45 10.45 0 0 1 3.08 7.44c0 5.8-4.72 10.52-10.51 10.52Z" />
      </svg>
    </a>
  );
}