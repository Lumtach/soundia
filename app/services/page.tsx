import { ServicesSection } from "@/components/home/ServicesSection";
import { getCurrentLocale } from "@/lib/current-locale";
import { getDictionary } from "@/lib/i18n";
import { getServiceList } from "@/lib/services-content";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);
  const services = await getServiceList(locale);
  const servicesCopy = {
    ...t.home.services,
    label: t.home.services.label.replace(/^\d+\s*\/\s*/, "")
  };

  return (
    <main className="services-page">
      <ServicesSection locale={locale} copy={servicesCopy} services={services} />
    </main>
  );
}
