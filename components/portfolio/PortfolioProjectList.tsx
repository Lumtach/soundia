"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { RequestModalButton } from "@/components/order/RequestModalButton";
import { projects } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export function PortfolioProjectList({ locale }: { locale: Locale }) {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];
  const audioLabels = locale === "ru" ? { play: "Воспроизвести фрагмент", pause: "Пауза" } : locale === "lv" ? { play: "Atskaņot fragmentu", pause: "Pauze" } : { play: "Play preview", pause: "Pause" };
  const orderLabel = locale === "ru" ? "Заказать услугу" : locale === "lv" ? "Pasūtīt pakalpojumu" : "Order a service";
  const getProjectType = (category: string) => category.split("·")[0].trim();
  const fallbackAudioUrl = "https://soundia.zenith.lv/audio/constantinople-preview.mp3";
  const fallbackDuration = "00:38";
  const getPortfolioSummary = (summary: string) =>
    summary
      .replace("маршрута в Istanbul:", "маршрута:")
      .replace("maršrutam Istanbulā:", "maršrutam:")
      .replace("in Istanbul where", "where");

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
        <p className="portfolio-showcase__label">{locale === "ru" ? "Наши проекты" : locale === "lv" ? "Mūsu projekti" : "Our projects"}</p>
        {projects.map((project) => {
          const isActive = project.id === activeProject.id;

          return (
            <article
              className={`portfolio-showcase__item${isActive ? " is-active" : ""}`}
              key={project.id}
              data-portfolio-project={project.id}
            >
              <span className="portfolio-showcase__number"></span>
              <div className="portfolio-showcase__copy">
                <strong>{project.title[locale]}</strong>
                <span>{getProjectType(project.category[locale])}</span>
                <p>{getPortfolioSummary(project.summary[locale])}</p>
                <AudioPlayer src={project.audioUrl ?? fallbackAudioUrl} duration={project.duration ?? fallbackDuration} labels={audioLabels} />
              </div>
              {/* <span className="portfolio-showcase__year">{project.year}</span> */}
            </article>
          );
        })}
        <div className="portfolio-showcase__cta">
          <RequestModalButton locale={locale} serviceId="service">{orderLabel} <span>↗</span></RequestModalButton>
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
      </aside>
    </div>
  );
}
