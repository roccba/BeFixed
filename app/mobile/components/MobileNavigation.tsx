"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageCircle, MapPin, User, Menu, PenToolIcon as Tool } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MobileNavigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      name: "Inicio",
      href: "/mobile",
      icon: Home,
    },
    {
      name: "Chat",
      href: "/mobile/chat",
      icon: MessageCircle,
    },
    {
      name: "Mapa",
      href: "/mobile/map",
      icon: MapPin,
    },
    {
      name: "Perfil",
      href: "/mobile/profile",
      icon: User,
    },
  ]

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-16 flex items-center justify-around z-50">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive(item.href) ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center w-full h-full text-muted-foreground">
              <Menu className="h-5 w-5 mb-1" />
              <span className="text-xs">Más</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[385px]">
            <div className="py-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold">
                  <span className="text-primary">Be</span>
                  <span className="text-foreground">Fixed</span>
                </div>
                <ThemeToggle />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Menú</h3>
                <div className="space-y-2">
                  <Link href="/mobile/services" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Servicios
                    </Button>
                  </Link>
                  <Link href="/mobile/history" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Historial
                    </Button>
                  </Link>
                  <Link href="/mobile/payments" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Pagos
                    </Button>
                  </Link>
                  <Link href="/mobile/help" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Ayuda
                    </Button>
                  </Link>
                  <Link href="/mobile/technician-mode" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Tool className="mr-2 h-4 w-4" />
                      Modo técnico
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-auto">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Versión web
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full mt-2">
                    Cerrar sesión
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  )
}
