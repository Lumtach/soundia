"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Slot = {
  id: number;
  title: string;
  timing: number;
  scenario: number;
  langs: number[];
  sound: number;
  soundDesign: number;
  music: number;
};

type FilterPrice = { filterId: number; timingId: number; price: number };

type Package = {
  price: number;
  timing: number;
  scenario: number;
  languageId: string;
  sounds: number;
  soundDesign: number;
  music: number;
};

type OrderInput = {
  timing: number;
  scenario: number;
  langs: number[];
  sound: number;
  soundDesign: number;
  music: number;
};

type Option = {
  id: number;
  labels: Record<Locale, string>;
};

const copy = {
  ru: {
    title: "Форма заказа",
    intro: "Настройте каждый слот аудиогида отдельно. Стоимость пересчитывается автоматически.",
    addSlot: "Добавить слот",
    removeSlot: "Удалить",
    slot: "Слот",
    slotName: "Название слота",
    duration: "Длительность",
    script: "Сценарий",
    language: "Язык",
    voices: "Озвучивание",
    soundDesign: "Саунд-дизайн",
    music: "Музыка",
    summary: "Стоимость",
    total: "Итого",
    submit: "Оформить заявку",
    modalTitle: "Заявка на аудиогид",
    modalIntro: "Оставьте контакты, и мы свяжемся с вами по выбранной конфигурации.",
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    comment: "Комментарий",
    close: "Закрыть",
    send: "Отправить заявку",
    included: "включено",
    yes: "Нужен",
    no: "Не нужен",
    durationOptions: ["5 мин.", "10 мин.", "15 мин.", "20 мин."],
    scriptOptions: ["Текст готов", "Нужен сценарий", "Нужна редактура"],
    languageOptions: ["RU", "LV", "EN"],
    voiceOptions: ["1 голос", "2 голоса", "Несколько голосов"],
    musicOptions: ["Без музыки", "Лицензированная", "Авторская"]
  },
  lv: {
    title: "Pasūtījuma forma",
    intro: "Pielāgojiet katru audiogida slotu atsevišķi. Cena tiek pārrēķināta automātiski.",
    addSlot: "Pievienot slotu",
    removeSlot: "Dzēst",
    slot: "Slots",
    slotName: "Slota nosaukums",
    duration: "Ilgums",
    script: "Scenārijs",
    language: "Valoda",
    voices: "Ierunāšana",
    soundDesign: "Skaņas dizains",
    music: "Mūzika",
    summary: "Cena",
    total: "Kopā",
    submit: "Nosūtīt pieprasījumu",
    modalTitle: "Audiogida pieprasījums",
    modalIntro: "Atstājiet kontaktus, un mēs sazināsimies par izvēlēto konfigurāciju.",
    name: "Vārds",
    email: "Email",
    phone: "Telefons",
    comment: "Komentārs",
    close: "Aizvērt",
    send: "Nosūtīt pieprasījumu",
    included: "iekļauts",
    yes: "Vajadzīgs",
    no: "Nav vajadzīgs",
    durationOptions: ["5 min.", "10 min.", "15 min.", "20 min."],
    scriptOptions: ["Teksts gatavs", "Vajag scenāriju", "Vajag redakciju"],
    languageOptions: ["RU", "LV", "EN"],
    voiceOptions: ["1 balss", "2 balsis", "Vairākas balsis"],
    musicOptions: ["Bez mūzikas", "Licencēta", "Autormūzika"]
  },
  en: {
    title: "Order Form",
    intro: "Configure every audio-guide slot separately. The estimate updates automatically.",
    addSlot: "Add slot",
    removeSlot: "Remove",
    slot: "Slot",
    slotName: "Slot name",
    duration: "Duration",
    script: "Script",
    language: "Language",
    voices: "Voiceover",
    soundDesign: "Sound design",
    music: "Music",
    summary: "Estimate",
    total: "Total",
    submit: "Send request",
    modalTitle: "Audio guide request",
    modalIntro: "Leave your contacts and we will follow up on the selected configuration.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    comment: "Comment",
    close: "Close",
    send: "Send request",
    included: "included",
    yes: "Needed",
    no: "Not needed",
    durationOptions: ["5 min.", "10 min.", "15 min.", "20 min."],
    scriptOptions: ["Text ready", "Need script", "Need editing"],
    languageOptions: ["RU", "LV", "EN"],
    voiceOptions: ["1 voice", "2 voices", "Several voices"],
    musicOptions: ["No music", "Licensed", "Original"]
  }
} satisfies Record<Locale, Record<string, string | string[]>>;

