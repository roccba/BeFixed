"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CreditCard, Star, Repeat, MapPin, PenToolIcon as Tool, Check } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useAuth } from "@/hooks/useAuth"

export default function ClientDashboard() {
  const router = useRouter()
  const { user, loading } = useAuth()

  // Redirigir si no está autenticado o no es cliente
  useEffect(() => {
    if (!loading && (!user || user.role !== "client")) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  return (
    <DashboardLayout userType="client">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Contenido principal */}
        <div className="flex-1">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Servicio activo</CardTitle>
              <CardDescription>Seguimiento de tu servicio en curso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-border rounded-lg bg-primary/5">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-medium">Reparación eléctrica</h3>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>Tu ubicación actual</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback>CM</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Carlos Martínez</span>
                      <div className="flex items-center ml-2">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs ml-1">4.9</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-sm text-muted-foreground mb-2">Tiempo estimado de llegada:</div>
                    <div className="text-2xl font-bold text-primary">12 minutos</div>
                    <Button size="sm" className="mt-2" variant="outline">
                      Contactar
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
                        <span className="text-xs mt-1">Confirmado</span>
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
                        <span className="text-xs mt-1">Pago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de servicios</CardTitle>
              <CardDescription>Todos tus servicios anteriores</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="completed">Completados</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">Reparación de fuga</h4>
                        <p className="text-sm text-muted-foreground">Plomería - 12/04/2023</p>
                        <div className="flex items-center mt-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < 5 ? "fill-current" : "stroke-current fill-none"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-xs">Excelente servicio</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">$850</span>
                        <Button size="sm" variant="ghost" className="mt-2">
                          <Repeat className="h-3 w-3 mr-1" /> Repetir
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">Instalación eléctrica</h4>
                        <p className="text-sm text-muted-foreground">Electricidad - 28/03/2023</p>
                        <div className="flex items-center mt-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < 4 ? "fill-current" : "stroke-current fill-none"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-xs">Buen trabajo</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">$1,200</span>
                        <Button size="sm" variant="ghost" className="mt-2">
                          <Repeat className="h-3 w-3 mr-1" /> Repetir
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">Cambio de cerradura</h4>
                        <p className="text-sm text-muted-foreground">Cerrajería - 15/03/2023</p>
                        <div className="flex items-center mt-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < 5 ? "fill-current" : "stroke-current fill-none"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-xs">Muy profesional</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">$650</span>
                        <Button size="sm" variant="ghost" className="mt-2">
                          <Repeat className="h-3 w-3 mr-1" /> Repetir
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {/* Contenido similar al anterior pero filtrado por completados */}
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">Reparación de fuga</h4>
                        <p className="text-sm text-muted-foreground">Plomería - 12/04/2023</p>
                        <div className="flex items-center mt-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < 5 ? "fill-current" : "stroke-current fill-none"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-xs">Excelente servicio</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">$850</span>
                        <Button size="sm" variant="ghost" className="mt-2">
                          <Repeat className="h-3 w-3 mr-1" /> Repetir
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cancelled">
                  <div className="p-4 text-center text-muted-foreground">No tienes servicios cancelados</div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

