import type { Locale } from "./i18n";

type Localized<T> = Record<Locale, T>;

export const coursePageCopy = {
  ru: {
    eyebrow: "Обучение",
    title: "Учимся работать со звуком.",
    intro: "Практические курсы Soundia: запись, голос, саунд-дизайн и музыкальный продакшн.",
    request: "Оставить заявку",
    programs: "Программы",
    headline: "Коротко. Практично. До готового проекта.",
    stats: "3 курса · свидетельство · очный формат",
    details: "Подробнее о курсе +",
    enroll: "Записаться",
    back: "← Все курсы",
    enrollCourse: "Записаться на курс",
    learn: "Вы научитесь",
    audience: "Кому подойдёт",
    result: "Результат"
  },
  lv: {
    eyebrow: "Apmācības",
    title: "Mācāmies strādāt ar skaņu.",
    intro: "Soundia praktiskie kursi: ieraksts, balss, skaņas dizains un mūzikas producēšana.",
    request: "Atstāt pieteikumu",
    programs: "Programmas",
    headline: "Īsi. Praktiski. Līdz gatavam projektam.",
    stats: "3 kursi · apliecība · klātienē",
    details: "Vairāk par kursu +",
    enroll: "Pieteikties",
    back: "← Visi kursi",
    enrollCourse: "Pieteikties kursam",
    learn: "Jūs iemācīsieties",
    audience: "Kam piemērots",
    result: "Rezultāts"
  },
  en: {
    eyebrow: "Training",
    title: "Learn to work with sound.",
    intro: "Practical Soundia courses: recording, voice, sound design and music production.",
    request: "Send a request",
    programs: "Programs",
    headline: "Concise. Practical. Up to a finished project.",
    stats: "3 courses · certificate · in person",
    details: "More about the course +",
    enroll: "Enroll",
    back: "← All courses",
    enrollCourse: "Enroll in course",
    learn: "You will learn",
    audience: "Who it is for",
    result: "Result"
  }
} satisfies Localized<Record<string, string>>;

