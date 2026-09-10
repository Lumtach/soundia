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
    <main>
      <HeroSection locale={locale} copy={t.home.hero} />
      <SoundExperience copy={t.home.soundExperience} />
      <AboutSection copy={t.home.about} />
      <ProcessSection copy={t.home.process} />
      <CoursesTeaser locale={locale} copy={t.home.courses} common={t.common} />
      <FAQSection copy={t.home.faq} />
    </main>
  );
}
