"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "variant1"
  | "variant2"
  | "variant3"
  | "filled"
  | "outline"
  | "blue"
  | "blue-outline"
  | "dark-blue";
type ButtonSize = "sx" | "sm" | "md" | "ld" | "lg" | "xl";
type ButtonArrowPosition = "start" | "end";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: ReactNode;
  withArrow?: boolean;
  arrowPosition?: ButtonArrowPosition;
  arrowClassName?: string;
  children: ReactNode;
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type ButtonLinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-[#4274a9] bg-[#4274a9] text-white shadow-[0_14px_26px_rgba(0,0,0,0.24)] hover:border-[#4d8ccd] hover:bg-[#4d8ccd] hover:text-white active:border-[#101010] active:bg-[#101010] active:text-[rgba(255,255,255,0.64)] disabled:border-[#101010] disabled:bg-[#101010] disabled:text-[rgba(255,255,255,0.58)] aria-disabled:border-[#101010] aria-disabled:bg-[#101010] aria-disabled:text-[rgba(255,255,255,0.58)]",
  secondary:
    "border-[#4274a9] bg-transparent text-[#4274a9] shadow-[0_14px_26px_rgba(0,0,0,0.18)] hover:border-[#4d8ccd] hover:text-[#4d8ccd] active:border-[rgba(255,255,255,0.12)] active:text-[rgba(255,255,255,0.58)] disabled:border-[rgba(255,255,255,0.12)] disabled:text-[rgba(255,255,255,0.58)] aria-disabled:border-[rgba(255,255,255,0.12)] aria-disabled:text-[rgba(255,255,255,0.58)]",
  dark:
    "border-[#101010] bg-[#101010] text-[#4274a9] shadow-[0_14px_26px_rgba(0,0,0,0.2)] hover:border-[#050505] hover:bg-[#050505] hover:text-[#4d8ccd] active:text-[rgba(255,255,255,0.58)] disabled:border-[#101010] disabled:bg-[#101010] disabled:text-[rgba(255,255,255,0.58)] aria-disabled:border-[#101010] aria-disabled:bg-[#101010] aria-disabled:text-[rgba(255,255,255,0.58)]",
  variant1:
    "border-[#4274a9] bg-[#4274a9] text-white shadow-[0_14px_26px_rgba(0,0,0,0.24)] hover:border-[#4d8ccd] hover:bg-[#4d8ccd] hover:text-white active:border-[#101010] active:bg-[#101010] active:text-[rgba(255,255,255,0.64)] disabled:border-[#101010] disabled:bg-[#101010] disabled:text-[rgba(255,255,255,0.58)] aria-disabled:border-[#101010] aria-disabled:bg-[#101010] aria-disabled:text-[rgba(255,255,255,0.58)]",
  variant2:
    "border-[#4274a9] bg-transparent text-[#4274a9] shadow-[0_14px_26px_rgba(0,0,0,0.18)] hover:border-[#4d8ccd] hover:text-[#4d8ccd] active:border-[rgba(255,255,255,0.12)] active:text-[rgba(255,255,255,0.58)] disabled:border-[rgba(255,255,255,0.12)] disabled:text-[rgba(255,255,255,0.58)] aria-disabled:border-[rgba(255,255,255,0.12)] aria-disabled:text-[rgba(255,255,255,0.58)]",
  variant3:
    "border-[#101010] bg-[#101010] text-[#4274a9] shadow-[0_14px_26px_rgba(0,0,0,0.2)] hover:border-[#050505] hover:bg-[#050505] hover:text-[#4d8ccd] active:text-[rgba(255,255,255,0.58)] disabled:border-[#101010] disabled:bg-[#101010] disabled:text-[rgba(255,255,255,0.58)] aria-disabled:border-[#101010] aria-disabled:bg-[#101010] aria-disabled:text-[rgba(255,255,255,0.58)]",
  filled: "border-[var(--ink)] bg-[#fff] text-[var(--bg)] hover:border-[#4274A9] hover:bg-[#4274A9] hover:text-white",
  outline: "border-[var(--ink)] bg-transparent text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  blue:
    "border-[#4274a9] bg-[#4274a9] text-white shadow-[0_14px_26px_rgba(0,0,0,0.24)] hover:border-[#4d8ccd] hover:bg-[#4d8ccd] hover:text-white disabled:border-[#101010] disabled:bg-[#101010] disabled:text-[rgba(255,255,255,0.58)] aria-disabled:border-[#101010] aria-disabled:bg-[#101010] aria-disabled:text-[rgba(255,255,255,0.58)]",
  "blue-outline":
    "border-[#4274a9] bg-transparent text-[#4274a9] shadow-[0_14px_26px_rgba(0,0,0,0.18)] hover:border-[#4d8ccd] hover:text-[#4d8ccd] disabled:border-[rgba(255,255,255,0.12)] disabled:text-[rgba(255,255,255,0.58)] aria-disabled:border-[rgba(255,255,255,0.12)] aria-disabled:text-[rgba(255,255,255,0.58)]",
  "dark-blue":
    "border-[#101010] bg-[#101010] text-[#4274a9] shadow-[0_14px_26px_rgba(0,0,0,0.2)] hover:border-[#050505] hover:bg-[#050505] hover:text-[#4d8ccd] disabled:border-[#101010] disabled:bg-[#101010] disabled:text-[rgba(255,255,255,0.58)] aria-disabled:border-[#101010] aria-disabled:bg-[#101010] aria-disabled:text-[rgba(255,255,255,0.58)]"
};

