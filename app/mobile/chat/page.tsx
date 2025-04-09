"use client"

import { CardContent } from "@/components/ui/card"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Bot, Send, User, ArrowLeft, MapPin } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Tipo para los mensajes
interface Message {
  id: string
  content: string | React.ReactNode
  sender: "bot" | "user"
  timestamp: string
}

// Opciones de servicios
const serviceOptions = [
  // Servicios técnicos (problemas)
  { id: "electricidad", label: "Electricidad", icon: "⚡", category: "tecnico" },
  { id: "plomeria", label: "Plomería", icon: "🚿", category: "tecnico" },
  { id: "cerrajeria", label: "Cerrajería", icon: "🔑", category: "tecnico" },
  { id: "gas", label: "Gas", icon: "🔥", category: "tecnico" },
  { id: "refrigeracion", label: "Aire acondicionado", icon: "❄️", category: "tecnico" },
  // Servicios de hogar
  { id: "limpieza", label: "Limpieza", icon: "🧹", category: "hogar" },
  { id: "mudanza", label: "Mudanza", icon: "📦", category: "hogar" },
  { id: "jardineria", label: "Jardinería", icon: "🌱", category: "hogar" },
  { id: "pintura", label: "Pintura", icon: "🎨", category: "hogar" },
  { id: "montaje", label: "Montaje de muebles", icon: "🪑", category: "hogar" },
]

