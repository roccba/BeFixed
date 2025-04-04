"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Award, Calendar, Clock, MapPin, PenToolIcon as Tool, Check, CreditCard } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useAuth } from "@/hooks/useAuth"

export default function TechnicianDashboard() {
  const router = useRouter()
  const { user, loading } = useAuth()

  // Redirigir si no está autenticado o no es técnico
  useEffect(() => {
    if (!loading && (!user || user.role !== "technician")) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  return (
    <DashboardLayout userType="technician">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Contenido principal */}
        <div className="flex-1">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Servicio activo</CardTitle>
              <CardDescription>Detalles del servicio en curso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-border rounded-lg bg-primary/5">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-medium">Reparación eléctrica</h3>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>Av. Constitución 1023, Centro</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Carlos Navarro (Cliente)</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-sm text-muted-foreground mb-2">Tiempo estimado de llegada:</div>
                    <div className="text-2xl font-bold text-primary">5 minutos</div>
                    <Button size="sm" className="mt-2" variant="outline">
                      Contactar cliente
                    </Button>
                  </div>
                </div>

                {/* Progress steps */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-between">
                      <div className="flex flex-col items-center">
                        <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Aceptado</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">En camino</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="rounded-full h-8 w-8 flex items-center justify-center bg-secondary border border-primary text-primary">
                          <Clock className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Llegada</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="rounded-full h-8 w-8 flex items-center justify-center bg-secondary text-muted-foreground">
                          <Tool className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Servicio</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="rounded-full h-8 w-8 flex items-center justify-center bg-secondary text-muted-foreground">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1">Cobro</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestión de servicios</CardTitle>
              <CardDescription>Administra tus trabajos activos y programados</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="active" className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" /> Activos
                  </TabsTrigger>
                  <TabsTrigger value="scheduled" className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" /> Programados
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="mt-4">
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Reparación eléctrica</h4>
                          <p className="text-sm text-muted-foreground">Av. Constitución 1023, Centro</p>
                          <div className="flex items-center mt-2 text-sm">
                            <Clock className="h-3 w-3 mr-1 text-primary" />
                            <span>En progreso - 25 min</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Instalación de grifo</h4>
                          <p className="text-sm text-muted-foreground">Calle Reforma 506, Juárez</p>
                          <div className="flex items-center mt-2 text-sm">
                            <Clock className="h-3 w-3 mr-1 text-yellow-500" />
                            <span>Pendiente - Llegada en 10 min</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="scheduled" className="mt-4">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["L", "M", "M", "J", "V", "S", "D"].map((day, i) => (
                      <div key={i} className="text-center font-medium text-sm">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i + 1}
                        className={`h-10 border border-border rounded-md flex items-center justify-center text-sm ${i === 14 || i === 22 ? "bg-primary/10 text-primary font-medium" : ""}`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Mantenimiento de caldera</h4>
                          <p className="text-sm text-muted-foreground">Calle Hidalgo 302, Polanco</p>
                          <div className="flex items-center mt-2 text-sm">
                            <Calendar className="h-3 w-3 mr-1 text-primary" />
                            <span>15 de Mayo - 10:00 AM</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Revisión sistema eléctrico</h4>
                          <p className="text-sm text-muted-foreground">Av. Insurgentes 1500, Del Valle</p>
                          <div className="flex items-center mt-2 text-sm">
                            <Calendar className="h-3 w-3 mr-1 text-primary" />
                            <span>23 de Mayo - 16:30 PM</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Formación y certificaciones</CardTitle>
              <CardDescription>Mejora tus habilidades con nuestros cursos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Electricidad Nivel 2</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Plomería Avanzada</span>
                    <span>40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Seguridad Laboral</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-lg flex flex-col items-center">
                    <Award className="h-8 w-8 text-yellow-500 mb-2" />
                    <h4 className="font-medium text-sm text-center">Electricista Certificado</h4>
                    <p className="text-xs text-muted-foreground mt-1 text-center">Nivel 1</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg flex flex-col items-center">
                    <Award className="h-8 w-8 text-blue-500 mb-2" />
                    <h4 className="font-medium text-sm text-center">Plomero Certificado</h4>
                    <p className="text-xs text-muted-foreground mt-1 text-center">Nivel 1</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg flex flex-col items-center">
                    <Award className="h-8 w-8 text-green-500 mb-2" />
                    <h4 className="font-medium text-sm text-center">Seguridad Laboral</h4>
                    <p className="text-xs text-muted-foreground mt-1 text-center">Certificado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

