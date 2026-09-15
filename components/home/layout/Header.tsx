"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GlobalAudioToggle } from "./GlobalAudioToggle";
import { MobileMenu } from "./MobileMenu";
import { LanguageDropdown } from "./LanguageDropdown";
import { localizePath, type Locale } from "@/lib/i18n";

export function Header({
  locale,
  nav
}: {
  locale: Locale;
  nav: Record<string, string>;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 12);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <Link className="site-header__brand" href={localizePath(locale)}>
        <Image className="site-header__logo" src="/logo.png" alt="Soundia Creative Studio" width={255} height={100} priority />
      </Link>
      <div className="site-header__right">
        <GlobalAudioToggle />
        <LanguageDropdown locale={locale} />
        <MobileMenu locale={locale} nav={nav} />
      </div>
    </header>
  );
}
