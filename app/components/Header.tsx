"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, MessageCircle, Bot, User, PenToolIcon as Tool } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { ChatInterface } from "./ChatInterface"
import { useAuth } from "@/hooks/useAuth"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const isMobile = useMobile()
  const { user } = useAuth()

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-primary">Be</span>
                <span className="text-foreground">Fixed</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-10">
              <Link
                href="#services"
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Servicios
              </Link>
              <Link
                href="#testimonials"
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonios
              </Link>
            </nav>
            <div className="flex items-center space-x-2 md:space-x-4">
              {isMobile && (
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => setIsChatOpen(true)}>
                  <Bot className="h-5 w-5" />
                </Button>
              )}
              <ThemeToggle />
              {!isMobile && (
                <>
                  {user ? (
                    <div className="flex items-center space-x-4">
                      {user.role === "client" ? (
                        <Link href="/dashboard/client">
                          <Button variant="outline" className="hidden sm:inline-flex">
                            <User className="mr-2 h-4 w-4" />
                            Dashboard
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/dashboard/technician">
                          <Button variant="outline" className="hidden sm:inline-flex">
                            <Tool className="mr-2 h-4 w-4" />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button variant="outline" className="hidden sm:inline-flex">
                          Iniciar sesión
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button>Registrarse</Button>
                      </Link>
                    </>
                  )}
                </>
              )}
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="#services"
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Servicios
                </Link>
                <Link
                  href="#testimonials"
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonios
                </Link>
                <Link
                  href="/login"
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Floating chat button for mobile */}
      {isMobile && !isChatOpen && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 p-0"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Floating chat interface */}
      {isMobile && isChatOpen && <ChatInterface isFloating={true} onClose={() => setIsChatOpen(false)} />}
    </>
  )
}

