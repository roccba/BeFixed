const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Simulación de base de datos de usuarios (en un proyecto real, usaríamos MongoDB u otra BD)
const users = []

// Generar token JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

// Middleware para proteger rutas
exports.protect = (req, res, next) => {
  try {
    // 1) Obtener token
    let token
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

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
exports.optionalAuth = (req, res, next) => {
  try {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
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
exports.register = async (req, res) => {
  try {
    const { name, email, password, role = "client" } = req.body

    // Verificar si el usuario ya existe
    if (users.some((user) => user.email === email)) {
      return res.status(400).json({
        success: false,
        message: "Este correo electrónico ya está registrado",
      })
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
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
      error: error.message,
    })
  }
}

// Controlador para login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Verificar si el usuario existe
    const user = users.find((user) => user.email === email)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Correo electrónico o contraseña incorrectos",
      })
    }

    // Verificar contraseña
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Correo electrónico o contraseña incorrectos",
      })
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
      error: error.message,
    })
  }
}

// Controlador para logout
exports.logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sesión cerrada correctamente",
  })
}

// Controlador para obtener perfil
exports.getProfile = (req, res) => {
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
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body

    // Encontrar índice del usuario
    const userIndex = users.findIndex((user) => user.id === req.user.id)

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
      error: error.message,
    })
  }
}

// Controlador para recuperar contraseña
exports.forgotPassword = (req, res) => {
  // En un proyecto real, enviaríamos un email con un token
  res.status(200).json({
    success: true,
    message: "Se ha enviado un enlace de recuperación a tu correo electrónico",
  })
}

// Controlador para restablecer contraseña
exports.resetPassword = async (req, res) => {
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
      error: error.message,
    })
  }
}

