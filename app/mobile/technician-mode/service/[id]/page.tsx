"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Phone, MessageCircle, Clock, MapPin, Check, Camera } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export default function TechnicianServicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [notes, setNotes] = useState("")
  const [showCompleteForm, setShowCompleteForm] = useState(false)
  const [materials, setMaterials] = useState("")
  const [laborHours, setLaborHours] = useState("1.5")
  const [totalAmount, setTotalAmount] = useState("525")

  // Datos del cliente y servicio
  const serviceData = {
    id: Number.parseInt(params.id),
    clientName: params.id === "1" ? "Laura Martínez" : "Roberto García",
    service: params.id === "1" ? "Reparación eléctrica" : "Instalación de enchufe",
    location: params.id === "1" ? "Av. Reforma 247, Juárez" : "Calle Hidalgo 78, Centro",
    distance: params.id === "1" ? "2.3 km" : "1.8 km",
    estimatedTime: params.id === "1" ? "15 min" : "12 min",
    price: params.id === "1" ? "$350 - $450" : "$250 - $300",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: params.id === "1" ? "LM" : "RG",
    phone: "+52 55 9876 5432",
    description:
      params.id === "1"
        ? "Tengo un problema con el interruptor de la luz de la sala. Cuando lo enciendo, a veces funciona y a veces no. Creo que puede estar fallando el cableado."
        : "Necesito instalar un enchufe nuevo en la cocina para conectar un electrodoméstico. La pared es de concreto.",
  }

  // Avanzar al siguiente paso
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      setProgress(progress + 25)

      // Notificaciones según el paso
      if (currentStep === 1) {
        toast({
          title: "En camino",
          description: `Has iniciado el viaje hacia ${serviceData.location}`,
          duration: 3000,
        })
      } else if (currentStep === 2) {
        toast({
          title: "Llegada confirmada",
          description: "Has llegado a la ubicación del cliente",
          duration: 3000,
        })
      } else if (currentStep === 3) {
        setShowCompleteForm(true)
      }

      // Vibración
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100])
      }
    }
  }

  // Completar servicio
  const handleCompleteService = () => {
    toast({
      title: "Servicio completado",
      description: "El servicio ha sido completado exitosamente",
      duration: 3000,
    })

    // Vibración
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 200])
    }

    // Redirigir al inicio
    setTimeout(() => {
      router.push("/mobile/technician-mode")
    }, 1500)
  }

  // Cancelar servicio
  const handleCancelService = () => {
    toast({
      title: "Servicio cancelado",
      description: "Has cancelado el servicio",
      duration: 3000,
    })

    // Redirigir al inicio
    router.push("/mobile/technician-mode")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => router.push("/mobile/technician-mode")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold">Detalles del servicio</h2>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Información del cliente */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={serviceData.avatar} />
                <AvatarFallback>{serviceData.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{serviceData.clientName}</h3>
                  <Badge className="bg-primary">Cliente</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{serviceData.service}</p>
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
                <span>ETA: {serviceData.estimatedTime}</span>
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
                  <h4 className="font-medium">Aceptado</h4>
                  {currentStep >= 1 && <span className="text-xs text-muted-foreground">10:30 AM</span>}
                </div>
                <p className="text-sm text-muted-foreground">Servicio aceptado</p>
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
                <p className="text-sm text-muted-foreground">En camino a la ubicación del cliente</p>
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
                <p className="text-sm text-muted-foreground">Llegada a la ubicación del cliente</p>
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
                <p className="text-sm text-muted-foreground">Trabajo finalizado y cobrado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detalles del servicio */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium">Detalles del servicio</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Servicio</span>
                <span>{serviceData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dirección</span>
                <span>{serviceData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distancia</span>
                <span>{serviceData.distance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tarifa estimada</span>
                <span>{serviceData.price}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Descripción del problema</h4>
              <p className="text-sm p-3 bg-muted rounded-md">{serviceData.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Mapa */}
        <div>
          <h3 className="font-medium mb-2">Ubicación</h3>
          <div className="h-48 bg-[url('/placeholder.svg?height=200&width=400')] bg-cover bg-center rounded-lg relative">
            {/* Marcador de ubicación del cliente */}
            <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
              <div className="h-6 w-6 rounded-full bg-primary border-4 border-white"></div>
            </div>

            {/* Marcador del técnico */}
            {currentStep >= 2 && currentStep < 3 && (
              <div className="absolute bottom-1/4 right-1/4">
                <MapPin className="h-8 w-8 text-blue-500" />
              </div>
            )}
          </div>
        </div>

        {/* Notas */}
        <div>
          <h3 className="font-medium mb-2">Notas del servicio</h3>
          <Textarea
            placeholder="Añade notas sobre el servicio aquí..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {/* Formulario de completar servicio */}
        {showCompleteForm && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">Completar servicio</h3>

              <div>
                <label className="text-sm text-muted-foreground">Materiales utilizados</label>
                <Textarea
                  placeholder="Ej: Cable 12 AWG, interruptor, cinta aislante..."
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Horas de trabajo</label>
                <div className="flex items-center mt-1">
                  <input
                    type="number"
                    value={laborHours}
                    onChange={(e) => setLaborHours(e.target.value)}
                    className="w-20 p-2 border border-border rounded-md"
                    step="0.5"
                  />
                  <span className="ml-2">horas</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Monto total a cobrar</label>
                <div className="flex items-center mt-1">
                  <span className="mr-1">$</span>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="w-24 p-2 border border-border rounded-md"
                  />
                  <span className="ml-2">MXN</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Fotos del trabajo</label>
                <Button
                  variant="outline"
                  className="w-full mt-1"
                  onClick={() => {
                    toast({
                      title: "Tomar foto",
                      description: "Función no disponible en esta versión",
                      duration: 2000,
                    })
                  }}
                >
                  <Camera className="h-4 w-4 mr-2" /> Tomar foto
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Botones de acción */}
        <div className="space-y-3 pb-4">
          {currentStep < 4 ? (
            <>
              <Button className="w-full" onClick={handleNextStep}>
                {currentStep === 1
                  ? "Iniciar viaje"
                  : currentStep === 2
                    ? "Confirmar llegada"
                    : currentStep === 3
                      ? "Completar servicio"
                      : ""}
              </Button>

              {currentStep < 3 && (
                <Button variant="outline" className="w-full" onClick={handleCancelService}>
                  Cancelar servicio
                </Button>
              )}
            </>
          ) : (
            <Button className="w-full" onClick={handleCompleteService}>
              Finalizar y cobrar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

