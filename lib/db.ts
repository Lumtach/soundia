import mysql from "mysql2/promise";

let pool: mysql.Pool | undefined;
let hasLoggedPoolConfig = false;
let hasLoggedSuccessfulConnection = false;

export class DbConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DbConfigError";
  }
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new DbConfigError(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getDbPool() {
  if (!pool) {
    const host = getRequiredEnv("MYSQL_HOST");
    const port = Number(process.env.MYSQL_PORT ?? 3306);
    const user = getRequiredEnv("MYSQL_USER");
    const database = getRequiredEnv("MYSQL_DATABASE");

    if (!hasLoggedPoolConfig) {
      console.info("[db] Creating MySQL pool", {
        host,
        port,
        user,
        database,
        hasPassword: typeof process.env.MYSQL_PASSWORD === "string" && process.env.MYSQL_PASSWORD.length > 0
      });
      hasLoggedPoolConfig = true;
    }

    pool = mysql.createPool({
      host,
      port,
      user,
      password: process.env.MYSQL_PASSWORD ?? "",
      database,
      connectTimeout: Number(process.env.MYSQL_CONNECT_TIMEOUT ?? 3000),
      waitForConnections: true,
      connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT ?? 10),
      namedPlaceholders: true
    });
  }

  return pool;
}

export async function queryRows<T extends mysql.RowDataPacket>(sql: string, values?: mysql.QueryOptions["values"]) {
  try {
    const [rows] = await getDbPool().query<T[]>(sql, values);

    if (!hasLoggedSuccessfulConnection) {
      console.info("[db] MySQL query succeeded", {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT ?? 3306),
        database: process.env.MYSQL_DATABASE
      });
      hasLoggedSuccessfulConnection = true;
    }

    return rows;
  } catch (error) {
    console.error("[db] MySQL query failed", {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      code: typeof error === "object" && error && "code" in error ? error.code : undefined,
      errno: typeof error === "object" && error && "errno" in error ? error.errno : undefined,
      syscall: typeof error === "object" && error && "syscall" in error ? error.syscall : undefined,
      address: typeof error === "object" && error && "address" in error ? error.address : undefined,
      portFromError: typeof error === "object" && error && "port" in error ? error.port : undefined,
      message: error instanceof Error ? error.message : String(error)
    });

    throw error;
  }
}
