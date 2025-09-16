"use client"

import { motion } from 'framer-motion'
import { Play, ArrowRight, Sparkles } from 'lucide-react'
import GalaxyCSS from '../3d/GalaxyCSS'
import { useClientOnly } from '@/hooks/useClientOnly'

export default function HeroSection() {
  const hasMounted = useClientOnly()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/bg-envi.mp4" type="video/mp4" />
        </video>
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Galaxy CSS Background - Overlay adicional */}
      <div className="absolute inset-0 z-10 opacity-30">
        <GalaxyCSS />
      </div>
      
      {/* Content */}
      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-200 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 mr-3" />
            <span className="text-lg font-semibold">Primeira Plataforma Multi-POV do Mundo</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Esteja em Todos
          </span>
          <br />
          <span className="text-white">
            os Lugares ao Mesmo Tempo
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-12"
        >
          Experimente eventos ao vivo através de <span className="text-cyan-400 font-semibold">múltiplas perspectivas simultaneamente</span>.
          <br className="hidden md:block" />
          Alterne entre visões da plateia, ângulos do palco e acesso aos bastidores em tempo real.
          <br className="hidden lg:block" />
          <span className="text-purple-400 font-semibold">O futuro do entretenimento ao vivo chegou.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Primary CTA */}
          <motion.button
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 font-bold text-white text-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              Começar Experiência Multi-POV
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            
            {/* Animated shadow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(236, 72, 153, 0.4)',
                  '0 0 40px rgba(34, 211, 238, 0.4)',
                  '0 0 20px rgba(236, 72, 153, 0.4)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            className="group px-8 py-4 rounded-full border-2 border-white/30 hover:border-cyan-400 text-white font-semibold text-lg backdrop-blur-sm transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              <Play className="w-5 h-5 mr-2" />
              Ver Demo POV
            </span>
            
            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-full"
              transition={{ duration: 0.3 }}
            />
            
            {/* Border glow animation */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
              animate={{
                boxShadow: ['0 0 0px rgba(34, 211, 238, 0)', '0 0 30px rgba(34, 211, 238, 0.5)', '0 0 0px rgba(34, 211, 238, 0)']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        </motion.div>

        {/* Stats */}
        {hasMounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2.5M+</div>
              <div className="text-gray-400 text-sm">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15</div>
              <div className="text-gray-400 text-sm">Ângulos por Evento</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-20" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 z-10" />
    </section>
  )
} 