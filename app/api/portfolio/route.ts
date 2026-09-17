import { DbConfigError } from "@/lib/db";
import { getPortfolioFromDb } from "@/lib/portfolio-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const projects = await getPortfolioFromDb(new URL(request.url).searchParams);

    return Response.json({ data: projects });
  } catch (error) {
    console.error("Failed to load portfolio", error);

    if (error instanceof DbConfigError) {
      return Response.json({ error: "Database is not configured", message: error.message }, { status: 500 });
    }

    return Response.json({ error: "Failed to load portfolio" }, { status: 500 });
  }
}
