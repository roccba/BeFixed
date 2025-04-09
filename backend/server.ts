import express, { type Request, type Response, type NextFunction } from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"
import chatbotRoutes from "./routes/chatbotRoutes"

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
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Rutas
app.use("/api/auth", authRoutes)
app.use("/api/chatbot", chatbotRoutes)

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "BeFixed API está funcionando correctamente",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  })
})

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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

export default app
