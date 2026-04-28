import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/config/get-site-config";
import { isSupportedLanguage } from "@/lib/config/i18n";
import { SiteHeader } from "@/components/layout/site-header";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeReviews } from "@/components/sections/home-reviews";
import { SiteFooter } from "@/components/layout/site-footer";
import { HomeServices } from "@/components/sections/home-services";
import { HomeStudentExpats } from "@/components/sections/home-student-expats";
import { StickyMobileContactBar } from "@/components/layout/sticky-mobile-contact-bar";
import { HomeLocation } from "@/components/sections/home-location";
import { HomeFaq } from "@/components/sections/home-faq";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { HomeNeighborhoods } from "@/components/sections/home-neighborhoods";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    return {};
  }

  const siteConfig = getSiteConfig("bikes-groningen");
  const seo = siteConfig.seoDefaults[lang];

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: `https://${siteConfig.domain}/${lang}`,
      siteName: siteConfig.siteName,
      locale: lang === "nl" ? "nl_NL" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle,
      description: seo.ogDescription,
    },
    alternates: {
      canonical: `https://${siteConfig.domain}/${lang}`,
      languages: {
        en: `https://${siteConfig.domain}/en`,
        nl: `https://${siteConfig.domain}/nl`,
      },
    },
  };
}

export default async function LangHomePage({ params }: PageProps) {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const siteConfig = getSiteConfig("bikes-groningen");

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <FaqJsonLd lang={lang} />
        <SiteHeader siteConfig={siteConfig} lang={lang} />
        <HomeHero siteConfig={siteConfig} lang={lang} />
        <HomeServices siteConfig={siteConfig} lang={lang} />
        <HomeStudentExpats siteConfig={siteConfig} lang={lang} />
        <HomeReviews siteConfig={siteConfig} lang={lang} />
        <HomeLocation siteConfig={siteConfig} lang={lang} />
        <HomeNeighborhoods siteConfig={siteConfig} lang={lang} />
        <HomeFaq lang={lang} />
        <SiteFooter siteConfig={siteConfig} lang={lang} />
        <StickyMobileContactBar siteConfig={siteConfig} lang={lang} />
      </div>
    </main>
  );
}
