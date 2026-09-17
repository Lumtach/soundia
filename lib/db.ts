import mysql from "mysql2/promise";

let pool: mysql.Pool | undefined;

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
    pool = mysql.createPool({
      host: getRequiredEnv("MYSQL_HOST"),
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: getRequiredEnv("MYSQL_USER"),
      password: process.env.MYSQL_PASSWORD ?? "",
      database: getRequiredEnv("MYSQL_DATABASE"),
      connectTimeout: Number(process.env.MYSQL_CONNECT_TIMEOUT ?? 3000),
      waitForConnections: true,
      connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT ?? 10),
      namedPlaceholders: true
    });
  }

  return pool;
}

export async function queryRows<T extends mysql.RowDataPacket>(sql: string, values?: mysql.QueryOptions["values"]) {
  const [rows] = await getDbPool().query<T[]>(sql, values);
  return rows;
}
