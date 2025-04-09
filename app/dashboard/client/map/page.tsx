"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Filter, User, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/components/dashboard-layout"

export default function ClientMapPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTechnician, setSelectedTechnician] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const technicians = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      specialty: "Electricista",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: "4.8",
      reviews: "56",
      distance: "1.2 km",
      initials: "CR",
      eta: "8 min",
      position: { top: "25%", left: "25%" },
    },
    {
      id: 2,
      name: "Ana Martínez",
      specialty: "Plomera",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: "4.9",
      reviews: "32",
      distance: "2.5 km",
      initials: "AM",
      eta: "12 min",
      position: { top: "50%", left: "50%" },
    },
    {
      id: 3,
      name: "Miguel Sánchez",
      specialty: "Cerrajero",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: "4.7",
      reviews: "41",
      distance: "3.8 km",
      initials: "MS",
      eta: "15 min",
      position: { bottom: "33%", right: "25%" },
    },
  ]

  return (
    <DashboardLayout userType="client">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mapa de técnicos disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4 gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por dirección o servicio"
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
                  Solo certificados
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Disponibles ahora
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Mejor valorados
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Menor tiempo de llegada
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            {/* Mapa */}
            <div className="flex-1 relative h-[500px] bg-[url('/placeholder.svg?height=500&width=800')] bg-cover bg-center rounded-lg">
              {/* Pines de técnicos */}
              {technicians.map((tech) => (
                <div
                  key={tech.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={tech.position as React.CSSProperties}
                  onClick={() => setSelectedTechnician(tech.id)}
                >
                  <div className="relative">
                    <MapPin
                      className={`h-8 w-8 ${selectedTechnician === tech.id ? "text-primary-foreground bg-primary rounded-full p-1" : "text-primary"}`}
                    />
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
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

            {/* Lista de técnicos */}
            <div className="w-full md:w-80 lg:w-96">
              <h3 className="font-medium mb-3">Técnicos disponibles</h3>
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                {technicians.map((tech) => (
                  <Card
                    key={tech.id}
                    className={`cursor-pointer transition-all ${selectedTechnician === tech.id ? "border-primary" : ""}`}
                    onClick={() => setSelectedTechnician(tech.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={tech.avatar} />
                          <AvatarFallback>{tech.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{tech.name}</h4>
                            <Badge className="bg-green-500">Disponible</Badge>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{tech.specialty}</span>
                            <span className="mx-1">•</span>
                            <span>★ {tech.rating}</span>
                            <span className="mx-1">•</span>
                            <span>{tech.distance}</span>
                            <span className="mx-1">•</span>
                            <span>Llegada: {tech.eta}</span>
                          </div>
                        </div>
                      </div>
                      {selectedTechnician === tech.id && (
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" className="flex-1">
                            Contactar
                          </Button>
                          <Button className="flex-1">Contratar</Button>
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
