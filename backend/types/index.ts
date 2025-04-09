import type { Request } from "express"

// Interfaz extendida de Request para incluir usuario
export interface AuthRequest extends Request {
  user?: UserDocument
}

// Interfaces para modelos de datos
export interface UserDocument {
  id: string
  name: string
  email: string
  password: string
  role: "client" | "technician"
  createdAt: string
}

export interface BookingDocument {
  id: string
  clientId: string
  technicianId: string
  serviceType: string
  description: string
  location: Record<string, any>
  scheduledTime: string | null
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  price: number
  urgency: "normal" | "urgente"
  rating: number | null
  review: string | null
  createdAt: string
  updatedAt: string
}

export interface ServiceDocument {
  id: string
  name: string
  description: string
  category: string
  icon: string
  basePrice: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Interfaces para respuestas
export interface ApiResponse {
  success: boolean
  message?: string
  [key: string]: any
}

// Interfaces para chatbot
export interface ChatbotContext {
  currentStep: number
  serviceType: string | null
  description: string | null
  urgency: string | null
  location: string | null
}

export interface ChatMessage {
  sender: "user" | "bot"
  content: string
  timestamp: string
}

export interface ChatSession {
  messages: ChatMessage[]
  context: ChatbotContext
}
