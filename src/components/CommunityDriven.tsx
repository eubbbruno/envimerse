import React from 'react'
import { Users, Globe, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const GlassPanelVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const IconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
}

export default function CommunityDriven() {
  return (
    <section id="community-driven" className="relative overflow-hidden mx-4 rounded-3xl">
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/community-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan"
        >
          Created by the People, for the People
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "VR-Resellers", description: "Community members who share their experiences with the world" },
            { icon: Globe, title: "VR-Environments", description: "Created and curated by venue owners and event organizers" },
            { icon: Zap, title: "Community-driven Content", description: "Ensures diverse and exciting experiences for all users" }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={GlassPanelVariants}
              initial="hidden"
              animate="visible"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brandMagenta/30 to-brandCyan/30 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-black/50 p-8 rounded-xl border border-white/10 backdrop-blur-sm transform group-hover:scale-105 transition duration-300">
                <motion.div
                  variants={IconVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-brandMagenta to-brandCyan rounded-full p-4 shadow-lg"
                >
                  <item.icon className="w-full h-full text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-center text-white font-orbitron">{item.title}</h3>
                <p className="text-gray-300 text-center">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join Envimerse today and become part of a revolutionary community shaping the future of virtual experiences.
          </p>
          <button className="mt-8 px-8 py-3 bg-gradient-to-r from-brandMagenta to-brandCyan text-white rounded-full font-bold text-lg hover:from-brandMagenta/80 hover:to-brandCyan/80 transform hover:scale-105 transition duration-300 shadow-neonRing hover:shadow-neonRingHover">
            Join the Community
          </button>
        </motion.div>
      </div>
    </section>
  )
}