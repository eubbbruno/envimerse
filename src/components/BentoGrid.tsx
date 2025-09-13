"use client"

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  Headphones, 
  Ticket, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  Sparkles,
  Eye,
  Heart,
  Crown
} from 'lucide-react'

// Custom hook to replace react-intersection-observer
function useInView(options: { threshold: number; triggerOnce: boolean }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof window === 'undefined') return

    // Check if IntersectionObserver is available
    if (!window.IntersectionObserver) {
      setInView(true) // Fallback to showing content
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setInView(true)
          if (options.triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!options.triggerOnce) {
          setInView(false)
        }
      },
      { threshold: options.threshold }
    )

    try {
      observer.observe(element)
    } catch (error) {
      console.warn('IntersectionObserver error:', error)
      setInView(true) // Fallback
    }

    return () => {
      try {
        observer.unobserve(element)
      } catch (error) {
        console.warn('IntersectionObserver cleanup error:', error)
      }
    }
  }, [options.threshold, options.triggerOnce])

  return [ref, inView] as const
}

interface BentoItemProps {
  title: string
  description: string
  icon: React.ComponentType<any>
  className?: string
  gradient?: string
  delay?: number
}

function BentoItem({ 
  title, 
  description, 
  icon: Icon, 
  className = '', 
  gradient = 'from-purple-500/20 to-cyan-500/20',
  delay = 0 
}: BentoItemProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.04, 0.62, 0.23, 0.98]
      }}
      className={`
        relative group overflow-hidden rounded-2xl border border-white/10 
        bg-gradient-to-br ${gradient} backdrop-blur-xl
        hover:border-white/20 transition-all duration-500
        hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10
        ${className}
      `}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-60"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <div className="relative p-6 lg:p-8 h-full flex flex-col">
        {/* Icon */}
        <motion.div
          className="mb-4 p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 w-fit group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
              {title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="mt-6 flex items-center text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <span>Explorar</span>
            <motion.div
              className="ml-2 w-4 h-4"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div className="absolute inset-[1px] rounded-2xl bg-black/40 backdrop-blur-xl" />
    </motion.div>
  )
}

export default function BentoGrid() {
  const features = [
    {
      title: "Experiências Imersivas",
      description: "Mergulhe em shows, eventos esportivos e conferências como se estivesse no local. Cada detalhe é capturado em 360°.",
      icon: Headphones,
      className: "lg:col-span-2 lg:row-span-2",
      gradient: "from-purple-500/20 via-pink-500/10 to-cyan-500/20",
      delay: 0
    },
    {
      title: "Ingressos Únicos",
      description: "Seus ingressos NFT são únicos e verificáveis. Sem falsificações, sem fraudes.",
      icon: Ticket,
      className: "lg:col-span-1 lg:row-span-1",
      gradient: "from-emerald-500/20 to-teal-500/20",
      delay: 0.1
    },
    {
      title: "Conecte-se Globalmente",
      description: "Participe de eventos em qualquer lugar do mundo, a qualquer hora.",
      icon: Globe,
      className: "lg:col-span-1 lg:row-span-1",
      gradient: "from-blue-500/20 to-indigo-500/20",
      delay: 0.2
    },
    {
      title: "Segurança Total",
      description: "Blockchain garante que seus ingressos e dados estão sempre protegidos e verificáveis.",
      icon: Shield,
      className: "lg:col-span-1 lg:row-span-1",
      gradient: "from-orange-500/20 to-red-500/20",
      delay: 0.3
    },
    {
      title: "Performance Ultra-Rápida",
      description: "Streaming de alta qualidade com latência mínima para experiências fluidas e realistas.",
      icon: Zap,
      className: "lg:col-span-2 lg:row-span-1",
      gradient: "from-yellow-500/20 to-orange-500/20",
      delay: 0.4
    },
    {
      title: "Comunidade Vibrante",
      description: "Conecte-se com outros fãs, compartilhe experiências e crie memórias juntos.",
      icon: Users,
      className: "lg:col-span-1 lg:row-span-1",
      gradient: "from-pink-500/20 to-rose-500/20",
      delay: 0.5
    }
  ]

  const [headerRef, headerInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-200 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Recursos Avançados</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Por que escolher o</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Envimerse?
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Revolucionamos a forma como você vivencia entretenimento. 
            <br className="hidden lg:block" />
            <span className="text-cyan-400">Cada recurso foi pensado para você.</span>
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {features.map((feature, index) => (
            <BentoItem
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={feature.className}
              gradient={feature.gradient}
              delay={feature.delay}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-20"
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              Explorar Todas as Funcionalidades
              <Eye className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </span>
            
            {/* Button glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-60"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${20 + (i % 2) * 60}%`,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 