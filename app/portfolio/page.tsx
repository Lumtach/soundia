import { getCurrentLocale } from "@/lib/current-locale";
import { PortfolioProjectList } from "@/components/portfolio/PortfolioProjectList";

export default async function PortfolioPage() {
  const locale = await getCurrentLocale();

  return (
    <main className="portfolio-page">
      <h1 className="visually-hidden">Portfolio</h1>
      <PortfolioProjectList locale={locale} />
    </main>
  );
}
