import Image from "next/image";
import { getCurrentLocale } from "@/lib/current-locale";
import { type Locale } from "@/lib/i18n";

const copy = {
  ru: {
    eyebrow: "03 / Soundia studio",
    back: "Назад",
    title: "О студии",
    lead:
      "Добро пожаловать в нашу студию!",
    intro:
      "Мы — команда увлеченных профессионалов, специализирующихся на создании уникального аудиосодержания. Наша студия предлагает полный спектр услуг по разработке аудиогидов, квестов, игр и 3D аудио, превращая ваши идеи в захватывающие аудиопроекты. Мы создаем аудио с 2014 года.",
    imageAlt: "Атмосферное музейное пространство для аудиоисторий",
    servicesLabel: "Наши услуги",
    services: [
      {
        title: "Аудиогиды",
        text: "Создаем увлекательные аудиогиды для музеев, выставок, туристических маршрутов и исторических достопримечательностей. Продумываем маршрут, структуру, темп, голос и звуковую атмосферу, чтобы слушатель легко погружался в историю места и запоминал экскурсию как цельный опыт."
      },
      {
        title: "Аудиоквесты",
        text: "Разрабатываем интерактивные аудиоквесты, которые превращают прогулку, выставку или мероприятие в увлекательное приключение. Создаем логику прохождения, задания, подсказки, сцены, звуковые эффекты и профессиональную озвучку, чтобы каждый квест был динамичным и понятным."
      },
      {
        title: "Аудиоигры",
        text: "Создаем аудиоигры, которые увлекают игроков с первых секунд. Прорабатываем сценарий, механику взаимодействия, реплики, реакции, эффекты и музыкальную драматургию, формируя полноценный игровой опыт без необходимости визуального сопровождения."
      },
      {
        title: "3D аудио",
        text: "Специализируемся на разработке 3D аудио контента, который погружает слушателя в объемный звуковой мир. Используем пространственную запись, монтаж и сведение для реалистичных звуковых сцен, которые усиливают восприятие, создают эффект присутствия и работают в наушниках или на площадке."
      },
      {
        title: "Променад-спектакли",
        text: "Проектируем аудиоспектакли для города, парка, музея или отдельного пространства. Соединяем маршрут, драматургию, голоса, музыку и звуки окружения, чтобы слушатель двигался внутри истории и открывал локацию через действие, атмосферу и личное переживание."
      },
      {
        title: "Аудиопроекты под ключ",
        text: "Берем на себя полный цикл производства: исследование темы, сценарий, редактуру, кастинг голосов, запись, режиссуру, саунд-дизайн, монтаж, тестирование и подготовку материалов к публикации. Помогаем подобрать формат под задачу, бюджет и аудиторию проекта."
      }
    ]
  },
  lv: {
    eyebrow: "03 / Soundia studio",
    back: "Atpakaļ",
    title: "Studija",
    lead:
      "Laipni lūdzam mūsu studijā!",
    intro:
      "Mēs esam aizrautīgu profesionāļu komanda, kas specializējas unikāla audio satura radīšanā. Studija piedāvā pilnu pakalpojumu klāstu audiogidu, kvestu, spēļu un 3D audio izstrādei, pārvēršot idejas aizraujošos audio projektos. Mēs veidojam audio kopš 2014. gada.",
    imageAlt: "Atmosfēriska muzeja telpa audio stāstiem",
    servicesLabel: "Mūsu pakalpojumi",
    services: [
      {
        title: "Audiogidi",
        text: "Veidojam aizraujošus audiogidus muzejiem, izstādēm, tūrisma maršrutiem un vēsturiskām vietām. Izstrādājam maršrutu, struktūru, tempu, balsi un skaņas atmosfēru, lai klausītājs viegli iegrimtu vietas stāstā."
      },
      {
        title: "Audiokvesti",
        text: "Izstrādājam interaktīvus audiokvestus, kas pastaigu, izstādi vai pasākumu pārvērš piedzīvojumā. Veidojam norises loģiku, uzdevumus, norādes, ainas, skaņas efektus un profesionālu ierunāšanu."
      },
      {
        title: "Audiospēles",
        text: "Radām audiospēles, kas iesaista no pirmajām sekundēm. Izstrādājam scenāriju, mijiedarbības mehāniku, replikas, reakcijas, efektus un muzikālo dramaturģiju pilnvērtīgai spēles pieredzei bez vizuāla pavadījuma."
      },
      {
        title: "3D audio",
        text: "Veidojam telpisku audio saturu, kas iegremdē klausītāju reālistiskā skaņas vidē. Izmantojam telpisku ierakstu, montāžu un miksēšanu, lai radītu klātbūtnes efektu austiņās vai konkrētā norises vietā."
      },
      {
        title: "Promenādes izrādes",
        text: "Projektējam audio izrādes pilsētai, parkam, muzejam vai atsevišķai telpai. Savienojam maršrutu, dramaturģiju, balsis, mūziku un vides skaņas, lai klausītājs pārvietotos pašā stāstā."
      },
      {
        title: "Audio projekti no idejas līdz palaišanai",
        text: "Uzņemamies pilnu ražošanas ciklu: izpēti, scenāriju, redaktūru, balsu atlasi, ierakstu, režiju, skaņas dizainu, montāžu, testēšanu un materiālu sagatavošanu publicēšanai."
      }
    ]
  },
  en: {
    eyebrow: "03 / Soundia studio",
    back: "Back",
    title: "About studio",
    lead:
      "Welcome to our studio!",
    intro:
      "We are a team of passionate professionals specializing in unique audio content. Our studio offers a full range of services for audio guides, quests, games and 3D audio, turning ideas into engaging audio projects. We have been creating audio since 2014.",
    imageAlt: "Atmospheric museum space for audio stories",
    servicesLabel: "Our services",
    services: [
      {
        title: "Audio guides",
        text: "We create engaging audio guides for museums, exhibitions, tourist routes and historical landmarks. We shape the route, structure, pacing, voice and sonic atmosphere so listeners can enter the story of a place with ease."
      },
      {
        title: "Audio quests",
        text: "We develop interactive audio quests that turn walks, exhibitions and events into vivid adventures. We build the route logic, tasks, cues, scenes, sound effects and professional voiceover so each quest feels clear, active and memorable."
      },
      {
        title: "Audio games",
        text: "We create audio games that engage players from the first seconds. We develop scripts, interaction mechanics, dialogue, reactions, effects and musical dramaturgy for a complete game experience without visual support."
      },
      {
        title: "3D audio",
        text: "We specialize in spatial audio content that immerses listeners in a realistic sound world. We use spatial recording, editing and mixing to create presence for headphones, installations and on-site experiences."
      },
      {
        title: "Promenade performances",
        text: "We design audio performances for cities, parks, museums and specific spaces. We connect route, dramaturgy, voices, music and ambient sound so the listener moves inside the story."
      },
      {
        title: "Full-cycle audio projects",
        text: "We handle the full production cycle: research, script, editing, voice casting, recording, direction, sound design, assembly, testing and launch-ready materials tailored to the project, audience and budget."
      }
    ]
  }
} satisfies Record<Locale, {
  eyebrow: string;
  back: string;
  title: string;
  lead: string;
  intro: string;
  imageAlt: string;
  servicesLabel: string;
  services: { title: string; text: string }[];
}>;

