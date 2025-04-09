"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Testimonials from "./components/Testimonials"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import FloatingChat from "./components/FloatingChat"
import { useAuth } from "@/hooks/useAuth"

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  // Detectar si es un dispositivo móvil y redirigir a la versión móvil
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) {
      // Si el usuario está autenticado, redirigir según su rol
      if (user) {
        if (user.role === "technician") {
          router.push("/mobile/technician-mode")
        } else {
          router.push("/mobile")
        }
      } else {
        router.push("/mobile")
      }
    } else if (user) {
      // En desktop, si el usuario está autenticado, redirigir según su rol
      if (user.role === "technician") {
        router.push("/dashboard/technician")
      } else {
        router.push("/dashboard/client")
      }
    }
  }, [router, user])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  )
}
