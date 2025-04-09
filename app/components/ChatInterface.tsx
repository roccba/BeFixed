"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Bot, Send, User, X, Maximize2, Minimize2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"

// Tipo para los mensajes
interface Message {
  id: string
  content: string | React.ReactNode
  sender: "bot" | "user"
  timestamp: string
}

// Modificar las opciones de servicios para incluir más categorías
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

// Modificar el mensaje inicial para ser más inclusivo
export function ChatInterface({
  initialMessage = "¡Hola! Soy Felix, tu asistente de BeFixed. ¿En qué puedo ayudarte hoy? Puedo conectarte con profesionales para solucionar problemas técnicos o servicios para tu hogar.",
  onSubmitRequest,
  className = "",
  isFloating = false,
  onClose,
}: {
  initialMessage?: string
  onSubmitRequest?: (serviceDetails: {
    description: string
    serviceType: string
    urgency: string
    location: string
  }) => void
  className?: string
  isFloating?: boolean
  onClose?: () => void
}) {
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
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Modificar la función useEffect que muestra las opciones iniciales
  useEffect(() => {
    // Solo añadir el mensaje inicial si no hay mensajes
    if (messages.length === 0) {
      const initialMsg: Message = {
        id: Date.now().toString(),
        content: initialMessage,
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
  }, [initialMessage, messages.length])

  // Auto-scroll al último mensaje
  useEffect(() => {
    // Pequeño retraso para asegurar que el DOM se ha actualizado
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
    if (isMobile && navigator.vibrate) {
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

  // Modificar la función handleServiceSelection para adaptar el lenguaje según la categoría
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
    if (isMobile && navigator.vibrate) {
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

  // Modificar la función respondBasedOnStep para adaptar el lenguaje según el tipo de servicio
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

  // Modificar la función handleUrgencySelection para adaptarse a los nuevos tipos de urgencia
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
    if (isMobile && navigator.vibrate) {
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

  // Modificar la función handleFindTechnicians para mostrar "profesionales" en lugar de "técnicos"
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
    if (isMobile && navigator.vibrate) {
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
            name: "Carlos Rodríguez",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.8",
            reviews: "56",
            distance: "1.2 km",
            initials: "CR",
            eta: "8 min",
          },
          {
            name: "Ana Martínez",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.9",
            reviews: "32",
            distance: "2.5 km",
            initials: "AM",
            eta: "12 min",
          },
          {
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
            name: "Limpieza Express",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.9",
            reviews: "78",
            distance: "2.3 km",
            initials: "LE",
            eta: "Hoy",
          },
          {
            name: "María Gómez",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.7",
            reviews: "45",
            distance: "1.8 km",
            initials: "MG",
            eta: "Hoy",
          },
          {
            name: "CleanPro",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.6",
            reviews: "62",
            distance: "3.2 km",
            initials: "CP",
            eta: "Mañana",
          },
        ]
      } else if (problemDetails.serviceType === "mudanza") {
        professionals = [
          {
            name: "Mudanzas Rápidas",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.8",
            reviews: "53",
            distance: "4.1 km",
            initials: "MR",
            eta: "Mañana",
          },
          {
            name: "TransporteYa",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.5",
            reviews: "37",
            distance: "2.9 km",
            initials: "TY",
            eta: "Hoy",
          },
          {
            name: "Hermanos López",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.9",
            reviews: "64",
            distance: "3.5 km",
            initials: "HL",
            eta: "Pasado mañana",
          },
        ]
      } else {
        professionals = [
          {
            name: "Profesional 1",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.8",
            reviews: "50",
            distance: "2.0 km",
            initials: "P1",
            eta: "10 min",
          },
          {
            name: "Profesional 2",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: "4.7",
            reviews: "42",
            distance: "2.8 km",
            initials: "P2",
            eta: "15 min",
          },
          {
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

            {professionals.map((pro, index) => (
              <div key={index} className="bg-card border rounded-lg p-3 shadow-sm space-y-2">
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
                    if (isMobile && navigator.vibrate) {
                      navigator.vibrate([100, 30, 100, 30, 100])
                    }

                    toast({
                      title: `Has seleccionado a ${pro.name}`,
                      description: isServiceTechnical
                        ? `El técnico llegará en aproximadamente ${pro.eta}`
                        : `Servicio programado para ${pro.eta}`,
                      duration: 5000,
                    })
                  }}
                >
                  Seleccionar
                </Button>
              </div>
            ))}

            <p className="text-sm text-muted-foreground">
              Puedes hablar con ellos para más detalles o seleccionar uno para programar el servicio.
            </p>
          </div>
        ),
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, resultsMsg])

      // Notificar a la función parental si está definida
      if (onSubmitRequest) {
        onSubmitRequest({
          description: problemDetails.description,
          serviceType: problemDetails.serviceType,
          urgency: problemDetails.urgency,
          location: problemDetails.location,
        })
      }
    }, 2000)
  }

  // Manejar la tecla Enter para enviar mensajes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Alternar entre expandido y contraído (para móvil)
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`flex flex-col ${className} ${
        isFloating
          ? "fixed bottom-20 right-4 w-[calc(100%-2rem)] sm:w-96 h-[70vh] sm:h-[500px] shadow-xl rounded-xl z-50 border border-border"
          : "h-full"
      } ${isExpanded && isFloating ? "h-[90vh] sm:h-[80vh]" : ""}`}
    >
      {/* Encabezado del chat */}
      <div className="border-b bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="BeFixed Assistant" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">Felix</h2>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  En línea
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Tu asistente personal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isFloating && (
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={toggleExpanded}>
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            )}
            {isFloating && onClose && (
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Contenedor de mensajes */}
      <div
        className="flex-1 overflow-y-auto p-4 bg-muted/30 space-y-4 scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex gap-2 max-w-[90%] sm:max-w-[80%]">
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="BeFixed Assistant" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <Card className={`p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card"}`}>
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

      {/* Formulario de entrada */}
      <div className="border-t p-4 bg-background">
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
        <div className="flex justify-center mt-3">
          <p className="text-xs text-muted-foreground">Powered by Felix - Tu asistente personal de BeFixed</p>
        </div>
      </div>
    </div>
  )
}
