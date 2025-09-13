"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          className="text-8xl font-bold mb-4"
          animate={{
            backgroundImage: [
              'linear-gradient(45deg, #8B42EC, #EC4899)',
              'linear-gradient(45deg, #EC4899, #22D3EE)',
              'linear-gradient(45deg, #22D3EE, #8B42EC)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          404
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full font-semibold hover:shadow-[0_0_30px_rgba(139,69,19,0.7)] transform hover:scale-105 transition-all duration-300"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border border-white/20 text-white rounded-full font-semibold hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
} 