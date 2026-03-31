import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";
import { TrackedLink } from "@/components/analytics/tracked-link";

type SiteFooterProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function SiteFooter({ siteConfig, lang }: SiteFooterProps) {
  return (
    <footer className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h2 className="mb-3 text-xl font-semibold">{siteConfig.siteName}</h2>
          <p>{siteConfig.address}</p>
          <p>
            {siteConfig.postalCode}, {siteConfig.city}
          </p>
          <p>{siteConfig.phoneNumber}</p>
          <p>{siteConfig.email}</p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">
            {lang === "nl" ? "Openingstijden" : "Opening Hours"}
          </h3>

          <div className="space-y-1 text-sm text-zinc-700">
            {siteConfig.openingHours.map((item) => (
              <p key={item.day}>
                {item.day}: {item.open}{" "}
                {item.close !== "Closed" ? `- ${item.close}` : ""}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">
            {lang === "nl" ? "Belangrijke pagina's" : "Important Pages"}
          </h3>

          <div className="space-y-2 text-sm text-zinc-700">
            <p>
              <TrackedLink
                href={`/${lang}/about`}
                className="underline"
                eventName="click_footer_link"
                eventParams={{
                  footer_target: "about",
                  footer_group: "important_pages",
                  city: siteConfig.city,
                  language: lang,
                }}
              >
                {lang === "nl" ? "Over" : "About"}
              </TrackedLink>
            </p>

            <p>
              <TrackedLink
                href={`/${lang}/contact`}
                className="underline"
                eventName="click_footer_link"
                eventParams={{
                  footer_target: "contact",
                  footer_group: "important_pages",
                  city: siteConfig.city,
                  language: lang,
                }}
              >
                {lang === "nl" ? "Contact" : "Contact"}
              </TrackedLink>
            </p>

            {/* <p>
              <TrackedLink
                href={`/${lang}/blog`}
                className="underline"
                eventName="click_footer_link"
                eventParams={{
                  footer_target: "blog",
                  footer_group: "important_pages",
                  city: siteConfig.city,
                  language: lang,
                }}
              >
                Blog
              </TrackedLink>
            </p> */}

            <p>
              <TrackedLink
                href={`/${lang}/privacy-policy`}
                className="underline"
                eventName="click_footer_link"
                eventParams={{
                  footer_target: "privacy_policy",
                  footer_group: "legal",
                  city: siteConfig.city,
                  language: lang,
                }}
              >
                {lang === "nl" ? "Privacybeleid" : "Privacy Policy"}
              </TrackedLink>
            </p>

            <p>
              <TrackedLink
                href={`/${lang}/terms`}
                className="underline"
                eventName="click_footer_link"
                eventParams={{
                  footer_target: "terms",
                  footer_group: "legal",
                  city: siteConfig.city,
                  language: lang,
                }}
              >
                {lang === "nl" ? "Algemene Voorwaarden" : "Terms and Conditions"}
              </TrackedLink>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}