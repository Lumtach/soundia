"use client";

import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type MouseEvent,
  type ReactElement,
  type ReactNode
} from "react";
import { OrderRequestModal } from "@/components/order/OrderRequestModal";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n";

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
