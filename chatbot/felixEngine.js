/**
 * Motor principal del chatbot Felix
 * Este archivo contiene la lógica avanzada para procesar mensajes y generar respuestas
 */

const serviceTypes = require("./data/serviceTypes")
const responses = require("./data/responses")
const { extractIntent, extractEntities } = require("./nlp/intentRecognition")
const { generateResponse } = require("./nlp/responseGeneration")

// Almacenamiento de sesiones
const sessions = {}

/**
 * Procesa un mensaje del usuario y genera una respuesta
 * @param {string} message - Mensaje del usuario
 * @param {string} sessionId - ID de sesión único
 * @returns {object} Respuesta del chatbot
 */
function processMessage(message, sessionId) {
  // Inicializar sesión si no existe
  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      context: {
        step: "greeting",
        serviceType: null,
        description: null,
        urgency: null,
        location: null,
        lastUpdated: new Date(),
      },
      history: [],
    }
  }

  // Actualizar historial
  sessions[sessionId].history.push({
    role: "user",
    content: message,
    timestamp: new Date(),
  })

  // Obtener contexto actual
  const context = sessions[sessionId].context

  // Analizar intención y entidades
  const intent = extractIntent(message)
  const entities = extractEntities(message)

  // Actualizar contexto con entidades extraídas
  if (entities.serviceType && !context.serviceType) {
    context.serviceType = entities.serviceType
  }
  if (entities.location && !context.location) {
    context.location = entities.location
  }
  if (entities.urgency && !context.urgency) {
    context.urgency = entities.urgency
  }

  // Determinar siguiente paso basado en la intención y el contexto
  const nextStep = determineNextStep(intent, context)
  context.step = nextStep

  // Generar respuesta
  const response = generateResponse(intent, context, entities)

  // Actualizar historial
  sessions[sessionId].history.push({
    role: "assistant",
    content: response.message,
    timestamp: new Date(),
  })

  // Actualizar timestamp
  context.lastUpdated = new Date()

  return {
    message: response.message,
    context: context,
    suggestions: response.suggestions || [],
  }
}

/**
 * Determina el siguiente paso en la conversación
 * @param {string} intent - Intención detectada
 * @param {object} context - Contexto actual
 * @returns {string} Siguiente paso
 */
function determineNextStep(intent, context) {
  const currentStep = context.step

  // Lógica para determinar el siguiente paso
  if (intent === "greeting" || intent === "help") {
    return "service_selection"
  }

  if (intent === "service_request" && !context.serviceType) {
    return "service_selection"
  }

  if (intent === "service_request" && context.serviceType && !context.description) {
    return "problem_description"
  }

  if (currentStep === "problem_description" && !context.urgency) {
    return "urgency_check"
  }

  if (currentStep === "urgency_check" && !context.location) {
    return "location_request"
  }

  if (currentStep === "location_request" && context.location) {
    return "technician_search"
  }

  // Si no podemos determinar el siguiente paso, mantenemos el actual
  return currentStep
}

/**
 * Obtiene el historial de conversación
 * @param {string} sessionId - ID de sesión
 * @returns {array} Historial de mensajes
 */
function getConversationHistory(sessionId) {
  if (!sessions[sessionId]) {
    return []
  }
  return sessions[sessionId].history
}

/**
 * Reinicia una sesión
 * @param {string} sessionId - ID de sesión
 */
function resetSession(sessionId) {
  if (sessions[sessionId]) {
    sessions[sessionId] = {
      context: {
        step: "greeting",
        serviceType: null,
        description: null,
        urgency: null,
        location: null,
        lastUpdated: new Date(),
      },
      history: [],
    }
  }
}

module.exports = {
  processMessage,
  getConversationHistory,
  resetSession,
}

