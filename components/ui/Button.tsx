"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "filled" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "xl";
type ButtonArrowPosition = "start" | "end";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: ReactNode;
  arrowPosition?: ButtonArrowPosition;
  arrowClassName?: string;
  children: ReactNode;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: ReactNode;
  arrowPosition?: ButtonArrowPosition;
  arrowClassName?: string;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  filled: "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
  outline: "border-[var(--ink)] bg-transparent text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-[11px]",
  md: "min-h-12 px-[22px] py-[13px] text-xs",
  lg: "min-h-14 px-7 py-4 text-[13px]",
  xl: "min-h-[61px] min-w-[min(100%,306px)] px-[38px] py-0 text-2xl"
};

function getButtonClassName({
  variant,
  size,
  className = ""
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  className?: string;
}) {
  return `inline-flex w-fit cursor-pointer touch-manipulation select-none items-center justify-center gap-[0.55em] whitespace-nowrap rounded-full border font-[850] uppercase leading-none tracking-[0.1em] transition duration-[260ms] hover:-translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:translate-y-0 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
}

export function Button({
  variant = "filled",
  size = "md",
  className = "",
  arrow,
  arrowPosition = "start",
  arrowClassName = "",
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button className={getButtonClassName({ variant, size, className })} disabled={disabled} type={type} {...props}>
      {arrow && arrowPosition === "start" ? (
        <span className={`button-arrow ${arrowClassName}`} aria-hidden="true">
          {arrow}
        </span>
      ) : null}
      {children}
      {arrow && arrowPosition === "end" ? (
        <span className={`button-arrow ${arrowClassName}`} aria-hidden="true">
          {arrow}
        </span>
      ) : null}
    </button>
  );
}

export function ButtonLink({
  variant = "filled",
  size = "md",
  className = "",
  arrow,
  arrowPosition = "start",
  arrowClassName = "",
  children,
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} className={getButtonClassName({ variant, size, className })} {...props}>
      {arrow && arrowPosition === "start" ? (
        <span className={`button-arrow ${arrowClassName}`} aria-hidden="true">
          {arrow}
        </span>
      ) : null}
      {children}
      {arrow && arrowPosition === "end" ? (
        <span className={`button-arrow ${arrowClassName}`} aria-hidden="true">
          {arrow}
        </span>
      ) : null}
    </Link>
  );
}
