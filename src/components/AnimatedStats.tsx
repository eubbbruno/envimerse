"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, DollarSign, Zap, Globe } from 'lucide-react'

interface StatItemProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  prefix?: string
  duration?: number
}

const StatItem: React.FC<StatItemProps> = ({ 
  icon, 
  value, 
  label, 
  suffix = '', 
  prefix = '',
  duration = 2 
}) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationId: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * value))

        if (progress < 1) {
          animationId = requestAnimationFrame(animate)
        }
      }

      animationId = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationId)
    }
  }, [isInView, value, duration])

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-xl bg-glass-white backdrop-blur-md border border-white/20 hover:border-brandMagenta/50 transition-all duration-300 group hover:shadow-neonRing"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div 
        className="flex justify-center mb-4"
        animate={isInView ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="p-4 rounded-full bg-gradient-to-r from-brandMagenta/20 to-brandCyan/20 border border-brandMagenta/30 group-hover:from-brandMagenta/30 group-hover:to-brandCyan/30 transition-all duration-300">
          <div className="text-brandMagenta group-hover:text-brandCyan transition-colors duration-300">
            {icon}
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="text-4xl md:text-5xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan mb-2"
        animate={isInView ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </motion.div>
      
      <p className="text-gray-300 font-medium">{label}</p>
    </motion.div>
  )
}

const AnimatedStats: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: 50000,
      label: "Active VR Users",
      suffix: "+"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: 2500000,
      label: "Total Revenue",
      prefix: "$"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: 150,
      label: "Partner Venues",
      suffix: "+"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: 25,
      label: "Countries Reached"
    }
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-brandMagenta/5 via-transparent to-brandCyan/5" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-brandMagenta/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brandCyan/10 rounded-full blur-3xl animate-float" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatItem {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-block p-1 rounded-xl bg-gradient-to-r from-brandMagenta to-brandCyan"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black rounded-lg px-8 py-4">
              <p className="text-lg text-white font-medium">
                Join thousands of users already experiencing the future of entertainment
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AnimatedStats 