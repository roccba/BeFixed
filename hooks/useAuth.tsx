"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import Cookies from "js-cookie"

// Definir tipos
interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateProfile: (userData: any) => Promise<void>
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Proveedor de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Verificar si hay un usuario en cookies al cargar
  useEffect(() => {
    const storedUser = Cookies.get("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Error parsing stored user:", e)
      }
    }
    setLoading(false)
  }, [])

  // Función de login (simulada)
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      // Simulación de respuesta de API
      const mockUser = {
        id: "1",
        name: email.split("@")[0],
        email,
        role: email.includes("tech") ? "technician" : "client",
      }

      setUser(mockUser)

      // Guardar en cookies (expira en 7 días)
      Cookies.set("token", "mock-jwt-token", { expires: 7 })
      Cookies.set("user", JSON.stringify(mockUser), { expires: 7 })

      setLoading(false)
      return Promise.resolve()
    } catch (err: any) {
      setLoading(false)
      setError("Error al iniciar sesión")
      return Promise.reject(err)
    }
  }

  // Función de registro (simulada)
  const register = async (userData: any) => {
    try {
      setLoading(true)
      setError(null)

      // Simulación de respuesta de API
      const mockUser = {
        id: "1",
        name: userData.name || userData.email.split("@")[0],
        email: userData.email,
        role: userData.role || "client",
      }

      setUser(mockUser)

      // Guardar en cookies (expira en 7 días)
      Cookies.set("token", "mock-jwt-token", { expires: 7 })
      Cookies.set("user", JSON.stringify(mockUser), { expires: 7 })

      setLoading(false)
      return Promise.resolve()
    } catch (err: any) {
      setLoading(false)
      setError("Error al registrarse")
      return Promise.reject(err)
    }
  }

  // Función de logout
  const logout = () => {
    setUser(null)
    Cookies.remove("token")
    Cookies.remove("user")
  }

  // Función para actualizar perfil (simulada)
  const updateProfile = async (userData: any) => {
    try {
      setLoading(true)
      setError(null)

      // Actualizar usuario
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)

      // Actualizar cookie
      Cookies.set("user", JSON.stringify(updatedUser), { expires: 7 })

      setLoading(false)
      return Promise.resolve()
    } catch (err: any) {
      setLoading(false)
      setError("Error al actualizar perfil")
      return Promise.reject(err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

