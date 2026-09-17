import { DbConfigError } from "@/lib/db";
import { getPortfolioItemFromDb } from "@/lib/portfolio-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PortfolioRouteContext = {
  params: Promise<{ alias: string }>;
};

export async function GET(request: Request, context: PortfolioRouteContext) {
  try {
    const { alias } = await context.params;
    const project = await getPortfolioItemFromDb(alias, new URL(request.url).searchParams);

    if (!project) {
      return Response.json({ error: "Portfolio item not found" }, { status: 404 });
    }

    return Response.json({ data: project });
  } catch (error) {
    console.error("Failed to load portfolio item", error);

    if (error instanceof DbConfigError) {
      return Response.json({ error: "Database is not configured", message: error.message }, { status: 500 });
    }

    return Response.json({ error: "Failed to load portfolio item" }, { status: 500 });
  }
}
