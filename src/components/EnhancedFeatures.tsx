"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Users, Building, Zap, Shield, Globe } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        rotateX: 5,
        rotateY: 5,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative p-8 rounded-2xl bg-glass-white backdrop-blur-md border border-white/20 hover:border-brandMagenta/50 transition-all duration-500 hover:shadow-neonRing overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brandMagenta/5 to-brandCyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brandMagenta/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* Icon with animation */}
          <motion.div 
            className="mb-6 flex justify-center"
            whileHover={{ 
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          >
            <div className="p-4 rounded-xl bg-gradient-to-r from-brandMagenta/20 to-brandCyan/20 border border-brandMagenta/30 group-hover:from-brandMagenta/30 group-hover:to-brandCyan/30 transition-all duration-300">
              <div className="text-brandMagenta group-hover:text-brandCyan transition-colors duration-300">
                {icon}
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold font-orbitron mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brandMagenta group-hover:to-brandCyan transition-all duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
            {description}
          </p>

          {/* Hover effect line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brandMagenta to-brandCyan"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

const EnhancedFeatures: React.FC = () => {
  const features = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "VR-Clients",
      description: "Experience premium events from home at a fraction of the cost. Immerse yourself in concerts, sports, and exclusive gatherings with cutting-edge VR technology."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "VR-Resellers",
      description: "Monetize your event experiences by reselling as VR-Tickets. Create passive income streams while sharing amazing experiences with the community."
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "VR-Environments",
      description: "Host VR-Resellers and reach a global audience. Transform your venue into a virtual destination accessible to millions worldwide."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Built on BASE blockchain for instant transactions and seamless user experience. No more waiting for confirmations or high gas fees."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Decentralized",
      description: "Your assets and experiences are protected by blockchain technology. True ownership with transparent and immutable smart contracts."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Connect with audiences worldwide. Break geographical barriers and create truly global entertainment experiences."
    }
  ]

  return (
    <section id="features" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brandMagenta/5 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandMagenta/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brandCyan/10 rounded-full blur-3xl animate-float" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-neonRing hover:shadow-neonRingHover transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default EnhancedFeatures 