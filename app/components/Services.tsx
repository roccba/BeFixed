"use client"

import { motion } from "framer-motion"
import { Zap, Droplet, Flame, Key, Wrench, Wifi } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const services = [
  {
    name: "Electricidad",
    description: "Instalaciones, reparaciones y mantenimiento eléctrico para tu hogar o negocio.",
    icon: Zap,
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-500",
  },
  {
    name: "Plomería",
    description: "Soluciones para fugas, instalaciones y reparaciones de sistemas de agua.",
    icon: Droplet,
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500",
  },
  {
    name: "Gas",
    description: "Instalación y mantenimiento de sistemas de gas con todas las medidas de seguridad.",
    icon: Flame,
    color: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-500",
  },
  {
    name: "Cerrajería",
    description: "Apertura de puertas, cambio de cerraduras y sistemas de seguridad.",
    icon: Key,
    color: "bg-gray-100 dark:bg-gray-800/50",
    iconColor: "text-gray-500",
  },
  {
    name: "Mantenimiento",
    description: "Reparaciones generales y mantenimiento preventivo para tu hogar.",
    icon: Wrench,
    color: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-500",
  },
  {
    name: "Redes",
    description: "Instalación y configuración de redes, WiFi y sistemas de comunicación.",
    icon: Wifi,
    color: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-500",
  },
]

export default function Services() {
  const isMobile = useMobile()

  return (
    <div className="py-12 md:py-16 bg-background relative overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground sm:text-4xl">Nuestros servicios</h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Contamos con técnicos especializados en diversas áreas para resolver cualquier emergencia o necesidad
          </p>
        </motion.div>

        {/* Grid para desktop, lista vertical para móvil */}
        <div className={`mt-12 ${isMobile ? "space-y-6" : "grid gap-8 md:grid-cols-2 lg:grid-cols-3"}`}>
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border ${service.color}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-0 mr-4 ${service.iconColor} bg-white shadow-sm`}
                  >
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                    <p className={`${isMobile ? "mt-1" : "mt-2"} text-muted-foreground`}>{service.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
