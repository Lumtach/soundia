import en from "@/messages/en.json";
import lv from "@/messages/lv.json";
import ru from "@/messages/ru.json";

export const locales = ["ru", "lv", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";
export const localeCookieName = "soundia-locale";

const dictionaries = { ru, lv, en };

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function localizePath(_locale: Locale, path = "") {
  return path || "/";
}
