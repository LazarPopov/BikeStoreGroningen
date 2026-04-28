"use client";

import { useEffect, useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const CONSENT_STORAGE_KEY = "bikes_cookie_consent";
const CONSENT_CHANGE_EVENT = "bikes-cookie-consent-change";

type ConsentValue = "accepted" | "rejected";
type ConsentSnapshot = ConsentValue | "unknown";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function isConsentValue(value: string | null): value is ConsentValue {
  return value === "accepted" || value === "rejected";
}

function getConsentSnapshot(): ConsentSnapshot {
  if (typeof window === "undefined") {
    return "unknown";
  }

  const storedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return isConsentValue(storedConsent) ? storedConsent : "unknown";
}

function subscribeToConsentChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}

function applyConsent(consent: ConsentValue) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("consent", "update", {
    analytics_storage: consent === "accepted" ? "granted" : "denied",
    ad_storage: consent === "accepted" ? "granted" : "denied",
    ad_user_data: consent === "accepted" ? "granted" : "denied",
    ad_personalization: consent === "accepted" ? "granted" : "denied",
  });
}

// Pass gaId as a prop instead of using process.env
export function SiteGoogleAnalytics({
  gaId,
  siteName,
}: {
  gaId?: string;
  siteName: string;
}) {
  const consent = useSyncExternalStore<ConsentSnapshot>(
    subscribeToConsentChange,
    getConsentSnapshot,
    () => "unknown"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dataLayer = (window.dataLayer = window.dataLayer || []);
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      dataLayer.push(args);
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

    if (consent !== "unknown") {
      applyConsent(consent);
    }
  }, [consent]);

  function handleConsent(nextConsent: ConsentValue) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextConsent);
    applyConsent(nextConsent);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }

  // If no ID is provided, don't render anything
  if (!gaId) return null;

  return (
    <>
      <GoogleAnalytics gaId={gaId} />

      {consent === "unknown" ? (
        <div className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-3xl rounded-2xl border border-zinc-300 bg-white p-5 shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Cookies & Analytics</h2>
              <p className="mt-2 text-sm text-zinc-700">
                Wij gebruiken analytische cookies om bezoeken en klikken te begrijpen voor <strong>{siteName}</strong>.
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
