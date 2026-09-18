import { dictionaries } from "@/lib/site-content";

export const locales = ["ru", "lv", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "lv";
export const localeCookieName = "soundia-locale";

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function localizePath(_locale: Locale, path = "") {
  return path || "/";
}
