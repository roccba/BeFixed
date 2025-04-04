import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const userCookie = request.cookies.get("user")?.value
  let user = null

  if (userCookie) {
    try {
      user = JSON.parse(userCookie)
    } catch (e) {
      console.error("Error parsing user cookie:", e)
    }
  }

  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")

  const isTechnicianRoute =
    request.nextUrl.pathname.startsWith("/mobile/technician-mode") ||
    request.nextUrl.pathname.startsWith("/dashboard/technician")

  const isClientRoute =
    request.nextUrl.pathname.startsWith("/mobile/profile") ||
    request.nextUrl.pathname.startsWith("/mobile/history") ||
    request.nextUrl.pathname.startsWith("/dashboard/client")

  // Si el usuario intenta acceder a una página protegida sin token
  if (!token && (isClientRoute || isTechnicianRoute)) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Si el usuario ya está autenticado e intenta acceder a login/register
  if (token && isAuthPage) {
    // Redirigir según el rol del usuario
    if (user && user.role === "technician") {
      return NextResponse.redirect(new URL("/dashboard/technician", request.url))
    } else {
      return NextResponse.redirect(new URL("/dashboard/client", request.url))
    }
  }

  // Verificar roles para rutas específicas
  if (user && isTechnicianRoute && user.role !== "technician") {
    return NextResponse.redirect(new URL("/dashboard/client", request.url))
  }

  if (user && isClientRoute && user.role !== "client") {
    return NextResponse.redirect(new URL("/dashboard/technician", request.url))
  }

  return NextResponse.next()
}

// Actualizar el matcher para incluir las rutas de dashboard
export const config = {
  matcher: [
    "/login",
    "/register",
    "/mobile/profile/:path*",
    "/mobile/history/:path*",
    "/mobile/technician-mode/:path*",
    "/dashboard/client/:path*",
    "/dashboard/technician/:path*",
  ],
}

