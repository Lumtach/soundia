"use server";

import { cookies } from "next/headers";
import { isLocale, localeCookieName, type Locale } from "@/lib/i18n";

export async function setLocale(nextLocale: Locale) {
  if (!isLocale(nextLocale)) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set(localeCookieName, nextLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax"
  });
}
