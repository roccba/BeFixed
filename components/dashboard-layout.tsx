"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/useAuth"
import { Clock, CreditCard, User, Award, BarChart, LogOut, Menu, X, MapPin, MessageCircle } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "client" | "technician"
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const clientMenuItems = [
    { label: "Historial", icon: Clock, href: "/dashboard/client" },
    { label: "Perfil", icon: User, href: "/dashboard/client/profile" },
    { label: "Pagos", icon: CreditCard, href: "/dashboard/client/payments" },
    { label: "Mapa", icon: MapPin, href: "/dashboard/client/map" },
    { label: "Chat", icon: MessageCircle, href: "/dashboard/client/chat" },
  ]

  const technicianMenuItems = [
    { label: "Servicios", icon: Clock, href: "/dashboard/technician" },
    { label: "Formación", icon: Award, href: "/dashboard/technician/training" },
    { label: "Ganancias", icon: BarChart, href: "/dashboard/technician/earnings" },
    { label: "Perfil", icon: User, href: "/dashboard/technician/profile" },
    { label: "Mapa", icon: MapPin, href: "/dashboard/technician/map" },
    { label: "Chat", icon: MessageCircle, href: "/dashboard/technician/chat" },
  ]

  const menuItems = userType === "client" ? clientMenuItems : technicianMenuItems

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 sticky top-0 z-10">
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
                  <AvatarFallback>{user?.name?.substring(0, 2) || "U"}</AvatarFallback>
                </Avatar>
                <span>{user?.name || "Usuario"}</span>
              </div>
              <ThemeToggle />
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Cerrar sesión
              </Button>
              <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar para desktop */}
          <div className="w-full md:w-64 hidden md:block">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>{user?.name?.substring(0, 2) || "U"}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user?.name || "Usuario"}</h2>
                <p className="text-sm text-muted-foreground">{user?.email || "usuario@ejemplo.com"}</p>

                <div className="w-full mt-6 space-y-2">
                  {menuItems.map((item) => (
                    <Button key={item.label} variant="outline" className="w-full justify-start" asChild>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-background/95 z-50 pt-20 px-4">
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>{user?.name?.substring(0, 2) || "U"}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user?.name || "Usuario"}</h2>
                <p className="text-sm text-muted-foreground">{user?.email || "usuario@ejemplo.com"}</p>

                <div className="w-full mt-6 space-y-2">
                  {menuItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}

