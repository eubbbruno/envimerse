"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  isLoading: boolean
  onComplete?: () => void
}

export default function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => onComplete?.(), 500)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isLoading, onComplete])

  if (!isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 particles opacity-30" />
      
      {/* Central loading content */}
      <div className="relative z-10 text-center">
        {/* Logo animation */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan">
            Envimerse
          </h1>
        </motion.div>

        {/* Loading spinner */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 border-4 border-brandMagenta/20 rounded-full"></div>
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-brandMagenta rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 border-4 border-transparent border-t-brandCyan rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 mx-auto mb-4">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brandMagenta to-brandCyan"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Loading text */}
        <motion.p
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Entering the future...
        </motion.p>

        {/* Progress percentage */}
        <motion.div
          className="text-brandCyan font-bold text-xl mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-20 h-20 bg-brandMagenta/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-brandCyan/20 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  )
} 