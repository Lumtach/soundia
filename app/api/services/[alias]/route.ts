import { getServiceFromDb } from "@/lib/services-db";
import { DbConfigError } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ServiceRouteContext = {
  params: Promise<{ alias: string }>;
};

export async function GET(request: Request, context: ServiceRouteContext) {
  try {
    const { alias } = await context.params;
    const service = await getServiceFromDb(alias, new URL(request.url).searchParams);

    if (!service) {
      return Response.json({ error: "Service not found" }, { status: 404 });
    }

    return Response.json({ data: service });
  } catch (error) {
    console.error("Failed to load service", error);

    if (error instanceof DbConfigError) {
      return Response.json(
        {
          error: "Database is not configured",
          message: error.message
        },
        { status: 500 }
      );
    }

    return Response.json({ error: "Failed to load service" }, { status: 500 });
  }
}
