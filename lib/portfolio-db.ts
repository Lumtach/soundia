import type { RowDataPacket } from "mysql2/promise";
import { queryRows } from "@/lib/db";
import { isLocale, type Locale } from "@/lib/i18n";

const langIdByLocale = {
  ru: 1,
  lv: 2,
  en: 3
} satisfies Record<Locale, number>;

const localeByLangId = Object.fromEntries(
  Object.entries(langIdByLocale).map(([locale, langId]) => [langId, locale])
) as Record<number, Locale | undefined>;

type PortfolioRow = RowDataPacket & {
  id: number;
  names: string;
  alias: string;
  pic: string | null;
  types: number | null;
  headpic: string | null;
  sort: number;
  mains: number;
  _on: number;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  lang_row_id: number | null;
  title: string | null;
  short: string | null;
  descr: string | null;
  lang_audio: string | null;
  lang_id: number | null;
  image_id: number | null;
  image_pic: string | null;
  image_sort: number | null;
  image_active: number | null;
  image_main: number | null;
  audio_id: number | null;
  audio_title: string | null;
  audio: string | null;
  audio_lang_id: number | null;
};

export type PortfolioApiTranslation = {
  id: number;
  locale: Locale;
  langId: number;
  title: string;
  short: string;
  description: string;
  audioFile: string | null;
  audioUrl: string | null;
};

export type PortfolioApiImage = {
  id: number;
  file: string;
  url: string;
  sort: number;
  active: boolean;
  main: boolean;
};

export type PortfolioApiAudio = {
  id: number;
  locale: Locale;
  langId: number;
  title: string;
  file: string;
  url: string;
};

export type PortfolioApiItem = {
  id: number;
  name: string;
  alias: string;
  pic: string | null;
  picUrl: string | null;
  type: number | null;
  headpic: string | null;
  headpicUrl: string | null;
  sort: number;
  main: boolean;
  enabled: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  translations: Partial<Record<Locale, PortfolioApiTranslation>>;
  images: PortfolioApiImage[];
  audios: Partial<Record<Locale, PortfolioApiAudio>>;
};

function toIsoDate(value: Date | string | null) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

