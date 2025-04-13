// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/prisma/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" })
  }

  try {
    const users = await prisma.user.findMany()
    return res.status(200).json(users)
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    return res.status(500).json({ error: "Error interno del servidor" })
  }
}
