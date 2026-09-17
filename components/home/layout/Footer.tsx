import Link from "next/link";
import Image from "next/image";
import { contacts } from "@/lib/data";
import { localizePath, type Locale } from "@/lib/i18n";
import { SocialLinks } from "./SocialLinks";

export function Footer({
  locale,
  nav,
  footer
}: {
  locale: Locale;
  nav: Record<string, string>;
  footer: { copyright: string };
}) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__columns">
          <div className="footer__brand" aria-label="Soundia Creative Studio">
            <Image className="footer__logo" src="/logo.svg" alt="Soundia Creative Studio" width={205} height={95} />
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <Link href={localizePath(locale, "/portfolio")}>{nav.work}</Link>
            <Link href={localizePath(locale, "/services")}>{nav.services}</Link>
            <Link href={localizePath(locale, "/pricing")}>{nav.pricing}</Link>
            <Link href={localizePath(locale, "/about-company")}>{nav.about}</Link>
            <Link href={localizePath(locale, "/courses")}>{nav.courses}</Link>
          </nav>

          <div className="footer__contact-column">
            <address className="footer__contacts">
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
              <a href={`tel:${contacts.phone.replace(/\s/g, "")}`}>{contacts.phone}</a>
              <span>{contacts.messaging}</span>
              <span>{contacts.address}</span>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{footer.copyright}</p>
          <SocialLinks className="footer__socials" />
        </div>
      </div>
    </footer>
  );
}
