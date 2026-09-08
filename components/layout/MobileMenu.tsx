"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageDropdown } from "./LanguageDropdown";
import type { Locale } from "@/lib/i18n";

export function MobileMenu({
  locale,
  nav
}: {
  locale: Locale;
  nav: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu">
      <button className="mobile-menu__toggle" type="button" onClick={() => setOpen(true)} aria-label="Open menu">
        Menu
      </button>
      {open ? (
        <div className="mobile-menu__overlay" role="dialog" aria-modal="true">
          <button className="mobile-menu__close" type="button" onClick={() => setOpen(false)} aria-label="Close menu">
            Close
          </button>
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {[
              ["work", "/#work"],
              ["services", "/#services"],
              ["pricing", "/#pricing"],
              ["courses", "/#courses"],
              ["about", "/#about"],
            ].map(([key, href]) => (
              <Link key={key} href={href} onClick={() => setOpen(false)}>
                {nav[key]}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__locales">
            <LanguageDropdown locale={locale} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
