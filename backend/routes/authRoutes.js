const express = require("express")
const authController = require("../controllers/authController")

const router = express.Router()

// Rutas de autenticación
router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.get("/profile", authController.protect, authController.getProfile)
router.put("/profile", authController.protect, authController.updateProfile)
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-password", authController.resetPassword)

module.exports = router

