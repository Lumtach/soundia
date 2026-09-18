import { DbConfigError, queryRows } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type HealthRow = RowDataPacket & {
  ok: number;
};

function getErrorDetails(error: unknown) {
  return {
    name: error instanceof Error ? error.name : "UnknownError",
    message: error instanceof Error ? error.message : String(error),
    code: typeof error === "object" && error && "code" in error ? error.code : undefined,
    errno: typeof error === "object" && error && "errno" in error ? error.errno : undefined
  };
}

export async function GET() {
  const config = {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    hasPassword: typeof process.env.MYSQL_PASSWORD === "string" && process.env.MYSQL_PASSWORD.length > 0
  };

  try {
    const rows = await queryRows<HealthRow>("SELECT 1 AS ok");

    console.info("[db-health] MySQL health check succeeded", config);

    return Response.json({
      ok: true,
      config,
      result: rows[0] ?? null
    });
  } catch (error) {
    const details = getErrorDetails(error);

    console.error("[db-health] MySQL health check failed", {
      ...config,
      error: details
    });

    return Response.json(
      {
        ok: false,
        config,
        error: details,
        hint:
          error instanceof DbConfigError
            ? "Check missing environment variables in Vercel."
            : "If host and credentials are correct, the MySQL server probably blocks remote connections from Vercel."
      },
      { status: 500 }
    );
  }
}
