"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, MessageCircle, Clock, MapPin, Check, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export default function TrackingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [eta, setEta] = useState(8)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)

  // Datos del técnico
  const technician = {
    id: 1,
    name: "Carlos Rodríguez",
    specialty: "Electricista",
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "CR",
    phone: "+52 55 1234 5678",
  }

  // Simular progreso del técnico
  useEffect(() => {
    if (currentStep < 4) {
      const timer = setTimeout(
        () => {
          setCurrentStep((prev) => prev + 1)
          setProgress((prev) => prev + 25)

          if (currentStep === 1) {
            // Notificar cuando el técnico está en camino
            toast({
              title: "Técnico en camino",
              description: `${technician.name} está en camino a tu ubicación`,
              duration: 5000,
            })

            // Vibración
            if (navigator.vibrate) {
              navigator.vibrate([100, 50, 100])
            }
          } else if (currentStep === 2) {
            // Notificar cuando el técnico ha llegado
            toast({
              title: "Técnico ha llegado",
              description: `${technician.name} ha llegado a tu ubicación`,
              duration: 5000,
            })

            // Vibración
            if (navigator.vibrate) {
              navigator.vibrate([100, 50, 100, 50, 100])
            }
          } else if (currentStep === 3) {
            // Notificar cuando el servicio ha sido completado
            toast({
              title: "Servicio completado",
              description: "El técnico ha completado el servicio",
              duration: 5000,
            })

            // Mostrar pantalla de valoración
            setShowRating(true)

            // Vibración
            if (navigator.vibrate) {
              navigator.vibrate([100, 50, 200])
            }
          }
        },
        currentStep === 1 ? 10000 : currentStep === 2 ? 15000 : 20000,
      )

      return () => clearTimeout(timer)
    }
  }, [currentStep, toast, technician.name])

  // Simular cuenta regresiva de ETA
  useEffect(() => {
    if (currentStep === 1 && eta > 0) {
      const timer = setInterval(() => {
        setEta((prev) => prev - 1)
      }, 60000) // Actualizar cada minuto

      return () => clearInterval(timer)
    }
  }, [currentStep, eta])

  // Manejar envío de valoración
  const handleSubmitRating = () => {
    toast({
      title: "¡Gracias por tu valoración!",
      description: "Tu opinión nos ayuda a mejorar nuestro servicio",
      duration: 5000,
    })

    // Redirigir al inicio
    router.push("/mobile")
  }

  if (showRating) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="bg-background border-b border-border sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">Valorar servicio</h2>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={technician.avatar} />
            <AvatarFallback>{technician.initials}</AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-bold mb-1">{technician.name}</h2>
          <p className="text-muted-foreground mb-6">{technician.specialty}</p>

          <p className="text-center mb-4">¿Cómo calificarías el servicio recibido?</p>

          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)} className="text-2xl">
                <Star
                  className={`h-10 w-10 ${star <= rating ? "text-yellow-400 fill-current" : "text-muted-foreground"}`}
                />
              </button>
            ))}
          </div>

          <textarea
            placeholder="Comparte tu experiencia (opcional)"
            className="w-full p-3 border border-border rounded-md mb-6 h-32"
          />

          <Button className="w-full h-12" onClick={handleSubmitRating} disabled={rating === 0}>
            Enviar valoración
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/mobile")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold">Seguimiento de servicio</h2>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Información del técnico */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={technician.avatar} />
                <AvatarFallback>{technician.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{technician.name}</h3>
                  <Badge className="bg-green-500">En servicio</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{technician.specialty}</p>
                <div className="flex gap-3 mt-2">
                  <Button size="sm" variant="outline" className="h-8 px-3">
                    <Phone className="h-3 w-3 mr-1" /> Llamar
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 px-3" onClick={() => router.push("/mobile/chat")}>
                    <MessageCircle className="h-3 w-3 mr-1" /> Mensaje
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estado del servicio */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Estado del servicio</h3>
            {currentStep === 1 && (
              <div className="flex items-center text-primary">
                <Clock className="h-4 w-4 mr-1" />
                <span>ETA: {eta} min</span>
              </div>
            )}
          </div>

          <Progress value={progress} className="h-2 mb-6" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {currentStep > 1 ? <Check className="h-5 w-5" /> : 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Confirmado</h4>
                  {currentStep >= 1 && <span className="text-xs text-muted-foreground">10:30 AM</span>}
                </div>
                <p className="text-sm text-muted-foreground">Servicio confirmado y asignado</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {currentStep > 2 ? <Check className="h-5 w-5" /> : 2}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">En camino</h4>
                  {currentStep >= 2 && <span className="text-xs text-muted-foreground">10:35 AM</span>}
                </div>
                <p className="text-sm text-muted-foreground">Técnico en camino a tu ubicación</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {currentStep > 3 ? <Check className="h-5 w-5" /> : 3}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Llegada</h4>
                  {currentStep >= 3 && <span className="text-xs text-muted-foreground">10:43 AM</span>}
                </div>
                <p className="text-sm text-muted-foreground">Técnico ha llegado a tu ubicación</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {currentStep > 4 ? <Check className="h-5 w-5" /> : 4}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Servicio completado</h4>
                  {currentStep >= 4 && <span className="text-xs text-muted-foreground">11:15 AM</span>}
                </div>
                <p className="text-sm text-muted-foreground">Trabajo finalizado y verificado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div>
          <h3 className="font-medium mb-2">Ubicación</h3>
          <div className="h-48 bg-[url('/placeholder.svg?height=200&width=400')] bg-cover bg-center rounded-lg relative">
            {/* Marcador de ubicación actual */}
            <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
              <div className="h-6 w-6 rounded-full bg-blue-500 border-4 border-white"></div>
            </div>

            {/* Marcador del técnico */}
            {currentStep >= 2 && (
              <div
                className={`absolute ${currentStep === 2 ? "bottom-1/4 right-1/4" : "bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2"}`}
              >
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            )}
          </div>
        </div>

        {/* Detalles del servicio */}
        <div>
          <h3 className="font-medium mb-2">Detalles del servicio</h3>
          <Card>
            <CardContent className="p-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Servicio</span>
                <span>Reparación eléctrica</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dirección</span>
                <span>Av. Constitución 1023, Centro</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha</span>
                <span>Hoy, 10:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tarifa estimada</span>
                <span>$350 - $500</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botón de cancelar */}
        {currentStep < 3 && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              toast({
                title: "Servicio cancelado",
                description: "Has cancelado el servicio",
                duration: 3000,
              })
              router.push("/mobile")
            }}
          >
            Cancelar servicio
          </Button>
        )}
      </div>
    </div>
  )
}
