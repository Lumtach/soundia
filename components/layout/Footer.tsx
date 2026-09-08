import Link from "next/link";
import { contacts } from "@/lib/data";
import type { Locale } from "@/lib/i18n";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { JSX } from "react/jsx-runtime";

const socialIcons: Record<string, JSX.Element> = {
  Instagram:  <FaInstagram />,
  Facebook: <FaFacebook />,
  LinkedIn: <FaLinkedin />
};

export function Footer({
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
            <span className="footer__mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="footer__wordmark">
              <strong>Soundia</strong>
              <small>Creative Studio</small>
            </span>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <Link href="/#work">{nav.work}</Link>
            <Link href="/#services">{nav.services}</Link>
            <Link href="/#pricing">{nav.pricing}</Link>
            <Link href="/#about">{nav.about}</Link>
            <Link href="/#courses">{nav.courses}</Link>
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
          <div className="footer__socials" aria-label="Social links">
            {contacts.socials.map((social) => (
              <a key={social} href="#" aria-label={social}>
                <span aria-hidden="true">{socialIcons[social] ?? social.slice(0, 2)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
