"use client"

import { motion } from 'framer-motion'
import { Play, ArrowRight, Sparkles, Zap } from 'lucide-react'
import { useClientOnly } from '@/hooks/useClientOnly'

export default function HeroSection() {
  const hasMounted = useClientOnly()

  return (
    <section className="relative min-h-screen overflow-hidden section-spacing">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black" />
      
      {/* Animated particles background */}
      <div className="absolute inset-0 opacity-30">
        {hasMounted && (
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-magenta-400 to-cyan-400 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${4 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="container-spacing relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          {/* Epic Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="element-spacing-sm"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-magenta-500/20 to-cyan-500/20 border border-magenta-500/30 text-magenta-200 backdrop-blur-sm animate-pulse-glow">
              <Zap className="w-5 h-5 mr-3 animate-rotate-slow" />
              <span className="text-lg font-bold tracking-wide">REVOLUTIONARY MULTI-POV PLATFORM</span>
            </div>
          </motion.div>

          {/* Epic Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-7xl md:text-9xl font-bold element-spacing leading-none"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-magenta-400 to-cyan-400 animate-gradient">
              ENTER THE
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-magenta-400 animate-gradient" style={{ animationDelay: '1s' }}>
              METAVERSE
            </span>
          </motion.h1>

          {/* Epic Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-2xl text-gray-300 element-spacing max-w-3xl mx-auto leading-relaxed"
          >
            Experience live events like <span className="text-magenta-400 font-bold">never before</span>. 
            <br />
            Multiple angles, <span className="text-cyan-400 font-bold">infinite possibilities</span>.
          </motion.p>

          {/* Epic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center element-spacing"
          >
            {/* Primary Epic Button */}
            <motion.button
              className="group relative px-12 py-6 overflow-hidden rounded-full text-white font-bold text-xl tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-magenta-500 to-cyan-500 group-hover:scale-110 transition-transform duration-500" />
              
              {/* Shimmer effect */}
              <span className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 animate-pulse" />
                EXPLORE EVENTS
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              
              {/* Glow effect */}
              <span className="absolute inset-0 rounded-full animate-pulse-glow" />
            </motion.button>

            {/* Secondary Epic Button */}
            <motion.button
              className="group relative px-10 py-5 overflow-hidden rounded-full border-2 border-cyan-400/50 text-cyan-400 font-bold text-lg tracking-wide backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Hover background */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Border glow */}
              <span className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-cyan-400 to-magenta-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" style={{ padding: '2px' }} />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center">
                <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                WATCH DEMO
              </span>
            </motion.button>
          </motion.div>

          {/* Epic Stats */}
          {hasMounted && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="vertical-spacing grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto"
            >
              <div className="text-center group">
                <motion.div 
                  className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-cyan-400 mb-3 group-hover:animate-pulse"
                  whileHover={{ scale: 1.1 }}
                >
                  2.5M+
                </motion.div>
                <div className="text-gray-300 text-lg font-semibold tracking-wide">ACTIVE USERS</div>
              </div>
              <div className="text-center group">
                <motion.div 
                  className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 mb-3 group-hover:animate-pulse"
                  whileHover={{ scale: 1.1 }}
                >
                  15+
                </motion.div>
                <div className="text-gray-300 text-lg font-semibold tracking-wide">CAMERA ANGLES</div>
              </div>
              <div className="text-center group">
                <motion.div 
                  className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-cyan-400 mb-3 group-hover:animate-pulse"
                  whileHover={{ scale: 1.1 }}
                >
                  99.9%
                </motion.div>
                <div className="text-gray-300 text-lg font-semibold tracking-wide">UPTIME</div>
              </div>
            </motion.div>
          )}

          {/* Epic Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-12 border-2 border-magenta-400/50 rounded-full flex justify-center backdrop-blur-sm animate-pulse-glow"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-4 bg-gradient-to-b from-magenta-400 to-cyan-400 rounded-full mt-3"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Epic Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] animate-float" />
      
      {/* Epic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-magenta-900/5 to-transparent animate-pulse" />
    </section>
  )
} 