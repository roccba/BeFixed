/**
 * Modelo de Reserva compartido entre frontend y backend
 */

class Booking {
  constructor(data = {}) {
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

  isPending() {
    return this.status === "pending"
  }

  isConfirmed() {
    return this.status === "confirmed"
  }

  isInProgress() {
    return this.status === "in_progress"
  }

  isCompleted() {
    return this.status === "completed"
  }

  isCancelled() {
    return this.status === "cancelled"
  }

  isUrgent() {
    return this.urgency === "urgente"
  }

  toJSON() {
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

module.exports = Booking

