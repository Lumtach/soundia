import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { localizePath, type Locale } from "@/lib/i18n";

export function CoursesTeaser({
  locale,
  copy,
  common
}: {
  locale: Locale;
  copy: { label: string; headline: string[]; text: string };
  common: { watchCourses: string };
}) {
  return (
    <section className="courses section" id="courses" aria-labelledby="courses-title">
      <Container>
        <SectionLabel>{copy.label}</SectionLabel>
        <div className="courses__grid">
          <h2 id="courses-title">
            {copy.headline.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </h2>
          <div>
            <p>{copy.text}</p>
            <ArrowLink href={localizePath(locale, "/courses")}>{common.watchCourses}</ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
