import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Components
import { SiteGoogleAnalytics } from "@/components/analytics/site-google-analytics";
import { Analytics } from "@vercel/analytics/next";

// Site Configuration
import { bikesGroningenConfig } from "@/data/sites/bikes-groningen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * SEO Metadata
 * Dynamically generated from the bikesGroningenConfig
 */
export const metadata: Metadata = {
  title: {
    default: bikesGroningenConfig.seoDefaults.nl.metaTitle,
    template: `%s | ${bikesGroningenConfig.siteName}`,
  },
  description: bikesGroningenConfig.seoDefaults.nl.metaDescription,
  metadataBase: new URL(`https://${bikesGroningenConfig.domain}`),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: bikesGroningenConfig.seoDefaults.nl.ogTitle,
    description: bikesGroningenConfig.seoDefaults.nl.ogDescription,
    url: `https://${bikesGroningenConfig.domain}`,
    siteName: bikesGroningenConfig.siteName,
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
  
  // JSON-LD Structured Data for Local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BikeStore",
    "name": bikesGroningenConfig.googleBusinessProfileName,
    "image": `https://${bikesGroningenConfig.domain}/og-image.jpg`,
    "@id": `https://${bikesGroningenConfig.domain}`,
    "url": `https://${bikesGroningenConfig.domain}`,
    "telephone": bikesGroningenConfig.phoneNumber,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": bikesGroningenConfig.address,
      "addressLocality": bikesGroningenConfig.city,
      "postalCode": bikesGroningenConfig.postalCode,
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": bikesGroningenConfig.latitude,
      "longitude": bikesGroningenConfig.longitude
    },
    "openingHoursSpecification": bikesGroningenConfig.openingHours.map(oh => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": oh.day,
      "opens": oh.open === "Closed" ? "00:00" : oh.open,
      "closes": oh.close === "Closed" ? "00:00" : oh.close
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": bikesGroningenConfig.googleReviewRating,
      "reviewCount": bikesGroningenConfig.googleReviewCount
    }
  };

  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager - Header Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${bikesGroningenConfig.gtmId}');
            `,
          }}
        />
        {/* Local Business Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) - Required for fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${bikesGroningenConfig.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}

        {/* Analytics Components 
            SiteGoogleAnalytics handles GA4 + Cookie Consent Banner
        */}
        <SiteGoogleAnalytics gaId={bikesGroningenConfig.gaId} />
        
        {/* Vercel Speed Insights/Analytics */}
        <Analytics />
        
        {/* Ahrefs Site Audit Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={bikesGroningenConfig.ahrefsKey}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}