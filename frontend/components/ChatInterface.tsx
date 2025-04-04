"use client"

import type React from "react"

import { useChatbot } from "@/hooks/useChatbot"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Bot, Send, User, X, Maximize2, Minimize2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"

// Componente para las opciones de selección rápida
const QuickResponseOption = ({
  option,
  onSelect,
}: {
  option: { id: string; label: string; icon: string; category?: string }
  onSelect: (option: { id: string; label: string; icon: string; category?: string }) => void
}) => (
  <Button
    variant="outline"
    className="flex items-center gap-2 rounded-full py-2 px-4 h-auto"
    onClick={() => onSelect(option)}
  >
    <span>{option.icon}</span>
    <span>{option.label}</span>
  </Button>
)

export function ChatInterface({
  initialMessage,
  onSubmitRequest,
  className = "",
  isFloating = false,
  onClose,
}: {
  initialMessage?: string
  onSubmitRequest?: (serviceDetails: {
    description: string
    serviceType: string
    urgency: string
    location: string
  }) => void
  className?: string
  isFloating?: boolean
  onClose?: () => void
}) {
  const { messages, loading, sendMessage, findTechnicians } = useChatbot()
  const [input, setInput] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Auto-scroll al último mensaje
  useEffect(() => {
    // Pequeño retraso para asegurar que el DOM se ha actualizado
    const scrollTimer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        })
      }
    }, 100)

    return () => clearTimeout(scrollTimer)
  }, [messages])

  // Ajustar la altura del textarea según el contenido
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [input])

  // Gestionar el envío de mensajes
  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Enviar mensaje
    sendMessage(input)
    setInput("")

    // Vibración en dispositivos móviles
    if (isMobile && navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  // Manejar la tecla Enter para enviar mensajes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Alternar entre expandido y contraído (para móvil)
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`flex flex-col ${className} ${
        isFloating
          ? "fixed bottom-20 right-4 w-[calc(100%-2rem)] sm:w-96 h-[70vh] sm:h-[500px] shadow-xl rounded-xl z-50 border border-border"
          : "h-full"
      } ${isExpanded && isFloating ? "h-[90vh] sm:h-[80vh]" : ""}`}
    >
      {/* Encabezado del chat */}
      <div className="border-b bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="BeFixed Assistant" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Felix</h2>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  En línea
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Tu asistente personal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isFloating && (
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={toggleExpanded}>
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            )}
            {isFloating && onClose && (
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Contenedor de mensajes */}
      <div
        className="flex-1 overflow-y-auto p-4 bg-muted/30 space-y-4 scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex gap-2 max-w-[90%] sm:max-w-[80%]">
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="BeFixed Assistant" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <Card className={`p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                  <div className="text-sm">{message.content}</div>
                </Card>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuario" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}

        {/* Indicador de carga */}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-2">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="BeFixed Assistant" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <Card className="p-3 bg-card">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce delay-0"></div>
                    <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce delay-150"></div>
                    <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce delay-300"></div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Formulario de entrada */}
      <div className="border-t p-4 bg-background">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="min-h-[44px] max-h-[120px] resize-none"
            rows={1}
          />
          <Button
            type="button"
            size="icon"
            onClick={handleSendMessage}
            disabled={input.trim() === "" || loading}
            className="rounded-full h-[44px] w-[44px] flex-shrink-0"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </div>
        <div className="flex justify-center mt-3">
          <p className="text-xs text-muted-foreground">Powered by Felix - Tu asistente personal de BeFixed</p>
        </div>
      </div>
    </div>
  )
}

