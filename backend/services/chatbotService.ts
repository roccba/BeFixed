import type { Service } from "../../shared/models/Service"
import { Booking } from "../../shared/models/Booking"
import type { ChatSession } from "../types"

// Datos simulados para servicios
const availableServices: Service[] = [
  {
    id: "electricidad",
    name: "Electricidad",
    icon: "⚡",
    category: "tecnico",
    description: "",
    basePrice: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "plomeria",
    name: "Plomería",
    icon: "🚿",
    category: "tecnico",
    description: "",
    basePrice: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "cerrajeria",
    name: "Cerrajería",
    icon: "🔑",
    category: "tecnico",
    description: "",
    basePrice: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "gas",
    name: "Gas",
    icon: "🔥",
    category: "tecnico",
    description: "",
    basePrice: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "refrigeracion",
    name: "Aire acondicionado",
    icon: "❄️",
    category: "tecnico",
    description: "",
    basePrice: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "limpieza",
    name: "Limpieza",
    icon: "🧹",
    category: "hogar",
    description: "",
    basePrice: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "mudanza",
    name: "Mudanza",
    icon: "📦",
    category: "hogar",
    description: "",
    basePrice: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "jardineria",
    name: "Jardinería",
    icon: "🌱",
    category: "hogar",
    description: "",
    basePrice: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "pintura",
    name: "Pintura",
    icon: "🎨",
    category: "hogar",
    description: "",
    basePrice: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "montaje",
    name: "Montaje de muebles",
    icon: "🪑",
    category: "hogar",
    description: "",
    basePrice: 0,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
]

// Datos simulados para técnicos
interface Technician {
  id: number
  name: string
  specialty: string
  avatar: string
  rating: string
  reviews: string
  distance: string
  initials: string
  eta: string
  services: string[]
}

const technicians: Technician[] = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    specialty: "Electricidad",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: "4.8",
    reviews: "56",
    distance: "1.2 km",
    initials: "CR",
    eta: "8 min",
    services: ["electricidad", "refrigeracion"],
  },
  {
    id: 2,
    name: "Ana Martínez",
    specialty: "Plomería",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: "4.9",
    reviews: "32",
    distance: "2.5 km",
    initials: "AM",
    eta: "12 min",
    services: ["plomeria", "gas"],
  },
  {
    id: 3,
    name: "Miguel Sánchez",
    specialty: "Cerrajería",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: "4.7",
    reviews: "41",
    distance: "3.8 km",
    initials: "MS",
    eta: "15 min",
    services: ["cerrajeria"],
  },
  {
    id: 4,
    name: "Limpieza Express",
    specialty: "Limpieza",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: "4.9",
    reviews: "78",
    distance: "2.3 km",
    initials: "LE",
    eta: "Hoy",
    services: ["limpieza"],
  },
  {
    id: 5,
    name: "María Gómez",
    specialty: "Limpieza",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: "4.7",
    reviews: "45",
    distance: "1.8 km",
    initials: "MG",
    eta: "Hoy",
    services: ["limpieza", "jardineria"],
  },
]

// Almacenamiento simulado para conversaciones
const conversations: Record<string, ChatSession> = {}

// Almacenamiento simulado para reservas
const bookings: Booking[] = []

interface ChatbotResponse {
  message: string
  context: any
}

