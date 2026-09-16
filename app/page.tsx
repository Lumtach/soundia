import { AboutSection } from "@/components/home/AboutSection";
import { CoursesTeaser } from "@/components/home/CoursesTeaser";
import { FAQSection } from "@/components/home/FAQSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { SoundExperience } from "@/components/home/SoundExperience";
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
