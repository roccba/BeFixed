"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { ChatInterface } from "./ChatInterface"
import { useMobile } from "@/hooks/use-mobile"

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  // En desktop, solo mostramos el botón flotante si no estamos en la página de Hero
  // que ya contiene el chat
  const isHeroPage = typeof window !== "undefined" && window.location.pathname === "/" && !isMobile

  // Si estamos en la página de Hero en desktop, no mostramos el chat flotante
  if (isHeroPage) {
    return null
  }

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 p-0"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && <ChatInterface isFloating={true} onClose={() => setIsOpen(false)} />}
    </>
  )
}
