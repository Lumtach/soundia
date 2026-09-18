import { cookies, headers } from "next/headers";
import { defaultLocale, isLocale, localeCookieName, type Locale } from "./i18n";

function getLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) {
    return null;
  }

  const preferredLanguages = acceptLanguage
    .split(",")
    .map((entry, index) => {
      const [language = "", ...params] = entry.trim().split(";");
      const qualityParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qualityParam ? Number(qualityParam.trim().slice(2)) : 1;

      return {
        locale: language.toLowerCase().split("-")[0],
        quality: Number.isFinite(quality) ? quality : 0,
        index
      };
    })
    .sort((first, second) => second.quality - first.quality || first.index - second.index);

  for (const { locale } of preferredLanguages) {
    if (isLocale(locale)) {
      return locale;
    }
  }

  return null;
}

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(localeCookieName)?.value;

  if (locale && isLocale(locale)) {
    return locale;
  }

  const headerStore = await headers();
  return getLocaleFromAcceptLanguage(headerStore.get("accept-language")) ?? defaultLocale;
}