const supportBlock = {
  title: "ALTUM / ES atbalsts",
  paragraphs: [
    <>
      SIA ZENITH 2024.gada 5.aprīlī noslēdza līgumu Nr.17.2-5-L-2024/183 ar Latvijas Investīciju un attīstības aģentūru par atbalsta saņemšanu uzņēmuma digitalizācijas programmā “Latvijas Atveseļošanas un noturības mehānisma plāna 2. komponentes “Digitālā transformācija” 2.2. reformu un investīciju virziena “Uzņēmumu digitālā transformācija un inovācijas” 2.2.1.r. “Uzņēmējdarbības digitālās transformācijas pilna cikla atbalsta izveide ar reģionālo tvērumu” 2.2.1.2.i. investīcijas “Atbalsts procesu digitalizācijai komercdarbībā”. Ar šo informējam arī citus uzņēmumus par iespēju pievienoties{" "}
      <a href="https://www.liaa.gov.lv/lv/programmas/atbalsts-procesu-digitalizacijai" target="_blank" rel="noreferrer">
        programmai
      </a>
      .
    </>,
    <>
      Uzņēmums “ZENITH” ir ieguvis sociālā uzņēmuma statusu un saņēmis ALTUM ES grantu. Projekta mērķis ir radīt un nodrošināt augstas kvalitātes audiogidus un 3D audio saturu muzejiem, pilsētām un spēļu studijām, pievēršot īpašu uzmanību cilvēkiem ar redzes traucējumiem.
    </>
  ]
};

export async function AboutCompanyPage() {
  const locale = await getCurrentLocale();
  const page = copy[locale];

  return (
    <main className="about-company-page">
      <section className="about-company-hero" aria-labelledby="about-company-title">
        <figure className="about-company-hero__image">
          <Image
            src="https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?auto=format&fit=crop&w=1800&q=85"
            alt={page.imageAlt}
            width={1800}
            height={1300}
            sizes="(max-width: 900px) 100vw, 39vw"
            priority
            unoptimized
          />
          <div className="about-company-map" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </figure>

        <div className="about-company-hero__copy">
          <h1 id="about-company-title">{page.title}</h1>
          <p>{page.lead}</p>
          <p className="about-company-intro">{page.intro}</p>

          <div className="about-company-process" aria-label={page.servicesLabel}>
            <span>{page.servicesLabel}</span>
            <ul>
              {page.services.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <em>{item.text}</em>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-company-support" aria-label={supportBlock.title}>
            <Image
              className="about-company-support__photo"
              src="/Project.png"
              alt=""
              width={720}
              height={430}
              sizes="(max-width: 620px) 260px, 260px"
            />
            <div className="about-company-support__text">
              {supportBlock.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
