import { PrismaClient } from "@prisma/client";

declare global {
  // Untuk mencegah multiple PrismaClient instance saat development
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;