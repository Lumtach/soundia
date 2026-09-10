import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { pricingCards as prices } from "@/lib/pricing";
import type { Locale } from "@/lib/i18n";

export function PricingSection({
  locale,
  copy
}: {
  locale: Locale;
  copy: { label: string; headline: string };
}) {
  const ticks = Array.from({ length: 18 });
  const labels = {
    ru: { included: "Включено в пакет", order: "Заказать услугу", from: "СТАРТ" },
    lv: { included: "Iekļauts paketē", order: "Pasūtīt pakalpojumu", from: "SĀKOT NO" },
    en: { included: "Included in the package", order: "Order service", from: "STARTING AT" }
  }[locale];
  const inclusions = {
    guide: { ru: ["Сценарий", "Запись голоса", "Монтаж"], lv: ["Scenārijs", "Balss ieraksts", "Montāža"], en: ["Script", "Voice recording", "Editing"] },
    quest: { ru: ["Драматургия", "Интерактив", "Звуковая среда"], lv: ["Dramaturģija", "Interaktivitāte", "Skaņas vide"], en: ["Dramaturgy", "Interaction", "Soundscape"] },
    spatial: { ru: ["3D-микс", "Саунд-дизайн", "Мастеринг"], lv: ["3D mikss", "Skaņas dizains", "Masterings"], en: ["3D mix", "Sound design", "Mastering"] },
    promenade: { ru: ["Концепция", "Музыка", "Постановка"], lv: ["Koncepcija", "Mūzika", "Iestudējums"], en: ["Concept", "Music", "Production"] }
  } as const;
  const headlineWords = copy.headline.split(" ");
  const headlinePivot = Math.ceil(headlineWords.length / 2);
  const headlineTop = headlineWords.slice(0, headlinePivot).join(" ");
  const headlineBottom = headlineWords.slice(headlinePivot).join(" ");

  return (
    <section className="pricing section" id="pricing" aria-labelledby="pricing-title">
      <Container>
        <div className="pricing__top">
          <h2 id="pricing-title" className="pricing__title">
            <span>{headlineTop}</span>
            <em>{headlineBottom}</em>
          </h2>
        </div>

        <div className="price-matrix">
          {prices.map((item, index) => (
            <article key={item.id} className={`price-item ${index === 1 ? "price-item--featured" : ""}`}>
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
              <div className="price-item__main">
                <h3>{item.title[locale]}</h3>
                <p>{item.description[locale]}</p>
              </div>
              <div className="price-item__bottom">
                <div>
                  <span className="price-item__included">{labels.included}</span>
                  <ul>
                    {inclusions[item.id as keyof typeof inclusions][locale].map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
                <div className="price-item__price">
                  <span>{labels.from}</span>
                  <strong>{item.price}</strong>
                </div>
              </div>
              <Link className="price-item__order" href={`/order?service=${item.id}#order`}>
                {labels.order} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
