import type { Locale } from "@/content/types";

export const locales: Locale[] = ["en", "id"];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
