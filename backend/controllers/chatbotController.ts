import type { Request, Response } from "express"
import * as chatbotService from "../services/chatbotService"
import type { AuthRequest } from "../types"

// Controlador para procesar mensajes del chatbot
export const processMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, sessionId } = req.body

    if (!message) {
      res.status(400).json({
        success: false,
        message: "El mensaje es requerido",
      })
      return
    }

    // Procesar mensaje con el servicio del chatbot
    const response = await chatbotService.processUserMessage(message, sessionId)

    res.status(200).json({
      success: true,
      response,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al procesar el mensaje",
      error: error instanceof Error ? error.message : "Error desconocido",
    })
  }
}

// Controlador para obtener servicios disponibles
export const getServices = (req: Request, res: Response): void => {
  try {
    const services = chatbotService.getAvailableServices()

    res.status(200).json({
      success: true,
      services,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener servicios",
      error: error instanceof Error ? error.message : "Error desconocido",
    })
  }
}

// Controlador para buscar técnicos
export const findTechnicians = async (req: Request, res: Response): Promise<void> => {
  try {
    const { serviceType, location, urgency } = req.body

    if (!serviceType || !location) {
      res.status(400).json({
        success: false,
        message: "El tipo de servicio y la ubicación son requeridos",
      })
      return
    }

    // Obtener técnicos disponibles
    const technicians = await chatbotService.findAvailableTechnicians(serviceType, location, urgency)

    res.status(200).json({
      success: true,
      technicians,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar técnicos",
      error: error instanceof Error ? error.message : "Error desconocido",
    })
  }
}

// Controlador para reservar un servicio
export const bookService = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { technicianId, serviceType, scheduledTime, location, description } = req.body

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
      })
      return
    }

    const userId = req.user.id

    if (!technicianId || !serviceType || !location) {
      res.status(400).json({
        success: false,
        message: "El técnico, tipo de servicio y ubicación son requeridos",
      })
      return
    }

    // Reservar servicio
    const booking = await chatbotService.bookService(
      userId,
      technicianId,
      serviceType,
      scheduledTime,
      location,
      description,
    )

    res.status(201).json({
      success: true,
      booking,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al reservar servicio",
      error: error instanceof Error ? error.message : "Error desconocido",
    })
  }
}

// Controlador para obtener historial de conversaciones
export const getConversationHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
      })
      return
    }

    const userId = req.user.id
    const { limit = 10, page = 1 } = req.query

    // Obtener historial de conversaciones
    const history = await chatbotService.getConversationHistory(
      userId,
      Number.parseInt(limit as string),
      Number.parseInt(page as string),
    )

    res.status(200).json({
      success: true,
      history,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener historial de conversaciones",
      error: error instanceof Error ? error.message : "Error desconocido",
    })
  }
}
