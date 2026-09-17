import { getCurrentLocale } from "@/lib/current-locale";
import { PortfolioProjectList } from "@/components/portfolio/PortfolioProjectList";
import { getPortfolioProjects } from "@/lib/portfolio-content";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const locale = await getCurrentLocale();
  const projects = await getPortfolioProjects(locale);

  return (
    <main className="portfolio-page">
      <h1 className="visually-hidden">Portfolio</h1>
      <PortfolioProjectList locale={locale} projects={projects} />
    </main>
  );
}
