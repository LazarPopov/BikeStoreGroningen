import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/config/i18n";
import { getSiteConfig } from "@/lib/config/get-site-config";
import { StickyWhatsAppButton } from "@/components/layout/sticky-whatsapp-button";

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getSiteConfig("bikes-groningen");

  return (
    <>
      {children}
      <StickyWhatsAppButton siteConfig={siteConfig} lang={lang} />
    </>
  );
}