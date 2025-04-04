// Actualiza la configuración de CORS para usar la variable de entorno FRONTEND_URL
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./routes/authRoutes")
const chatbotRoutes = require("./routes/chatbotRoutes")

// Cargar variables de entorno
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Configuración de CORS mejorada
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  // Puedes añadir más orígenes permitidos aquí
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir solicitudes sin origen (como aplicaciones móviles, Postman, etc.)
      if (!origin) return callback(null, true)

      if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV === "production") {
        const msg = "La política CORS para este sitio no permite acceso desde el origen especificado."
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true,
  }),
)

app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Rutas
app.use("/api/auth", authRoutes)
app.use("/api/chatbot", chatbotRoutes)

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    message: "BeFixed API está funcionando correctamente",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  })
})

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Error en el servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
})

// Manejo de cierre gracioso
process.on("SIGTERM", () => {
  console.log("SIGTERM recibido, cerrando servidor HTTP")
  server.close(() => {
    console.log("Servidor HTTP cerrado")
  })
})

module.exports = app

