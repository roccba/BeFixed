"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Filter, User, ArrowLeft, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function MapPage() {
  const router = useRouter()
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/mobile")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold">Mapa de técnicos</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por dirección o servicio"
              className="pl-9 pr-4 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Panel de filtros */}
      {showFilters && (
        <div className="bg-background p-4 border-b border-border">
          <h3 className="font-medium text-sm mb-3">Filtrar por:</h3>
          <div className="grid grid-cols-2 gap-3">
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
          <div className="mt-3 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowFilters(false)}>
              Cancelar
            </Button>
            <Button className="flex-1" onClick={() => setShowFilters(false)}>
              Aplicar
            </Button>
          </div>
        </div>
      )}

      {/* Mapa */}
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
        </div>

        {/* Información del técnico seleccionado */}
        {selectedTechnician && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="shadow-lg">
              <CardContent className="p-4">
                {technicians
                  .filter((tech) => tech.id === selectedTechnician)
                  .map((tech) => (
                    <div key={tech.id} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={tech.avatar} />
                          <AvatarFallback>{tech.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{tech.name}</h3>
                            <Badge className="bg-green-500">Disponible</Badge>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{tech.specialty}</span>
                            <span className="mx-1">•</span>
                            <span>
                              ★ {tech.rating} ({tech.reviews} reseñas)
                            </span>
                            <span className="mx-1">•</span>
                            <span>{tech.distance}</span>
                            <span className="mx-1">•</span>
                            <span>Llegada: {tech.eta}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => router.push("/mobile/chat")}>
                          Contactar
                        </Button>
                        <Button className="flex-1" onClick={() => router.push(`/mobile/technician/${tech.id}`)}>
                          Contratar
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
