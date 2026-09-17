import type { Project } from "@/lib/data";

const testAudioUrl =
  "data:audio/wav;base64,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";

export const projects: Project[] = [
  {
    id: "constantinople",
    number: "01",
    title: { ru: "Константинополь", lv: "Konstantinopole", en: "Constantinople" },
    category: {
      ru: "Аудиогид · Istanbul",
      lv: "Audiogids · Istanbul",
      en: "Audio guide · Istanbul"
    },
    summary: {
      ru: "Аудиоистория маршрута в Istanbul: голос, музыка и городской шум собирают пространство вокруг слушателя.",
      lv: "Audio stāsts maršrutam Istanbulā: balss, mūzika un pilsētas troksnis veido telpu ap klausītāju.",
      en: "An audio route in Istanbul where voice, music and city noise shape the space around the listener."
    },
    scope: [
      { ru: "Драматургия маршрута", lv: "Maršruta dramaturģija", en: "Route dramaturgy" },
      { ru: "Голос и монтаж", lv: "Balss un montāža", en: "Voice and editing" },
      { ru: "Звуковая среда", lv: "Skaņas vide", en: "Sound environment" }
    ],
    location: "Istanbul / TR",
    year: "2024",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85",
    audioUrl: testAudioUrl,
    duration: "00:01",
    href: "/constantinople",
    layout: "wide"
  },
  {
    id: "museum-space",
    number: "02",
    title: { ru: "Голос музея", lv: "Muzeja balss", en: "Museum Voice" },
    category: { ru: "Museum · Spatial", lv: "Muzejs · Telpisks", en: "Museum · Spatial" },
    summary: {
      ru: "Звуковой слой для музейного пространства: спокойная навигация, голос и атмосфера экспозиции.",
      lv: "Skaņas slānis muzeja telpai: mierīga navigācija, balss un ekspozīcijas atmosfēra.",
      en: "A sound layer for a museum space: calm navigation, voice and exhibition atmosphere."
    },
    scope: [
      { ru: "Аудионавигация", lv: "Audionavigācija", en: "Audio navigation" },
      { ru: "Пространственный звук", lv: "Telpiska skaņa", en: "Spatial sound" },
      { ru: "Атмосфера экспозиции", lv: "Ekspozīcijas atmosfēra", en: "Exhibition atmosphere" }
    ],
    location: "Riga / LV",
    year: "2023",
    image: "https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?auto=format&fit=crop&w=1200&q=85",
    href: "/museum-space",
    layout: "right"
  },
  {
    id: "promenade",
    number: "03",
    title: { ru: "Город звучит", lv: "Pilsēta skan", en: "The City Speaks" },
    category: { ru: "Променад-спектакль", lv: "Promenādes izrāde", en: "Promenade performance" },
    summary: {
      ru: "Пешеходный звуковой опыт, где город становится сценой, а слушатель движется внутри истории.",
      lv: "Pastaigas skaņas pieredze, kur pilsēta kļūst par skatuvi un klausītājs pārvietojas stāstā.",
      en: "A walking sound experience where the city becomes the stage and the listener moves inside the story."
    },
    scope: [
      { ru: "Сценарий прогулки", lv: "Pastaigas scenārijs", en: "Walking script" },
      { ru: "Полевые звуки", lv: "Lauka skaņas", en: "Field sounds" },
      { ru: "Музыкальная драматургия", lv: "Muzikālā dramaturģija", en: "Musical dramaturgy" }
    ],
    location: "Baltics",
    year: "2024",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1800&q=85",
    href: "/promenade",
    layout: "full"
  },
  {
    id: "interactive-quest",
    number: "04",
    title: { ru: "Маршрут памяти", lv: "Atmiņas maršruts", en: "Memory Route" },
    category: { ru: "Аудиоквест", lv: "Audiokvests", en: "Audio quest" },
    summary: {
      ru: "Интерактивный маршрут с голосом, выбором и звуковыми подсказками, построенный вокруг памяти места.",
      lv: "Interaktīvs maršruts ar balsi, izvēli un skaņas norādēm, kas veidots ap vietas atmiņu.",
      en: "An interactive route with voice, choice and sound cues, built around the memory of a place."
    },
    scope: [
      { ru: "Интерактивная структура", lv: "Interaktīva struktūra", en: "Interactive structure" },
      { ru: "Голосовые сцены", lv: "Balss ainas", en: "Voice scenes" },
      { ru: "Звуковые подсказки", lv: "Skaņas norādes", en: "Sound cues" }
    ],
    location: "EU",
    year: "2022",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85",
    href: "/interactive-quest",
    layout: "split"
  }
];
