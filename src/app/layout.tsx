import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Components
import { SiteGoogleAnalytics } from "@/components/analytics/site-google-analytics";
import { Analytics } from "@vercel/analytics/next";

import { getActiveSiteConfig } from "@/lib/config/get-site-config";

const siteConfig = getActiveSiteConfig();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Site metadata
 * Dynamically generated from the active site config.
 */
export const metadata: Metadata = {
  title: {
    default: siteConfig.seoDefaults.nl.metaTitle,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.seoDefaults.nl.metaDescription,
  metadataBase: new URL(`https://${siteConfig.domain}`),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.seoDefaults.nl.ogTitle,
    description: siteConfig.seoDefaults.nl.ogDescription,
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.siteName,
    locale: "nl_NL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {siteConfig.gtmId ? (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${siteConfig.gtmId}');
              `,
            }}
          />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
        {siteConfig.gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}

        {children}

        {/* Analytics Components 
            SiteGoogleAnalytics handles GA4 + Cookie Consent Banner
        */}
        <SiteGoogleAnalytics
          gaId={siteConfig.gaId}
          siteName={siteConfig.siteName}
        />
        
        {/* Vercel Speed Insights/Analytics */}
        <Analytics />
        
        {/* Ahrefs Site Audit Analytics */}
        {siteConfig.ahrefsKey ? (
          <Script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={siteConfig.ahrefsKey}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
