"use client"

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useClientOnly, useSeededRandom } from '@/hooks/useClientOnly'

interface SimpleGalaxyProps {
  width?: string
  height?: string
  className?: string
  particleCount?: number
}

export default function SimpleGalaxy({
  width = '100%',
  height = '100vh',
  className = '',
  particleCount = 200
}: SimpleGalaxyProps) {
  const hasMounted = useClientOnly()
  const getSeededRandom = useSeededRandom('galaxy-particles')
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * Math.PI * 2 * 3 // 3 spiral arms
      const radius = getSeededRandom(i * 3) * 40 + 10 // 10-50% from center
      const spiralOffset = radius * 0.1 // spiral effect
      
      const x = 50 + Math.cos(angle + spiralOffset) * radius
      const y = 50 + Math.sin(angle + spiralOffset) * radius * 0.3 // flatten vertically
      
      return {
        id: i,
        x: Math.max(5, Math.min(95, x)), // keep within bounds
        y: Math.max(5, Math.min(95, y)),
        size: getSeededRandom(i * 3 + 1) * 3 + 1,
        opacity: getSeededRandom(i * 3 + 2) * 0.8 + 0.2,
        color: getSeededRandom(i * 4) > 0.5 ? 'purple' : 'cyan',
        delay: getSeededRandom(i * 5) * 5
      }
    })
  }, [particleCount, getSeededRandom])

  if (!hasMounted) {
    return (
      <div 
        className={`relative overflow-hidden ${className}`}
        style={{ width, height }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-black to-cyan-900/20" />
      </div>
    )
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Central glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Galaxy spiral arms */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 60, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${
              particle.color === 'purple' 
                ? 'bg-gradient-to-r from-purple-400 to-purple-600' 
                : 'bg-gradient-to-r from-cyan-400 to-cyan-600'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity
            }}
            animate={{
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400/60 to-cyan-400/60 rounded-full"
            style={{
              left: `${getSeededRandom(i * 6 + 50) * 100}%`,
              top: `${getSeededRandom(i * 6 + 51) * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + getSeededRandom(i * 6 + 52) * 2,
              repeat: Infinity,
              delay: getSeededRandom(i * 6 + 53) * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-black/30 pointer-events-none" />
    </div>
  )
} 