import { PrismaClient } from "@prisma/client"

declare global {
  // Necesario para evitar errores en desarrollo con hot reload
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "production"
    ? ["error"]
    : ["query", "error", "warn"],
})

if (process.env.NODE_ENV !== "production") global.prisma = prisma

export { prisma }
