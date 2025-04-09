/**
 * Módulo para reconocimiento de intenciones y entidades
 */

const serviceTypes = require("../data/serviceTypes")

// Patrones para reconocimiento de intenciones
const intentPatterns = {
  greeting: [/^hola/i, /^buenos días/i, /^buenas tardes/i, /^buenas noches/i, /^saludos/i, /^hey/i],
  help: [/ayuda/i, /^ayúdame/i, /^necesito ayuda/i, /^cómo funciona/i, /^qué puedes hacer/i],
  service_request: [/necesito un/i, /busco un/i, /quiero contratar/i, /problema con/i, /arreglar/i, /reparar/i],
  location_info: [/mi ubicación es/i, /estoy en/i, /mi dirección es/i, /vivo en/i],
  urgency_info: [/es urgente/i, /lo necesito ahora/i, /emergencia/i, /puede esperar/i, /no es urgente/i],
  technician_search: [/buscar técnicos/i, /encontrar profesionales/i, /ver técnicos/i, /técnicos disponibles/i],
  booking_request: [/reservar/i, /contratar/i, /agendar/i, /programar/i],
  cancel: [/cancelar/i, /anular/i, /suspender/i],
  thanks: [/gracias/i, /te agradezco/i, /muchas gracias/i],
  goodbye: [/adiós/i, /hasta luego/i, /chao/i, /bye/i],
}

/**
 * Extrae la intención principal del mensaje
 * @param {string} message - Mensaje del usuario
 * @returns {string} Intención detectada
 */
function extractIntent(message) {
  // Verificar cada patrón de intención
  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(message)) {
        return intent
      }
    }
  }

  // Verificar si menciona algún tipo de servicio
  for (const service of serviceTypes) {
    if (message.toLowerCase().includes(service.id) || message.toLowerCase().includes(service.label.toLowerCase())) {
      return "service_request"
    }
  }

  // Si no se detecta ninguna intención específica
  return "unknown"
}

/**
 * Extrae entidades del mensaje
 * @param {string} message - Mensaje del usuario
 * @returns {object} Entidades extraídas
 */
function extractEntities(message) {
  const entities = {}

  // Extraer tipo de servicio
  for (const service of serviceTypes) {
    if (message.toLowerCase().includes(service.id) || message.toLowerCase().includes(service.label.toLowerCase())) {
      entities.serviceType = service.id
      break
    }
  }

  // Extraer urgencia
  if (/urgente|emergencia|inmediato|ahora mismo|cuanto antes/i.test(message)) {
    entities.urgency = "urgente"
  } else if (/no.*urgente|puede esperar|cuando pueda|sin prisa/i.test(message)) {
    entities.urgency = "normal"
  }

  // Extraer ubicación (simplificado)
  const locationMatch = message.match(/en\s+([^,.]+)/i)
  if (locationMatch && locationMatch[1]) {
    entities.location = locationMatch[1].trim()
  }

  return entities
}

module.exports = {
  extractIntent,
  extractEntities,
}