const timingOptions = [
  { id: 1, labels: { ru: "5 мин.", lv: "5 min.", en: "5 min." } },
  { id: 2, labels: { ru: "10 мин.", lv: "10 min.", en: "10 min." } },
  { id: 3, labels: { ru: "15 мин.", lv: "15 min.", en: "15 min." } },
  { id: 4, labels: { ru: "20 мин.", lv: "20 min.", en: "20 min." } }
] satisfies Option[];

const scenarioOptions = [
  { id: 10, labels: { ru: "Текст готов", lv: "Teksts gatavs", en: "Text ready" } },
  { id: 11, labels: { ru: "Нужен сценарий", lv: "Vajag scenāriju", en: "Need script" } },
  { id: 12, labels: { ru: "Нужна редактура", lv: "Vajag redakciju", en: "Need editing" } }
] satisfies Option[];

const languageOptions = [
  { id: 20, labels: { ru: "RU", lv: "RU", en: "RU" } },
  { id: 21, labels: { ru: "LV", lv: "LV", en: "LV" } },
  { id: 22, labels: { ru: "EN", lv: "EN", en: "EN" } }
] satisfies Option[];

const soundOptions = [
  { id: 30, labels: { ru: "1 голос", lv: "1 balss", en: "1 voice" } },
  { id: 31, labels: { ru: "2 голоса", lv: "2 balsis", en: "2 voices" } },
  { id: 32, labels: { ru: "Несколько голосов", lv: "Vairākas balsis", en: "Several voices" } }
] satisfies Option[];

const soundDesignOptions = [
  { id: 40, labels: { ru: "Нужен", lv: "Vajadzīgs", en: "Needed" } },
  { id: 41, labels: { ru: "Не нужен", lv: "Nav vajadzīgs", en: "Not needed" } }
] satisfies Option[];

const musicOptions = [
  { id: 50, labels: { ru: "Без музыки", lv: "Bez mūzikas", en: "No music" } },
  { id: 51, labels: { ru: "Лицензированная", lv: "Licencēta", en: "Licensed" } },
  { id: 52, labels: { ru: "Авторская", lv: "Autormūzika", en: "Original" } }
] satisfies Option[];

const packagesByTiming: Record<number, Package> = {
  1: { price: 400, timing: 1, scenario: 10, languageId: "20", sounds: 30, soundDesign: 40, music: 50 },
  2: { price: 470, timing: 2, scenario: 10, languageId: "20", sounds: 30, soundDesign: 40, music: 50 },
  3: { price: 540, timing: 3, scenario: 10, languageId: "20", sounds: 30, soundDesign: 40, music: 50 },
  4: { price: 610, timing: 4, scenario: 10, languageId: "20", sounds: 30, soundDesign: 40, music: 50 }
};

