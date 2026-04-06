"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const CONSENT_STORAGE_KEY = "bikes_cookie_consent";
type ConsentValue = "accepted" | "rejected" | null;

declare global {
  interface Window {
    dataLayer?: Object[];
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent(consent: Exclude<ConsentValue, null>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("consent", "update", {
    analytics_storage: consent === "accepted" ? "granted" : "denied",
    ad_storage: consent === "accepted" ? "granted" : "denied",
    ad_user_data: consent === "accepted" ? "granted" : "denied",
    ad_personalization: consent === "accepted" ? "granted" : "denied",
  });
}

// Pass gaId as a prop instead of using process.env
export function SiteGoogleAnalytics({ gaId }: { gaId?: string }) {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dataLayer = (window.dataLayer = window.dataLayer || []);
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      dataLayer.push(args as Object);
    };

    // Default "denied" state for GDPR compliance
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
      region: ["AT", "BE", "BG", "HR", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT", "NL", "NO", "PL", "PT", "RO", "SE", "SI", "SK"],
    });

    const storedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentValue;

    if (storedConsent === "accepted" || storedConsent === "rejected") {
      setConsent(storedConsent);
      applyConsent(storedConsent);
    }
    setIsReady(true);
  }, []);

  function handleConsent(nextConsent: Exclude<ConsentValue, null>) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextConsent);
    setConsent(nextConsent);
    applyConsent(nextConsent);
  }

  // If no ID is provided, don't render anything
  if (!gaId) return null;

  return (
    <>
      <GoogleAnalytics gaId={gaId} />

      {isReady && consent === null ? (
        <div className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-3xl rounded-2xl border border-zinc-300 bg-white p-5 shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Cookies & Analytics</h2>
              <p className="mt-2 text-sm text-zinc-700">
                Wij gebruiken analytische cookies om bezoeken en klikken te begrijpen voor <strong>Bike Store Groningen</strong>.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleConsent("rejected")}
                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm text-zinc-900 hover:bg-zinc-50"
              >
                Weigeren
              </button>
              <button
                type="button"
                onClick={() => handleConsent("accepted")}
                className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800"
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}