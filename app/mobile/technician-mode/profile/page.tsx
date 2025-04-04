"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Camera, Upload, Star, Award, Shield, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function TechnicianProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // Datos del técnico
  const [technicianData, setTechnicianData] = useState({
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@ejemplo.com",
    phone: "+52 55 1234 5678",
    specialty: "Electricista",
    description:
      "Electricista profesional con 8 años de experiencia en instalaciones y reparaciones residenciales y comerciales. Especializado en soluciones eléctricas eficientes y seguras.",
    hourlyRate: "350",
    services: [
      { id: 1, name: "Diagnóstico", price: "150", enabled: true },
      { id: 2, name: "Reparación básica", price: "350", enabled: true },
      { id: 3, name: "Instalación", price: "450", enabled: true },
      { id: 4, name: "Mantenimiento", price: "300", enabled: true },
    ],
    certifications: ["Técnico certificado nivel 2", "Seguridad eléctrica", "Instalaciones residenciales"],
  })

  const handleSaveProfile = () => {
    setIsEditing(false)

    toast({
      title: "Perfil actualizado",
      description: "Los cambios en tu perfil han sido guardados",
      duration: 3000,
    })

    // Vibración
    if (navigator.vibrate) {
      navigator.vibrate(100)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-auto pb-20">
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
            <h2 className="font-semibold">Mi perfil de técnico</h2>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
          >
            {isEditing ? "Guardar" : "Editar"}
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Foto de perfil */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback>CR</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                onClick={() => {
                  toast({
                    title: "Cambiar foto",
                    description: "Función no disponible en esta versión",
                    duration: 2000,
                  })
                }}
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="mt-2 text-center">
            <h1 className="text-xl font-bold">{technicianData.name}</h1>
            <p className="text-muted-foreground">{technicianData.specialty}</p>
            <div className="flex items-center justify-center mt-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-current" : "stroke-current fill-none"}`} />
                ))}
              </div>
              <span className="ml-1 text-sm">4.8 (56 reseñas)</span>
            </div>
          </div>
        </div>

        {/* Información personal */}
        <Card className="bg-secondary/20">
          <CardContent className={`p-4 ${isEditing ? "space-y-4" : "space-y-2"}`}>
            <h3 className="font-medium">Información personal</h3>

            {isEditing ? (
              <>
                <div>
                  <label className="text-sm text-muted-foreground">Nombre completo</label>
                  <Input
                    value={technicianData.name}
                    onChange={(e) => setTechnicianData({ ...technicianData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <Input
                    value={technicianData.email}
                    onChange={(e) => setTechnicianData({ ...technicianData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Teléfono</label>
                  <Input
                    value={technicianData.phone}
                    onChange={(e) => setTechnicianData({ ...technicianData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Especialidad</label>
                  <Input
                    value={technicianData.specialty}
                    onChange={(e) => setTechnicianData({ ...technicianData, specialty: e.target.value })}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm">{technicianData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Teléfono</span>
                  <span className="text-sm">{technicianData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Especialidad</span>
                  <span className="text-sm">{technicianData.specialty}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Descripción */}
        <Card className="bg-secondary/20">
          <CardContent className="p-4 space-y-2">
            <h3 className="font-medium">Descripción profesional</h3>

            {isEditing ? (
              <Textarea
                value={technicianData.description}
                onChange={(e) => setTechnicianData({ ...technicianData, description: e.target.value })}
                rows={4}
              />
            ) : (
              <p className="text-sm">{technicianData.description}</p>
            )}
          </CardContent>
        </Card>

        {/* Tarifas y servicios */}
        <Card className="bg-secondary/20">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Tarifas y servicios</h3>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Editar
                </Button>
              )}
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Tarifa por hora (MXN)</label>
              <div className="flex items-center mt-1">
                <span className="text-lg font-bold mr-1">$</span>
                {isEditing ? (
                  <Input
                    value={technicianData.hourlyRate}
                    onChange={(e) => setTechnicianData({ ...technicianData, hourlyRate: e.target.value })}
                    className="w-24"
                  />
                ) : (
                  <span className="text-lg font-bold">{technicianData.hourlyRate}</span>
                )}
                <span className="text-sm text-muted-foreground ml-2">por hora</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-muted-foreground">Servicios ofrecidos</label>

              {technicianData.services.map((service) => (
                <div key={service.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isEditing && (
                      <Switch
                        checked={service.enabled}
                        onCheckedChange={(checked) => {
                          setTechnicianData({
                            ...technicianData,
                            services: technicianData.services.map((s) =>
                              s.id === service.id ? { ...s, enabled: checked } : s,
                            ),
                          })
                        }}
                      />
                    )}
                    <span className={service.enabled ? "" : "text-muted-foreground"}>{service.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold mr-1">$</span>
                    {isEditing ? (
                      <Input
                        value={service.price}
                        onChange={(e) => {
                          setTechnicianData({
                            ...technicianData,
                            services: technicianData.services.map((s) =>
                              s.id === service.id ? { ...s, price: e.target.value } : s,
                            ),
                          })
                        }}
                        className="w-20"
                      />
                    ) : (
                      <span className="font-medium">{service.price}</span>
                    )}
                  </div>
                </div>
              ))}

              {isEditing && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setTechnicianData({
                      ...technicianData,
                      services: [
                        ...technicianData.services,
                        {
                          id: Math.max(...technicianData.services.map((s) => s.id)) + 1,
                          name: "Nuevo servicio",
                          price: "0",
                          enabled: true,
                        },
                      ],
                    })
                  }}
                >
                  Añadir servicio
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Certificaciones */}
        <Card className="bg-secondary/20">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Certificaciones</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast({
                    title: "Añadir certificación",
                    description: "Función no disponible en esta versión",
                    duration: 2000,
                  })
                }}
              >
                <Upload className="h-4 w-4 mr-1" /> Añadir
              </Button>
            </div>

            <div className="space-y-2">
              {technicianData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <Award className="h-5 w-5 text-primary" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas */}
        <Card className="bg-secondary/20">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium">Estadísticas</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Servicios completados</p>
                  <p className="font-bold">124</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calificación</p>
                  <p className="font-bold">4.8 ★</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nivel</p>
                  <p className="font-bold">Experto</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Certificaciones</p>
                  <p className="font-bold">3</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full" onClick={() => router.push("/mobile/technician-mode/earnings")}>
            Ver ganancias
          </Button>

          <Button variant="outline" className="w-full" onClick={() => router.push("/mobile")}>
            Cambiar a modo cliente
          </Button>
        </div>
      </div>
    </div>
  )
}

