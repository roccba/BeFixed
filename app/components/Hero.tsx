"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { ChatInterface } from "./ChatInterface"
import { useMobile } from "@/hooks/use-mobile"

export default function Hero() {
  const isMobile = useMobile()

  return (
    <div className="bg-background py-8 md:py-20 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* En móvil, el chatbot va primero */}
          {isMobile && (
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg border border-border h-[60vh] sm:h-[500px] order-first"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <ChatInterface />
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-3xl md:text-5xl font-extrabold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-primary block mb-2">Profesionales</span>
              <span className="text-foreground">a un chat de distancia</span>
            </motion.h1>
            <motion.p
              className="mt-4 md:mt-6 text-lg md:text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Conectamos a clientes con técnicos profesionales de electricidad, plomería, gas, cerrajería y más.
              Servicio rápido, seguro y de calidad.
            </motion.p>
            <motion.div
              className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Button size="lg" className="w-full sm:w-auto">
                <MapPin className="mr-2 h-4 w-4" /> Encontrar técnico
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Soy técnico
              </Button>
            </motion.div>
          </motion.div>

          {/* En desktop, el chatbot va a la derecha */}
          {!isMobile && (
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg border border-border h-[500px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <ChatInterface />
            </motion.div>
          )}
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 dark:bg-primary/10 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/10 dark:bg-secondary/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    </div>
  )
}

