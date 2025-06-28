"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface PulseButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
}

export default function PulseButton({ 
  children, 
  variant = 'primary', 
  size = 'lg',
  onClick,
  className = ''
}: PulseButtonProps) {
  const baseClasses = "relative overflow-hidden font-semibold transition-all duration-300 transform hover:scale-105"
  
  const variantClasses = {
    primary: "bg-neon-gradient hover:shadow-2xl hover:shadow-neon-purple/50 text-white border-0",
    secondary: "bg-glass-white backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-xl"
  }
  
  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg"
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Button
        onClick={onClick}
        className={`
          ${baseClasses} 
          ${variantClasses[variant]} 
          ${sizeClasses[size]} 
          ${className}
          animate-pulse-glow
        `}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan opacity-0 hover:opacity-20"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        />
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {variant === 'primary' && <ArrowRight className="w-5 h-5" />}
        </span>
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-white/20"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeOut",
          }}
        />
      </Button>
    </motion.div>
  )
} 