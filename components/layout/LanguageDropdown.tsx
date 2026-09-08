"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setLocale as setLocaleAction } from "@/app/actions";
import { locales, type Locale } from "@/lib/i18n";

const languageLabels: Record<Locale, string> = {
  ru: "Русский",
  lv: "Latviešu",
  en: "English"
};

export function LanguageDropdown({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function setLocale(nextLocale: Locale) {
    setOpen(false);

    startTransition(async () => {
      await setLocaleAction(nextLocale);
      router.replace(pathname || "/");
      router.refresh();
    });
  }

  return (
    <details className="language-dropdown" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary
        aria-label="Select language"
        onClick={(event) => {
          event.preventDefault();
          setOpen((currentOpen) => !currentOpen);
        }}
      >
        <span className="language-dropdown__globe" aria-hidden="true" />
        <span>{locale.toUpperCase()}</span>
        <span className="language-dropdown__chevron" aria-hidden="true" />
      </summary>
      <div className="language-dropdown__menu">
        {locales.map((item) => (
          <button
            key={item}
            className={item === locale ? "is-active" : ""}
            type="button"
            disabled={isPending}
            aria-current={item === locale ? "true" : undefined}
            onClick={() => setLocale(item)}
          >
            <span>{item.toUpperCase()}</span>
            <small>{languageLabels[item]}</small>
          </button>
        ))}
      </div>
    </details>
  );
}
