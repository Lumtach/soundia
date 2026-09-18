import type { RowDataPacket } from "mysql2/promise";
import { isLocale, type Locale } from "@/lib/i18n";
import { queryRows } from "@/lib/db";

const langIdByLocale = {
  ru: 1,
  lv: 2,
  en: 3
} satisfies Record<Locale, number>;

const localeByLangId = Object.fromEntries(
  Object.entries(langIdByLocale).map(([locale, langId]) => [langId, locale])
) as Record<number, Locale | undefined>;

type ServiceRow = RowDataPacket & {
  id: number;
  names: string;
  alias: string;
  card_pic: string | null;
  pic: string | null;
  sort: number;
  quest_type: number | null;
  _on: number;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  lang_row_id: number | null;
  lang_title: string | null;
  short: string | null;
  descr: string | null;
  lang_id: number | null;
  audio_id: number | null;
  audio_title: string | null;
  audio: string | null;
  audio_lang_id: number | null;
};

export type ServiceApiTranslation = {
  id: number;
  locale: Locale;
  langId: number;
  title: string;
  short: string;
  description: string;
};

export type ServiceApiAudio = {
  id: number;
  locale: Locale;
  langId: number;
  title: string;
  file: string;
  url: string;
};

export type ServiceApiItem = {
  id: number;
  name: string;
  alias: string;
  cardPic: string | null;
  cardPicUrl: string | null;
  pic: string | null;
  picUrl: string | null;
  sort: number;
  questType: number | null;
  enabled: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  translations: Partial<Record<Locale, ServiceApiTranslation>>;
  audios: Partial<Record<Locale, ServiceApiAudio>>;
};

function toIsoDate(value: Date | string | null) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

function assetUrl(file: string | null, envName: "SERVICE_IMAGE_BASE_URL" | "SERVICE_AUDIO_BASE_URL") {
  if (!file) return null;

  const baseUrl = process.env[envName] ?? "https://soundia.zenith.lv/crm";
  if (!baseUrl) return file;

  return `${baseUrl.replace(/\/$/, "")}/${file.replace(/^\//, "")}`;
}

function getRequestedLocale(searchParams: URLSearchParams) {
  const lang = searchParams.get("lang");
  return lang && isLocale(lang) ? lang : null;
}

function shouldOnlyEnabled(searchParams: URLSearchParams) {
  const active = searchParams.get("active");
  return active !== "0" && active !== "false";
}

function normalizeServices(rows: ServiceRow[], locale?: Locale | null) {
  const services = new Map<number, ServiceApiItem>();

  for (const row of rows) {
    const service =
      services.get(row.id) ??
      ({
        id: row.id,
        name: row.names,
        alias: row.alias,
        cardPic: row.card_pic,
        cardPicUrl: assetUrl(row.card_pic, "SERVICE_IMAGE_BASE_URL"),
        pic: row.pic,
        picUrl: assetUrl(row.pic, "SERVICE_IMAGE_BASE_URL"),
        sort: row.sort,
        questType: row.quest_type,
        enabled: Boolean(row._on),
        createdAt: toIsoDate(row.created_at),
        updatedAt: toIsoDate(row.updated_at),
        translations: {},
        audios: {}
      } satisfies ServiceApiItem);

    if (!services.has(row.id)) {
      services.set(row.id, service);
    }

    const translationLangId = row.lang_id;
    const translationLocale = translationLangId ? localeByLangId[translationLangId] : undefined;
    if (translationLocale && translationLangId && row.lang_row_id) {
      service.translations[translationLocale] = {
        id: row.lang_row_id,
        locale: translationLocale,
        langId: translationLangId,
        title: row.lang_title ?? "",
        short: row.short ?? "",
        description: row.descr ?? ""
      };
    }

    const audioLangId = row.audio_lang_id;
    const audioLocale = audioLangId ? localeByLangId[audioLangId] : undefined;
    if (audioLocale && audioLangId && row.audio_id && row.audio) {
      service.audios[audioLocale] = {
        id: row.audio_id,
        locale: audioLocale,
        langId: audioLangId,
        title: row.audio_title ?? "",
        file: row.audio,
        url: assetUrl(row.audio, "SERVICE_AUDIO_BASE_URL") ?? row.audio
      };
    }
  }

  const data = [...services.values()];

  if (!locale) {
    return data;
  }

  return data.map((service) => ({
    ...service,
    translation: service.translations[locale] ?? null,
    audio: service.audios[locale] ?? null
  }));
}

function buildServiceQuery({ alias, locale, activeOnly }: { alias?: string; locale?: Locale | null; activeOnly: boolean }) {
  const conditions = [];
  const values: Record<string, string | number> = {};

  if (alias) {
    conditions.push("s.alias = :alias");
    values.alias = alias;
  }

  if (locale) {
    conditions.push("sl.lang_id = :langId");
    values.langId = langIdByLocale[locale];
  }

  if (activeOnly) {
    conditions.push("s._on = 1");
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  return {
    sql: `
      SELECT
        s.id,
        s.names,
        s.alias,
        s.card_pic,
        s.pic,
        s.sort,
        s.quest_type,
        s._on,
        s.created_at,
        s.updated_at,
        sl.id AS lang_row_id,
        sl.title AS lang_title,
        sl.short,
        sl.descr,
        sl.lang_id,
        sa.id AS audio_id,
        sa.title AS audio_title,
        sa.audio,
        sa.lang_id AS audio_lang_id
      FROM services s
      LEFT JOIN service_langs sl ON sl.service_id = s.id
      LEFT JOIN service_audios sa ON sa.service_id = s.id AND sa.lang_id = sl.lang_id
      ${where}
      ORDER BY s.sort ASC, s.id ASC, sl.lang_id ASC
    `,
    values
  };
}

export async function getServicesFromDb(searchParams: URLSearchParams) {
  const locale = getRequestedLocale(searchParams);
  const activeOnly = shouldOnlyEnabled(searchParams);
  const { sql, values } = buildServiceQuery({ locale, activeOnly });
  const rows = await queryRows<ServiceRow>(sql, values);

  return normalizeServices(rows, locale);
}

export async function getServiceFromDb(alias: string, searchParams: URLSearchParams) {
  const locale = getRequestedLocale(searchParams);
  const activeOnly = shouldOnlyEnabled(searchParams);
  const { sql, values } = buildServiceQuery({ alias, locale, activeOnly });
  const rows = await queryRows<ServiceRow>(sql, values);
  const [service] = normalizeServices(rows, locale);

  return service ?? null;
}
