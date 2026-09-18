import siteContent from "@/lib/content/site-content.json";
import type { Project, Service, SocialLink } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export const editableSiteContent = siteContent;

export const dictionaries = siteContent.dictionaries as Record<Locale, (typeof siteContent.dictionaries)["ru"]>;

export const contacts = siteContent.contacts as {
  email: string;
  phone: string;
  messaging: string;
  address: string;
  socials: SocialLink[];
};

const photoUrlById = new Map(siteContent.photoUrls.map((photo) => [photo.id, photo.url]));
const rawServices = siteContent.services as Service[];
const rawProjects = siteContent.projects as Project[];

function getPhotoUrl(id: string, fallback: string) {
  return photoUrlById.get(id) ?? fallback;
}

export const services = rawServices.map((service) => ({
  ...service,
  image: getPhotoUrl(`service-${service.id}`, service.image)
})) as Service[];

export const projects = rawProjects.map((project) => ({
  ...project,
  image: getPhotoUrl(`project-${project.id}`, project.image),
  images: project.images?.map((image, index) => getPhotoUrl(`project-${project.id}-gallery-${index + 1}`, image))
})) as Project[];

export const media = siteContent.media;

export const photoUrls = siteContent.photoUrls;
