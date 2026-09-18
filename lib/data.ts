import type { Locale } from "./i18n";
import { contacts as editableContacts } from "@/lib/site-content";

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

export const contacts = editableContacts;
