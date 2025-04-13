import { NextResponse } from "next/server"
import { prisma } from "@/prisma/client"

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