export const courses = [
  {
    slug: "sound-design",
    title: {
      ru: "Основы звукового дизайна и аудиопостобработки",
      lv: "Skaņas dizaina un audiopēcapstrādes pamati",
      en: "Sound Design and Audio Post-Production Basics"
    },
    meta: {
      ru: "72 часа · очно",
      lv: "72 stundas · klātienē",
      en: "72 hours · in person"
    },
    level: {
      ru: "Начальный уровень",
      lv: "Iesācēju līmenis",
      en: "Beginner level"
    },
    text: {
      ru: "Запись, монтаж, обработка, шумоподавление, полевые записи и сведение.",
      lv: "Ieraksts, montāža, apstrāde, trokšņu tīrīšana, lauka ieraksti un miksēšana.",
      en: "Recording, editing, processing, noise cleanup, field recording and mixing."
    },
    lead: {
      ru: "Научитесь работать со звуком — от записи до готового аудиопроекта.",
      lv: "Iemācieties strādāt ar skaņu — no ieraksta līdz gatavam audioprojektam.",
      en: "Learn to work with sound, from recording to a finished audio project."
    },
    description: {
      ru: "Практический курс для тех, кто хочет освоить запись, монтаж, обработку и сведение звука. Начнём с основ работы в DAW и постепенно перейдём к созданию собственного проекта.",
      lv: "Praktisks kurss tiem, kas vēlas apgūt skaņas ierakstu, montāžu, apstrādi un miksēšanu. Sāksim ar DAW pamatiem un pakāpeniski nonāksim līdz savam projektam.",
      en: "A practical course for anyone who wants to master recording, editing, processing and mixing audio. We start with DAW basics and move toward your own complete project."
    },
    tags: {
      ru: ["DAW", "EQ", "Компрессия", "Мастеринг"],
      lv: ["DAW", "EQ", "Kompresija", "Māsterings"],
      en: ["DAW", "EQ", "Compression", "Mastering"]
    },
    learn: {
      ru: [
        "Записывать и редактировать звук",
        "Работать с EQ, компрессией, реверберацией и эффектами",
        "Очищать аудио от шумов и выполнять полевые записи",
        "Сводить материал и понимать основы мастеринга"
      ],
      lv: [
        "Ierakstīt un rediģēt skaņu",
        "Strādāt ar EQ, kompresiju, reverbu un efektiem",
        "Tīrīt trokšņus un veidot lauka ierakstus",
        "Miksēt materiālu un saprast māsteringa pamatus"
      ],
      en: [
        "Record and edit sound",
        "Use EQ, compression, reverb and effects",
        "Clean noise and make field recordings",
        "Mix material and understand mastering basics"
      ]
    },
    audience: {
      ru: "Начинающим, подкастерам, музыкантам, создателям видео и всем, кто хочет уверенно работать со звуком.",
      lv: "Iesācējiem, podkāstu veidotājiem, mūziķiem, video autoriem un visiem, kas vēlas droši strādāt ar skaņu.",
      en: "For beginners, podcasters, musicians, video creators and anyone who wants to work confidently with sound."
    },
    result: {
      ru: "К концу курса вы самостоятельно создадите законченный аудиопроект и получите свидетельство о прохождении программы.",
      lv: "Kursa beigās jūs patstāvīgi izveidosiet gatavu audioprojektu un saņemsiet apliecību par programmas apguvi.",
      en: "By the end, you will create a finished audio project and receive a certificate of completion."
    }
  },
  {
    slug: "voice-recording",
    title: {
      ru: "Основы записи голоса и аудиопостобработки",
      lv: "Balss ieraksta un audiopēcapstrādes pamati",
      en: "Voice Recording and Audio Post-Production Basics"
    },
    meta: {
      ru: "24 часа · очно",
      lv: "24 stundas · klātienē",
      en: "24 hours · in person"
    },
    level: {
      ru: "Без опыта",
      lv: "Bez priekšzināšanām",
      en: "No experience required"
    },
    text: {
      ru: "Чистая запись речи для подкастов, интервью, voice-over и видео.",
      lv: "Tīrs balss ieraksts podkāstiem, intervijām, voice-over un video saturam.",
      en: "Clean voice recording for podcasts, interviews, voice-over and video."
    },
    lead: {
      ru: "Сделайте так, чтобы голос звучал чисто, понятно и профессионально.",
      lv: "Panāciet, lai balss ierakstā skan tīri, saprotami un profesionāli.",
      en: "Make recorded voice sound clean, clear and professional."
    },
    description: {
      ru: "Короткий практический курс по записи и обработке речи для подкастов, интервью, voice-over, видео и другого цифрового контента.",
      lv: "Īss praktisks kurss par runas ierakstu un apstrādi podkāstiem, intervijām, voice-over, video un citam digitālam saturam.",
      en: "A short practical course on recording and processing speech for podcasts, interviews, voice-over, video and other digital content."
    },
    tags: {
      ru: ["Голос", "Монтаж", "Шум", "Публикация"],
      lv: ["Balss", "Montāža", "Troksnis", "Publicēšana"],
      en: ["Voice", "Editing", "Noise", "Publishing"]
    },
    learn: {
      ru: [
        "Правильно записывать голос",
        "Монтировать речь, ошибки и паузы",
        "Выравнивать громкость и использовать EQ/компрессию",
        "Убирать фоновый шум и готовить аудио к публикации"
      ],
      lv: [
        "Pareizi ierakstīt balsi",
        "Montēt runu, kļūdas un pauzes",
        "Līdzināt skaļumu un izmantot EQ/kompresiju",
        "Tīrīt fona troksni un sagatavot audio publicēšanai"
      ],
      en: [
        "Record voice correctly",
        "Edit speech, mistakes and pauses",
        "Balance loudness and use EQ/compression",
        "Remove background noise and prepare audio for publishing"
      ]
    },
    audience: {
      ru: "Подкастерам, блогерам, авторам видео, дикторам, создателям интервью и всем, кто регулярно работает с речью.",
      lv: "Podkāstu veidotājiem, blogeriem, video autoriem, diktoriem, interviju veidotājiem un visiem, kas regulāri strādā ar runu.",
      en: "For podcasters, bloggers, video creators, voice artists, interview makers and anyone who regularly works with speech."
    },
    result: {
      ru: "В конце курса вы создадите голосовой проект: фрагмент подкаста, интервью или voice-over.",
      lv: "Kursa beigās jūs izveidosiet balss projektu: podkāsta fragmentu, interviju vai voice-over.",
      en: "By the end, you will create a voice project: a podcast segment, interview or voice-over."
    }
  },
  {
    slug: "music-production",
    title: {
      ru: "Аудиопродакшн и постобработка музыки",
      lv: "Audioprodukcija un mūzikas pēcapstrāde",
      en: "Audio Production and Music Post-Production"
    },
    meta: {
      ru: "72 часа · очно",
      lv: "72 stundas · klātienē",
      en: "72 hours · in person"
    },
    level: {
      ru: "Углублённый уровень",
      lv: "Padziļināts līmenis",
      en: "Advanced level"
    },
    text: {
      ru: "Музыка от идеи до финального мастера: MIDI, инструменты, микс и мастеринг.",
      lv: "Mūzika no idejas līdz gala māsteram: MIDI, instrumenti, mikss un māsterings.",
      en: "Music from idea to final master: MIDI, instruments, mix and mastering."
    },
    lead: {
      ru: "Создавайте музыку от идеи до финального мастера.",
      lv: "Veidojiet mūziku no idejas līdz fināla māsteram.",
      en: "Create music from first idea to final master."
    },
    description: {
      ru: "Углублённый практический курс по музыкальному и аудиопродакшну: DAW, MIDI, виртуальные инструменты, композиция, запись, обработка, сведение и мастеринг.",
      lv: "Padziļināts praktisks kurss mūzikas un audioprodukcijā: DAW, MIDI, virtuālie instrumenti, kompozīcija, ieraksts, apstrāde, miksēšana un māsterings.",
      en: "An advanced practical course in music and audio production: DAW, MIDI, virtual instruments, composition, recording, processing, mixing and mastering."
    },
    tags: {
      ru: ["MIDI", "Сведение", "Production", "Master"],
      lv: ["MIDI", "Miksēšana", "Production", "Master"],
      en: ["MIDI", "Mixing", "Production", "Master"]
    },
    learn: {
      ru: [
        "Работать с MIDI и виртуальными инструментами",
        "Создавать композиции и записывать музыку",
        "Строить цепочки эффектов и улучшать микс",
        "Выполнять финальный мастеринг"
      ],
      lv: [
        "Strādāt ar MIDI un virtuālajiem instrumentiem",
        "Veidot kompozīcijas un ierakstīt mūziku",
        "Būvēt efektu ķēdes un uzlabot miksu",
        "Veikt fināla māsteringu"
      ],
      en: [
        "Work with MIDI and virtual instruments",
        "Create compositions and record music",
        "Build effect chains and improve the mix",
        "Do final mastering"
      ]
    },
    audience: {
      ru: "Музыкантам, начинающим продюсерам и специалистам творческих индустрий. Желательно базовое понимание записи и обработки звука.",
      lv: "Mūziķiem, topošajiem producentiem un radošo industriju speciālistiem. Vēlama pamata izpratne par skaņas ierakstu un apstrādi.",
      en: "For musicians, emerging producers and creative industry specialists. Basic understanding of recording and audio processing is recommended."
    },
    result: {
      ru: "Во время курса вы создадите проект полного цикла: от идеи и записи до готового микса и мастера.",
      lv: "Kursa laikā jūs izveidosiet pilna cikla projektu: no idejas un ieraksta līdz gatavam miksam un māsteram.",
      en: "During the course, you will create a full-cycle project: from idea and recording to a finished mix and master."
    }
  }
];

export type Course = (typeof courses)[number];
