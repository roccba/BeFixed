/**
 * Modelo de Servicio compartido entre frontend y backend
 */

class Service {
  constructor(data = {}) {
    this.id = data.id || null
    this.name = data.name || ""
    this.description = data.description || ""
    this.category = data.category || "" // 'tecnico', 'hogar'
    this.icon = data.icon || ""
    this.basePrice = data.basePrice || 0
    this.isActive = data.isActive !== undefined ? data.isActive : true
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  isTechnical() {
    return this.category === "tecnico"
  }

  isHomeService() {
    return this.category === "hogar"
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      icon: this.icon,
      basePrice: this.basePrice,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

module.exports = Service

