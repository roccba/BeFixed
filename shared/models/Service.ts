/**
 * Modelo de Servicio compartido entre frontend y backend
 */

export class Service {
  id: string | null
  name: string
  description: string
  category: string
  icon: string
  basePrice: number
  isActive: boolean
  createdAt: string
  updatedAt: string

  constructor(data: Partial<Service> = {}) {
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

  isTechnical(): boolean {
    return this.category === "tecnico"
  }

  isHomeService(): boolean {
    return this.category === "hogar"
  }

  toJSON(): Record<string, any> {
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
