"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Bot, Send, User, MapPin } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useChatbot } from "@/hooks/useChatbot"
import DashboardLayout from "@/components/dashboard-layout"

export default function ClientChatPage() {
  const { messages, loading, sendMessage } = useChatbot()
  const [input, setInput] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

  // Ajustar altura del textarea según contenido
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [input])

  // Gestionar el envío de mensajes
  const handleSendMessage = () => {
    if (input.trim() === "" || loading) return

    // Enviar mensaje
    sendMessage(input)
    setInput("")
  }

  // Manejar la tecla Enter para enviar mensajes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <DashboardLayout userType="client">
      <Card className="h-[calc(100vh-12rem)] flex flex-col">
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
        </div>

        <div className="flex-1 relative">
          {activeTab === "chat" ? (
            <div
              className="absolute inset-0 overflow-y-auto p-4 bg-muted/30 space-y-4 scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex gap-2 max-w-[70%]">
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
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

              {/* Indicador de carga */}
              {loading && (
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
              <div className="absolute bottom-4 left-4 right-4">
                <Card className="shadow-lg">
                  <div className="p-4">
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
                    <Button className="w-full mt-3">Seleccionar técnico</Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
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
              disabled={input.trim() === "" || loading}
              className="rounded-full h-[44px] w-[44px] flex-shrink-0"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Enviar mensaje</span>
            </Button>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  )
}
