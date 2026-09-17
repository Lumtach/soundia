import { services as staticServices } from "@/app/services/[slug]/data";
import { getServiceFromDb, getServicesFromDb, type ServiceApiItem } from "@/lib/services-db";
import type { Service } from "@/lib/data";
import type { Locale } from "@/lib/i18n";
import type { ServiceListItem } from "@/components/home/ServicesSection";

const staticServiceByDbAlias = {
  audioguide: "audio-guide",
  audioquest: "audio-quest",
  audiogame: "audio-game",
  "3d_content": "spatial-audio",
  promenade: "promenade-performance"
} as const;

function toNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getStaticService(service: ServiceApiItem, index = 0) {
  const staticId = staticServiceByDbAlias[service.alias as keyof typeof staticServiceByDbAlias];
  return staticServices.find((item) => item.id === staticId) ?? staticServices[index] ?? staticServices[0];
}

function resolveImage(service: ServiceApiItem, fallback: string) {
  const image = service.picUrl ?? service.cardPicUrl;

  if (!image) {
    return fallback;
  }

  return image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/") ? image : fallback;
}

function toServiceListItem(service: ServiceApiItem, locale: Locale, index: number): ServiceListItem | null {
  const translation = service.translations[locale];
  const fallback = getStaticService(service, index);

  if (!translation) {
    return null;
  }

  return {
    id: service.alias,
    number: toNumber(index),
    title: {
      ru: translation.title,
      lv: translation.title,
      en: translation.title
    },
    meta: {
      ru: translation.short,
      lv: translation.short,
      en: translation.short
    },
    image: resolveImage(service, fallback.image),
    href: `/services/${service.alias}`
  };
}

function toServiceDetail(service: ServiceApiItem, locale: Locale): Service | null {
  const translation = service.translations[locale];
  const fallback = getStaticService(service);

  if (!translation) {
    return null;
  }

  const audio = service.audios[locale];
  const title = translation.title;
  const meta = translation.short;
  const description = stripHtml(translation.description);

  return {
    ...fallback,
    id: service.alias,
    title: {
      ru: title,
      lv: title,
      en: title
    },
    meta: {
      ru: meta,
      lv: meta,
      en: meta
    },
    description: {
      ru: description,
      lv: description,
      en: description
    },
    image: resolveImage(service, fallback.image),
    audioLabel: {
      ru: audio?.title || fallback.audioLabel.ru,
      lv: audio?.title || fallback.audioLabel.lv,
      en: audio?.title || fallback.audioLabel.en
    },
    audioUrl: audio?.url,
    href: `/services/${service.alias}`
  };
}

export async function getServiceList(locale: Locale) {
  try {
    const services = await getServicesFromDb(new URLSearchParams({ lang: locale }));
    const mappedServices = services
      .map((service, index) => toServiceListItem(service, locale, index))
      .filter((service): service is ServiceListItem => Boolean(service));

    return mappedServices.length > 0 ? mappedServices : staticServices;
  } catch (error) {
    console.error("Falling back to static services", error);
    return staticServices;
  }
}

export async function getServiceDetail(slug: string, locale: Locale) {
  try {
    const service = await getServiceFromDb(slug, new URLSearchParams({ lang: locale }));
    const mappedService = service ? toServiceDetail(service, locale) : null;

    if (mappedService) {
      return mappedService;
    }
  } catch (error) {
    console.error("Falling back to static service", error);
  }

  return staticServices.find((item) => item.href.endsWith(slug)) ?? null;
}
