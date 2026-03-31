"use client";

import { useActionState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import {
  submitNewsletterSignup,
  type NewsletterSignupState,
} from "@/app/actions/submit-newsletter-signup";
import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";

type NewsletterSignupFormProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

const initialState: NewsletterSignupState = {
  status: "idle",
  message: "",
};

export function NewsletterSignupForm({
  siteConfig,
  lang,
}: NewsletterSignupFormProps) {
  const [state, formAction] = useActionState(
    submitNewsletterSignup,
    initialState
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const utmSource = searchParams.get("utm_source") ?? "";
  const utmMedium = searchParams.get("utm_medium") ?? "";
  const utmCampaign = searchParams.get("utm_campaign") ?? "";
  const utmTerm = searchParams.get("utm_term") ?? "";
  const utmContent = searchParams.get("utm_content") ?? "";

  useEffect(() => {
    if (state.status === "success" && state.signupId) {
      sendGAEvent("event", "newsletter_signup", {
        city: siteConfig.city,
        language: lang,
        site_key: siteConfig.siteKey,
        page_path: pathname,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        signup_id: state.signupId,
      });
    }
  }, [
    state.status,
    state.signupId,
    siteConfig.city,
    siteConfig.siteKey,
    lang,
    pathname,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
  ]);

  const labels =
    lang === "nl"
      ? {
          title: "Blijf op de hoogte",
          subtitle:
            "Ontvang updates over nieuwe blogs, aanbiedingen en seizoensdeals.",
          email: "E-mail",
          placeholder: "jij@example.com",
          button: "Inschrijven",
          success: "Je bent ingeschreven.",
          error: "Controleer je e-mail en probeer opnieuw.",
        }
      : {
          title: "Stay Updated",
          subtitle:
            "Get updates about new blog posts, offers, and seasonal bike deals.",
          email: "Email",
          placeholder: "you@example.com",
          button: "Subscribe",
          success: "You are subscribed.",
          error: "Check your email and try again.",
        };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-zinc-900">
          {labels.title}
        </h2>
        <p className="mt-2 text-zinc-700">{labels.subtitle}</p>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="siteKey" value={siteConfig.siteKey} />
        <input type="hidden" name="sourcePage" value="homepage_newsletter" />
        <input type="hidden" name="pagePath" value={pathname} />
        <input type="hidden" name="language" value={lang} />
        <input type="hidden" name="utmSource" value={utmSource} />
        <input type="hidden" name="utmMedium" value={utmMedium} />
        <input type="hidden" name="utmCampaign" value={utmCampaign} />
        <input type="hidden" name="utmTerm" value={utmTerm} />
        <input type="hidden" name="utmContent" value={utmContent} />

        <div>
          <label
            htmlFor="newsletter-email"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {labels.email}
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder={labels.placeholder}
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
            required
          />
          {state.fieldErrors?.email ? (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>
          ) : null}
        </div>

        {state.status === "success" ? (
          <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            {labels.success}
          </p>
        ) : null}

        {state.status === "error" && !state.fieldErrors ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {labels.error}
          </p>
        ) : null}

        <button
          type="submit"
          className="rounded-xl bg-black px-5 py-3 text-white"
        >
          {labels.button}
        </button>
      </form>
    </section>
  );
}