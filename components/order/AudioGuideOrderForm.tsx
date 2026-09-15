"use client";

import type { Locale } from "@/lib/i18n";

type ServiceCopy = {
  title: Record<Locale, string>;
  subject: Record<Locale, string>;
};

const copy = {
  ru: {
    eyebrow: "Оформить заявку",
    intro: "Оставьте контакты, и мы свяжемся с вами по выбранному формату.",
    selected: "Выбранная услуга",
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    comment: "Комментарий",
    send: "Отправить заявку"
  },
  lv: {
    eyebrow: "Nosūtīt pieprasījumu",
    intro: "Atstājiet kontaktus, un mēs sazināsimies par izvēlēto formātu.",
    selected: "Izvēlētais pakalpojums",
    name: "Vārds",
    email: "Email",
    phone: "Telefons",
    comment: "Komentārs",
    send: "Nosūtīt pieprasījumu"
  },
  en: {
    eyebrow: "Send request",
    intro: "Leave your contacts and we will follow up about the selected format.",
    selected: "Selected service",
    name: "Name",
    email: "Email",
    phone: "Phone",
    comment: "Comment",
    send: "Send request"
  }
} satisfies Record<Locale, Record<string, string>>;

const serviceCopy: Record<string, ServiceCopy> = {
  guide: {
    title: { ru: "Заявка на аудиогид", lv: "Audiogida pieprasījums", en: "Audio guide request" },
    subject: { ru: "Аудиогид", lv: "Audiogids", en: "Audio guide" }
  },
  "audio-guide": {
    title: { ru: "Заявка на аудиогид", lv: "Audiogida pieprasījums", en: "Audio guide request" },
    subject: { ru: "Аудиогид", lv: "Audiogids", en: "Audio guide" }
  },
  quest: {
    title: { ru: "Заявка на аудиоквест", lv: "Audiokvesta pieprasījums", en: "Audio quest request" },
    subject: { ru: "Аудиоквест", lv: "Audiokvests", en: "Audio quest" }
  },
  "audio-quest": {
    title: { ru: "Заявка на аудиоквест", lv: "Audiokvesta pieprasījums", en: "Audio quest request" },
    subject: { ru: "Аудиоквест", lv: "Audiokvests", en: "Audio quest" }
  },
  spatial: {
    title: { ru: "Заявка на 3D-аудио", lv: "3D audio pieprasījums", en: "3D audio request" },
    subject: { ru: "3D-аудио", lv: "3D audio", en: "3D audio" }
  },
  "spatial-audio": {
    title: { ru: "Заявка на 3D-аудио", lv: "3D audio pieprasījums", en: "3D audio request" },
    subject: { ru: "3D-аудио", lv: "3D audio", en: "3D audio" }
  },
  "audio-game": {
    title: { ru: "Заявка на аудиоигру", lv: "Audiospēles pieprasījums", en: "Audio game request" },
    subject: { ru: "Аудиоигра", lv: "Audiospēle", en: "Audio game" }
  },
  promenade: {
    title: { ru: "Заявка на променад-спектакль", lv: "Promenādes izrādes pieprasījums", en: "Promenade performance request" },
    subject: { ru: "Променад-спектакль", lv: "Promenādes izrāde", en: "Promenade performance" }
  },
  "promenade-performance": {
    title: { ru: "Заявка на променад-спектакль", lv: "Promenādes izrādes pieprasījums", en: "Promenade performance request" },
    subject: { ru: "Променад-спектакль", lv: "Promenādes izrāde", en: "Promenade performance" }
  },
  service: {
    title: { ru: "Заявка на услугу", lv: "Pakalpojuma pieprasījums", en: "Service request" },
    subject: { ru: "Услуга", lv: "Pakalpojums", en: "Service" }
  }
};

function getServiceCopy(selectedService?: string) {
  return serviceCopy[selectedService ?? ""] ?? serviceCopy.service;
}

export function AudioGuideOrderForm({ locale, selectedService }: { locale: Locale; selectedService?: string }) {
  return (
    <section className="order-form order-form--modal-only" id="order" aria-labelledby="order-modal-title">
      <div className="order-modal order-modal--inline">
        <OrderRequestPanel locale={locale} selectedService={selectedService} titleId="order-modal-title" />
      </div>
    </section>
  );
}

export function OrderRequestPanel({
  locale,
  selectedService,
  titleId = "order-modal-title"
}: {
  locale: Locale;
  selectedService?: string;
  titleId?: string;
}) {
  const t = copy[locale];
  const service = getServiceCopy(selectedService);
  const requestBody = `${t.selected}: ${service.subject[locale]}`;

  return (
    <div className="order-modal__panel">
      <div>
        <p className="section-label">{t.eyebrow}</p>
        <h2 id={titleId}>{service.title[locale]}</h2>
        <p>{t.intro}</p>
      </div>

      <form className="order-modal__form" action={`mailto:info@soundia.lv?subject=${encodeURIComponent(service.title[locale])}&body=${encodeURIComponent(requestBody)}`} method="post" encType="text/plain">
        <label>
          <span>{t.name}</span>
          <input name="name" required />
        </label>
        <label>
          <span>{t.email}</span>
          <input name="email" type="email" required />
        </label>
        <label>
          <span>{t.phone}</span>
          <input name="phone" type="tel" />
        </label>
        <label>
          <span>{t.comment}</span>
          <textarea name="comment" rows={4} />
        </label>
        <button type="submit">{t.send}</button>
      </form>
    </div>
  );
}
