"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/useAuth"
import { ChatbotProvider } from "@/hooks/useChatbot"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ChatbotProvider>{children}</ChatbotProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
