import { createInstance, type TFunction } from "i18next";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { en } from "@/content/locales/en";
import { id } from "@/content/locales/id";
import type { Locale } from "@/content/types";
import { isLocale } from "./locales";

const i18n = createInstance();
i18n.init({
  resources: { en: { translation: en }, id: { translation: id } },
  lng: "en",
  initAsync: false,
  interpolation: { escapeValue: false },
});

/** Untuk route handler (OG image) yang menerima locale lewat params. */
export function getFixedT(locale: Locale): TFunction {
  return i18n.getFixedT(locale);
}

/** Locale aktif dari segment `[lang]`, untuk Server Component. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getT(): Promise<TFunction> {
  return getFixedT(await getLocale());
}
