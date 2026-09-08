import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { prices } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export function PricingSection({
  locale,
  copy
}: {
  locale: Locale;
  copy: { label: string; headline: string };
}) {
  const ticks = Array.from({ length: 18 });

  return (
    <section className="pricing section" id="pricing" aria-labelledby="pricing-title">
      <Container>
        <div className="pricing__top">
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="pricing-title" className="pricing__title">
            {copy.headline}
          </h2>
        </div>

        <div className="price-matrix">
          {prices.map((item, index) => (
            <article key={item.id} className="price-item">
              <div className="price-item__head">
                <span className="price-item__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="price-item__signal" aria-hidden="true">
                  {ticks.map((_, tickIndex) => (
                    <i key={tickIndex} />
                  ))}
                </div>
              </div>
              <h3>{item.title[locale]}</h3>
              <p>{item.description[locale]}</p>
              <strong>{item.price}</strong>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
