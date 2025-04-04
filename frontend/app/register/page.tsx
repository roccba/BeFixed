"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { register, loading, error } = useAuth()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Cliente
  const [clientFirstName, setClientFirstName] = useState("")
  const [clientLastName, setClientLastName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientPassword, setClientPassword] = useState("")
  const [clientTerms, setClientTerms] = useState(false)

  // Técnico
  const [techFirstName, setTechFirstName] = useState("")
  const [techLastName, setTechLastName] = useState("")
  const [techEmail, setTechEmail] = useState("")
  const [techPhone, setTechPhone] = useState("")
  const [techSpecialty, setTechSpecialty] = useState("")
  const [techPassword, setTechPassword] = useState("")
  const [techTerms, setTechTerms] = useState(false)

  const handleClientRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientTerms) {
      toast({
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones para continuar",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)

    try {
      await register({
        name: `${clientFirstName} ${clientLastName}`,
        email: clientEmail,
        phone: clientPhone,
        password: clientPassword,
        role: "client",
      })

      toast({
        title: "Registro exitoso",
        description: "¡Bienvenido a BeFixed!",
        duration: 3000,
      })

      router.push("/mobile")
    } catch (err: any) {
      toast({
        title: "Error al registrarse",
        description: err.message || "Hubo un problema al crear tu cuenta",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTechRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!techTerms) {
      toast({
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones para continuar",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    if (!techSpecialty) {
      toast({
        title: "Especialidad requerida",
        description: "Por favor selecciona tu especialidad",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)

    try {
      await register({
        name: `${techFirstName} ${techLastName}`,
        email: techEmail,
        phone: techPhone,
        password: techPassword,
        specialty: techSpecialty,
        role: "technician",
      })

      toast({
        title: "Registro exitoso",
        description: "¡Bienvenido a BeFixed!",
        duration: 3000,
      })

      router.push("/mobile/technician-mode")
    } catch (err: any) {
      toast({
        title: "Error al registrarse",
        description: err.message || "Hubo un problema al crear tu cuenta",
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
          <CardDescription className="text-center">Crea una cuenta para comenzar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="client">Cliente</TabsTrigger>
              <TabsTrigger value="technician">Técnico</TabsTrigger>
            </TabsList>
            <TabsContent value="client">
              <form onSubmit={handleClientRegister}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        Nombre
                      </label>
                      <Input
                        id="first-name"
                        required
                        value={clientFirstName}
                        onChange={(e) => setClientFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        Apellido
                      </label>
                      <Input
                        id="last-name"
                        required
                        value={clientLastName}
                        onChange={(e) => setClientLastName(e.target.value)}
                      />
                    </div>
                  </div>
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
                    <label htmlFor="phone" className="text-sm font-medium">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+52 55 1234 5678"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Contraseña
                    </label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={clientPassword}
                      onChange={(e) => setClientPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={clientTerms}
                      onCheckedChange={(checked) => setClientTerms(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      Acepto los{" "}
                      <Link href="#" className="text-primary hover:underline">
                        términos y condiciones
                      </Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando cuenta...
                      </>
                    ) : (
                      "Crear cuenta"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="technician">
              <form onSubmit={handleTechRegister}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="tech-first-name" className="text-sm font-medium">
                        Nombre
                      </label>
                      <Input
                        id="tech-first-name"
                        required
                        value={techFirstName}
                        onChange={(e) => setTechFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="tech-last-name" className="text-sm font-medium">
                        Apellido
                      </label>
                      <Input
                        id="tech-last-name"
                        required
                        value={techLastName}
                        onChange={(e) => setTechLastName(e.target.value)}
                      />
                    </div>
                  </div>
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
                    <label htmlFor="tech-phone" className="text-sm font-medium">
                      Teléfono
                    </label>
                    <Input
                      id="tech-phone"
                      type="tel"
                      placeholder="+52 55 1234 5678"
                      required
                      value={techPhone}
                      onChange={(e) => setTechPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tech-specialty" className="text-sm font-medium">
                      Especialidad
                    </label>
                    <select
                      id="tech-specialty"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={techSpecialty}
                      onChange={(e) => setTechSpecialty(e.target.value)}
                    >
                      <option value="">Selecciona una especialidad</option>
                      <option value="electricidad">Electricidad</option>
                      <option value="plomeria">Plomería</option>
                      <option value="gas">Gas</option>
                      <option value="cerrajeria">Cerrajería</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tech-password" className="text-sm font-medium">
                      Contraseña
                    </label>
                    <Input
                      id="tech-password"
                      type="password"
                      required
                      value={techPassword}
                      onChange={(e) => setTechPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tech-terms"
                      checked={techTerms}
                      onCheckedChange={(checked) => setTechTerms(checked as boolean)}
                    />
                    <label htmlFor="tech-terms" className="text-sm text-muted-foreground">
                      Acepto los{" "}
                      <Link href="#" className="text-primary hover:underline">
                        términos y condiciones
                      </Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registrando...
                      </>
                    ) : (
                      "Registrarme como técnico"
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