// Componente para las opciones de selección rápida
const QuickResponseOption = ({
  option,
  onSelect,
}: {
  option: { id: string; label: string; icon: string; category?: string }
  onSelect: (option: { id: string; label: string; icon: string; category?: string }) => void
}) => (
  <Button
    variant="outline"
    className="flex items-center gap-2 rounded-full py-2 px-4 h-auto"
    onClick={() => onSelect(option)}
  >
    <span>{option.icon}</span>
    <span>{option.label}</span>
  </Button>
)

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [problemDetails, setProblemDetails] = useState({
    description: "",
    serviceType: "",
    urgency: "normal",
    location: "",
  })
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()

  // Mensaje inicial
  useEffect(() => {
    if (messages.length === 0) {
      const initialMsg: Message = {
        id: Date.now().toString(),
        content:
          "¡Hola! Soy Felix, tu asistente de BeFixed. ¿En qué puedo ayudarte hoy? Puedo conectarte con profesionales para solucionar problemas técnicos o servicios para tu hogar.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([initialMsg])

      // Añadir opciones de inicio rápido después de un pequeño retraso
      setTimeout(() => {
        const optionsMsg: Message = {
          id: (Date.now() + 1).toString(),
          content: (
            <div className="space-y-4">
              <p className="mb-2">¿Qué tipo de servicio necesitas?</p>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Servicios técnicos</h4>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions
                    .filter((option) => option.category === "tecnico")
                    .map((option) => (
                      <QuickResponseOption
                        key={option.id}
                        option={option}
                        onSelect={(selected) => handleServiceSelection(selected)}
                      />
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Servicios para el hogar</h4>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions
                    .filter((option) => option.category === "hogar")
                    .map((option) => (
                      <QuickResponseOption
                        key={option.id}
                        option={option}
                        onSelect={(selected) => handleServiceSelection(selected)}
                      />
                    ))}
                </div>
              </div>
            </div>
          ),
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, optionsMsg])
      }, 500)
    }
  }, [])

  // Auto-scroll al último mensaje
  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        })
      }
    }, 100)

    return () => clearTimeout(scrollTimer)
  }, [messages])

  // Ajustar la altura del textarea según el contenido
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [input])

  // Gestionar el envío de mensajes
  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Añadir el mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Vibración en dispositivos móviles
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    // Actualizar los detalles del problema según el paso actual
    if (currentStep === 1) {
      setProblemDetails((prev) => ({ ...prev, description: input }))
    } else if (currentStep === 3) {
      setProblemDetails((prev) => ({ ...prev, location: input }))
    }

    // Simular respuesta del bot después de un retraso
    setTimeout(
      () => {
        // Responder según el paso actual
        respondBasedOnStep(input)
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Retraso aleatorio para simular escritura
  }

  // Selección de servicio
  const handleServiceSelection = (selected: { id: string; label: string; category?: string }) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `${selected.label}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setProblemDetails((prev) => ({ ...prev, serviceType: selected.id }))
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Vibración en dispositivos móviles
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    // Simular respuesta del bot
    setTimeout(() => {
      let responseText = ""

      // Adaptar el mensaje según la categoría del servicio
      if (selected.category === "tecnico") {
        responseText = `Entiendo que tienes un problema de ${selected.label.toLowerCase()}. ¿Puedes describirlo con más detalle? Por ejemplo, ¿qué está fallando exactamente?`
      } else {
        responseText = `¡Perfecto! Necesitas un servicio de ${selected.label.toLowerCase()}. ¿Puedes darme más detalles sobre lo que necesitas? Por ejemplo, tamaño de la vivienda, servicios específicos, etc.`
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
      setCurrentStep(1) // Avanzar al paso de descripción detallada
    }, 800)
  }

  // Responder según el paso actual
  const respondBasedOnStep = (userInput: string) => {
    let botResponse: Message
    const selectedService = serviceOptions.find((option) => option.id === problemDetails.serviceType)
    const isServiceTechnical = selectedService?.category === "tecnico"

    switch (currentStep) {
      case 1: // Después de la descripción detallada
        botResponse = {
          id: (Date.now() + 1).toString(),
          content: (
            <div className="space-y-2">
              <p>
                Gracias por la información.{" "}
                {isServiceTechnical
                  ? "¿Es un problema urgente que necesita atención inmediata?"
                  : "¿Cuándo necesitarías este servicio?"}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {isServiceTechnical ? (
                  <>
                    <Button
                      variant="destructive"
                      className="rounded-full"
                      onClick={() => handleUrgencySelection("urgente")}
                    >
                      Sí, es urgente
                    </Button>
                    <Button variant="outline" className="rounded-full" onClick={() => handleUrgencySelection("normal")}>
                      No, puede esperar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="rounded-full" onClick={() => handleUrgencySelection("hoy")}>
                      Hoy
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => handleUrgencySelection("esta-semana")}
                    >
                      Esta semana
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => handleUrgencySelection("programar")}
                    >
                      Programar
                    </Button>
                  </>
                )}
              </div>
            </div>
          ),
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setCurrentStep(2) // Avanzar al paso de urgencia
        break

      case 3: // Después de la ubicación
        setProblemDetails((prev) => ({ ...prev, location: userInput }))

        // Adaptar el mensaje según el tipo de servicio
        const summaryTitle = isServiceTechnical
          ? "¡Perfecto! Ya tengo toda la información sobre tu problema:"
          : "¡Perfecto! Ya tengo toda la información sobre el servicio que necesitas:"

        botResponse = {
          id: (Date.now() + 1).toString(),
          content: (
            <div className="space-y-2">
              <p>{summaryTitle}</p>
              <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                <p>
                  <strong>Tipo de servicio:</strong> {selectedService?.label || problemDetails.serviceType}
                </p>
                <p>
                  <strong>Descripción:</strong> {problemDetails.description}
                </p>
                <p>
                  <strong>{isServiceTechnical ? "Urgencia" : "Cuándo lo necesitas"}:</strong> {problemDetails.urgency}
                </p>
                <p>
                  <strong>Ubicación:</strong> {userInput}
                </p>
              </div>
              <p className="mt-2">
                ¿Quieres que busque profesionales disponibles {isServiceTechnical ? "ahora" : "para este servicio"}?
              </p>
              <div className="flex gap-2 mt-2">
                <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => handleFindTechnicians()}>
                  Buscar profesionales
                </Button>
              </div>
            </div>
          ),
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setCurrentStep(4) // Avanzar al paso final
        break

      default:
        botResponse = {
          id: (Date.now() + 1).toString(),
          content: "Entiendo. ¿Hay algo más que quieras añadir?",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
    }

    setMessages((prev) => [...prev, botResponse])
  }

  // Selección de urgencia
  const handleUrgencySelection = (urgency: string) => {
    let urgencyText = ""

    switch (urgency) {
      case "urgente":
        urgencyText = "Es urgente"
        break
      case "normal":
        urgencyText = "No es urgente"
        break
      case "hoy":
        urgencyText = "Lo necesito hoy"
        break
      case "esta-semana":
        urgencyText = "Lo necesito esta semana"
        break
      case "programar":
        urgencyText = "Quiero programar una fecha"
        break
      default:
        urgencyText = urgency
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: urgencyText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setProblemDetails((prev) => ({ ...prev, urgency: urgencyText }))
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Vibración en dispositivos móviles
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Gracias. Por último, ¿podrías confirmar tu ubicación para encontrar profesionales cercanos a ti?`,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
      setCurrentStep(3) // Avanzar al paso de ubicación
    }, 800)
  }

  // Buscar técnicos
  const handleFindTechnicians = () => {
    // Añadir mensaje de procesamiento
    const processingMsg: Message = {
      id: Date.now().toString(),
      content: "Buscando profesionales disponibles en tu zona...",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, processingMsg])

    // Vibración en dispositivos móviles (más larga para acción importante)
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100])
    }

    // Mostrar toast de confirmación
    toast({
      title: "Búsqueda iniciada",
      description: "Estamos localizando profesionales cercanos a tu ubicación",
      duration: 3000,
    })

    // Simular búsqueda y resultado
    setTimeout(() => {
      const selectedService = serviceOptions.find((option) => option.id === problemDetails.serviceType)
      const isServiceTechnical = selectedService?.category === "tecnico"

      // Adaptar los profesionales según el tipo de servicio
      let professionals = []

      if (isServiceTechnical) {
        professionals = [
          {
            id: 1,
            name: "Carlos Rodríguez",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.8",
            reviews: "56",
            distance: "1.2 km",
            initials: "CR",
            eta: "8 min",
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
          },
        ]
      } else if (problemDetails.serviceType === "limpieza") {
        professionals = [
          {
            id: 4,
            name: "Limpieza Express",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.9",
            reviews: "78",
            distance: "2.3 km",
            initials: "LE",
            eta: "Hoy",
          },
          {
            id: 5,
            name: "María Gómez",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.7",
            reviews: "45",
            distance: "1.8 km",
            initials: "MG",
            eta: "Hoy",
          },
          {
            id: 6,
            name: "CleanPro",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.6",
            reviews: "62",
            distance: "3.2 km",
            initials: "CP",
            eta: "Mañana",
          },
        ]
      } else {
        professionals = [
          {
            id: 7,
            name: "Profesional 1",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.8",
            reviews: "50",
            distance: "2.0 km",
            initials: "P1",
            eta: "10 min",
          },
          {
            id: 8,
            name: "Profesional 2",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.7",
            reviews: "42",
            distance: "2.8 km",
            initials: "P2",
            eta: "15 min",
          },
          {
            id: 9,
            name: "Profesional 3",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.6",
            reviews: "38",
            distance: "3.3 km",
            initials: "P3",
            eta: "20 min",
          },
        ]
      }

      // Mostrar toast con el primer profesional
      if (professionals.length > 0 && isServiceTechnical) {
        toast({
          title: `${professionals[0].name} disponible`,
          description: `Técnico en camino: ${professionals[0].eta}`,
          duration: 5000,
        })
      }

      const resultsMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: (
          <div className="space-y-3">
            <p>He encontrado {professionals.length} profesionales disponibles cerca de ti:</p>

            {professionals.map((pro) => (
              <div key={pro.id} className="bg-card border rounded-lg p-3 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={pro.avatar} />
                    <AvatarFallback>{pro.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium">{pro.name}</h4>
                      <Badge className="bg-green-500">Disponible</Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center">
                        ★★★★★ {pro.rating} ({pro.reviews} reseñas)
                      </span>
                      <span className="mx-1">•</span>
                      <span>{pro.distance}</span>
                      {pro.eta && (
                        <>
                          <span className="mx-1">•</span>
                          <span>{isServiceTechnical ? `Llegada: ${pro.eta}` : `Disponible: ${pro.eta}`}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    // Vibración en dispositivos móviles
                    if (navigator.vibrate) {
                      navigator.vibrate([100, 30, 100, 30, 100])
                    }

                    toast({
                      title: `Has seleccionado a ${pro.name}`,
                      description: isServiceTechnical
                        ? `El técnico llegará en aproximadamente ${pro.eta}`
                        : `Servicio programado para ${pro.eta}`,
                      duration: 5000,
                    })

                    // Redirigir a la página del técnico
                    router.push(`/mobile/technician/${pro.id}`)
                  }}
                >
                  Seleccionar
                </Button>
              </div>
            ))}

            <div className="mt-2 text-center">
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("map")}>
                <MapPin className="mr-2 h-4 w-4" /> Ver en el mapa
              </Button>
            </div>
          </div>
        ),
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, resultsMsg])
    }, 2000)
  }

  // Manejar la tecla Enter para enviar mensajes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/mobile")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="font-semibold">Felix</h2>
              <p className="text-xs text-muted-foreground">Tu asistente personal</p>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="h-9">
              <TabsTrigger value="chat" className="px-3">
                Chat
              </TabsTrigger>
              <TabsTrigger value="map" className="px-3">
                Mapa
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <div className="flex-1 relative">
        {activeTab === "chat" ? (
          <div
            className="absolute inset-0 overflow-y-auto p-4 bg-muted/30 space-y-4 scroll-smooth pb-[76px]"
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex gap-2 max-w-[90%]">
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="BeFixed Assistant" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <Card
                      className={`p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card"}`}
                    >
                      <div className="text-sm">{message.content}</div>
                    </Card>
                    <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuario" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}

            {/* Indicador de escritura */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="BeFixed Assistant" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Card className="p-3 bg-card">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce delay-0"></div>
                        <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce delay-150"></div>
                        <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce delay-300"></div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        ) : (
          // Vista de mapa
          <div className="absolute inset-0 bg-muted/30">
            {/* Placeholder para el mapa - en una app real, usarías una biblioteca de mapas como Google Maps, Mapbox, etc. */}
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center">
              {/* Marcadores de técnicos */}
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
              </div>
              <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
              </div>

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

            {/* Panel de técnicos */}
            <div className="absolute bottom-20 left-4 right-4">
              <Card className="shadow-lg">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Técnicos disponibles</h3>
                  <div className="space-y-3 max-h-[200px] overflow-y-auto">
                    {[1, 2, 3].map((id) => (
                      <div
                        key={id}
                        className="flex items-center gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>{id === 1 ? "CR" : id === 2 ? "AM" : "MS"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">
                              {id === 1 ? "Carlos Rodríguez" : id === 2 ? "Ana Martínez" : "Miguel Sánchez"}
                            </h4>
                            <Badge className="bg-green-500">Disponible</Badge>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>★ {id === 1 ? "4.8" : id === 2 ? "4.9" : "4.7"}</span>
                            <span className="mx-1">•</span>
                            <span>{id === 1 ? "1.2 km" : id === 2 ? "2.5 km" : "3.8 km"}</span>
                            <span className="mx-1">•</span>
                            <span>Llegada: {id === 1 ? "8 min" : id === 2 ? "12 min" : "15 min"}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-3" onClick={() => router.push("/mobile/technician/1")}>
                    Seleccionar técnico
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Formulario de entrada - siempre visible */}
      <div className="border-t p-4 bg-background sticky bottom-16 left-0 right-0 z-20">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="min-h-[44px] max-h-[120px] resize-none"
            rows={1}
          />
          <Button
            type="button"
            size="icon"
            onClick={handleSendMessage}
            disabled={input.trim() === ""}
            className="rounded-full h-[44px] w-[44px] flex-shrink-0"
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
