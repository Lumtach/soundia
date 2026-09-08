import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getCurrentLocale } from "@/lib/current-locale";
import { services } from "@/lib/data";
import { getDictionary } from "@/lib/i18n";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.href.split("/").pop()
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const service = services.find((item) => item.href.endsWith(slug));

  if (!service) {
    return {};
  }

  return {
    title: `${service.title[locale]} - Soundia`,
    description: service.description[locale],
    openGraph: {
      title: `${service.title[locale]} - Soundia`,
      description: service.description[locale],
      images: [service.image]
    }
  };
}

export default async function ServicePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const service = services.find((item) => item.href.endsWith(slug));
  const t = await getDictionary(locale);

  if (!service) notFound();

  return (
    <main className="service-page">
      <Container>
        <article>
          <div className="service-page__top">
            <SectionLabel>
              {service.number} / {service.meta[locale]}
            </SectionLabel>
            <Link href="/#services">{t.nav.services}</Link>
          </div>

          <header className="service-page__hero">
            <p className="service-page__kicker">{service.meta[locale]}</p>
            <h1>{service.title[locale]}</h1>
            <p>{service.description[locale]}</p>
          </header>

          <section className="service-page__media-grid" aria-label={service.title[locale]}>
            <figure className="service-page__media">
              <Image src={service.image} alt={service.title[locale]} width={1400} height={900} sizes="(max-width: 900px) 100vw, 64vw" priority unoptimized />
            </figure>
            <aside className="service-page__audio">
              <span>{service.audioLabel[locale]}</span>
              <AudioPlayer src={service.audioUrl} duration={service.duration} labels={{ play: t.common.play, pause: t.common.pause }} />
            </aside>
          </section>

          <section className="service-page__body" aria-label={service.title[locale]}>
            <div>
              <h2>{locale === "ru" ? "Как мы делаем" : locale === "lv" ? "Kā mēs strādājam" : "How we work"}</h2>
              <ol>
                {service.steps.map((step) => (
                  <li key={step[locale]}>{step[locale]}</li>
                ))}
              </ol>
            </div>
            <div className="service-page__cta">
              <p>{locale === "ru" ? "Можно заказать готовый пакет или настроить услугу под ваш проект." : locale === "lv" ? "Varat pasūtīt gatavu paketi vai pielāgot pakalpojumu savam projektam." : "You can order a ready package or adapt the service to your project."}</p>
              <Link href="/order">{service.orderLabel[locale]}</Link>
            </div>
          </section>
        </article>
      </Container>
    </main>
  );
}
