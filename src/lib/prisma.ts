import { PrismaClient } from "generated/prisma/client";
import { env } from "../../env.schema";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? [{ level: "query", emit: "event" }] : [],
  accelerateUrl: env.DATABASE_URL,
});
