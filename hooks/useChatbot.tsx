"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
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
    let storedSessionId = typeof window !== "undefined" ? localStorage.getItem("chatSessionId") : null

    // Si no existe, crear uno nuevo
    if (!storedSessionId) {
      storedSessionId = uuidv4()
      if (typeof window !== "undefined") {
        localStorage.setItem("chatSessionId", storedSessionId)
      }
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

  // Función para enviar mensaje (simulada)
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

      // Simular respuesta del bot después de un retraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Respuestas simuladas basadas en palabras clave
      let botResponse = "Entiendo. ¿En qué más puedo ayudarte?"

      if (message.toLowerCase().includes("electricidad") || message.toLowerCase().includes("eléctrico")) {
        botResponse = "Entiendo que tienes un problema eléctrico. ¿Podrías darme más detalles sobre el problema?"
      } else if (message.toLowerCase().includes("plomería") || message.toLowerCase().includes("agua")) {
        botResponse = "Parece que tienes un problema de plomería. ¿Puedes describir exactamente qué está sucediendo?"
      } else if (message.toLowerCase().includes("cerrajería") || message.toLowerCase().includes("llave")) {
        botResponse = "Veo que necesitas un cerrajero. ¿Es una emergencia o puedes esperar unas horas?"
      } else if (message.toLowerCase().includes("técnico") || message.toLowerCase().includes("profesional")) {
        botResponse = "Estamos buscando técnicos disponibles en tu zona. ¿Podrías confirmar tu ubicación?"
      } else if (message.toLowerCase().includes("hola") || message.toLowerCase().includes("buenos días")) {
        botResponse = "¡Hola! Soy Felix, tu asistente de BeFixed. ¿En qué puedo ayudarte hoy?"
      }

      // Añadir respuesta del bot
      const botMessage: Message = {
        id: uuidv4(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessage])
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      setError("Error al enviar mensaje")

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
    if (typeof window !== "undefined") {
      localStorage.setItem("chatSessionId", newSessionId)
    }
    setSessionId(newSessionId)
  }

  // Función para buscar técnicos (simulada)
  const findTechnicians = async (serviceDetails: any) => {
    try {
      setLoading(true)
      setError(null)

      // Simular retraso de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos simulados de técnicos
      const mockTechnicians = [
        {
          id: 1,
          name: "Carlos Rodríguez",
          specialty: "Electricista",
          rating: 4.8,
          reviews: 56,
          distance: "1.2 km",
          eta: "8 min",
        },
        {
          id: 2,
          name: "Ana Martínez",
          specialty: "Plomera",
          rating: 4.9,
          reviews: 32,
          distance: "2.5 km",
          eta: "12 min",
        },
        {
          id: 3,
          name: "Miguel Sánchez",
          specialty: "Cerrajero",
          rating: 4.7,
          reviews: 41,
          distance: "3.8 km",
          eta: "15 min",
        },
      ]

      setLoading(false)
      return Promise.resolve({ technicians: mockTechnicians })
    } catch (err: any) {
      setLoading(false)
      setError("Error al buscar técnicos")
      return Promise.reject(err)
    }
  }

  // Función para reservar servicio (simulada)
  const bookService = async (bookingDetails: any) => {
    try {
      setLoading(true)
      setError(null)

      // Simular retraso de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos simulados de reserva
      const mockBooking = {
        id: uuidv4(),
        technicianId: bookingDetails.technicianId,
        serviceType: bookingDetails.serviceType,
        scheduledTime: bookingDetails.scheduledTime || new Date().toISOString(),
        status: "confirmed",
        ...bookingDetails,
      }

      setLoading(false)
      return Promise.resolve({ booking: mockBooking })
    } catch (err: any) {
      setLoading(false)
      setError("Error al reservar servicio")
      return Promise.reject(err)
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

