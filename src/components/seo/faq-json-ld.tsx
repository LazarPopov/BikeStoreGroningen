import type { AppLanguage } from "@/lib/config/i18n";
import { getHomeFaqs } from "@/data/home-faqs";
import type { SiteConfig } from "@/types/site";

type FaqJsonLdProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function FaqJsonLd({ siteConfig, lang }: FaqJsonLdProps) {
  const homeFaqs = getHomeFaqs(siteConfig);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((item) => ({
      "@type": "Question",
      name: item.question[lang],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[lang],
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
