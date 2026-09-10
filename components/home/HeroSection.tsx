import { ArSoundField } from "@/components/home/ArSoundField";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

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
          <ArSoundField />
          <div className="hero__meta">
            {copy.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <span className="hero__scroll">{copy.scroll}</span>
        </div>
      </Container>
    </section>
  );
}
