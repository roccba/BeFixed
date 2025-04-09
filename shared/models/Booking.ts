/**
 * Modelo de Reserva compartido entre frontend y backend
 */

export class Booking {
  id: string | null
  clientId: string | null
  technicianId: string | null
  serviceType: string
  description: string
  location: Record<string, any>
  scheduledTime: string | null
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  price: number
  urgency: string
  rating: number | null
  review: string | null
  createdAt: string
  updatedAt: string

  constructor(data: Partial<Booking> = {}) {
    this.id = data.id || null
    this.clientId = data.clientId || null
    this.technicianId = data.technicianId || null
    this.serviceType = data.serviceType || ""
    this.description = data.description || ""
    this.location = data.location || {}
    this.scheduledTime = data.scheduledTime || null
    this.status = data.status || "pending" // 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'
    this.price = data.price || 0
    this.urgency = data.urgency || "normal" // 'urgente', 'normal'
    this.rating = data.rating || null
    this.review = data.review || null
    this.createdAt = data.createdAt || new Date().toISOString()
    this.updatedAt = data.updatedAt || new Date().toISOString()
  }

  isPending(): boolean {
    return this.status === "pending"
  }

  isConfirmed(): boolean {
    return this.status === "confirmed"
  }

  isInProgress(): boolean {
    return this.status === "in_progress"
  }

  isCompleted(): boolean {
    return this.status === "completed"
  }

  isCancelled(): boolean {
    return this.status === "cancelled"
  }

  isUrgent(): boolean {
    return this.urgency === "urgente"
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      clientId: this.clientId,
      technicianId: this.technicianId,
      serviceType: this.serviceType,
      description: this.description,
      location: this.location,
      scheduledTime: this.scheduledTime,
      status: this.status,
      price: this.price,
      urgency: this.urgency,
      rating: this.rating,
      review: this.review,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
