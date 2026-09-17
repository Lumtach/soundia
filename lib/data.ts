import type { Locale } from "./i18n";

export type LocalizedText = Record<Locale, string>;

export type Project = {
  id: string;
  number: string;
  title: LocalizedText;
  category: LocalizedText;
  summary: LocalizedText;
  scope: LocalizedText[];
  location: string;
  year: string;
  image: string;
  images?: string[];
  audioUrl?: string;
  duration?: string;
  href: string;
  layout: "wide" | "right" | "full" | "split";
};

export type Service = {
  id: string;
  number: string;
  title: LocalizedText;
  meta: LocalizedText;
  description: LocalizedText;
  steps: LocalizedText[];
  image: string;
  audioLabel: LocalizedText;
  orderLabel: LocalizedText;
  audioUrl?: string;
  duration?: string;
  href: string;
};

export type SocialLabel = "Instagram" | "Facebook" | "LinkedIn";

export type SocialLink = {
  label: SocialLabel;
  href: string;
};

export const contacts = {
  email: "info@soundia.studio",
  phone: "+371 29230745",
  messaging: "whatsapp, telegram",
  address: "Eizenšteina 59a, Riga, Latvija",
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/soundia.production"
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/soundia.production"
    }
  ] satisfies SocialLink[]
};
