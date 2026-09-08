import Image from "next/image";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/lib/data";
import { localizePath, type Locale } from "@/lib/i18n";

export function SelectedWork({
  locale,
  copy,
  common
}: {
  locale: Locale;
  copy: { label: string; headline: string[] };
  common: { viewCase: string; play: string; pause: string };
}) {
  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <Container>
        <div className="work__grid">
          <div className="work__intro">
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="work-title" className="section-title">
              {copy.headline.map((line, index) => (
                <span key={`${line}-${index}`}>{line}</span>
              ))}
            </h2>
          </div>
          <div className="work-index" aria-label={copy.label}>
            {projects.map((project) => (
              <article key={project.id} className={`work-case work-case--${project.layout}`}>
                <a className="work-case__link" href={localizePath(locale, project.href)} aria-label={`${common.viewCase} ${project.title[locale]}`}>
                  <div className="work-case__meta">
                    <span>{project.number}</span>
                    <span>{project.category[locale]}</span>
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="work-case__main">
                    <h3>{project.title[locale]}</h3>
                    <figure className="work-case__image">
                      <Image
                        src={project.image}
                        alt={project.title[locale]}
                        width={1400}
                        height={920}
                        sizes="(max-width: 720px) 100vw, (max-width: 1120px) 44vw, 34vw"
                        unoptimized
                      />
                    </figure>
                  </div>
                  <div className="work-case__foot">
                    <p>{project.summary[locale]}</p>
                    <span>{common.viewCase}</span>
                  </div>
                </a>
                <AudioPlayer src={project.audioUrl} duration={project.duration} labels={{ play: common.play, pause: common.pause }} />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
