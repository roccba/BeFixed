import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import type { AuthRequest, UserDocument } from "../types"

// Simulación de base de datos de usuarios (en un proyecto real, usaríamos MongoDB u otra BD)
const users: UserDocument[] = []

// Generar token JWT
const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  })
}

// Middleware para proteger rutas
export const protect = (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
  try {
    // 1) Obtener token
    let token: string | undefined
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No has iniciado sesión. Por favor, inicia sesión para acceder.",
      })
    }

    // 2) Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as { id: string }

    // 3) Verificar si el usuario existe
    const currentUser = users.find((user) => user.id === decoded.id)
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "El usuario al que pertenece este token ya no existe.",
      })
    }

    // 4) Asignar usuario a req.user
    req.user = currentUser
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    })
  }
}

// Middleware de autenticación opcional
export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    let token: string | undefined
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as { id: string }
      const currentUser = users.find((user) => user.id === decoded.id)
      if (currentUser) {
        req.user = currentUser
      }
    }
    next()
  } catch (error) {
    // Si hay un error, simplemente continuamos sin autenticar
    next()
  }
}

// Controlador para registro de usuarios
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role = "client" } = req.body

    // Verificar si el usuario ya existe
    if (users.some((user) => user.email === email)) {
      res.status(400).json({
        success: false,
        message: "Este correo electrónico ya está registrado",
      })
      return
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crear nuevo usuario
    const newUser: UserDocument = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: role as "client" | "technician",
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Generar token
    const token = signToken(newUser.id)

    // Enviar respuesta
    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
      error: error instanceof Error ? error.message : "Error desconocido",
    })
  }
}

// Controlador para login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Verificar si el usuario existe
    const user = users.find((user) => user.email === email)
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Correo electrónico o contraseña incorrectos",
      })
      return
    }

    // Verificar contraseña
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      res.status(401).json({
        success: false,
        message: "Correo electrónico o contraseña incorrectos",
      })
      return
    }

    // Generar token
    const token = signToken(user.id)

    // Enviar respuesta
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión",
      error: error instanceof Error ? error.message : "Error desconocido",
    })
  }
}

// Controlador para logout
export const logout = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: "Sesión cerrada correctamente",
  })
}

// Controlador para obtener perfil
export const getProfile = (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "No autorizado",
    })
    return
  }

  res.status(200).json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  })
}

// Controlador para actualizar perfil
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "No autorizado",
      })
      return
    }

    const { name, email } = req.body

    // Encontrar índice del usuario
    const userIndex = users.findIndex((user) => user.id === req.user?.id)

    // Actualizar datos
    if (name) users[userIndex].name = name
    if (email) users[userIndex].email = email

    // Enviar respuesta
    res.status(200).json({
      success: true,
      message: "Perfil actualizado correctamente",
      user: {
        id: users[userIndex].id,
        name: users[userIndex].name,
        email: users[userIndex].email,
        role: users[userIndex].role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar perfil",
      error: error instanceof Error ? error.message : "Error desconocido",
    })
  }
}

// Controlador para recuperar contraseña
export const forgotPassword = (req: Request, res: Response): void => {
  // En un proyecto real, enviaríamos un email con un token
  res.status(200).json({
    success: true,
    message: "Se ha enviado un enlace de recuperación a tu correo electrónico",
  })
}

// Controlador para restablecer contraseña
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body

    // En un proyecto real, verificaríamos el token y actualizaríamos la contraseña
    res.status(200).json({
      success: true,
      message: "Contraseña restablecida correctamente",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al restablecer contraseña",
      error: error instanceof Error ? error.message : "Error desconocido",
    })
  }
}
