import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RequestModalButton } from "@/components/order/RequestModalButton";
import { Container } from "@/components/ui/Container";
import { coursePageCopy, courses } from "@/lib/courses";
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

  return (
    <main className="course-detail-page">
      <section className="course-detail-hero">
        <Container>
          <Link className="course-detail-hero__back" href="/courses">
            {copy.back}
          </Link>
          <p className="course-detail-hero__meta">{course.meta[locale]}</p>
          <h1>{course.title[locale]}</h1>
          <p>{course.lead[locale]}</p>
          <RequestModalButton className="course-detail-hero__button" locale={locale} serviceId="course">
            {copy.enrollCourse}
          </RequestModalButton>
        </Container>
      </section>

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
    </main>
  );
}
