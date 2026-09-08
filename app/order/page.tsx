import type { Metadata } from "next";
import { AudioGuideOrderForm } from "@/components/order/AudioGuideOrderForm";
import { Container } from "@/components/ui/Container";
import { getCurrentLocale } from "@/lib/current-locale";

export const metadata: Metadata = {
  title: "Форма заказа аудиогида - Soundia",
  description: "Динамическая форма заказа аудиогида с настройками по каждому слоту."
};

export default async function OrderPage() {
  const locale = await getCurrentLocale();

  return (
    <main className="order-page">
      <Container>
        <AudioGuideOrderForm locale={locale} />
      </Container>
    </main>
  );
}
