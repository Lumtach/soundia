import Link from "next/link";
import { ArSoundField } from "@/components/home/ArSoundField";
import { Container } from "@/components/ui/Container";
import { localizePath, type Locale } from "@/lib/i18n";

export function HeroSection({
  locale,
  copy
}: {
  locale: Locale;
  copy: { eyebrow: string; headline: string[]; meta: string[]; scroll: string };
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <div className="hero__grid">
          <p className="hero__eyebrow">{copy.eyebrow}</p>
          <h1 id="hero-title" className="hero__title" lang={locale}>
            {copy.headline.map((line, index) => (
              <span key={`${line}-${index}`} className={`hero__line hero__line--${index + 1}`}>
                {line}
              </span>
            ))}
          </h1>
          <ul className="hero__meta" aria-label="Soundia services">
            {copy.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="hero__cta" href={localizePath(locale, "/portfolio")}>
            Послушать наши работы
            <span aria-hidden="true">→</span>
          </Link>
          <ArSoundField />
          <span className="hero__scroll">{copy.scroll}</span>
        </div>
      </Container>
    </section>
  );
}
