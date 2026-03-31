// src/types/service-page.ts

import type { AppLanguage } from "@/lib/config/i18n";

export type ServicePage = {
  slug: string;
  city: string;
  imageUrl?: string;
  paragraphImages?: string[];
  title: Record<AppLanguage, string>;
  shortTitle: Record<AppLanguage, string>;
  excerpt: Record<AppLanguage, string>;
  metaTitle: Record<AppLanguage, string>;
  metaDescription: Record<AppLanguage, string>;
  intro: Record<AppLanguage, string>;
  paragraphs: Record<AppLanguage, string[]>;
};