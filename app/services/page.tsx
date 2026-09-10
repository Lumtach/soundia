import { ServicesSection } from "@/components/home/ServicesSection";
import { getCurrentLocale } from "@/lib/current-locale";
import { getDictionary } from "@/lib/i18n";

export default async function ServicesPage() {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);

  return (
    <main className="services-page">
      <ServicesSection locale={locale} copy={t.home.services} />
    </main>
  );
}