const sizeStyles: Record<ButtonSize, string> = {
  sx: "min-h-0 px-0 py-2 text-[16px]",
  sm: "min-h-10 px-4 py-2 text-[11px]",
  md: "min-h-12 px-[22px] py-[13px] text-xs",
  ld: "min-h-14 px-7 py-4 text-[23px]",
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
  return `group inline-flex w-fit cursor-pointer touch-manipulation select-none items-center justify-center gap-[0.55em] whitespace-nowrap rounded-full border font-[850] leading-none tracking-[0] transition duration-[260ms] hover:-translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:hover:translate-y-0 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:hover:translate-y-0 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
}

function ButtonContent({
  arrow,
  withArrow,
  arrowPosition,
  arrowClassName,
  children
}: Pick<ButtonBaseProps, "arrow" | "withArrow" | "arrowPosition" | "arrowClassName" | "children">) {
  const renderedArrow = arrow ?? (withArrow ? <ArrowRight aria-hidden="true" size={18} strokeWidth={2} /> : null);
  const arrowClasses = `button-arrow inline-flex shrink-0 transition-transform duration-[260ms] group-hover:translate-x-0.5 ${arrowClassName}`;

  return (
    <>
      {renderedArrow && arrowPosition === "start" ? (
        <span className={arrowClasses} aria-hidden="true">
          {renderedArrow}
        </span>
      ) : null}
      {children}
      {renderedArrow && arrowPosition === "end" ? (
        <span className={arrowClasses} aria-hidden="true">
          {renderedArrow}
        </span>
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps): ReactNode;
export function Button(props: ButtonLinkProps): ReactNode;
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  arrow,
  withArrow,
  arrowPosition = "start",
  arrowClassName = "",
  children,
  ...props
}: ButtonProps | ButtonLinkProps) {
  const content = (
    <ButtonContent arrow={arrow} withArrow={withArrow} arrowPosition={arrowPosition} arrowClassName={arrowClassName}>
      {children}
    </ButtonContent>
  );

  if (typeof (props as { href?: unknown }).href === "string") {
    const { href, ...linkProps } = props as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

    return (
      <Link href={href} className={getButtonClassName({ variant, size, className })} {...linkProps}>
        {content}
      </Link>
    );
  }

  const { disabled, type = "button", ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={getButtonClassName({ variant, size, className })} disabled={disabled} type={type} {...buttonProps}>
      {content}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  arrow,
  withArrow,
  arrowPosition = "start",
  arrowClassName = "",
  children,
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} className={getButtonClassName({ variant, size, className })} {...props}>
      <ButtonContent arrow={arrow} withArrow={withArrow} arrowPosition={arrowPosition} arrowClassName={arrowClassName}>
        {children}
      </ButtonContent>
    </Link>
  );
}
