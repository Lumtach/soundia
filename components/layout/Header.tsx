import Link from "next/link";
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
  return (
    <header className="site-header">
      <Link className="site-header__brand" href={localizePath(locale)}>
        <span className="site-header__mark" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="site-header__wordmark">
          <strong>Soundia</strong>
          <small>Creative Studio</small>
        </span>
      </Link>
      <nav className="site-header__nav" aria-label="Primary navigation">
        <Link href="/#work">{nav.work}</Link>
        <Link href="/#services">{nav.services}</Link>
        <Link href="/#pricing">{nav.pricing}</Link>
        <Link href="/#courses">{nav.courses}</Link>
        <Link href="/#about">{nav.about}</Link>
      </nav>
      <div className="site-header__right">
        <LanguageDropdown locale={locale} />
      </div>
      <MobileMenu locale={locale} nav={nav} />
    </header>
  );
}
