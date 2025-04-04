"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Phone, MessageCircle, Clock, MapPin, Shield, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function TechnicianPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isHiring, setIsHiring] = useState(false)

  // Datos del técnico (en una app real, estos datos vendrían de una API)
  const technician = {
    id: Number.parseInt(params.id),
    name: params.id === "1" ? "Carlos Rodríguez" : params.id === "2" ? "Ana Martínez" : "Miguel Sánchez",
    specialty: params.id === "1" ? "Electricista" : params.id === "2" ? "Plomera" : "Cerrajero",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: params.id === "1" ? "4.8" : params.id === "2" ? "4.9" : "4.7",
    reviews: params.id === "1" ? "56" : params.id === "2" ? "32" : "41",
    distance: params.id === "1" ? "1.2 km" : params.id === "2" ? "2.5 km" : "3.8 km",
    initials: params.id === "1" ? "CR" : params.id === "2" ? "AM" : "MS",
    eta: params.id === "1" ? "8 min" : params.id === "2" ? "12 min" : "15 min",
    price: params.id === "1" ? "$350/hr" : params.id === "2" ? "$380/hr" : "$320/hr",
    experience: params.id === "1" ? "8 años" : params.id === "2" ? "6 años" : "5 años",
    completedJobs: params.id === "1" ? "124" : params.id === "2" ? "98" : "87",
    certifications: ["Técnico certificado nivel 2", "Seguridad eléctrica", "Instalaciones residenciales"],
    reviews: [
      {
        name: "Laura M.",
        date: "Hace 2 semanas",
        rating: 5,
        comment: "Excelente servicio, muy profesional y puntual. Resolvió el problema rápidamente.",
      },
      {
        name: "Roberto G.",
        date: "Hace 1 mes",
        rating: 4,
        comment: "Buen trabajo, aunque tardó un poco más de lo esperado. El resultado final fue muy bueno.",
      },
      {
        name: "María P.",
        date: "Hace 2 meses",
        rating: 5,
        comment: "Muy recomendable. Llegó a tiempo y solucionó el problema sin complicaciones.",
      },
    ],
  }

  const handleHire = () => {
    setIsHiring(true)

    // Simular proceso de contratación
    setTimeout(() => {
      setIsHiring(false)

      toast({
        title: `Has contratado a ${technician.name}`,
        description: `El técnico llegará en aproximadamente ${technician.eta}`,
        duration: 5000,
      })

      // Vibración en dispositivos móviles
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 200])
      }

      // Redirigir a la página de seguimiento
      router.push("/mobile/tracking")
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full overflow-auto pb-20">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold">Perfil del técnico</h2>
          </div>
        </div>
      </header>

      {/* Información del técnico */}
      <div className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={technician.avatar} />
            <AvatarFallback>{technician.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{technician.name}</h1>
              <Badge className="bg-green-500">Disponible</Badge>
            </div>
            <p className="text-muted-foreground">{technician.specialty}</p>
            <div className="flex items-center mt-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(Number.parseFloat(technician.rating)) ? "fill-current" : "stroke-current fill-none"}`}
                  />
                ))}
              </div>
              <span className="ml-1 text-sm">
                {technician.rating} ({technician.reviews} reseñas)
              </span>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1" onClick={() => router.push("/mobile/chat")}>
            <MessageCircle className="h-4 w-4 mr-2" /> Mensaje
          </Button>
          <Button variant="outline" className="flex-1">
            <Phone className="h-4 w-4 mr-2" /> Llamar
          </Button>
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card>
            <CardContent className="p-3 flex flex-col items-center">
              <Clock className="h-5 w-5 text-primary mb-1" />
              <span className="text-sm text-muted-foreground">Tiempo de llegada</span>
              <span className="font-medium">{technician.eta}</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex flex-col items-center">
              <MapPin className="h-5 w-5 text-primary mb-1" />
              <span className="text-sm text-muted-foreground">Distancia</span>
              <span className="font-medium">{technician.distance}</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex flex-col items-center">
              <Shield className="h-5 w-5 text-primary mb-1" />
              <span className="text-sm text-muted-foreground">Experiencia</span>
              <span className="font-medium">{technician.experience}</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex flex-col items-center">
              <Award className="h-5 w-5 text-primary mb-1" />
              <span className="text-sm text-muted-foreground">Trabajos completados</span>
              <span className="font-medium">{technician.completedJobs}</span>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de información */}
        <Tabs defaultValue="about" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">Acerca de</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Descripción</h3>
              <p className="text-sm text-muted-foreground">
                {technician.name} es un {technician.specialty.toLowerCase()} profesional con {technician.experience} de
                experiencia en el sector. Especializado en instalaciones y reparaciones tanto residenciales como
                comerciales.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Certificaciones</h3>
              <ul className="space-y-2">
                {technician.certifications.map((cert, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Shield className="h-4 w-4 text-primary mr-2" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tarifa</h3>
              <p className="text-sm">
                <span className="font-bold text-lg">{technician.price}</span>
                <span className="text-muted-foreground ml-2">+ materiales (si se requieren)</span>
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4 space-y-4">
            {technician.reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.date}</div>
                  </div>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? "fill-current" : "stroke-current fill-none"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm mt-2">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="services" className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Diagnóstico</span>
                <span className="font-medium">$150</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Reparación básica</span>
                <span className="font-medium">$350 - $500</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Instalación</span>
                <span className="font-medium">$450 - $800</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Mantenimiento</span>
                <span className="font-medium">$300 - $600</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                * Los precios pueden variar según la complejidad del trabajo y los materiales necesarios.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Botón de contratar fijo en la parte inferior */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background border-t border-border">
        <Button className="w-full h-12 text-lg" onClick={handleHire} disabled={isHiring}>
          {isHiring ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Procesando...
            </>
          ) : (
            <>Contratar ahora</>
          )}
        </Button>
      </div>
    </div>
  )
}

