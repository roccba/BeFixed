// Componente reutilizable para instalar la PWA
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Smartphone } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PWAInstallButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  fullWidth?: boolean
  showIcon?: boolean
  text?: string
}

export default function PWAInstallButton({
  variant = "default",
  size = "default",
  className = "",
  fullWidth = false,
  showIcon = true,
  text = "Instalar aplicación",
}: PWAInstallButtonProps) {
  const [isInstallable, setIsInstallable] = useState(false)
  const { toast } = useToast()

  // Verificar si la PWA es instalable
  useEffect(() => {
    const checkInstallable = () => {
      // @ts-ignore - La propiedad deferredPrompt no está en el tipo Window
      setIsInstallable(!!window.deferredPrompt)
    }

    // Verificar al cargar
    checkInstallable()

    // Verificar cuando cambie el evento beforeinstallprompt
    window.addEventListener("beforeinstallprompt", checkInstallable)
    window.addEventListener("appinstalled", () => setIsInstallable(false))

    return () => {
      window.removeEventListener("beforeinstallprompt", checkInstallable)
      window.removeEventListener("appinstalled", () => setIsInstallable(false))
    }
  }, [])

  // Función para manejar la instalación de la PWA
  const handleInstallPWA = () => {
    // Verificar si el navegador soporta PWA
    if ("beforeinstallprompt" in window) {
      // @ts-ignore - La propiedad deferredPrompt no está en el tipo Window
      const deferredPrompt = window.deferredPrompt

      if (deferredPrompt) {
        // Mostrar el prompt de instalación
        deferredPrompt.prompt()

        // Esperar a que el usuario responda al prompt
        deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
          if (choiceResult.outcome === "accepted") {
            toast({
              title: "¡Instalación iniciada!",
              description: "La aplicación se está instalando en tu dispositivo",
              duration: 3000,
            })
          }
          // Limpiar el prompt guardado
          // @ts-ignore
          window.deferredPrompt = null
          setIsInstallable(false)
        })
      } else {
        // Si no hay un prompt guardado, es posible que la app ya esté instalada
        // o que el navegador no soporte la instalación
        toast({
          title: "Instalación no disponible",
          description: "La aplicación ya está instalada o tu navegador no soporta la instalación directa",
          duration: 3000,
        })
      }
    } else {
      // Navegador no soporta PWA
      toast({
        title: "Navegador no compatible",
        description: "Tu navegador no soporta la instalación de aplicaciones web progresivas",
        duration: 3000,
      })
    }
  }

  // Si la app no es instalable, no mostrar el botón
  if (!isInstallable) {
    return null
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
      onClick={handleInstallPWA}
    >
      {showIcon && <Smartphone className="mr-2 h-4 w-4" />}
      {text}
    </Button>
  )
}

