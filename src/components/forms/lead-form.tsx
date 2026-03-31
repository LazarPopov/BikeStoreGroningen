// src/components/forms/lead-form.tsx

"use client";

import { useActionState, useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  submitBikeLead,
  type LeadFormState,
} from "@/app/actions/submit-bike-lead";
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
  const [state, formAction, isPending] = useActionState(
    submitBikeLead,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const utmSource = searchParams.get("utm_source") ?? "";
  const utmMedium = searchParams.get("utm_medium") ?? "";
  const utmCampaign = searchParams.get("utm_campaign") ?? "";
  const utmTerm = searchParams.get("utm_term") ?? "";
  const utmContent = searchParams.get("utm_content") ?? "";

  const sourcePage = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.location.href;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
        {lang === "nl" ? "Aanvraagformulier" : "Request form"}
      </p>

      <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
        {lang === "nl"
          ? "Vertel ons welke fiets je zoekt"
          : "Tell us which bike you are looking for"}
      </h2>

      <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="siteKey" value={siteConfig.siteKey} />
        <input type="hidden" name="city" value={siteConfig.city} />
        <input type="hidden" name="sourcePage" value={sourcePage} />
        <input type="hidden" name="pagePath" value={pathname} />
        <input type="hidden" name="language" value={lang} />
        <input type="hidden" name="utmSource" value={utmSource} />
        <input type="hidden" name="utmMedium" value={utmMedium} />
        <input type="hidden" name="utmCampaign" value={utmCampaign} />
        <input type="hidden" name="utmTerm" value={utmTerm} />
        <input type="hidden" name="utmContent" value={utmContent} />

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {lang === "nl" ? "Naam" : "Name"}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
          />
          {state.fieldErrors?.name ? (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.name}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {lang === "nl" ? "E-mail" : "Email"}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
          />
          {state.fieldErrors?.email ? (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.email}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {lang === "nl" ? "Telefoon" : "Phone"}
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
          />
          {state.fieldErrors?.phone ? (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="budget"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {lang === "nl" ? "Budget" : "Budget"}
          </label>
          <input
            id="budget"
            name="budget"
            type="text"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="bikeSpecification"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {lang === "nl" ? "Type fiets" : "Bike type"}
          </label>
          <input
            id="bikeSpecification"
            name="bikeSpecification"
            type="text"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
          />
          {state.fieldErrors?.bikeSpecification ? (
            <p className="mt-1 text-sm text-red-600">
              {state.fieldErrors.bikeSpecification}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="preferredCondition"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {lang === "nl" ? "Gewenste staat" : "Preferred condition"}
          </label>
          <select
            id="preferredCondition"
            name="preferredCondition"
            defaultValue=""
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
          >
            <option value="" disabled>
              {lang === "nl" ? "Kies een optie" : "Choose an option"}
            </option>
            <option value="New">{lang === "nl" ? "Nieuw" : "New"}</option>
            <option value="Used">{lang === "nl" ? "Tweedehands" : "Used"}</option>
            <option value="Either">
              {lang === "nl" ? "Maakt niet uit" : "Either"}
            </option>
          </select>
          {state.fieldErrors?.preferredCondition ? (
            <p className="mt-1 text-sm text-red-600">
              {state.fieldErrors.preferredCondition}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="preferredBrand"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {lang === "nl" ? "Voorkeursmerk" : "Preferred brand"}
          </label>
          <input
            id="preferredBrand"
            name="preferredBrand"
            type="text"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="size"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {lang === "nl" ? "Maat" : "Size"}
          </label>
          <input
            id="size"
            name="size"
            type="text"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="useCase"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {lang === "nl" ? "Gebruik" : "Use case"}
          </label>
          <input
            id="useCase"
            name="useCase"
            type="text"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
          />
          {state.fieldErrors?.useCase ? (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.useCase}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="notes"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            {lang === "nl" ? "Notities" : "Notes"}
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={5}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-zinc-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? lang === "nl"
              ? "Versturen..."
              : "Submitting..."
            : lang === "nl"
            ? "Verstuur aanvraag"
            : "Submit request"}
        </button>

        {state.message ? (
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              state.status === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {state.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}