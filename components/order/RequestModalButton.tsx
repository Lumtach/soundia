"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { OrderRequestPanel } from "@/components/order/AudioGuideOrderForm";
import type { Locale } from "@/lib/i18n";

const closeLabels = {
  ru: "Закрыть заявку",
  lv: "Aizvērt pieprasījumu",
  en: "Close request"
} satisfies Record<Locale, string>;

export function RequestModalButton({
  locale,
  serviceId,
  className,
  children
}: {
  locale: Locale;
  serviceId?: string;
  className?: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button className={className} type="button" onClick={() => setIsOpen(true)}>
        {children}
      </button>
      {isOpen ? (
        <div className="order-modal order-modal--overlay" role="dialog" aria-modal="true" aria-labelledby={titleId} onMouseDown={() => setIsOpen(false)}>
          <div className="order-modal__dialog" onMouseDown={(event) => event.stopPropagation()}>
            <button className="order-modal__close" type="button" onClick={() => setIsOpen(false)} aria-label={closeLabels[locale]}>
              ×
            </button>
            <OrderRequestPanel locale={locale} selectedService={serviceId} titleId={titleId} />
          </div>
        </div>
      ) : null}
    </>
  );
}
