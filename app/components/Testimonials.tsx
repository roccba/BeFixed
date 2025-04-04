"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const testimonials = [
  {
    name: "Carlos Rodríguez",
    service: "Electricidad",
    image: "/placeholder.svg?height=400&width=400",
    quote: "¡Solucionó mi problema eléctrico en 10 minutos! Muy profesional y puntual.",
    rating: 4.9,
  },
  {
    name: "María González",
    service: "Plomería",
    image: "/placeholder.svg?height=400&width=400",
    quote: "Excelente servicio. Detectó la fuga rápidamente y la reparó sin complicaciones.",
    rating: 5.0,
  },
  {
    name: "Juan Pérez",
    service: "Cerrajería",
    image: "/placeholder.svg?height=400&width=400",
    quote: "Me quedé fuera de casa a medianoche y en 15 minutos ya tenía un cerrajero ayudándome.",
    rating: 4.8,
  },
]

export default function Testimonials() {
  const isMobile = useMobile()

  return (
    <div className="bg-secondary py-12 md:py-24 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            Miles de personas confían en BeFixed para resolver sus emergencias técnicas
          </p>
        </motion.div>

        <div className={`mt-12 md:mt-16 ${isMobile ? "space-y-6" : "flex overflow-x-auto pb-8 space-x-6 snap-x"}`}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className={`bg-background border border-border shadow-lg rounded-lg overflow-hidden ${
                isMobile ? "w-full" : "flex-shrink-0 w-full md:w-96 snap-center"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    loading="lazy"
                  />
                  <div className="ml-4">
                    <div className="text-lg font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">Servicio: {testimonial.service}</div>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(testimonial.rating) ? "fill-current" : "stroke-current fill-none"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">{testimonial.rating}</span>
                </div>
                <p className="mt-4 text-muted-foreground italic">"{testimonial.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

