import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getCurrentLocale } from "@/lib/current-locale";
import { getDictionary } from "@/lib/i18n";
import "./globals.scss";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);

  return {
    metadataBase: new URL("https://soundia.zenith.lv"),
    title: t.seo.title,
    description: t.seo.description,
    alternates: {
      canonical: "/"
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: "/",
      siteName: "Soundia",
      locale,
      type: "website"
    }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getCurrentLocale();
  const t = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} nav={t.nav} />
        {children}
        <Footer locale={locale} nav={t.nav} footer={t.footer} />
      </body>
    </html>
  );
}
