import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/order/audio/AudioPlayer";
import { RequestModalButton } from "@/components/order/RequestModalButton";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getCurrentLocale } from "@/lib/current-locale";
import { getServiceDetail } from "@/lib/services-content";
import { services } from "./data";

export const dynamic = "force-dynamic";

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
  const service = await getServiceDetail(slug, locale);

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
  const service = await getServiceDetail(slug, locale);
  const allServicesLabel = locale === "ru" ? "Все услуги" : locale === "lv" ? "Visi pakalpojumi" : "All services";
  const audioLabels = locale === "ru" ? { play: "Воспроизвести фрагмент", pause: "Пауза" } : locale === "lv" ? { play: "Atskaņot fragmentu", pause: "Pauze" } : { play: "Play preview", pause: "Pause" };

  if (!service) notFound();

  return (
    <main className="service-page">
      <Container>
        <article>
          <div className="service-page__split">
            <figure className="service-page__media">
              <Image src={service.image} alt={service.title[locale]} width={1400} height={900} sizes="(max-width: 900px) 100vw, 64vw" priority unoptimized />
            </figure>
            <div className="service-page__content">
              <section className="service-page__feature" aria-label={service.title[locale]}>
                <div className="service-page__feature-copy">
                  <header className="service-page__hero">
                    <p className="service-page__kicker">
                      <ButtonLink aria-label={allServicesLabel} className="service-page__back" href="/services" variant="outline" size="sm" arrow="←" arrowClassName="service-page__back-arrow">
                        <span className="visually-hidden">{allServicesLabel}</span>
                      </ButtonLink>
                      {service.meta[locale]}</p>
                    <h1>{service.title[locale]}</h1>
                    <p>{service.description[locale]}</p>
                  </header>
                  {service.audioUrl ? (
                    <aside className="service-page__audio">
                      <AudioPlayer src={service.audioUrl} duration={service.duration} labels={audioLabels} />
                    </aside>
                  ) : null}
                </div>
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
                  <p>{locale === "ru" ? "Оставьте заявку, и мы обсудим формат под ваш проект." : locale === "lv" ? "Atstājiet pieprasījumu, un mēs apspriedīsim formātu jūsu projektam." : "Send a request and we will shape the format around your project."}</p>
                  <RequestModalButton className="service-page__request" locale={locale} serviceId={service.id}>{service.orderLabel[locale]}</RequestModalButton>
                </div>
              </section>
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}
