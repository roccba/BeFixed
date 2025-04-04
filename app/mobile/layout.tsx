import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import MobileNavigation from "./components/MobileNavigation"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BeFixed Mobile - Conectando Clientes con Técnicos Especializados",
  description:
    "BeFixed es una plataforma que conecta a clientes con técnicos especializados (electricidad, plomería, gas, cerrajería, etc.) en tiempo real, similar a Uber/Didi.",
}

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col h-screen overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex-1 overflow-hidden relative">{children}</main>
          <MobileNavigation />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

