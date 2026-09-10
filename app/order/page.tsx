import type { Metadata } from "next";
import { AudioGuideOrderForm } from "@/components/order/AudioGuideOrderForm";
import { Container } from "@/components/ui/Container";
import { getCurrentLocale } from "@/lib/current-locale";

export const metadata: Metadata = {
  title: "Форма заказа аудиогида - Soundia",
  description: "Динамическая форма заказа аудиогида с настройками по каждому слоту."
};

export default async function OrderPage({
  searchParams
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const locale = await getCurrentLocale();
  const { service } = await searchParams;

  return (
    <main className="order-page">
      <Container>
        <AudioGuideOrderForm key={`${locale}-${service ?? "default"}`} locale={locale} selectedService={service} />
      </Container>
    </main>
  );
}
