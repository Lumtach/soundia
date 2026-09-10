"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { projects } from "@/lib/data";
import { localizePath, type Locale } from "@/lib/i18n";

export function PortfolioProjectList({ locale }: { locale: Locale }) {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];
  const audioLabels = locale === "ru" ? { play: "Воспроизвести фрагмент", pause: "Пауза" } : locale === "lv" ? { play: "Atskaņot fragmentu", pause: "Pauze" } : { play: "Play preview", pause: "Pause" };
  const orderLabel = locale === "ru" ? "Заказать услугу" : locale === "lv" ? "Pasūtīt pakalpojumu" : "Order a service";

  useEffect(() => {
    const projectRows = document.querySelectorAll<HTMLElement>("[data-portfolio-project]");
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current) {
          setActiveProjectId((current.target as HTMLElement).dataset.portfolioProject ?? projects[0].id);
        }
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-18% 0px -18% 0px" }
    );

    projectRows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-showcase">
      <div className="portfolio-showcase__list" aria-label="Projects">
        <p className="portfolio-showcase__label">{locale === "ru" ? "Все проекты" : locale === "lv" ? "Visi projekti" : "All projects"}</p>
        {projects.map((project) => {
          const isActive = project.id === activeProject.id;

          return (
            <article
              className={`portfolio-showcase__item${isActive ? " is-active" : ""}`}
              key={project.id}
              data-portfolio-project={project.id}
            >
              <span className="portfolio-showcase__number">{project.number}</span>
              <div className="portfolio-showcase__copy">
                <strong>{project.title[locale]}</strong>
                <span>{project.category[locale]}</span>
                <p>{project.summary[locale]}</p>
                <AudioPlayer src={project.audioUrl} duration={project.duration} labels={audioLabels} />
              </div>
              <span className="portfolio-showcase__year">{project.year}</span>
            </article>
          );
        })}
        <div className="portfolio-showcase__cta">
          <Link href={localizePath(locale, "/order")}>{orderLabel} <span>↗</span></Link>
        </div>
      </div>

      <aside className="portfolio-showcase__preview" aria-live="polite">
        <Image
          key={activeProject.id}
          src={activeProject.image}
          alt={activeProject.title[locale]}
          fill
          sizes="(max-width: 620px) 100vw, 42vw"
          unoptimized
        />
        <div className="portfolio-showcase__overlay" />
        <div className="portfolio-showcase__caption">
          <span>{activeProject.category[locale]}</span>
          <strong>{activeProject.location}</strong>
        </div>
      </aside>
    </div>
  );
}
