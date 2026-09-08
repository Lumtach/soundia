import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getCurrentLocale } from "@/lib/current-locale";
import { getDictionary } from "@/lib/i18n";

export default async function CoursesPage() {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);

  return (
    <main className="inner-page">
      <Container>
        <SectionLabel>{t.home.courses.label}</SectionLabel>
        <h1>
          {t.home.courses.headline.map((line, index) => (
            <span key={`${line}-${index}`}>{line}</span>
          ))}
        </h1>
        <p>{t.home.courses.text}</p>
      </Container>
    </main>
  );
}
