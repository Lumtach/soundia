import { projects as staticProjects } from "@/app/portfolio/data";
import type { Project } from "@/lib/data";
import type { Locale } from "@/lib/i18n";
import { getPortfolioFromDb, getPortfolioItemFromDb, type PortfolioApiItem } from "@/lib/portfolio-db";

const portfolioTypeLabels: Record<number, Record<Locale, string>> = {
  1: { ru: "Аудиогид", lv: "Audiogids", en: "Audio guide" },
  2: { ru: "Аудиоквест", lv: "Audiokvests", en: "Audio quest" },
  3: { ru: "Аудиоигра", lv: "Audiospēle", en: "Audio game" },
  4: { ru: "Променад-спектакль", lv: "Promenādes izrāde", en: "Promenade performance" },
  5: { ru: "3D-аудио", lv: "3D audio", en: "3D audio" }
};

function toNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function stripHtml(value: string) {
  return value.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function fallbackProject(index = 0) {
  return staticProjects[index % staticProjects.length] ?? staticProjects[0];
}

function getProjectImage(project: PortfolioApiItem, fallback: Project) {
  return project.images.find((image) => image.main)?.url ?? project.images[0]?.url ?? project.headpicUrl ?? project.picUrl ?? fallback.image;
}

function getProjectImages(project: PortfolioApiItem, fallback: Project) {
  const images = project.images.map((image) => image.url);
  const fallbackImages = fallback.images ?? [fallback.image];
  return images.length ? images : fallbackImages;
}

function getProjectAudio(project: PortfolioApiItem, locale: Locale) {
  return project.audios[locale]?.url ?? project.translations[locale]?.audioUrl ?? undefined;
}

function toProject(project: PortfolioApiItem, locale: Locale, index: number): Project | null {
  const translation = project.translations[locale];
  const fallback = fallbackProject(index);

  if (!translation) {
    return null;
  }

  const title = translation.title.trim();
  const short = stripHtml(translation.short);
  const description = stripHtml(translation.description);
  const audioUrl = getProjectAudio(project, locale);

  if (!title || !description || !audioUrl) {
    return null;
  }

  const category = project.type ? portfolioTypeLabels[project.type] ?? fallback.category : fallback.category;
  const summary = short || description;

  return {
    ...fallback,
    id: project.alias,
    number: toNumber(index),
    title: { ru: title, lv: title, en: title },
    category,
    summary: { ru: summary, lv: summary, en: summary },
    scope: [
      { ru: description, lv: description, en: description }
    ],
    location: fallback.location,
    year: project.createdAt?.slice(0, 4) ?? fallback.year,
    image: getProjectImage(project, fallback),
    images: getProjectImages(project, fallback),
    audioUrl,
    href: `/${project.alias}`,
    layout: fallback.layout
  };
}

export async function getPortfolioProjects(locale: Locale) {
  try {
    const projects = await getPortfolioFromDb(new URLSearchParams({ lang: locale }));
    const mappedProjects = projects
      .filter((project) => project.main)
      .map((project, index) => toProject(project, locale, index))
      .filter((project): project is Project => Boolean(project));

    return mappedProjects;
  } catch (error) {
    console.error("Falling back to static portfolio", error);
    return staticProjects;
  }
}

export async function getPortfolioProject(slug: string, locale: Locale) {
  try {
    const project = await getPortfolioItemFromDb(slug, new URLSearchParams({ lang: locale }));
    const mappedProject = project ? toProject(project, locale, 0) : null;

    if (project) {
      return mappedProject;
    }
  } catch (error) {
    console.error("Falling back to static portfolio project", error);
  }

  return staticProjects.find((project) => project.href.endsWith(slug)) ?? null;
}
