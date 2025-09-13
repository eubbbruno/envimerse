"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

interface HolographicCardProps {
  title: string
  description: string
  price?: string
  features?: string[]
  icon?: React.ComponentType<any>
  gradient?: string
  className?: string
  onClick?: () => void
  badge?: string
  isPopular?: boolean
}

export default function HolographicCard({
  title,
  description,
  price,
  features = [],
  icon: Icon,
  gradient = 'from-purple-500/20 to-cyan-500/20',
  className = '',
  onClick,
  badge,
  isPopular = false
}: HolographicCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative group perspective-1000 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Popular badge */}
      {isPopular && (
        <motion.div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="px-4 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm font-bold rounded-full">
            🔥 Mais Popular
          </div>
        </motion.div>
      )}

      {/* Custom badge */}
      {badge && !isPopular && (
        <motion.div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-semibold rounded-full">
            {badge}
          </div>
        </motion.div>
      )}

      <motion.div
        className="relative w-full h-full transform-gpu"
        animate={{
          rotateX: isHovered ? 10 : 0,
          rotateY: isHovered ? 5 : 0,
          z: isHovered ? 50 : 0
        }}
        transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Holographic background layers */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {/* Base layer */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} backdrop-blur-xl rounded-2xl border border-white/10`} />
          
          {/* Holographic shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-2xl"
            animate={{
              background: isHovered 
                ? [
                    'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 25%, transparent 50%, rgba(255,255,255,0.1) 75%, transparent 100%)',
                    'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%, rgba(255,255,255,0.1) 100%, transparent 125%)'
                  ]
                : 'linear-gradient(45deg, transparent 0%, transparent 100%)'
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Scanning lines */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: isHovered 
                ? 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 69, 19, 0.03) 2px, rgba(139, 69, 19, 0.03) 4px)'
                : 'none'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative p-6 lg:p-8 h-full flex flex-col z-10">
          {/* Header */}
          <div className="mb-6">
            {Icon && (
              <motion.div
                className="mb-4 p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 w-fit"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotateZ: isHovered ? 5 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.div>
            )}

            <motion.h3
              className="text-2xl lg:text-3xl font-bold text-white mb-2"
              animate={{
                background: isHovered 
                  ? 'linear-gradient(45deg, #8B45EC, #60A3F9, #8B45EC)'
                  : 'transparent'
              }}
              style={{
                backgroundClip: isHovered ? 'text' : 'initial',
                WebkitBackgroundClip: isHovered ? 'text' : 'initial',
                color: isHovered ? 'transparent' : 'white'
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>

            {price && (
              <motion.div
                className="flex items-baseline mb-4"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-4xl lg:text-5xl font-bold text-white">{price}</span>
                <span className="text-gray-400 ml-2">/mês</span>
              </motion.div>
            )}

            <p className="text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="flex-1 mb-6">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mr-3"
                      animate={{
                        scale: isHovered ? [1, 1.3, 1] : 1,
                        opacity: isHovered ? [0.7, 1, 0.7] : 0.7
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: isHovered ? Infinity : 0,
                        delay: index * 0.2 
                      }}
                    />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Action button */}
          <motion.button
            className="relative group/btn w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white overflow-hidden"
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: isHovered 
                ? '0 20px 40px rgba(139, 69, 19, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                : '0 10px 20px rgba(0, 0, 0, 0.2)'
            }}
          >
            <span className="relative z-10">Escolher Plano</span>
            
            {/* Button glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Button particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${10 + i * 10}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    opacity: isHovered ? [0, 1, 0] : 0,
                    scale: isHovered ? [1, 1.5, 1] : 1,
                    y: isHovered ? [0, -10, 0] : 0
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.button>
        </div>

        {/* Edge glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isHovered 
              ? [
                  '0 0 20px rgba(139, 69, 19, 0.3)',
                  '0 0 40px rgba(96, 163, 249, 0.3)',
                  '0 0 20px rgba(139, 69, 19, 0.3)'
                ]
              : '0 0 0px rgba(0, 0, 0, 0)'
          }}
          transition={{ 
            duration: 2, 
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Holographic noise overlay */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-20"
            style={{
              background: `
                radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, rgba(96, 163, 249, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(139, 69, 19, 0.1) 0%, transparent 50%)
              `
            }}
            animate={{
              background: [
                `radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 80% 50%, rgba(96, 163, 249, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 40% 80%, rgba(139, 69, 19, 0.1) 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 20% 80%, rgba(96, 163, 249, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 60% 20%, rgba(139, 69, 19, 0.1) 0%, transparent 50%)`,
                `radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 80% 50%, rgba(96, 163, 249, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 40% 80%, rgba(139, 69, 19, 0.1) 0%, transparent 50%)`
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  )
} 