function assetUrl(file: string | null, envName: "SERVICE_IMAGE_BASE_URL" | "SERVICE_AUDIO_BASE_URL" | "PORTFOLIO_IMAGE_BASE_URL" | "PORTFOLIO_AUDIO_BASE_URL") {
  if (!file) return null;
  if (file.startsWith("http://") || file.startsWith("https://") || file.startsWith("/")) return file;

  const fallback = "https://soundia.zenith.lv/crm";
  const baseUrl = process.env[envName] ?? fallback;

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

function normalizePortfolio(rows: PortfolioRow[], locale?: Locale | null) {
  const projects = new Map<number, PortfolioApiItem>();
  const seenImages = new Set<string>();

  for (const row of rows) {
    const project =
      projects.get(row.id) ??
      ({
        id: row.id,
        name: row.names,
        alias: row.alias,
        pic: row.pic,
        picUrl: assetUrl(row.pic, "PORTFOLIO_IMAGE_BASE_URL"),
        type: row.types,
        headpic: row.headpic,
        headpicUrl: assetUrl(row.headpic, "PORTFOLIO_IMAGE_BASE_URL"),
        sort: row.sort,
        main: Boolean(row.mains),
        enabled: Boolean(row._on),
        createdAt: toIsoDate(row.created_at),
        updatedAt: toIsoDate(row.updated_at),
        translations: {},
        images: [],
        audios: {}
      } satisfies PortfolioApiItem);

    if (!projects.has(row.id)) {
      projects.set(row.id, project);
    }

    const translationLangId = row.lang_id;
    const translationLocale = translationLangId ? localeByLangId[translationLangId] : undefined;
    if (translationLocale && translationLangId && row.lang_row_id) {
      const langAudioUrl = assetUrl(row.lang_audio, "PORTFOLIO_AUDIO_BASE_URL");
      project.translations[translationLocale] = {
        id: row.lang_row_id,
        locale: translationLocale,
        langId: translationLangId,
        title: row.title ?? "",
        short: row.short ?? "",
        description: row.descr ?? "",
        audioFile: row.lang_audio || null,
        audioUrl: langAudioUrl
      };
    }

    if (row.image_id && row.image_pic) {
      const imageKey = `${row.id}:${row.image_id}`;
      if (!seenImages.has(imageKey)) {
        seenImages.add(imageKey);
        project.images.push({
          id: row.image_id,
          file: row.image_pic,
          url: assetUrl(row.image_pic, "PORTFOLIO_IMAGE_BASE_URL") ?? row.image_pic,
          sort: row.image_sort ?? 0,
          active: Boolean(row.image_active),
          main: Boolean(row.image_main)
        });
      }
    }

    const audioLangId = row.audio_lang_id;
    const audioLocale = audioLangId ? localeByLangId[audioLangId] : undefined;
    if (audioLocale && audioLangId && row.audio_id && row.audio) {
      project.audios[audioLocale] = {
        id: row.audio_id,
        locale: audioLocale,
        langId: audioLangId,
        title: row.audio_title ?? "",
        file: row.audio,
        url: assetUrl(row.audio, "PORTFOLIO_AUDIO_BASE_URL") ?? row.audio
      };
    }
  }

  const data = [...projects.values()].map((project) => ({
    ...project,
    images: project.images.sort((a, b) => Number(b.main) - Number(a.main) || a.sort - b.sort)
  }));

  if (!locale) {
    return data;
  }

  return data
    .map((project) => ({
      ...project,
      translation: project.translations[locale] ?? null,
      audio: project.audios[locale] ?? null
    }))
    .filter((project) => {
      const translation = project.translations[locale];
      const audioUrl = project.audios[locale]?.url ?? translation?.audioUrl;

      return Boolean(translation?.title.trim() && translation.description.trim() && audioUrl);
    });
}

function buildPortfolioQuery({ alias, locale, activeOnly }: { alias?: string; locale?: Locale | null; activeOnly: boolean }) {
  const conditions = [];
  const values: Record<string, string | number> = {};

  if (alias) {
    conditions.push("p.alias = :alias");
    values.alias = alias;
  }

  if (locale) {
    conditions.push("pl.lang_id = :langId");
    values.langId = langIdByLocale[locale];
  }

  if (activeOnly) {
    conditions.push("p._on = 1");
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  return {
    sql: `
      SELECT
        p.id,
        p.names,
        p.alias,
        p.pic,
        p.types,
        p.headpic,
        p.sort,
        p.mains,
        p._on,
        p.created_at,
        p.updated_at,
        pl.id AS lang_row_id,
        pl.title,
        pl.short,
        pl.descr,
        pl.audio AS lang_audio,
        pl.lang_id,
        pi.id AS image_id,
        pi.pic AS image_pic,
        pi.sort AS image_sort,
        pi.active AS image_active,
        pi.main AS image_main,
        pa.id AS audio_id,
        pa.title AS audio_title,
        pa.audio,
        pa.lang_id AS audio_lang_id
      FROM portfolio p
      LEFT JOIN portfolio_langs pl ON pl.portfolio_id = p.id
      LEFT JOIN portfolio_images pi ON pi.portfolio_id = p.id AND pi.active = 1
      LEFT JOIN portfolio_audios pa ON pa.portfolio_id = p.id AND pa.lang_id = pl.lang_id
      ${where}
      ORDER BY p.sort ASC, p.id ASC, pl.lang_id ASC, pi.main DESC, pi.sort ASC
    `,
    values
  };
}

export async function getPortfolioFromDb(searchParams: URLSearchParams) {
  const locale = getRequestedLocale(searchParams);
  const activeOnly = shouldOnlyEnabled(searchParams);
  const { sql, values } = buildPortfolioQuery({ locale, activeOnly });
  const rows = await queryRows<PortfolioRow>(sql, values);
  return normalizePortfolio(rows, locale);
}

export async function getPortfolioItemFromDb(alias: string, searchParams: URLSearchParams) {
  const locale = getRequestedLocale(searchParams);
  const activeOnly = shouldOnlyEnabled(searchParams);
  const { sql, values } = buildPortfolioQuery({ alias, locale, activeOnly });
  const rows = await queryRows<PortfolioRow>(sql, values);
  const [project] = normalizePortfolio(rows, locale);
  return project ?? null;
}
