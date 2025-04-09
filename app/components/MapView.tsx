"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Filter, User, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface MapViewProps {
  onBack?: () => void
  serviceType?: string
  location?: string
}

export default function MapView({
  onBack,
  serviceType = "Electricidad",
  location = "Tu ubicación actual",
}: MapViewProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTechnician, setSelectedTechnician] = useState<number | null>(null)

  const technicians = [
    {
      id: 1,
      name: "Carlos Rodríguez",
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
    <div className="flex flex-col h-full">
      <div className="border-b bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <Button variant="ghost" size="icon" className="rounded-full" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h2 className="font-semibold">Técnicos cercanos</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-background">
              {serviceType}
            </Badge>
            <Badge variant="outline" className="bg-background">
              <MapPin className="h-3 w-3 mr-1" /> {location}
            </Badge>
          </div>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        {/* Placeholder para el mapa - en una app real, usarías una biblioteca de mapas como Google Maps, Mapbox, etc. */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center">
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
        </div>

        {/* Controles del mapa */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="sm" variant="secondary" className="shadow-md">
            <MapPin className="h-4 w-4 mr-1" /> Mi ubicación
          </Button>
          <Button size="sm" variant="secondary" className="shadow-md" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-1" /> Filtros
          </Button>
        </div>

        {/* Panel de filtros */}
        {showFilters && (
          <div className="absolute top-20 right-4 bg-background p-3 rounded-lg shadow-lg border border-border w-48">
            <h4 className="font-medium text-sm mb-2">Filtrar por:</h4>
            <div className="space-y-2">
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
            </div>
          </div>
        )}

        {/* Información del técnico seleccionado */}
        {selectedTechnician && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="shadow-lg">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">Detalles del técnico</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {technicians
                  .filter((tech) => tech.id === selectedTechnician)
                  .map((tech) => (
                    <div key={tech.id} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={tech.avatar} />
                          <AvatarFallback>{tech.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{tech.name}</h3>
                            <Badge className="bg-green-500">Disponible</Badge>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="flex items-center">
                              ★★★★★ {tech.rating} ({tech.reviews} reseñas)
                            </span>
                            <span className="mx-1">•</span>
                            <span>{tech.distance}</span>
                            <span className="mx-1">•</span>
                            <span>Llegada: {tech.eta}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Contratar</Button>
                        <Button variant="outline" className="flex-1">
                          Contactar
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