// Procesar mensaje del usuario
export const processUserMessage = async (message: string, sessionId: string): Promise<ChatbotResponse> => {
  // Crear sesión si no existe
  if (!conversations[sessionId]) {
    conversations[sessionId] = {
      messages: [],
      context: {
        currentStep: 0,
        serviceType: null,
        description: null,
        urgency: null,
        location: null,
      },
    }
  }

  // Guardar mensaje del usuario
  conversations[sessionId].messages.push({
    sender: "user",
    content: message,
    timestamp: new Date().toISOString(),
  })

  // Analizar mensaje y generar respuesta
  let response: string
  const context = conversations[sessionId].context

  // Lógica simplificada del chatbot
  if (context.currentStep === 0) {
    // Detectar si el mensaje contiene algún servicio
    const serviceMatch = availableServices.find(
      (service) =>
        message.toLowerCase().includes(service.id) || message.toLowerCase().includes(service.name.toLowerCase()),
    )

    if (serviceMatch) {
      context.serviceType = serviceMatch.id
      context.currentStep = 1
      response = `Entiendo que necesitas un servicio de ${serviceMatch.name.toLowerCase()}. ¿Puedes describirme el problema con más detalle?`
    } else {
      response =
        "Hola, soy Felix, tu asistente de BeFixed. ¿En qué puedo ayudarte hoy? Puedo conectarte con profesionales para solucionar problemas técnicos o servicios para tu hogar."
    }
  } else if (context.currentStep === 1) {
    // Guardar descripción
    context.description = message
    context.currentStep = 2

    // Verificar si es un servicio técnico
    const service = availableServices.find((s) => s.id === context.serviceType)
    const isTechnical = service && service.category === "tecnico"

    if (isTechnical) {
      response = "Gracias por la información. ¿Es un problema urgente que necesita atención inmediata?"
    } else {
      response = "Gracias por la información. ¿Cuándo necesitarías este servicio?"
    }
  } else if (context.currentStep === 2) {
    // Guardar urgencia
    context.urgency = message
    context.currentStep = 3
    response = "¿Podrías confirmar tu ubicación para encontrar profesionales cercanos a ti?"
  } else if (context.currentStep === 3) {
    // Guardar ubicación
    context.location = message
    context.currentStep = 4

    // Preparar resumen
    const service = availableServices.find((s) => s.id === context.serviceType)
    const isTechnical = service && service.category === "tecnico"

    response = `¡Perfecto! Ya tengo toda la información sobre tu ${isTechnical ? "problema" : "servicio"}:
   
- Tipo de servicio: ${service ? service.name : context.serviceType}
- Descripción: ${context.description}
- ${isTechnical ? "Urgencia" : "Cuándo lo necesitas"}: ${context.urgency}
- Ubicación: ${context.location}

¿Quieres que busque profesionales disponibles ${isTechnical ? "ahora" : "para este servicio"}?`
  } else {
    // Respuesta genérica para otros casos
    response = "Entiendo. ¿Hay algo más en lo que pueda ayudarte?"
  }

  // Guardar respuesta del bot
  conversations[sessionId].messages.push({
    sender: "bot",
    content: response,
    timestamp: new Date().toISOString(),
  })

  return {
    message: response,
    context: conversations[sessionId].context,
  }
}

// Obtener servicios disponibles
export const getAvailableServices = (): Service[] => {
  return availableServices
}

// Buscar técnicos disponibles
export const findAvailableTechnicians = async (
  serviceType: string,
  location: string,
  urgency?: string,
): Promise<Technician[]> => {
  // En un proyecto real, aquí haríamos una consulta a la base de datos
  // Filtrar técnicos por servicio
  const filteredTechnicians = technicians.filter((tech) => tech.services.includes(serviceType))

  // Ordenar por distancia (simulado)
  filteredTechnicians.sort((a, b) => {
    const distanceA = Number.parseFloat(a.distance.split(" ")[0])
    const distanceB = Number.parseFloat(b.distance.split(" ")[0])
    return distanceA - distanceB
  })

  return filteredTechnicians
}

// Reservar servicio
export const bookService = async (
  userId: string,
  technicianId: string | number,
  serviceType: string,
  scheduledTime: string | null,
  location: Record<string, any>,
  description: string,
): Promise<Booking> => {
  // Verificar si el técnico existe
  const technician = technicians.find((tech) => tech.id === Number.parseInt(technicianId.toString()))
  if (!technician) {
    throw new Error("Técnico no encontrado")
  }

  // Crear reserva
  const booking = new Booking({
    id: Date.now().toString(),
    clientId: userId,
    technicianId: Number.parseInt(technicianId.toString()),
    serviceType,
    scheduledTime: scheduledTime || new Date(Date.now() + 30 * 60000).toISOString(), // 30 minutos por defecto
    location,
    description,
    status: "pending",
    createdAt: new Date().toISOString(),
  })

  // Guardar reserva
  bookings.push(booking)

  return booking
}

interface ConversationHistory {
  conversations: ChatSession[]
  totalCount: number
  page: number
  limit: number
  totalPages: number
}

// Obtener historial de conversaciones
export const getConversationHistory = async (
  userId: string,
  limit: number,
  page: number,
): Promise<ConversationHistory> => {
  // En un proyecto real, aquí haríamos una consulta a la base de datos
  // Filtrar conversaciones por usuario
  const userConversations = Object.values(conversations).filter((conv: any) => conv.userId === userId)

  // Paginar resultados
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const paginatedConversations = userConversations.slice(startIndex, endIndex)

  return {
    conversations: paginatedConversations,
    totalCount: userConversations.length,
    page,
    limit,
    totalPages: Math.ceil(userConversations.length / limit),
  }
}
