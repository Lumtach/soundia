import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getCurrentLocale } from "@/lib/current-locale";
import { projects } from "@/lib/data";
import { getDictionary, localizePath } from "@/lib/i18n";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.href.split("/").pop()
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const project = projects.find((item) => item.href.endsWith(slug));

  if (!project) {
    return {};
  }

  return {
    title: `${project.title[locale]} - Soundia`,
    description: project.summary[locale],
    openGraph: {
      title: `${project.title[locale]} - Soundia`,
      description: project.summary[locale],
      images: [project.image]
    }
  };
}

export default async function WorkCasePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.href.endsWith(slug));
  const project = projects[projectIndex];
  if (!project) notFound();
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);

  return (
    <main className="case-page">
      <Container>
        <article>
          <div className="case-page__top">
            <SectionLabel>
              {project.number} / {project.category[locale]}
            </SectionLabel>
            <Link href={localizePath(locale, "/portfolio")}>{t.case.back}</Link>
          </div>
          <header className="case-page__hero">
            <div className="case-page__intro">
              <p className="case-page__kicker">{project.category[locale]}</p>
              <h1>{project.title[locale]}</h1>
              <p className="case-page__lead">{project.summary[locale]}</p>
              <div className="case-page__hero-audio">
                <AudioPlayer src={project.audioUrl} duration={project.duration} labels={{ play: t.common.play, pause: t.common.pause }} />
              </div>
              <Link className="case-page__order" href={localizePath(locale, "/order")}>
                {t.case.orderAudioGuide}
              </Link>
            </div>
          </header>

          <figure className="case-page__media">
            <Image src={project.image} alt={project.title[locale]} width={1800} height={1100} sizes="100vw" priority unoptimized />
          </figure>

          <Link className="case-page__next" href={localizePath(locale, nextProject.href)}>
            <span>{t.case.next}</span>
            <strong>{nextProject.title[locale]}</strong>
          </Link>
        </article>
      </Container>
    </main>
  );
}
