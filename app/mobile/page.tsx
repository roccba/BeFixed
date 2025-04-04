"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Zap, Droplet, Flame, Key, Wrench, Wifi, MapPin, Search, Bell } from "lucide-react"
import Link from "next/link"

export default function MobileHome() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Servicios destacados
  const featuredServices = [
    {
      name: "Electricidad",
      icon: Zap,
      color: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-500",
    },
    {
      name: "Plomería",
      icon: Droplet,
      color: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-500",
    },
    {
      name: "Gas",
      icon: Flame,
      color: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-500",
    },
    {
      name: "Cerrajería",
      icon: Key,
      color: "bg-gray-100 dark:bg-gray-800/50",
      iconColor: "text-gray-500",
    },
    {
      name: "Mantenimiento",
      icon: Wrench,
      color: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-500",
    },
    {
      name: "Redes",
      icon: Wifi,
      color: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-500",
    },
  ]

  // Técnicos cercanos
  const nearbyTechnicians = [
    {
      name: "Carlos Rodríguez",
      specialty: "Electricista",
      rating: 4.8,
      distance: "1.2 km",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "CR",
      id: 1,
    },
    {
      name: "Ana Martínez",
      specialty: "Plomera",
      rating: 4.9,
      distance: "2.5 km",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AM",
      id: 2,
    },
    {
      name: "Miguel Sánchez",
      specialty: "Cerrajero",
      rating: 4.7,
      distance: "3.8 km",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MS",
      id: 3,
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">
            <span className="text-primary">Be</span>
            <span className="text-foreground">Fixed</span>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto pb-20">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold">
            <span className="text-primary">Be</span>
            <span className="text-foreground">Fixed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="px-4 py-4 space-y-6">
        {/* Ubicación */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Tu ubicación</p>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-primary mr-1" />
              <span className="font-medium">Av. Constitución 1023, Centro</span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push("/mobile/map")}>
            Cambiar
          </Button>
        </div>

        {/* Botón principal */}
        <Button className="w-full h-14 text-lg" onClick={() => router.push("/mobile/chat")}>
          ¿Qué servicio necesitas hoy?
        </Button>

        {/* Servicios destacados */}
        <div>
          <h2 className="text-lg font-medium mb-3">Servicios destacados</h2>
          <div className="grid grid-cols-3 gap-3">
            {featuredServices.map((service) => (
              <Link
                href="/mobile/chat"
                key={service.name}
                className="flex flex-col items-center p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 hover:border-primary/50 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full ${service.color} flex items-center justify-center mb-2`}>
                  <service.icon className={`h-5 w-5 ${service.iconColor}`} />
                </div>
                <span className="text-sm text-center">{service.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Técnicos cercanos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Técnicos cercanos</h2>
            <Link href="/mobile/map" className="text-sm text-primary">
              Ver mapa
            </Link>
          </div>
          <div className="space-y-4">
            {nearbyTechnicians.map((tech) => (
              <Card
                key={tech.name}
                className="overflow-hidden border-2 border-primary/10 shadow-md hover:border-primary/30 transition-all"
              >
                <CardContent className="p-0">
                  <div className="bg-befixed-gradient p-3">
                    <div className="flex items-center">
                      <Avatar className="h-14 w-14 mr-3 border-2 border-primary/20">
                        <AvatarImage src={tech.avatar} />
                        <AvatarFallback>{tech.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{tech.name}</h3>
                          <Badge className="bg-primary shadow-sm">Disponible</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{tech.specialty}</span>
                          <span className="mx-1">•</span>
                          <div className="flex items-center text-yellow-500">
                            <span>★</span>
                            <span className="ml-1">{tech.rating}</span>
                          </div>
                          <span className="mx-1">•</span>
                          <span>{tech.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex p-3 pt-0 mt-2">
                    <Button variant="outline" className="flex-1 mr-2" onClick={() => router.push("/mobile/chat")}>
                      Contactar
                    </Button>
                    <Button className="flex-1" onClick={() => router.push(`/mobile/technician/${tech.id || 1}`)}>
                      Contratar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Servicios recientes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Servicios recientes</h2>
            <Link href="/mobile/history" className="text-sm text-primary">
              Ver todos
            </Link>
          </div>
          <Card className="bg-secondary/20">
            <CardContent className="p-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <Droplet className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Reparación de fuga</h3>
                    <span className="text-sm text-muted-foreground">12/04/2023</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Plomería</span>
                    <span className="mx-1">•</span>
                    <span>★ 5.0</span>
                    <span className="mx-1">•</span>
                    <span>$850</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3" onClick={() => router.push("/mobile/chat")}>
                Solicitar de nuevo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

