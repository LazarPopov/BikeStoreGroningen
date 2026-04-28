export type Language = "en" | "nl";

export type BusinessHoursItem = {
  day: string;
  open: string;
  close: string;
};

export type ReviewItem = {
  reviewerName: string;
  reviewerRole?: string;
  rating: number;
  reviewText: string;
  source: string;
};

export type SeoDefaults = {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
};

export type RentalMode = "rented" | "lead-capture";

export type RenterConfig = {
  businessName: string;
  googleBusinessProfileName: string;
  contactPersonName: string;
  phoneNumber: string;
  email: string;
  address: string;
  postalCode: string;
  openingHours: BusinessHoursItem[];
  googleBusinessUrl: string;
  googleReviewRating: number;
  googleReviewCount: number;
  mapEmbedUrl: string;
  latitude: number;
  longitude: number;
  reviews: ReviewItem[];
};

export type SiteConfig = {
  siteKey: string;
  rentalMode: RentalMode;
  siteName: string;
  domain: string;
  city: string;
  country: string;
  leadEmail: string;
  heroImagePath: string;
  heroTitle: Record<Language, string>;
  heroSubtitle: Record<Language, string>;
  callToActionText: Record<Language, string>;
  neighborhoods: string[];
  localAreas: import("@/types/neighborhood-page").NeighborhoodPage[];
  whatsappNumber: string;
  whatsappPrefilledMessage: Record<Language, string>;
  renter?: RenterConfig;
  /** Google Analytics Measurement ID (starts with G-) */
  gaId?: string;
  /** Google Tag Manager Container ID (starts with GTM-) */
  gtmId?: string;
  /** Optional: Ahrefs analytics key */
  ahrefsKey?: string;

  seoDefaults: {
    en: SeoDefaults;
    nl: SeoDefaults;
  };
};
