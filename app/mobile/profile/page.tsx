"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, User, CreditCard, Bell, Shield, LogOut, ChevronRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full overflow-auto pb-20">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/mobile")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold">Mi perfil</h2>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Perfil del usuario */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">Carlos Navarro</h1>
            <p className="text-muted-foreground">carlos@ejemplo.com</p>
            <Button variant="outline" size="sm" className="mt-2">
              Editar perfil
            </Button>
          </div>
        </div>

        {/* Secciones del perfil */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">CUENTA</h3>
            <Card>
              <CardContent className="p-0">
                <button className="w-full flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-primary mr-3" />
                    <span>Información personal</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                <button
                  className="w-full flex items-center justify-between p-4 border-b border-border"
                  onClick={() => router.push("/mobile/payments")}
                >
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-primaryry mr-3" />
                    <span>Métodos de pago</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-primary mr-3" />
                    <span>Notificaciones</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">SEGURIDAD</h3>
            <Card>
              <CardContent className="p-0">
                <button className="w-full flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-3" />
                    <span>Cambiar contraseña</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-3" />
                    <span>Verificación en dos pasos</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">HISTORIAL</h3>
            <Card>
              <CardContent className="p-0">
                <button
                  className="w-full flex items-center justify-between p-4 border-b border-border"
                  onClick={() => router.push("/mobile/history")}
                >
                  <div className="flex items-center">
                    <span>Servicios completados</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <span>Facturas</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">APLICACIÓN</h3>
            <Card>
              <CardContent className="p-0">
                <button className="w-full flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center">
                    <span>Acerca de BeFixed</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center">
                    <span>Términos y condiciones</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <span>Política de privacidad</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </div>

          <Button variant="destructive" className="w-full" onClick={() => router.push("/login")}>
            <LogOut className="h-5 w-5 mr-2" /> Cerrar sesión
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">Versión 1.0.0</p>
        </div>
      </div>
    </div>
  )
}
