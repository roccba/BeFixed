import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import PWAInstallButton from "@/components/pwa-install-button"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Servicios</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Electricidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Plomería
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Gas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Cerrajería
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Empresa</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Empleo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Prensa
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <PWAInstallButton
                  variant="link"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors p-0 h-auto"
                  text="Instalar aplicación"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2 justify-center md:justify-start">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
          <p className="mt-8 text-base text-muted-foreground text-center md:mt-0 md:order-1 md:text-left">
            &copy; 2023 BeFixed, Inc. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

