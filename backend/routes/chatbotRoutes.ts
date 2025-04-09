import express from "express"
import * as chatbotController from "../controllers/chatbotController"
import * as authController from "../controllers/authController"

const router = express.Router()

// Rutas del chatbot
router.post("/message", chatbotController.processMessage)
router.get("/services", chatbotController.getServices)
router.post("/find-technicians", authController.optionalAuth, chatbotController.findTechnicians)
router.post("/book-service", authController.protect, chatbotController.bookService)
router.get("/conversation-history", authController.protect, chatbotController.getConversationHistory)

export default router
