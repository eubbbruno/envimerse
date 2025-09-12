"use client"

import { motion } from 'framer-motion'
import { 
  Headphones, 
  Ticket, 
  Wallet, 
  Monitor, 
  Shield, 
  Zap,
  Users,
  Globe
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

// Custom hook for intersection observer
function useInView(threshold = 0.3) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof window === 'undefined') return

    if (!window.IntersectionObserver) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold }
    )

    try {
      observer.observe(element)
    } catch (error) {
      setInView(true)
    }

    return () => {
      try {
        observer.unobserve(element)
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  }, [threshold])

  return [ref, inView] as const
}

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ComponentType<any>
  className?: string
  gradient?: string
  delay?: number
}

function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  className = '', 
  gradient = 'from-purple-900/20 to-cyan-900/20',
  delay = 0 
}: FeatureCardProps) {
  const [ref, inView] = useInView()

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
        group relative rounded-3xl p-6 lg:p-8 backdrop-blur-xl border border-white/10 
        bg-gradient-to-br ${gradient}
        hover:border-white/30 transition-all duration-500 hover:scale-[1.02] 
        hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden
        ${className}
      `}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Icon */}
        <motion.div
          className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 w-fit group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
        >
          <Icon className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
        </motion.div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
            {title}
          </h3>
          <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
            {description}
          </p>
        </div>

        {/* Learn more indicator */}
        <motion.div
          className="mt-6 flex items-center text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span>Learn more</span>
          <motion.div
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}

export default function FeaturesSection() {
  const [headerRef, headerInView] = useInView()

  const features = [
    {
      title: "True VR Experience",
      description: "Feel like you're really there with 360° immersive views. Compatible with Quest, Pico, and all major VR headsets.",
      icon: Headphones,
      className: "md:col-span-2 md:row-span-2",
      gradient: "from-purple-900/20 via-pink-900/10 to-cyan-900/20",
      delay: 0
    },
    {
      title: "Secure Tickets",
      description: "Your ticket is yours forever. No fakes, no scams, guaranteed authenticity.",
      icon: Ticket,
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-emerald-900/20 to-teal-900/20",
      delay: 0.1
    },
    {
      title: "Instant Payouts",
      description: "Artists get paid immediately after the show ends. No waiting, no delays.",
      icon: Wallet,
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-blue-900/20 to-indigo-900/20",
      delay: 0.2
    },
    {
      title: "HD Streaming Option",
      description: "Not ready for VR? Enjoy crystal-clear HD streams on any device, anywhere.",
      icon: Monitor,
      className: "md:col-span-2 md:row-span-1",
      gradient: "from-violet-900/20 to-purple-900/20",
      delay: 0.3
    },
    {
      title: "Global Access",
      description: "Join events from anywhere in the world. No geographic restrictions.",
      icon: Globe,
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-cyan-900/20 to-blue-900/20",
      delay: 0.4
    }
  ]

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
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Why Choose Envimerse</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">The Future of</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Live Entertainment
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We're not just streaming events—we're teleporting you there.
            <br className="hidden lg:block" />
            <span className="text-cyan-400">Every detail designed for your experience.</span>
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {features.map((feature, index) => (
            <FeatureCard
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-20"
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl font-semibold text-white text-lg overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              Experience All Features
              <Users className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </span>
            
            {/* Button glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 