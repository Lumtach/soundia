"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { contacts } from "@/lib/data";
import { localizePath, type Locale } from "@/lib/i18n";

const socialIcons: Record<string, ReactNode> = {
  Instagram: <FaInstagram />,
  Facebook: <FaFacebookF />,
  LinkedIn: <FaLinkedinIn />
};

const homeLabels: Record<Locale, string> = {
  ru: "Главная",
  lv: "Sākums",
  en: "Home"
};

export function MobileMenu({
  locale,
  nav
}: {
  locale: Locale;
  nav: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    function closeOnOutsideClick(event: PointerEvent) {
      const target = event.target as Node;

      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick, true);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick, true);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  return (
    <div className="mobile-menu">
      <button ref={toggleRef} className="mobile-menu__toggle" type="button" onClick={() => setOpen(true)} aria-label="Open menu">
        <span aria-hidden="true" />
      </button>
      {open ? (
        <div className="mobile-menu__overlay" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <aside ref={panelRef} className="mobile-menu__panel" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-menu__top">
              <button className="mobile-menu__close" type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                <span aria-hidden="true" />
              </button>
            </div>

            <div className="mobile-menu__content">
              <nav className="mobile-menu__nav" aria-label="Mobile navigation">
                {[
                  ["home", localizePath(locale)],
                  ["about", "/#about"],
                  ["services", localizePath(locale, "/services")],
                  ["work", localizePath(locale, "/portfolio")],
                  ["pricing", localizePath(locale, "/pricing")],
                  ["courses", localizePath(locale, "/courses")],
                ].map(([key, href]) => (
                  <Link key={key} href={href} onClick={() => setOpen(false)}>
                    {key === "home" ? homeLabels[locale] : nav[key]}
                  </Link>
                ))}
              </nav>

              <address className="mobile-menu__contacts">
                <strong>{nav.contact}</strong>
                <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                <a href={`tel:${contacts.phone.replace(/\s/g, "")}`}>{contacts.phone}</a>
                <span>{contacts.messaging}</span>
                <span>{contacts.address}</span>
              </address>

              <div className="mobile-menu__socials" aria-label="Social links">
                {contacts.socials.map((social) => (
                  <a key={social} href="#" aria-label={social}>
                    <span aria-hidden="true">{socialIcons[social] ?? social.slice(0, 2)}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
