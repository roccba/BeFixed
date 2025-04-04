"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useToast } from "@/components/ui/use-toast"
import PWAInstallButton from "@/components/pwa-install-button"

export default function CTA() {
  const isMobile = useMobile()
  const { toast } = useToast()

  return (
    <div className="bg-primary">
      <div className="max-w-4xl mx-auto text-center py-12 md:py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl md:text-3xl font-extrabold text-primary-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="block">¿Listo para solucionar tus problemas técnicos?</span>
          <span className="block mt-2">Instala la app y comienza ahora.</span>
        </motion.h2>
        <motion.p
          className="mt-4 text-base md:text-lg leading-6 text-primary-foreground/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Únete a miles de usuarios satisfechos que confían en BeFixed para sus emergencias técnicas. Instala nuestra
          aplicación web progresiva (PWA) directamente en tu dispositivo.
        </motion.p>
        <motion.div
          className={`mt-8 flex ${isMobile ? "flex-col" : "justify-center"} space-y-4 sm:space-y-0 sm:space-x-4`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <PWAInstallButton
            size="lg"
            variant="secondary"
            className="bg-background text-primary hover:bg-secondary/90 w-full sm:w-auto"
            fullWidth={isMobile}
          />
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10 w-full sm:w-auto"
            onClick={() => {
              toast({
                title: "Información",
                description: "Puedes instalar la aplicación desde cualquier navegador moderno compatible con PWA",
                duration: 3000,
              })
            }}
          >
            <Download className="mr-2 h-4 w-4" /> Más información
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

