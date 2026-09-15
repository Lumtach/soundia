"use client";

import { useEffect, useRef, useState, useTransition } from "react";
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
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;

    function closeOnOutsideClick(event: PointerEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);

  function setLocale(nextLocale: Locale) {
    setOpen(false);

    startTransition(async () => {
      await setLocaleAction(nextLocale);
      router.replace(pathname || "/");
      router.refresh();
    });
  }

  return (
    <details
      ref={dropdownRef}
      className="language-dropdown"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        aria-label="Select language"
        onClick={(event) => {
          event.preventDefault();
          setOpen((currentOpen) => !currentOpen);
        }}
      >
        <span className="language-dropdown__globe" aria-hidden="true" />
        <span className="language-dropdown__current" aria-hidden="true">{locale.toUpperCase()}</span>
        <span className="visually-hidden">Current language: {locale.toUpperCase()}</span>
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
            <small className="visually-hidden">{languageLabels[item]}</small>
          </button>
        ))}
      </div>
    </details>
  );
}
