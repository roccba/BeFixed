"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { login, loading, error } = useAuth()
  const { toast } = useToast()
  const [clientEmail, setClientEmail] = useState("")
  const [clientPassword, setClientPassword] = useState("")
  const [techEmail, setTechEmail] = useState("")
  const [techPassword, setTechPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await login(clientEmail, clientPassword)
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de nuevo a BeFixed",
        duration: 3000,
      })
      router.push("/mobile")
    } catch (err: any) {
      toast({
        title: "Error al iniciar sesión",
        description: err.message || "Verifica tus credenciales e intenta nuevamente",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTechLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await login(techEmail, techPassword)
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de nuevo a BeFixed",
        duration: 3000,
      })
      router.push("/mobile/technician-mode")
    } catch (err: any) {
      toast({
        title: "Error al iniciar sesión",
        description: err.message || "Verifica tus credenciales e intenta nuevamente",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Link href="/" className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4 inline mr-1" /> Volver al inicio
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            <span className="text-primary">Be</span>
            <span className="text-foreground">Fixed</span>
          </CardTitle>
          <CardDescription className="text-center">Ingresa a tu cuenta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="client">Cliente</TabsTrigger>
              <TabsTrigger value="technician">Técnico</TabsTrigger>
            </TabsList>
            <TabsContent value="client">
              <form onSubmit={handleClientLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium">
                        Contraseña
                      </label>
                      <Link href="#" className="text-xs text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={clientPassword}
                      onChange={(e) => setClientPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      "Iniciar sesión"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="technician">
              <form onSubmit={handleTechLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="tech-email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="tech-email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      value={techEmail}
                      onChange={(e) => setTechEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="tech-password" className="text-sm font-medium">
                        Contraseña
                      </label>
                      <Link href="#" className="text-xs text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <Input
                      id="tech-password"
                      type="password"
                      required
                      value={techPassword}
                      onChange={(e) => setTechPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      "Iniciar sesión como técnico"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Regístrate
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

