"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const logos = [
  { name: 'Sony', src: '/logos/sony.png' },
  { name: 'Google', src: '/logos/google.png' },
  { name: 'Microsoft', src: '/logos/microsoft.png' },
  { name: 'Meta', src: '/logos/meta.png' },
  { name: 'Apple', src: '/logos/apple.png' },
  { name: 'NVIDIA', src: '/logos/nvidia.png' },
  { name: 'Samsung', src: '/logos/samsung.png' },
  { name: 'Intel', src: '/logos/intel.png' },
]

const LogoItem = ({ logo, index }: { logo: typeof logos[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex-shrink-0 mx-8 group"
  >
    <div className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110">
      <Image
        src={logo.src}
        alt={logo.name}
        fill
        className="object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
        onError={(e) => {
          // Fallback to text if image fails to load
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          const parent = target.parentElement
          if (parent) {
            parent.innerHTML = `<div class="flex items-center justify-center h-full text-white/60 font-semibold text-lg">${logo.name}</div>`
          }
        }}
      />
    </div>
  </motion.div>
)

export default function AnimatedLogoWall() {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-transparent via-white/5 to-transparent py-8">
      <motion.div
        className="flex items-center"
        animate={{
          x: [0, -100 * logos.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <LogoItem key={`first-${logo.name}`} logo={logo} index={index} />
        ))}
        
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <LogoItem key={`second-${logo.name}`} logo={logo} index={index} />
        ))}
      </motion.div>
    </div>
  )
} 