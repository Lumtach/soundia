"use client";

import { useId, useState, type ReactNode } from "react";
import { OrderRequestModal } from "@/components/order/OrderRequestModal";
import type { Locale } from "@/lib/i18n";

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

  return (
    <>
      <button className={className} type="button" onClick={() => setIsOpen(true)}>
        {children}
      </button>
      <OrderRequestModal locale={locale} selectedService={serviceId} titleId={titleId} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
