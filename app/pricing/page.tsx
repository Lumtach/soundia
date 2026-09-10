import type { Metadata } from "next";
import { PricingSection } from "@/components/home/PricingSection";
import { getCurrentLocale } from "@/lib/current-locale";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Цены — Soundia",
  description: "Пакеты и стоимость звуковых проектов Soundia."
};

export default async function PricingPage() {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);

  return (
    <main className="pricing-page">
      <PricingSection locale={locale} copy={t.home.pricing} />
    </main>
  );
}
