import type { Locale } from "./i18n";

type LocalizedText = Record<Locale, string>;

export type PricingCard = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  startingPrice: number;
  price: string;
};

export type AudioGuidePackage = {
  price: number;
  timing: number;
  scenario: number;
  languageId: string;
  sounds: number;
  soundDesign: number;
  music: number;
};

/** Edit public package names and starting prices here. */
export const pricingCards: PricingCard[] = [
  { id: "guide", title: { ru: "Аудиогид", lv: "Audiogids", en: "Audio guide" }, description: { ru: "Сценарий, запись, монтаж и подготовка к запуску.", lv: "Scenārijs, ieraksts, montāža un sagatavošana palaišanai.", en: "Script, recording, editing and launch preparation." }, startingPrice: 800, price: "от €800" },
  { id: "quest", title: { ru: "Аудиоквест", lv: "Audiokvests", en: "Audio quest" }, description: { ru: "Интерактивный маршрут с драматургией и звуковой средой.", lv: "Interaktīvs maršruts ar dramaturģiju un skaņas vidi.", en: "Interactive route with dramaturgy and sound design." }, startingPrice: 990, price: "от €990" },
  { id: "spatial", title: { ru: "3D Audio", lv: "3D Audio", en: "3D Audio" }, description: { ru: "Пространственный звук для иммерсивных культурных проектов.", lv: "Telpiska skaņa imersīviem kultūras projektiem.", en: "Spatial sound for immersive cultural projects." }, startingPrice: 2500, price: "от €2500" },
  { id: "promenade", title: { ru: "Promenade", lv: "Promenade", en: "Promenade" }, description: { ru: "Звуковой спектакль или прогулка для города, музея или события.", lv: "Skaņas izrāde vai pastaiga pilsētai, muzejam vai notikumam.", en: "Sound performance or walk for a city, museum or event." }, startingPrice: 3000, price: "от €3000" }
];

export function getServiceStartingPrice(serviceId?: string) {
  return pricingCards.find((service) => service.id === serviceId)?.startingPrice ?? pricingCards[0].startingPrice;
}

/** Base audio-guide package price by duration. Values are in EUR. */
export const audioGuidePackagesByTiming: Record<number, AudioGuidePackage> = {
  1: { price: 400, timing: 1, scenario: 10, languageId: "20", sounds: 30, soundDesign: 40, music: 50 },
  2: { price: 470, timing: 2, scenario: 10, languageId: "20", sounds: 30, soundDesign: 40, music: 50 },
  3: { price: 540, timing: 3, scenario: 10, languageId: "20", sounds: 30, soundDesign: 40, music: 50 },
  4: { price: 610, timing: 4, scenario: 10, languageId: "20", sounds: 30, soundDesign: 40, music: 50 }
};

/** Add-ons and discounts for an audio-guide slot. Values are in EUR. */
export const audioGuideOptionPrices = [1, 2, 3, 4].flatMap((timingId) => [
  { filterId: 11, timingId, price: 220 },
  { filterId: 12, timingId, price: 90 },
  { filterId: 21, timingId, price: 80 },
  { filterId: 22, timingId, price: 80 },
  { filterId: 31, timingId, price: 120 },
  { filterId: 32, timingId, price: 260 },
  { filterId: 41, timingId, price: -120 },
  { filterId: 51, timingId, price: 140 },
  { filterId: 52, timingId, price: 360 }
]);
