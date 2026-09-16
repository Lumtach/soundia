"use client";

import { OrderRequestModal } from "@/components/order/OrderRequestModal";
import type { Locale } from "@/lib/i18n";

export function AudioGuideOrderForm({ locale, selectedService }: { locale: Locale; selectedService?: string }) {
  return (
    <section className="order-form order-form--modal-only" id="order" aria-labelledby="order-modal-title">
      <OrderRequestModal locale={locale} selectedService={selectedService} titleId="order-modal-title" variant="inline" />
    </section>
  );
}
