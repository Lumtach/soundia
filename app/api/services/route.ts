import { getServicesFromDb } from "@/lib/services-db";
import { DbConfigError } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const services = await getServicesFromDb(new URL(request.url).searchParams);

    return Response.json({ data: services });
  } catch (error) {
    console.error("Failed to load services", error);

    if (error instanceof DbConfigError) {
      return Response.json(
        {
          error: "Database is not configured",
          message: error.message
        },
        { status: 500 }
      );
    }

    return Response.json({ error: "Failed to load services" }, { status: 500 });
  }
}
