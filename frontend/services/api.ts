import axios from "axios"
import Cookies from "js-cookie"

// Crear instancia de axios con la URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Importante para enviar cookies en solicitudes cross-origin
})

// Interceptor para añadir el token de autenticación a las peticiones
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si recibimos un 401 (Unauthorized), limpiamos las cookies
    if (error.response && error.response.status === 401) {
      Cookies.remove("token")
      Cookies.remove("user")

      // Redirigir a login si no estamos ya en la página de login
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

// Servicios de autenticación
export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData)
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials)
    return response.data
  },

  logout: async () => {
    try {
      await api.post("/auth/logout")
    } catch (error) {
      console.error("Error during logout:", error)
    }

    // Siempre limpiamos las cookies, incluso si la petición falla
    Cookies.remove("token")
    Cookies.remove("user")
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile")
    return response.data
  },

  updateProfile: async (userData) => {
    const response = await api.put("/auth/profile", userData)
    return response.data
  },
}

// Servicios del chatbot
export const chatbotService = {
  sendMessage: async (message, sessionId) => {
    const response = await api.post("/chatbot/message", { message, sessionId })
    return response.data
  },

  getServices: async () => {
    const response = await api.get("/chatbot/services")
    return response.data
  },

  findTechnicians: async (serviceDetails) => {
    const response = await api.post("/chatbot/find-technicians", serviceDetails)
    return response.data
  },

  bookService: async (bookingDetails) => {
    const response = await api.post("/chatbot/book-service", bookingDetails)
    return response.data
  },
}

export default api

