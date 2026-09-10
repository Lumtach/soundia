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
    audioUrl: "https://soundia.zenith.lv/audio/constantinople-preview.mp3",
    duration: "00:38",
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
    audioUrl: "https://soundia.zenith.lv/audio/city-preview.mp3",
    duration: "00:42",
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

export const services: Service[] = [
  {
    id: "audio-guide",
    number: "01",
    title: { ru: "Аудиогид", lv: "Audiogids", en: "Audio guide" },
    meta: { ru: "Museums / Galleries / Spaces", lv: "Muzeji / Galerijas / Telpas", en: "Museums / Galleries / Spaces" },
    description: {
      ru: "Аудиогид помогает посетителю спокойно пройти маршрут и услышать историю места в нужном темпе. Мы собираем структуру, пишем или редактируем текст, записываем голос, добавляем музыку и звуковую среду, а затем готовим материалы к публикации.",
      lv: "Audiogids palīdz apmeklētājam mierīgi iziet maršrutu un dzirdēt vietas stāstu pareizā tempā. Mēs veidojam struktūru, rakstām vai rediģējam tekstu, ierakstām balsi, pievienojam mūziku un skaņas vidi, pēc tam sagatavojam materiālus publicēšanai.",
      en: "An audio guide helps visitors move through a route at a calm pace and hear the place as a complete story. We shape the structure, write or edit the text, record voices, add music and atmosphere, then prepare the materials for publication."
    },
    steps: [
      { ru: "Идея аудиогида и маршрут", lv: "Audiogida ideja un maršruts", en: "Audio guide idea and route" },
      { ru: "Разработка сценария", lv: "Scenārija izstrāde", en: "Script development" },
      { ru: "Подбор голоса и запись", lv: "Balss atlase un ieraksts", en: "Voice casting and recording" },
      { ru: "Музыкальное сопровождение и звуковая среда", lv: "Mūzika un skaņas vide", en: "Music and sound environment" },
      { ru: "Монтаж, тестирование и публикация", lv: "Montāža, testēšana un publicēšana", en: "Editing, testing and publication" }
    ],
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1400&q=85",
    audioLabel: { ru: "Трейлер аудиогида", lv: "Audiogida treileris", en: "Audio guide trailer" },
    orderLabel: { ru: "Заказать аудиогид", lv: "Pasūtīt audiogidu", en: "Order audio guide" },
    audioUrl: "https://soundia.zenith.lv/audio/constantinople-preview.mp3",
    duration: "00:38",
    href: "/services/audio-guide"
  },
  {
    id: "audio-quest",
    number: "02",
    title: { ru: "Аудиоквест", lv: "Audiokvests", en: "Audio quest" },
    meta: { ru: "Interactive storytelling", lv: "Interaktīvs stāstījums", en: "Interactive storytelling" },
    description: {
      ru: "Аудиоквест соединяет маршрут, задания, выбор и звук. Мы продумываем логику прохождения, пишем сцены и подсказки, создаем звуковые переходы и собираем историю так, чтобы участник двигался внутри нее, а не просто слушал текст.",
      lv: "Audiokvests savieno maršrutu, uzdevumus, izvēli un skaņu. Mēs izstrādājam norises loģiku, rakstām ainas un norādes, veidojam skaņas pārejas un saliekam stāstu tā, lai dalībnieks tajā pārvietotos, nevis tikai klausītos tekstu.",
      en: "An audio quest combines route, tasks, choices and sound. We design the logic, write scenes and cues, create sound transitions and build the story so the participant moves inside it instead of only listening."
    },
    steps: [
      { ru: "Идея игры и маршрут", lv: "Spēles ideja un maršruts", en: "Game idea and route" },
      { ru: "Сценарные задания", lv: "Scenārija uzdevumi", en: "Scenario tasks" },
      { ru: "Голоса, музыка и звуковые эффекты", lv: "Balsis, mūzika un skaņas efekti", en: "Voices, music and sound effects" },
      { ru: "Сборка интерактивной структуры", lv: "Interaktīvās struktūras montāža", en: "Interactive structure assembly" },
      { ru: "Тестирование и запуск", lv: "Testēšana un palaišana", en: "Testing and launch" }
    ],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
    audioLabel: { ru: "Фрагмент аудиоквеста", lv: "Audiokvesta fragments", en: "Audio quest fragment" },
    orderLabel: { ru: "Заказать аудиоквест", lv: "Pasūtīt audiokvestu", en: "Order audio quest" },
    audioUrl: "https://soundia.zenith.lv/audio/city-preview.mp3",
    duration: "00:42",
    href: "/services/audio-quest"
  },
  {
    id: "spatial-audio",
    number: "03",
    title: { ru: "3D-аудио", lv: "3D audio", en: "3D audio" },
    meta: { ru: "Spatial immersive experience", lv: "Telpiska pieredze", en: "Spatial immersive experience" },
    description: {
      ru: "3D-аудио создает ощущение присутствия: звук движется вокруг слушателя, раскрывает сцену и помогает поверить в пространство. Такой формат подходит для иммерсивных спектаклей, выставок, VR и интерактивных проектов.",
      lv: "3D audio rada klātbūtnes sajūtu: skaņa pārvietojas ap klausītāju, atver ainu un palīdz noticēt telpai. Šis formāts der imersīvām izrādēm, izstādēm, VR un interaktīviem projektiem.",
      en: "3D audio creates presence: sound moves around the listener, opens the scene and makes the space believable. It works for immersive performances, exhibitions, VR and interactive projects."
    },
    steps: [
      { ru: "Техническое задание и формат прослушивания", lv: "Tehniskais uzdevums un klausīšanās formāts", en: "Brief and listening format" },
      { ru: "Звуковая карта пространства", lv: "Telpas skaņas karte", en: "Sound map of the space" },
      { ru: "Запись и обработка звуков", lv: "Skaņu ieraksts un apstrāde", en: "Sound recording and processing" },
      { ru: "3D-сборка и сведение", lv: "3D montāža un miksēšana", en: "3D assembly and mix" },
      { ru: "Тестирование на площадке или в наушниках", lv: "Testēšana telpā vai austiņās", en: "Testing on site or in headphones" }
    ],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1400&q=85",
    audioLabel: { ru: "3D-звук", lv: "3D skaņa", en: "3D sound" },
    orderLabel: { ru: "Заказать 3D-аудио", lv: "Pasūtīt 3D audio", en: "Order 3D audio" },
    audioUrl: "https://soundia.zenith.lv/audio/city-preview.mp3",
    duration: "00:42",
    href: "/services/spatial-audio"
  },
  {
    id: "audio-game",
    number: "04",
    title: { ru: "Аудиоигра", lv: "Audiospēle", en: "Audio game" },
    meta: { ru: "Sound-led interaction", lv: "Skaņas vadīta mijiedarbība", en: "Sound-led interaction" },
    description: {
      ru: "Для игры звук должен работать как часть механики: подсказывать, реагировать, создавать ритм и атмосферу. Мы готовим сценарий аудиосцен, записываем реплики, собираем эффекты и передаем материалы в удобном для разработки формате.",
      lv: "Spēlē skaņai jāstrādā kā mehānikas daļai: jāpalīdz, jāreaģē, jāveido ritms un atmosfēra. Mēs gatavojam audio ainu scenāriju, ierakstām replikas, veidojam efektus un nododam materiālus izstrādei ērtā formātā.",
      en: "In a game, sound needs to act as part of the mechanics: guiding, reacting, setting rhythm and atmosphere. We prepare audio scene scripts, record lines, build effects and deliver assets in a development-ready format."
    },
    steps: [
      { ru: "Звуковая логика игры", lv: "Spēles skaņas loģika", en: "Game sound logic" },
      { ru: "Сценарий реплик и событий", lv: "Repliku un notikumu scenārijs", en: "Dialogue and event script" },
      { ru: "Подбор голосов и запись", lv: "Balsu atlase un ieraksts", en: "Voice casting and recording" },
      { ru: "Эффекты, музыка и монтаж", lv: "Efekti, mūzika un montāža", en: "Effects, music and editing" },
      { ru: "Передача аудиопакета команде", lv: "Audio pakotnes nodošana komandai", en: "Audio package handoff" }
    ],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=85",
    audioLabel: { ru: "Фрагмент игры", lv: "Spēles fragments", en: "Game fragment" },
    orderLabel: { ru: "Заказать аудиоигру", lv: "Pasūtīt audiospēli", en: "Order audio game" },
    audioUrl: "https://soundia.zenith.lv/audio/constantinople-preview.mp3",
    duration: "00:38",
    href: "/services/audio-game"
  },
  {
    id: "promenade-performance",
    number: "05",
    title: { ru: "Променад-спектакль", lv: "Promenādes izrāde", en: "Promenade performance" },
    meta: { ru: "City / route / voice", lv: "Pilsēta / maršruts / balss", en: "City / route / voice" },
    description: {
      ru: "Променад-спектакль превращает город или пространство в сцену. Слушатель идет по маршруту, слышит голоса, музыку и окружающие звуки, а история раскрывается через движение и конкретные точки.",
      lv: "Promenādes izrāde pārvērš pilsētu vai telpu par skatuvi. Klausītājs iet pa maršrutu, dzird balsis, mūziku un vides skaņas, bet stāsts atklājas caur kustību un konkrētiem punktiem.",
      en: "A promenade performance turns a city or space into a stage. The listener walks the route, hears voices, music and ambient sound, and the story unfolds through movement and specific locations."
    },
    steps: [
      { ru: "Идея спектакля и маршрут", lv: "Izrādes ideja un maršruts", en: "Performance idea and route" },
      { ru: "Сценарий прогулки", lv: "Pastaigas scenārijs", en: "Walking script" },
      { ru: "Голоса, музыка и фонограммы", lv: "Balsis, mūzika un fonogrammas", en: "Voices, music and backing tracks" },
      { ru: "Сборка сцен по точкам маршрута", lv: "Ainu montāža pa maršruta punktiem", en: "Scene assembly by route points" },
      { ru: "Тестирование маршрута и запуск", lv: "Maršruta testēšana un palaišana", en: "Route testing and launch" }
    ],
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=85",
    audioLabel: { ru: "Фрагмент променад-спектакля", lv: "Promenādes izrādes fragments", en: "Promenade fragment" },
    orderLabel: { ru: "Заказать променад-спектакль", lv: "Pasūtīt promenādes izrādi", en: "Order promenade performance" },
    audioUrl: "https://soundia.zenith.lv/audio/city-preview.mp3",
    duration: "00:42",
    href: "/services/promenade-performance"
  }
];

export const contacts = {
  email: "info@soundia.lv",
  phone: "+371 29 000 000",
  messaging: "WhatsApp / Telegram",
  address: "Riga, Latvia",
  socials: ["Instagram", "Facebook", "LinkedIn"]
};
