"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface Partner {
  name: string
  logo: string
}

const partners: Partner[] = [
  { name: "Meta", logo: "/logos/meta.svg" },
  { name: "Sony", logo: "/logos/sony.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "Apple", logo: "/logos/apple.svg" },
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Samsung", logo: "/logos/samsung.svg" },
  { name: "NVIDIA", logo: "/logos/nvidia.svg" },
  { name: "Unity", logo: "/logos/unity.svg" },
]

const PartnersMarquee: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Marquee Container */}
        <div className="relative">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <motion.div
              className="flex gap-16 pr-16"
              animate={{
                x: [0, -100 * partners.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {/* First set of logos */}
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-32 h-16 flex items-center justify-center group"
                >
                  <div className="w-full h-full bg-glass-white backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center hover:border-brandMagenta/50 transition-all duration-300 hover:shadow-neonRing group-hover:scale-110">
                    <span className="text-white font-semibold text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Second set of logos for seamless loop */}
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-32 h-16 flex items-center justify-center group"
                >
                  <div className="w-full h-full bg-glass-white backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center hover:border-brandMagenta/50 transition-all duration-300 hover:shadow-neonRing group-hover:scale-110">
                    <span className="text-white font-semibold text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-400 mb-6">
            Want to become a partner?
          </p>
          <motion.button
            className="bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-semibold px-8 py-3 rounded-xl shadow-neonRing hover:shadow-neonRingHover transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Partner With Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default PartnersMarquee 