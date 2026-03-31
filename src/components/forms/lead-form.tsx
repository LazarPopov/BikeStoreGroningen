"use client";

import { useActionState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import {
  submitBikeLead,
  type LeadFormState,
} from "@/app/actions/submit-bike-lead";
import { SubmitButton } from "@/components/forms/submit-button";
import type { AppLanguage } from "@/lib/config/i18n";
import type { SiteConfig } from "@/types/site";

type LeadFormProps = {
  siteConfig: SiteConfig;
  lang: AppLanguage;
};

const initialState: LeadFormState = {
  status: "idle",
  message: "",
};

export function LeadForm({ siteConfig, lang }: LeadFormProps) {
  const [state, formAction] = useActionState(submitBikeLead, initialState);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const utmSource = searchParams.get("utm_source") ?? "";
  const utmMedium = searchParams.get("utm_medium") ?? "";
  const utmCampaign = searchParams.get("utm_campaign") ?? "";
  const utmTerm = searchParams.get("utm_term") ?? "";
  const utmContent = searchParams.get("utm_content") ?? "";

  useEffect(() => {
    if (state.status === "success" && state.submissionId) {
      sendGAEvent("event", "generate_lead", {
        lead_source: "contact_form",
        city: siteConfig.city,
        language: lang,
        site_key: siteConfig.siteKey,
        page_path: pathname,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        submission_id: state.submissionId,
      });
    }
  }, [
    state.status,
    state.submissionId,
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
          title: `Vind jouw ideale fiets in ${siteConfig.city}`,
          subtitle: "Vertel ons wat je zoekt en wij matchen je met lokale opties.",
          name: "Volledige naam",
          email: "E-mailadres",
          phone: "Telefoonnummer",
          bikeSpecification: "Wat voor fiets zoek je?",
          budget: "Budget",
          useCase: "Gebruik",
          preferredCondition: "Staat",
          size: "Lengte of framemaat",
          notes: "Extra details",
          selectOption: "Maak een keuze",
          new: "Nieuw",
          used: "Tweedehands",
          student: "Student",
          dailyUse: "Dagelijks gebruik",
          sport: "Sport",
          repair: "Reparatie",
          other: "Anders",
          submit: "Versturen",
          submitting: "Bezig...",
          success: "Bedankt, we nemen snel contact op.",
          error: "Controleer het formulier en probeer opnieuw.",
        }
      : {
          title: `Find Your Perfect Bike in ${siteConfig.city}`,
          subtitle: "Tell us what you need and we will match you with local options.",
          name: "Full name",
          email: "Email address",
          phone: "Phone number",
          bikeSpecification: "What type of bike are you looking for?",
          budget: "Budget",
          useCase: "Use case",
          preferredCondition: "Condition",
          size: "Height or frame size",
          notes: "Extra details",
          selectOption: "Choose an option",
          new: "New",
          used: "Second hand",
          student: "Student",
          dailyUse: "Daily use",
          sport: "Sport",
          repair: "Repair",
          other: "Other",
          submit: "Submit",
          submitting: "Submitting...",
          success: "Thank you, we will get back to you soon.",
          error: "Please check the form and try again.",
        };

  const inputClassName = "w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-black";
  const labelClassName = "mb-2 block text-sm font-medium text-black";
  const errorClassName = "mt-1 text-sm text-red-600";

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 bg-white p-6">
        <h2 className="text-2xl font-bold text-black">{labels.title}</h2>
        <p className="mt-2 text-zinc-700">{labels.subtitle}</p>
      </div>

      <form action={formAction} className="space-y-5 bg-white p-6">
        <input type="hidden" name="siteKey" value={siteConfig.siteKey} />
        <input type="hidden" name="sourcePage" value="concierge_lead" />
        <input type="hidden" name="pagePath" value={pathname} />
        <input type="hidden" name="language" value={lang} />
        <input type="hidden" name="utmSource" value={utmSource} />
        <input type="hidden" name="utmMedium" value={utmMedium} />
        <input type="hidden" name="utmCampaign" value={utmCampaign} />

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClassName}>
              {labels.name}
            </label>
            <input id="name" name="name" type="text" required className={inputClassName} />
            {state.fieldErrors?.name && <p className={errorClassName}>{state.fieldErrors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClassName}>
              {labels.email}
            </label>
            <input id="email" name="email" type="email" required className={inputClassName} />
            {state.fieldErrors?.email && <p className={errorClassName}>{state.fieldErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className={labelClassName}>
              {labels.phone}
            </label>
            <input id="phone" name="phone" type="text" required className={inputClassName} />
          </div>

          <div>
            <label htmlFor="bikeSpecification" className={labelClassName}>
              {labels.bikeSpecification}
            </label>
            <input id="bikeSpecification" name="bikeSpecification" type="text" required className={inputClassName} />
          </div>

          <div>
            <label htmlFor="budget" className={labelClassName}>
              {labels.budget}
            </label>
            <input id="budget" name="budget" type="text" className={inputClassName} />
          </div>

          <div>
            <label htmlFor="useCase" className={labelClassName}>
              {labels.useCase}
            </label>
            <select id="useCase" name="useCase" required defaultValue="" className={inputClassName}>
              <option value="" disabled>
                {labels.selectOption}
              </option>
              <option value="student">{labels.student}</option>
              <option value="daily-use">{labels.dailyUse}</option>
              <option value="sport">{labels.sport}</option>
              <option value="repair">{labels.repair}</option>
              <option value="other">{labels.other}</option>
            </select>
          </div>

          <div>
            <label htmlFor="preferredCondition" className={labelClassName}>
              {labels.preferredCondition}
            </label>
            <select id="preferredCondition" name="preferredCondition" required defaultValue="" className={inputClassName}>
              <option value="" disabled>
                {labels.selectOption}
              </option>
              <option value="new">{labels.new}</option>
              <option value="used">{labels.used}</option>
            </select>
          </div>

          <div>
            <label htmlFor="size" className={labelClassName}>
              {labels.size}
            </label>
            <input id="size" name="size" type="text" className={inputClassName} />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className={labelClassName}>
            {labels.notes}
          </label>
          <textarea id="notes" name="notes" rows={4} className={inputClassName} />
        </div>

        {state.status === "success" && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            {labels.success}
          </div>
        )}

        {state.status === "error" && !state.fieldErrors && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {labels.error}
          </div>
        )}

        <SubmitButton idleLabel={labels.submit} pendingLabel={labels.submitting} />
      </form>
    </section>
  );
}