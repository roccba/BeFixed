"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Filter, User, Search, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import DashboardLayout from "@/components/dashboard-layout"

export default function TechnicianMapPage() {
  const [isAvailable, setIsAvailable] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Datos de clientes que necesitan servicio
  const clients = [
    {
      id: 1,
      name: "Laura Martínez",
      service: "Reparación eléctrica",
      location: "Av. Reforma 247, Juárez",
      distance: "2.3 km",
      estimatedTime: "15 min",
      price: "$350 - $450",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LM",
      position: { top: "30%", left: "35%" },
    },
    {
      id: 2,
      name: "Roberto García",
      service: "Instalación de enchufe",
      location: "Calle Hidalgo 78, Centro",
      distance: "1.8 km",
      estimatedTime: "12 min",
      price: "$250 - $300",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RG",
      position: { top: "60%", left: "55%" },
    },
    {
      id: 3,
      name: "María Sánchez",
      service: "Revisión sistema eléctrico",
      location: "Av. Insurgentes 1500, Del Valle",
      distance: "3.5 km",
      estimatedTime: "20 min",
      price: "$400 - $600",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MS",
      position: { bottom: "25%", right: "30%" },
    },
  ]

  const [selectedClient, setSelectedClient] = useState<number | null>(null)

  return (
    <DashboardLayout userType="technician">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mapa de servicios disponibles</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm">{isAvailable ? "Disponible" : "No disponible"}</span>
            <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4 gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por dirección o tipo de servicio"
                  className="pl-9 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" /> Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="bg-muted/30 p-4 rounded-md mb-4">
              <h3 className="font-medium text-sm mb-3">Filtrar por:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Servicios urgentes
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Distancia cercana
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Mejor pago
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Clientes frecuentes
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            {/* Mapa */}
            <div className="flex-1 relative h-[500px] bg-[url('/placeholder.svg?height=500&width=800')] bg-cover bg-center rounded-lg">
              {/* Pines de clientes */}
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={client.position as React.CSSProperties}
                  onClick={() => setSelectedClient(client.id)}
                >
                  <div className="relative">
                    <MapPin
                      className={`h-8 w-8 ${selectedClient === client.id ? "text-primary-foreground bg-primary rounded-full p-1" : "text-red-500"}`}
                    />
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-500 rounded-full border-2 border-white" />
                  </div>
                </div>
              ))}

              {/* Marcador de ubicación actual */}
              <div className="absolute bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
                <div className="relative">
                  <div className="h-6 w-6 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-blue-500 rounded-full opacity-30 animate-ping" />
                </div>
              </div>

              {/* Controles del mapa */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" variant="secondary" className="shadow-md">
                  <MapPin className="h-4 w-4 mr-1" /> Mi ubicación
                </Button>
              </div>
            </div>

            {/* Lista de servicios */}
            <div className="w-full md:w-80 lg:w-96">
              <h3 className="font-medium mb-3">Servicios disponibles</h3>
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                {clients.map((client) => (
                  <Card
                    key={client.id}
                    className={`cursor-pointer transition-all ${selectedClient === client.id ? "border-primary" : ""}`}
                    onClick={() => setSelectedClient(client.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback>{client.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{client.name}</h4>
                            <Badge className="bg-yellow-500 text-yellow-950">Pendiente</Badge>
                          </div>
                          <p className="text-sm font-medium text-primary">{client.service}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {client.distance} • {client.estimatedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      {selectedClient === client.id && (
                        <div className="mt-3">
                          <p className="text-sm text-muted-foreground mb-2">{client.location}</p>
                          <p className="text-sm font-medium mb-2">Tarifa estimada: {client.price}</p>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" className="flex-1">
                              Rechazar
                            </Button>
                            <Button className="flex-1">Aceptar</Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

