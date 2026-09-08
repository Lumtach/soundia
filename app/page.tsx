import { AboutSection } from "@/components/home/AboutSection";
import { CoursesTeaser } from "@/components/home/CoursesTeaser";
import { FAQSection } from "@/components/home/FAQSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PricingSection } from "@/components/home/PricingSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SoundExperience } from "@/components/home/SoundExperience";
import { getCurrentLocale } from "@/lib/current-locale";
import { getDictionary } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);

  return (
    <main>
      <HeroSection locale={locale} copy={t.home.hero} />
      <SelectedWork locale={locale} copy={t.home.work} common={t.common} />
      <ServicesSection locale={locale} copy={t.home.services} />
      <SoundExperience copy={t.home.soundExperience} />
      <AboutSection copy={t.home.about} />
      <ProcessSection copy={t.home.process} />
      <PricingSection locale={locale} copy={t.home.pricing} />
      <CoursesTeaser locale={locale} copy={t.home.courses} common={t.common} />
      <FAQSection copy={t.home.faq} />
    </main>
  );
}
