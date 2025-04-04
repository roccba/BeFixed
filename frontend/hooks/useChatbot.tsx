"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { chatbotService } from "@/services/api"
import { v4 as uuidv4 } from "uuid"

// Definir tipos
interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: string
}

interface ChatbotContextType {
  messages: Message[]
  loading: boolean
  error: string | null
  sendMessage: (message: string) => Promise<void>
  clearMessages: () => void
  findTechnicians: (serviceDetails: any) => Promise<any>
  bookService: (bookingDetails: any) => Promise<any>
}

// Crear contexto
const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

// Proveedor del chatbot
export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionId] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Inicializar sessionId al cargar
  useEffect(() => {
    // Intentar recuperar sessionId del localStorage
    let storedSessionId = localStorage.getItem("chatSessionId")

    // Si no existe, crear uno nuevo
    if (!storedSessionId) {
      storedSessionId = uuidv4()
      localStorage.setItem("chatSessionId", storedSessionId)
    }

    setSessionId(storedSessionId)

    // Mensaje de bienvenida
    setMessages([
      {
        id: uuidv4(),
        content: "¡Hola! Soy Felix, tu asistente de BeFixed. ¿En qué puedo ayudarte hoy?",
        sender: "bot",
        timestamp: new Date().toISOString(),
      },
    ])
  }, [])

  // Función para enviar mensaje
  const sendMessage = async (message: string) => {
    try {
      // Añadir mensaje del usuario
      const userMessage: Message = {
        id: uuidv4(),
        content: message,
        sender: "user",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, userMessage])
      setLoading(true)
      setError(null)

      // Enviar mensaje al backend
      const response = await chatbotService.sendMessage(message, sessionId)

      // Añadir respuesta del bot
      const botMessage: Message = {
        id: uuidv4(),
        content: response.response.message,
        sender: "bot",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessage])
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      setError(err.response?.data?.message || "Error al enviar mensaje")

      // Mensaje de error
      const errorMessage: Message = {
        id: uuidv4(),
        content: "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    }
  }

  // Función para limpiar mensajes
  const clearMessages = () => {
    setMessages([
      {
        id: uuidv4(),
        content: "¡Hola! Soy Felix, tu asistente de BeFixed. ¿En qué puedo ayudarte hoy?",
        sender: "bot",
        timestamp: new Date().toISOString(),
      },
    ])

    // Generar nuevo sessionId
    const newSessionId = uuidv4()
    localStorage.setItem("chatSessionId", newSessionId)
    setSessionId(newSessionId)
  }

  // Función para buscar técnicos
  const findTechnicians = async (serviceDetails: any) => {
    try {
      setLoading(true)
      setError(null)
      const response = await chatbotService.findTechnicians(serviceDetails)
      setLoading(false)
      return response
    } catch (err: any) {
      setLoading(false)
      setError(err.response?.data?.message || "Error al buscar técnicos")
      throw err
    }
  }

  // Función para reservar servicio
  const bookService = async (bookingDetails: any) => {
    try {
      setLoading(true)
      setError(null)
      const response = await chatbotService.bookService(bookingDetails)
      setLoading(false)
      return response
    } catch (err: any) {
      setLoading(false)
      setError(err.response?.data?.message || "Error al reservar servicio")
      throw err
    }
  }

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        loading,
        error,
        sendMessage,
        clearMessages,
        findTechnicians,
        bookService,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useChatbot = () => {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error("useChatbot debe ser usado dentro de un ChatbotProvider")
  }
  return context
}

