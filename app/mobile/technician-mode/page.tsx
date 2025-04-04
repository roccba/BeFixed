"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, MapPin, Search, Bell, Zap, Droplet, Flame, Key, BarChart, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function TechnicianModePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAvailable, setIsAvailable] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Manejar cambio de disponibilidad
  const handleAvailabilityChange = (newValue: boolean) => {
    setIsAvailable(newValue)

    toast({
      title: newValue ? "Ahora estás disponible" : "Ahora estás desconectado",
      description: newValue
        ? "Empezarás a recibir solicitudes de servicio"
        : "No recibirás nuevas solicitudes de servicio",
      duration: 3000,
    })

    // Vibración en dispositivos móviles
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  // Solicitudes de servicio pendientes
  const pendingRequests = [
    {
      id: 1,
      clientName: "Laura Martínez",
      service: "Reparación eléctrica",
      location: "Av. Reforma 247, Juárez",
      distance: "2.3 km",
      estimatedTime: "15 min",
      price: "$350 - $450",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LM",
    },
    {
      id: 2,
      clientName: "Roberto García",
      service: "Instalación de enchufe",
      location: "Calle Hidalgo 78, Centro",
      distance: "1.8 km",
      estimatedTime: "12 min",
      price: "$250 - $300",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RG",
    },
  ]

  // Servicios programados
  const scheduledServices = [
    {
      id: 3,
      clientName: "María Sánchez",
      service: "Revisión sistema eléctrico",
      location: "Av. Insurgentes 1500, Del Valle",
      date: "Mañana, 10:00 AM",
      price: "$450",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MS",
    },
    {
      id: 4,
      clientName: "Juan Pérez",
      service: "Instalación de lámparas",
      location: "Calle Durango 45, Roma",
      date: "15 Mayo, 16:30 PM",
      price: "$600",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JP",
    },
  ]

  // Estadísticas
  const stats = [
    { label: "Servicios completados", value: "124", icon: CheckCircle2, color: "text-primary" },
    { label: "Calificación", value: "4.8 ★", icon: Star, color: "text-yellow-500" },
    { label: "Ganancias del mes", value: "$12,450", icon: BarChart, color: "text-primary" },
    { label: "Horas trabajadas", value: "87h", icon: Clock, color: "text-primary" },
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
            <span className="ml-2 text-sm font-normal text-muted-foreground">Técnico</span>
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
        {/* Perfil y disponibilidad */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-befixed-gradient-strong p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14 border-2 border-primary/20">
                  <AvatarImage src="/placeholder.svg?height=56&width=56" />
                  <AvatarFallback>CR</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold text-lg">Carlos Rodríguez</h2>
                  <p className="text-sm text-muted-foreground">Electricista</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{isAvailable ? "Disponible" : "Desconectado"}</span>
                  <Switch checked={isAvailable} onCheckedChange={handleAvailabilityChange} />
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/mobile/technician-mode/profile")}>
                  Ver perfil
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Ganancias de hoy</p>
                <p className="text-xl font-bold text-primary">$850</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Servicios completados</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ubicación */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Tu ubicación</p>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-primary mr-1" />
              <span className="font-medium">Av. Constitución 1023, Centro</span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push("/mobile/technician-mode/map")}>
            Ver mapa
          </Button>
        </div>

        {/* Solicitudes y servicios */}
        <Tabs defaultValue="requests">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="requests" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" /> Solicitudes
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Programados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="mt-4 space-y-4">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden border-2 border-primary/20 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.avatar} />
                        <AvatarFallback>{request.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{request.clientName}</h3>
                          <Badge className="bg-yellow-500">Nueva</Badge>
                        </div>
                        <p className="text-sm font-medium text-primary">{request.service}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="truncate">{request.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span>
                          {request.distance} • {request.estimatedTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">{request.price}</span>
                      <span className="text-xs text-muted-foreground">Expira en 2:45</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          toast({
                            title: "Solicitud rechazada",
                            description: "Has rechazado la solicitud de servicio",
                            duration: 3000,
                          })
                        }}
                      >
                        Rechazar
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => {
                          toast({
                            title: "Solicitud aceptada",
                            description: "Has aceptado la solicitud de servicio",
                            duration: 3000,
                          })

                          // Vibración
                          if (navigator.vibrate) {
                            navigator.vibrate([100, 50, 100])
                          }

                          router.push("/mobile/technician-mode/service/1")
                        }}
                      >
                        Aceptar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="bg-muted inline-flex rounded-full p-3 mb-4">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">No hay solicitudes pendientes</h3>
                <p className="text-sm text-muted-foreground">Las nuevas solicitudes aparecerán aquí</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="scheduled" className="mt-4 space-y-4">
            {scheduledServices.map((service) => (
              <Card key={service.id} className="overflow-hidden border border-border shadow-sm bg-secondary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={service.avatar} />
                      <AvatarFallback>{service.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{service.clientName}</h3>
                        <Badge variant="outline">Programado</Badge>
                      </div>
                      <p className="text-sm font-medium text-primary">{service.service}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="truncate">{service.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>{service.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{service.price}</span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push(`/mobile/technician-mode/service/${service.id}`)}
                  >
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Estadísticas */}
        <div>
          <h2 className="text-lg font-medium mb-3">Estadísticas</h2>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-secondary/20">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <stat.icon className={`h-5 w-5 ${stat.color} mb-1`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="font-bold">{stat.value}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Especialidades */}
        <div>
          <h2 className="text-lg font-medium mb-3">Tus especialidades</h2>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-secondary text-primary flex items-center gap-1 px-3 py-1 rounded-full">
              <Zap className="h-3 w-3" /> Instalaciones eléctricas
            </Badge>
            <Badge className="bg-secondary text-primary flex items-center gap-1 px-3 py-1 rounded-full">
              <Droplet className="h-3 w-3" /> Reparaciones
            </Badge>
            <Badge className="bg-secondary text-primary flex items-center gap-1 px-3 py-1 rounded-full">
              <Flame className="h-3 w-3" /> Emergencias
            </Badge>
            <Badge className="bg-secondary text-primary flex items-center gap-1 px-3 py-1 rounded-full">
              <Key className="h-3 w-3" /> Certificaciones
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Star para las estadísticas
function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill="currentColor"
      />
    </svg>
  )
}

