import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RequestModalButton } from "@/components/order/RequestModalButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { coursePageCopy, courses } from "./data";
import { getCurrentLocale } from "@/lib/current-locale";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const course = courses.find((item) => item.slug === slug);

  if (!course) return {};

  return {
    title: `${course.title[locale]} - Soundia`,
    description: course.lead[locale]
  };
}

export default async function CoursePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const copy = coursePageCopy[locale];
  const course = courses.find((item) => item.slug === slug);

  if (!course) notFound();

  const syllabus = "syllabus" in course ? course.syllabus : null;

  return (
    <main className="course-detail-page">
      <section className="course-detail-hero">
        <Container>
          <Link  href="/courses">
            {copy.back}
          </Link>
          <p className="course-detail-hero__meta">{course.meta[locale]}</p>
          <h1>{course.title[locale]}</h1>
          <p>{course.lead[locale]}</p>
          <RequestModalButton locale={locale} serviceId="course">
            <Button size="md" variant="filled">
              {copy.enrollCourse}
            </Button>
          </RequestModalButton>
        </Container>
      </section>

      {syllabus ? (
        <section className="course-program" aria-label={course.title[locale]}>
          <Container className="course-program__layout">
            <div className="course-program__main">
              <p className="course-program__eyebrow">{syllabus.eyebrow[locale]}</p>
              <h2>{syllabus.title[locale]}</h2>
              <div className="course-program__intro">
                {syllabus.intro[locale].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="course-program__modules">
                <p className="course-program__eyebrow">{syllabus.modulesEyebrow[locale]}</p>
                <ol>
                  {syllabus.modules[locale].map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{item}</strong>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="course-program__summary" aria-label={syllabus.volumeEyebrow[locale]}>
              <p className="course-program__eyebrow">{syllabus.volumeEyebrow[locale]}</p>
              <dl>
                {syllabus.hours[locale].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                <div className="course-program__total">
                  <dt>{syllabus.total[locale][0]}</dt>
                  <dd>{syllabus.total[locale][1]}</dd>
                </div>
              </dl>
            </aside>
          </Container>
        </section>
      ) : (
        <section className="course-detail-body" aria-label={course.title[locale]}>
          <Container>
            <div className="course-detail-body__intro">
              <p>{course.description[locale]}</p>
              <ul>
                {course.tags[locale].map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <div className="course-detail-body__grid">
              <article>
                <h2>{copy.learn}</h2>
                <ol>
                  {course.learn[locale].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </article>
              <article>
                <h2>{copy.audience}</h2>
                <p>{course.audience[locale]}</p>
              </article>
              <article>
                <h2>{copy.result}</h2>
                <p>{course.result[locale]}</p>
              </article>
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
