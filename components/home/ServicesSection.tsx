import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export function ServicesSection({
  locale,
  copy
}: {
  locale: Locale;
  copy: { label: string; headline: string[] };
}) {
  const keepInline = (value: string) => value.replaceAll(" / ", "\u00a0/\u00a0");

  return (
    <section className="services section" id="services" aria-labelledby="services-title">
      <Container>
        <SectionLabel>{copy.label}</SectionLabel>
        <h2 id="services-title" className="section-title section-title--offset">
          {copy.headline.map((line, index) => (
            <span key={`${line}-${index}`}>{line}</span>
          ))}
        </h2>
        <div className="services__board">
          <div className="services__visual" aria-hidden="true">
            <div className="services__visual-label">Sound production system</div>
            {services.map((service) => (
              <Image
                key={service.id}
                className={`services__visual-image services__visual-image--${service.number}`}
                src={service.image}
                alt=""
                width={1100}
                height={1320}
                sizes="(max-width: 1024px) 0vw, 40vw"
                unoptimized
              />
            ))}
            <div className="services__visual-wave">
              {Array.from({ length: 38 }).map((_, index) => (
                <span key={index} style={{ ["--i" as string]: index }} />
              ))}
            </div>
          </div>
          <div className="services__rows">
            {services.map((service) => (
              <Link className="service-row" href={service.href} key={service.id}>
                  <span className="service-row__number">{service.number}</span>
                  <span className="service-row__content">
                    <strong>{service.title[locale]}</strong>
                    <em>{keepInline(service.meta[locale])} ↗</em>
                  </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
