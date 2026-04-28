import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { getServicePagesForSite } from "@/data/service-pages";
import { getContactEmail, getRenter } from "@/lib/config/site-config-utils";

type SiteFooterProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

export function SiteFooter({ siteConfig, lang }: SiteFooterProps) {
  const services = getServicePagesForSite(siteConfig);
  const renter = getRenter(siteConfig);
  const contactEmail = getContactEmail(siteConfig);
  const isDutch = lang === "nl";

  return (
    <footer className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-10">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h2 className="mb-4 text-xl font-bold text-zinc-900">
            {siteConfig.siteName}
          </h2>
          <div className="space-y-1 text-sm text-zinc-600">
            {renter ? (
              <>
                <p>{renter.address}</p>
                <p>
                  {renter.postalCode}, {siteConfig.city}
                </p>
                <p className="pt-2 font-medium text-zinc-900">
                  {renter.phoneNumber}
                </p>
              </>
            ) : (
              <p>
                {siteConfig.city}, {siteConfig.country}
              </p>
            )}
            <p>{contactEmail}</p>
          </div>
        </div>

        {renter ? (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-900">
              {isDutch ? "Openingstijden" : "Opening Hours"}
            </h3>
            <div className="space-y-1 text-sm text-zinc-600">
              {renter.openingHours.map((item) => (
                <p key={item.day} className="flex justify-between md:block lg:flex">
                  <span className="font-medium">{item.day}:</span>
                  <span>
                    {item.open} {item.close !== "Closed" ? `- ${item.close}` : ""}
                  </span>
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-900">
              {isDutch ? "Aanvragen" : "Requests"}
            </h3>
            <p className="text-sm text-zinc-600">
              {isDutch
                ? `Verstuur een fietshulpaanvraag voor ${siteConfig.city}.`
                : `Send a bike help request for ${siteConfig.city}.`}
            </p>
          </div>
        )}

        <div>
          <h3 className="mb-4 text-lg font-semibold text-zinc-900">
            {isDutch ? "Onze Diensten" : "Our Services"}
          </h3>
          <div className="flex flex-col space-y-2 text-sm">
            {services.map((service) => (
              <TrackedLink
                key={service.slug}
                href={`/${lang}/services/${service.slug}`}
                className="text-zinc-600 underline-offset-4 hover:text-black hover:underline"
                eventName="click_footer_link"
                eventParams={{
                  footer_target: service.slug,
                  footer_group: "services",
                  city: siteConfig.city,
                  language: lang,
                }}
              >
                {service.shortTitle[lang]}
              </TrackedLink>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-zinc-900">
            {isDutch ? "Informatie" : "Information"}
          </h3>
          <div className="flex flex-col space-y-2 text-sm text-zinc-600">
            <TrackedLink
              href={`/${lang}/about`}
              className="underline-offset-4 hover:text-black hover:underline"
              eventName="click_footer_link"
              eventParams={{
                footer_target: "about",
                footer_group: "important_pages",
                city: siteConfig.city,
                language: lang,
              }}
            >
              {isDutch ? "Over ons" : "About us"}
            </TrackedLink>

            <TrackedLink
              href={`/${lang}/buurten`}
              className="underline-offset-4 hover:text-black hover:underline"
              eventName="click_footer_link"
              eventParams={{
                footer_target: "neighborhoods",
                footer_group: "important_pages",
                city: siteConfig.city,
                language: lang,
              }}
            >
              {isDutch ? "Buurten en plekken" : "Areas we serve"}
            </TrackedLink>

            <TrackedLink
              href={`/${lang}/contact`}
              className="underline-offset-4 hover:text-black hover:underline"
              eventName="click_footer_link"
              eventParams={{
                footer_target: "contact",
                footer_group: "important_pages",
                city: siteConfig.city,
                language: lang,
              }}
            >
              Contact
            </TrackedLink>

            <TrackedLink
              href={`/${lang}/privacy-policy`}
              className="mt-4 text-xs text-zinc-400 hover:text-zinc-600"
              eventName="click_footer_link"
              eventParams={{
                footer_target: "privacy_policy",
                footer_group: "legal",
                city: siteConfig.city,
                language: lang,
              }}
            >
              {isDutch ? "Privacybeleid" : "Privacy Policy"}
            </TrackedLink>

            <TrackedLink
              href={`/${lang}/terms`}
              className="text-xs text-zinc-400 hover:text-zinc-600"
              eventName="click_footer_link"
              eventParams={{
                footer_target: "terms",
                footer_group: "legal",
                city: siteConfig.city,
                language: lang,
              }}
            >
              {isDutch ? "Voorwaarden" : "Terms"}
            </TrackedLink>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-400">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.siteName}{" "}
          {siteConfig.city}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
