"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService } from "@/services/api"
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

  // Función de login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await authService.login({ email, password })
      setUser(data.user)

      // Guardar en cookies (expira en 7 días)
      Cookies.set("token", data.token, { expires: 7, secure: process.env.NODE_ENV === "production" })
      Cookies.set("user", JSON.stringify(data.user), { expires: 7, secure: process.env.NODE_ENV === "production" })

      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      setError(err.response?.data?.message || "Error al iniciar sesión")
      throw err
    }
  }

  // Función de registro
  const register = async (userData: any) => {
    try {
      setLoading(true)
      setError(null)
      const data = await authService.register(userData)
      setUser(data.user)

      // Guardar en cookies (expira en 7 días)
      Cookies.set("token", data.token, { expires: 7, secure: process.env.NODE_ENV === "production" })
      Cookies.set("user", JSON.stringify(data.user), { expires: 7, secure: process.env.NODE_ENV === "production" })

      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      setError(err.response?.data?.message || "Error al registrarse")
      throw err
    }
  }

  // Función de logout
  const logout = () => {
    authService.logout()
    setUser(null)

    // Eliminar cookies
    Cookies.remove("token")
    Cookies.remove("user")
  }

  // Función para actualizar perfil
  const updateProfile = async (userData: any) => {
    try {
      setLoading(true)
      setError(null)
      const data = await authService.updateProfile(userData)
      setUser(data.user)

      // Actualizar cookie
      Cookies.set("user", JSON.stringify(data.user), { expires: 7, secure: process.env.NODE_ENV === "production" })

      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      setError(err.response?.data?.message || "Error al actualizar perfil")
      throw err
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

