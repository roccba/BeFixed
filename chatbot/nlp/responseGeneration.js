/**
 * Módulo para generación de respuestas
 */

const responses = require("../data/responses")

/**
 * Genera una respuesta basada en la intención y el contexto
 * @param {string} intent - Intención detectada
 * @param {object} context - Contexto de la conversación
 * @param {object} entities - Entidades extraídas
 * @returns {object} Respuesta generada
 */
function generateResponse(intent, context, entities) {
  // Respuestas basadas en el paso actual
  switch (context.step) {
    case "greeting":
      return {
        message: getRandomResponse(responses.greeting),
        suggestions: ["Necesito un electricista", "Tengo un problema de plomería", "¿Qué servicios ofrecen?"],
      }

    case "service_selection":
      if (context.serviceType) {
        return {
          message: `Entiendo que necesitas ayuda con ${context.serviceType}. ¿Puedes describir el problema con más detalle?`,
          suggestions: ["Es una fuga de agua", "No funciona la electricidad", "Necesito cambiar una cerradura"],
        }
      } else {
        return {
          message: getRandomResponse(responses.service_request),
          suggestions: ["Electricidad", "Plomería", "Cerrajería", "Gas", "Limpieza"],
        }
      }

    case "problem_description":
      return {
        message: `Gracias por la información. ¿Es un problema urgente que necesita atención inmediata?`,
        suggestions: ["Sí, es urgente", "No, puede esperar"],
      }

    case "urgency_check":
      return {
        message: `Entendido. Para poder ayudarte mejor, ¿podrías confirmar tu ubicación?`,
        suggestions: ["Usar mi ubicación actual", "Ingresar otra dirección"],
      }

    case "location_request":
      return {
        message: `Gracias. Estoy buscando profesionales disponibles cerca de ti para ${context.serviceType}.`,
        suggestions: ["Ver técnicos disponibles", "Cambiar servicio"],
      }

    case "technician_search":
      return {
        message: `He encontrado varios profesionales disponibles para ayudarte con tu problema de ${context.serviceType}. ¿Quieres ver los detalles?`,
        suggestions: ["Ver detalles", "Filtrar por calificación", "Filtrar por precio"],
      }

    default:
      // Respuestas basadas en la intención
      if (intent === "greeting") {
        return {
          message: getRandomResponse(responses.greeting),
          suggestions: ["Necesito un técnico", "¿Cómo funciona?"],
        }
      }

      if (intent === "help") {
        return {
          message: getRandomResponse(responses.help),
          suggestions: ["Servicios disponibles", "Encontrar un técnico"],
        }
      }

      if (intent === "thanks") {
        return {
          message: getRandomResponse(responses.thanks),
          suggestions: ["Necesito otro servicio", "Adiós"],
        }
      }

      if (intent === "goodbye") {
        return {
          message: getRandomResponse(responses.goodbye),
          suggestions: [],
        }
      }

      // Respuesta por defecto
      return {
        message: getRandomResponse(responses.fallback),
        suggestions: ["Necesito un técnico", "Ayuda", "Servicios disponibles"],
      }
  }
}

/**
 * Selecciona una respuesta aleatoria de un array de respuestas
 * @param {array} responseArray - Array de posibles respuestas
 * @returns {string} Respuesta seleccionada
 */
function getRandomResponse(responseArray) {
  const index = Math.floor(Math.random() * responseArray.length)
  return responseArray[index]
}

module.exports = {
  generateResponse,
}

