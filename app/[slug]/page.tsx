import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/order/audio/AudioPlayer";
import { RequestModalButton } from "@/components/order/RequestModalButton";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getCurrentLocale } from "@/lib/current-locale";
import { projects } from "../portfolio/data";
import { getPortfolioProject, getPortfolioProjects } from "@/lib/portfolio-content";
import { getDictionary, localizePath } from "@/lib/i18n";

export const dynamic = "force-dynamic";

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
  const project = await getPortfolioProject(slug, locale);

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
  const locale = await getCurrentLocale();
  const dbProjects = await getPortfolioProjects(locale);
  const projectIndex = dbProjects.findIndex((item) => item.href.endsWith(slug));
  const project = projectIndex >= 0 ? dbProjects[projectIndex] : await getPortfolioProject(slug, locale);
  if (!project) notFound();
  const nextProject = dbProjects[(Math.max(projectIndex, 0) + 1) % dbProjects.length] ?? project;
  const t = await getDictionary(locale);
  const projectImages = project.images?.length ? project.images : [project.image];
  const detailParagraphs = project.scope.map((item) => item[locale]).filter(Boolean);

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
            </div>
          </header>

          <section className="case-page__body" aria-label={project.title[locale]}>
            <div className="case-page__gallery">
              {projectImages.map((image, index) => (
                <figure className="case-page__media" key={`${image}-${index}`}>
                  <Image
                    src={image}
                    alt={`${project.title[locale]} ${index + 1}`}
                    width={index === 0 ? 1100 : 900}
                    height={index === 0 ? 1400 : 900}
                    sizes={index === 0 ? "(max-width: 900px) 100vw, 34vw" : "(max-width: 900px) 100vw, 28vw"}
                    priority={index === 0}
                    unoptimized
                  />
                </figure>
              ))}
            </div>

            <div className="case-page__details">
              <dl className="case-page__facts" aria-label={t.case.facts}>
                <div>
                  <dt>{t.case.type}</dt>
                  <dd>{project.category[locale]}</dd>
                </div>
                <div>
                  <dt>{t.case.place}</dt>
                  <dd>{project.location}</dd>
                </div>
                <div>
                  <dt>{t.case.year}</dt>
                  <dd>{project.year}</dd>
                </div>
              </dl>

              <div className="case-page__description">
                {detailParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {project.audioUrl ? (
                <div className="case-page__hero-audio">
                  <AudioPlayer src={project.audioUrl} duration={project.duration} labels={{ play: t.common.play, pause: t.common.pause }} />
                </div>
              ) : null}

              <RequestModalButton className="case-page__order" locale={locale} serviceId="guide">
                {t.case.orderAudioGuide}
              </RequestModalButton>
            </div>
          </section>

          <Link className="case-page__next" href={localizePath(locale, nextProject.href)}>
            <span>{t.case.next}</span>
            <strong>{nextProject.title[locale]}</strong>
          </Link>
        </article>
      </Container>
    </main>
  );
}
