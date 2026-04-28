import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/config/i18n";
import { getSiteConfig } from "@/lib/config/get-site-config";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-json-ld";

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
      <LocalBusinessJsonLd siteConfig={siteConfig} lang={lang} />
      {children}
    </>
  );
}
