export type Language = "en" | "nl";

export type BusinessHoursItem = {
  day: string;
  open: string;
  close: string;
};

export type ReviewItem = {
  reviewerName: string;
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

export type SiteConfig = {
  siteKey: string;
  siteName: string;
  domain: string;
  city: string;
  country: string;
  phoneNumber: string;
  email: string;
  address: string;
  postalCode: string;
  openingHours: BusinessHoursItem[];
  googleBusinessUrl: string;
  googleBusinessProfileName: string;
  googleReviewRating: number;
  googleReviewCount: number;
  mapEmbedUrl: string;
  latitude: number;
  longitude: number;
  heroTitle: Record<Language, string>;
  heroSubtitle: Record<Language, string>;
  callToActionText: Record<Language, string>;
  contactPersonName: string;
  neighborhoods: string[];
  whatsappNumber: string;
  whatsappPrefilledMessage: Record<Language, string>;
  seoDefaults: {
    en: SeoDefaults;
    nl: SeoDefaults;
  };
  reviews: ReviewItem[];
};