import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Award, BarChart, Calendar, Clock, MapPin, PenToolIcon as Tool, User, Check, CreditCard } from "lucide-react"
import Link from "next/link"

export default function TechnicianDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-primary-foreground">Be</span>
              <span className="text-primary-foreground/80">Fixed</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <span>Carlos Martínez</span>
              </div>
              <Link href="/">
                <Button variant="secondary" size="sm">
                  Cerrar sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>CM</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">Carlos Martínez</h2>
                  <p className="text-sm text-muted-foreground">carlos.martinez@ejemplo.com</p>
                  <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs rounded-full">
                    Disponible
                  </div>

                  <div className="w-full mt-6 space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/technician">
                        <Clock className="mr-2 h-4 w-4" />
                        Servicios
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/technician/training">
                        <Award className="mr-2 h-4 w-4" />
                        Formación
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/technician/earnings">
                        <BarChart className="mr-2 h-4 w-4" />
                        Ganancias
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/technician/profile">
                        <User className="mr-2 h-4 w-4" />
                        Perfil
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
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
      </main>
    </div>
  )
}

