"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type MouseEvent,
  type ReactElement,
  type ReactNode
} from "react";
import { Button } from "@/components/ui/Button";
import { contacts } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

type ServiceCopy = {
  title: Record<Locale, string>;
  subject: Record<Locale, string>;
};

const closeLabels = {
  ru: "Закрыть заявку",
  lv: "Aizvērt pieprasījumu",
  en: "Close request"
} satisfies Record<Locale, string>;

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
  course: {
    title: { ru: "Заявка на курс", lv: "Kursa pieprasījums", en: "Course request" },
    subject: { ru: "Курс", lv: "Kurss", en: "Course" }
  },
  service: {
    title: { ru: "Заявка на услугу", lv: "Pakalpojuma pieprasījums", en: "Service request" },
    subject: { ru: "Услуга", lv: "Pakalpojums", en: "Service" }
  }
};

function getServiceCopy(selectedService?: string) {
  return serviceCopy[selectedService ?? ""] ?? serviceCopy.service;
}

function OrderRequestPanel({
  locale,
  selectedService,
  titleId
}: {
  locale: Locale;
  selectedService?: string;
  titleId: string;
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

      <form className="order-modal__form" action={`mailto:${contacts.email}?subject=${encodeURIComponent(service.title[locale])}&body=${encodeURIComponent(requestBody)}`} method="post" encType="text/plain">
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
        <Button type="submit" size="md" variant="filled">
          {t.send}
        </Button>
      </form>
    </div>
  );
}

function OrderRequestModal({
  locale,
  selectedService,
  titleId,
  open,
  onClose
}: {
  locale: Locale;
  selectedService?: string;
  titleId: string;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="order-modal order-modal--overlay" role="dialog" aria-modal="true" aria-labelledby={titleId} onMouseDown={onClose}>
      <div className="order-modal__dialog" onMouseDown={(event) => event.stopPropagation()}>
        <button className="order-modal__close" type="button" onClick={onClose} aria-label={closeLabels[locale]}>
          ×
        </button>
        <OrderRequestPanel locale={locale} selectedService={selectedService} titleId={titleId} />
      </div>
    </div>
  );
}

export function RequestModalButton({
  locale,
  serviceId,
  variant,
  size,
  className,
  children
}: {
  locale: Locale;
  serviceId?: string;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const trigger = isValidElement<ButtonHTMLAttributes<HTMLButtonElement>>(children)
    ? cloneElement(children as ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>, {
        onClick: (event: MouseEvent<HTMLButtonElement>) => {
          children.props.onClick?.(event);
          if (!event.defaultPrevented) setIsOpen(true);
        },
        type: children.props.type ?? "button"
      })
    : (
      <Button className={className} size={size} type="button" variant={variant} onClick={() => setIsOpen(true)}>
        {children}
      </Button>
    );

  return (
    <>
      {trigger}
      <OrderRequestModal locale={locale} selectedService={serviceId} titleId={titleId} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
