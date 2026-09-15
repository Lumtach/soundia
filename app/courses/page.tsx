import type { CSSProperties } from "react";
import Link from "next/link";

import { RequestModalButton } from "@/components/order/RequestModalButton";
import { Container } from "@/components/ui/Container";
import { coursePageCopy, courses } from "@/lib/courses";
import { getCurrentLocale } from "@/lib/current-locale";

export default async function CoursesPage() {
  const locale = await getCurrentLocale();
  const copy = coursePageCopy[locale];

  return (
    <main className="courses-page courses-page--cinematic">
      <section className="courses-hero" aria-labelledby="courses-page-title">
        <Container className="courses-hero__inner">
          <div className="courses-hero__copy">
            <p className="courses-hero__eyebrow">{copy.eyebrow}</p>
            <h1 id="courses-page-title">{copy.title}</h1>
            <p>{copy.intro}</p>
            <RequestModalButton className="courses-hero__button" locale={locale} serviceId="course">
              {copy.request}
            </RequestModalButton>
          </div>

          <div className="courses-hero__wave" aria-hidden="true">
            {Array.from({ length: 34 }).map((_, index) => (
              <span
                key={index}
                style={
                  {
                    "--h": `${18 + ((index * 7) % 48)}px`,
                    "--o": 0.28 + (index % 5) * 0.12
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="courses-showcase" aria-label="Курсы Soundia">
        <Container>
          <div className="courses-showcase__top">
            <div>
              <p>{copy.programs}</p>
              <h2>{copy.headline}</h2>
            </div>
            <span>{copy.stats}</span>
          </div>

          <div className="courses-showcase__grid">
            {courses.map((course, index) => (
              <article className="course-tile" key={course.slug}>
                <span className="course-tile__number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{course.meta[locale]}</p>
                  <h3>{course.title[locale]}</h3>
                  <span>{course.level[locale]}</span>
                </div>
                <p>{course.text[locale]}</p>
                <ul>
                  {course.tags[locale].map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Link className="course-tile__details-link" href={`/courses/${course.slug}`}>
                  {copy.details}
                </Link>
                <RequestModalButton locale={locale} serviceId="course">
                  {copy.enroll}
                </RequestModalButton>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
