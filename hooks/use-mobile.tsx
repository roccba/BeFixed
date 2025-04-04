"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Función para verificar si es móvil
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px es el breakpoint para md en Tailwind
    }

    // Verificar al cargar
    checkIfMobile()

    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener("resize", checkIfMobile)

    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}

