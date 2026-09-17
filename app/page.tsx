import { HeroSection } from "@/components/home/HeroSection";
import { getCurrentLocale } from "@/lib/current-locale";
import { getDictionary } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);

  return (
    <main className="home-page">
      <HeroSection locale={locale} copy={t.home.hero} />
    </main>
  );
}