const filterPrices: FilterPrice[] = [1, 2, 3, 4].flatMap((timingId) => [
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

function priceParam(tariffs: FilterPrice[], filterIds: number[], timingId: number): number {
  return tariffs
    .filter((fp) => filterIds.includes(fp.filterId) && fp.timingId === timingId)
    .reduce((sum, fp) => sum + fp.price, 0);
}

function calcOrderPrice(pkg: Package, input: OrderInput, tariffs: FilterPrice[]): number {
  let price = 0;
  const timing = input.timing;

  if (input.scenario > 0 && pkg.scenario !== input.scenario) {
    price += priceParam(tariffs, [input.scenario], timing);
  }

  if (input.langs?.length) {
    const packageLangs = pkg.languageId ? pkg.languageId.split(";").map(Number) : [];
    const newLangs = input.langs.filter((id) => !packageLangs.includes(id));

    if (newLangs.length) {
      price += priceParam(tariffs, newLangs, timing);
    }
  }

  if (input.sound > 0 && pkg.sounds !== input.sound) {
    price += priceParam(tariffs, [input.sound], timing);
  }

  if (input.soundDesign > 0 && pkg.soundDesign !== input.soundDesign) {
    price += priceParam(tariffs, [input.soundDesign], timing);
  }

  if (input.music > 0 && pkg.music !== input.music) {
    price += priceParam(tariffs, [input.music], timing);
  }

  return price;
}

function calcTotalPrice(pkg: Package, input: OrderInput, tariffs: FilterPrice[]): number {
  return pkg.price + calcOrderPrice(pkg, input, tariffs);
}

function getLabel(options: readonly Option[], id: number, locale: Locale) {
  return options.find((option) => option.id === id)?.labels[locale] ?? "";
}

function createSlot(locale: Locale, id: number): Slot {
  const t = copy[locale];

  return {
    id,
    title: `${t.slot} ${id}`,
    timing: 2,
    scenario: 10,
    langs: [20],
    sound: 30,
    soundDesign: 40,
    music: 50
  };
}

function getPrice(slot: Slot) {
  const pkg = packagesByTiming[slot.timing] ?? packagesByTiming[2];

  return calcTotalPrice(pkg, slot, filterPrices);
}

function describeSlot(slot: Slot, locale: Locale) {
  return {
    timing: getLabel(timingOptions, slot.timing, locale),
    scenario: getLabel(scenarioOptions, slot.scenario, locale),
    langs: slot.langs.map((id) => getLabel(languageOptions, id, locale)).filter(Boolean).join(", "),
    sound: getLabel(soundOptions, slot.sound, locale),
    soundDesign: getLabel(soundDesignOptions, slot.soundDesign, locale),
    music: getLabel(musicOptions, slot.music, locale)
  };
}

export function AudioGuideOrderForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [slots, setSlots] = useState<Slot[]>(() => [createSlot(locale, 1)]);
  const [modalOpen, setModalOpen] = useState(false);
  const total = useMemo(() => slots.reduce((sum, slot) => sum + getPrice(slot), 0), [slots]);

  const updateSlot = <K extends keyof Slot>(id: number, key: K, value: Slot[K]) => {
    setSlots((items) => items.map((slot) => (slot.id === id ? { ...slot, [key]: value } : slot)));
  };

  const addSlot = () => {
    setSlots((items) => [...items, createSlot(locale, Math.max(...items.map((item) => item.id)) + 1)]);
  };

  const removeSlot = (id: number) => {
    setSlots((items) => (items.length === 1 ? items : items.filter((slot) => slot.id !== id)));
  };

  const requestBody = slots
    .map((slot, index) => {
      const item = describeSlot(slot, locale);

      return `${index + 1}. ${slot.title}: ${getPrice(slot)} €\n${t.duration}: ${item.timing}\n${t.script}: ${item.scenario}\n${t.language}: ${item.langs}\n${t.voices}: ${item.sound}\n${t.soundDesign}: ${item.soundDesign}\n${t.music}: ${item.music}`;
    })
    .join("\n\n");

  return (
    <section className="order-form" id="order" aria-labelledby="order-title">
      <div className="order-form__top">
        <div>
          <p className="section-label">{t.title}</p>
          <h2 id="order-title">{t.title}</h2>
        </div>
        <p>{t.intro}</p>
      </div>

      <div className="order-form__layout">
        <div className="order-form__slots">
          {slots.map((slot, index) => (
            <OrderSlot
              key={slot.id}
              index={index}
              locale={locale}
              slot={slot}
              slotsCount={slots.length}
              t={t}
              onRemove={removeSlot}
              onUpdate={updateSlot}
            />
          ))}
          <button className="order-form__add" type="button" onClick={addSlot}>
            {t.addSlot}
          </button>
        </div>

        <aside className="order-summary" aria-label={t.summary as string}>
          <p>{t.summary}</p>
          {slots.map((slot, index) => {
            const item = describeSlot(slot, locale);

            return (
              <article className="order-summary__slot" key={slot.id}>
                <header>
                  <span>
                    {index + 1}. {slot.title}
                  </span>
                  <strong>{getPrice(slot)} €</strong>
                </header>
                <ul>
                  <li>{item.timing}</li>
                  <li>{item.scenario}</li>
                  <li>{item.langs}</li>
                  <li>{item.sound}</li>
                  <li>{item.soundDesign}</li>
                  <li>{item.music}</li>
                </ul>
              </article>
            );
          })}
          <footer>
            <span>{t.total}</span>
            <strong>{total} €</strong>
          </footer>
          <button type="button" onClick={() => setModalOpen(true)}>
            {t.submit}
          </button>
        </aside>
      </div>

      {modalOpen ? (
        <div className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-modal-title">
          <div className="order-modal__panel">
            <button className="order-modal__close" type="button" onClick={() => setModalOpen(false)} aria-label={t.close as string}>
              ×
            </button>
            <div>
              <p className="section-label">{t.submit}</p>
              <h2 id="order-modal-title">{t.modalTitle}</h2>
              <p>{t.modalIntro}</p>
            </div>
            <div className="order-modal__selected">
              {slots.map((slot, index) => (
                <ModalSlot key={slot.id} index={index} locale={locale} slot={slot} />
              ))}
            </div>
            <form className="order-modal__form" action={`mailto:info@soundia.lv?subject=${encodeURIComponent(String(t.modalTitle))}&body=${encodeURIComponent(requestBody)}`} method="post" encType="text/plain">
              <label>
                <span>{t.name}</span>
                <input name="name" required />
              </label>
              <label>
                <span>{t.email}</span>
                <input name="email" type="email" required />
              </label>
              <label>
                <span>{t.phone}</span>
                <input name="phone" type="tel" />
              </label>
              <label>
                <span>{t.comment}</span>
                <textarea name="comment" rows={4} />
              </label>
              <button type="submit">{t.send}</button>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function OrderSlot({
  index,
  locale,
  slot,
  slotsCount,
  t,
  onRemove,
  onUpdate
}: {
  index: number;
  locale: Locale;
  slot: Slot;
  slotsCount: number;
  t: (typeof copy)[Locale];
  onRemove: (id: number) => void;
  onUpdate: <K extends keyof Slot>(id: number, key: K, value: Slot[K]) => void;
}) {
  const setLang = (langId: number, checked: boolean) => {
    const nextLangs = checked ? [...slot.langs, langId] : slot.langs.filter((id) => id !== langId);

    onUpdate(slot.id, "langs", nextLangs.length ? nextLangs : [langId]);
  };

  return (
    <fieldset className="order-slot">
      <legend>
        {t.slot} {index + 1}
      </legend>
      <div className="order-slot__head">
        <label>
          <span>{t.slotName}</span>
          <input value={slot.title} onChange={(event) => onUpdate(slot.id, "title", event.target.value)} />
        </label>
        <strong>{getPrice(slot)} €</strong>
      </div>

      <div className="order-slot__grid">
        <Select label={t.duration as string} locale={locale} value={slot.timing} options={timingOptions} onChange={(value) => onUpdate(slot.id, "timing", value)} />
        <Select label={t.script as string} locale={locale} value={slot.scenario} options={scenarioOptions} onChange={(value) => onUpdate(slot.id, "scenario", value)} />
        <fieldset className="order-slot__languages">
          <legend>{t.language}</legend>
          {languageOptions.map((option) => (
            <label key={option.id}>
              <input type="checkbox" checked={slot.langs.includes(option.id)} onChange={(event) => setLang(option.id, event.target.checked)} />
              <span>{option.labels[locale]}</span>
            </label>
          ))}
        </fieldset>
        <Select label={t.voices as string} locale={locale} value={slot.sound} options={soundOptions} onChange={(value) => onUpdate(slot.id, "sound", value)} />
        <Select label={t.soundDesign as string} locale={locale} value={slot.soundDesign} options={soundDesignOptions} onChange={(value) => onUpdate(slot.id, "soundDesign", value)} />
        <Select label={t.music as string} locale={locale} value={slot.music} options={musicOptions} onChange={(value) => onUpdate(slot.id, "music", value)} />
      </div>

      <button className="order-slot__remove" type="button" onClick={() => onRemove(slot.id)} disabled={slotsCount === 1}>
        {t.removeSlot}
      </button>
    </fieldset>
  );
}

function ModalSlot({ index, locale, slot }: { index: number; locale: Locale; slot: Slot }) {
  const item = describeSlot(slot, locale);

  return (
    <article>
      <strong>
        {index + 1}. {slot.title} · {getPrice(slot)} €
      </strong>
      <span>
        {item.timing} · {item.scenario} · {item.langs} · {item.sound} · {item.soundDesign} · {item.music}
      </span>
    </article>
  );
}

function Select({
  label,
  locale,
  value,
  options,
  onChange
}: {
  label: string;
  locale: Locale;
  value: number;
  options: readonly Option[];
  onChange: (value: number) => void;
}) {
  return (
    <label>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.labels[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
