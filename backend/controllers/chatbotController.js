const chatbotService = require("../services/chatbotService")

// Controlador para procesar mensajes del chatbot
exports.processMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "El mensaje es requerido",
      })
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
      error: error.message,
    })
  }
}

// Controlador para obtener servicios disponibles
exports.getServices = (req, res) => {
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
      error: error.message,
    })
  }
}

// Controlador para buscar técnicos
exports.findTechnicians = async (req, res) => {
  try {
    const { serviceType, location, urgency } = req.body

    if (!serviceType || !location) {
      return res.status(400).json({
        success: false,
        message: "El tipo de servicio y la ubicación son requeridos",
      })
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
      error: error.message,
    })
  }
}

// Controlador para reservar un servicio
exports.bookService = async (req, res) => {
  try {
    const { technicianId, serviceType, scheduledTime, location, description } = req.body
    const userId = req.user.id

    if (!technicianId || !serviceType || !location) {
      return res.status(400).json({
        success: false,
        message: "El técnico, tipo de servicio y ubicación son requeridos",
      })
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
      error: error.message,
    })
  }
}

// Controlador para obtener historial de conversaciones
exports.getConversationHistory = async (req, res) => {
  try {
    const userId = req.user.id
    const { limit = 10, page = 1 } = req.query

    // Obtener historial de conversaciones
    const history = await chatbotService.getConversationHistory(userId, Number.parseInt(limit), Number.parseInt(page))

    res.status(200).json({
      success: true,
      history,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener historial de conversaciones",
      error: error.message,
    })
  }
}

