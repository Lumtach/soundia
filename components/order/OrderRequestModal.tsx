"use client";

import { useEffect } from "react";
import { OrderRequestPanel } from "@/components/order/OrderRequestPanel";
import type { Locale } from "@/lib/i18n";

const closeLabels = {
  ru: "Закрыть заявку",
  lv: "Aizvērt pieprasījumu",
  en: "Close request"
} satisfies Record<Locale, string>;

type OrderRequestModalProps = {
  locale: Locale;
  selectedService?: string;
  titleId: string;
  open?: boolean;
  variant?: "overlay" | "inline";
  onClose?: () => void;
};

export function OrderRequestModal({
  locale,
  selectedService,
  titleId,
  open = true,
  variant = "overlay",
  onClose
}: OrderRequestModalProps) {
  const isOverlay = variant === "overlay";

  useEffect(() => {
    if (!open || !isOverlay || !onClose) return;

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
  }, [isOverlay, onClose, open]);

  if (!open) return null;

  if (!isOverlay) {
    return (
      <div className="order-modal order-modal--inline">
        <OrderRequestPanel locale={locale} selectedService={selectedService} titleId={titleId} />
      </div>
    );
  }

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
