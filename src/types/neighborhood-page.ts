import type { AppLanguage } from "@/lib/config/i18n";

export type NeighborhoodPage = {
  slug: string;
  city: string;
  neighborhoodName: string;
  pageType?: "neighborhood" | "landmark";
  imagePath: string; // Added this property
  title: Record<AppLanguage, string>;
  shortTitle: Record<AppLanguage, string>;
  metaTitle: Record<AppLanguage, string>;
  metaDescription: Record<AppLanguage, string>;
  intro: Record<AppLanguage, string>;
  paragraphs: Record<AppLanguage, string[]>;
};
