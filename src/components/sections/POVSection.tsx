"use client"

import { motion } from 'framer-motion'
import { 
  Camera, 
  Eye, 
  Users, 
  Play, 
  Headphones, 
  Smartphone,
  Glasses,
  Video,
  Zap,
  ArrowRight
} from 'lucide-react'
import { useState } from 'react'

export default function POVSection() {
  const [activeView, setActiveView] = useState('audience')

  const povViews = [
    {
      id: 'audience',
      title: 'Audience POV',
      description: 'Experience the energy from the crowd',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      details: 'Experience the show as if you were in the middle of the crowd, feeling all the energy and emotion of the audience.'
    },
    {
      id: 'stage',
      title: 'Stage POV',
      description: 'See through the artist\'s eyes',
      icon: Eye,
      color: 'from-cyan-500 to-blue-500',
      details: 'Have a unique view of the stage, seeing the audience and feeling part of the performance.'
    },
    {
      id: 'backstage',
      title: 'Backstage POV',
      description: 'Behind-the-scenes access',
      icon: Camera,
      color: 'from-emerald-500 to-teal-500',
      details: 'VIP backstage access, see artist preparation and unique moments.'
    }
  ]

  const smartGlasses = [
    {
      brand: 'Ray-Ban Meta',
      model: 'Smart Glasses',
      description: 'Discreet streaming with premium optics',
      image: 'from-amber-600 to-orange-600',
      features: ['4K Recording', 'Live Streaming', 'Voice Control']
    },
    {
      brand: 'Oakley Prizm',
      model: 'Sport Series',
      description: 'Perfect for sports events and outdoor concerts',
      image: 'from-red-600 to-pink-600',
      features: ['HDR Vision', 'Wind Resistant', 'All-Day Battery']
    },
    {
      brand: 'Apple Vision Pro',
      model: 'Integration Ready',
      description: 'Ultimate immersive broadcasting experience',
      image: 'from-slate-600 to-gray-600',
      features: ['Spatial Recording', 'Real-time Processing', 'Pro Quality']
    }
  ]

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container-spacing relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center element-spacing-lg"
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-200 element-spacing-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Camera className="w-5 h-5 mr-3" />
            <span className="text-lg font-semibold">Revolutionary POV Technology</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold element-spacing">
            <span className="text-white">See Through</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Every Perspective
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The world's first platform for <span className="text-cyan-400 font-semibold">multi-angle live streaming</span>.
            <br className="hidden lg:block" />
            Choose your view, switch perspectives, feel like you're everywhere at once.
            <br className="hidden lg:block" />
            <span className="text-purple-400 font-semibold">The future of live entertainment is here.</span>
          </p>
        </motion.div>

        {/* POV Selector */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="element-spacing-lg"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 element-spacing">
            {povViews.map((view) => {
              const Icon = view.icon
              return (
                <motion.button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group min-w-[280px] ${
                    activeView === view.id 
                      ? 'border-white/50 bg-gradient-to-br from-white/10 to-white/5' 
                      : 'border-white/20 bg-white/5 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${view.color} p-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{view.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{view.description}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{view.details}</p>
                  
                  {activeView === view.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-cyan-400/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Active View Display */}
          <motion.div
            key={activeView}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/20 overflow-hidden relative group">
              {/* Simulated Video Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-cyan-600/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                >
                  <Play className="w-12 h-12 text-white ml-1" />
                </motion.div>
              </div>
              
              {/* POV Label */}
              <div className="absolute top-6 left-6">
                <div className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-white font-semibold text-sm">
                    LIVE • {povViews.find(v => v.id === activeView)?.title}
                  </span>
                </div>
              </div>

              {/* View Counter */}
              <div className="absolute top-6 right-6">
                <div className="flex items-center px-4 py-2 bg-red-500/80 backdrop-blur-sm rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  <span className="text-white font-semibold text-sm">12.4K watching</span>
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all">
                    <Headphones className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all">
                    <Video className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                <div className="text-white text-sm font-medium">
                  Switch POV: Press 1, 2, or 3
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Smart Glasses Partnership */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="element-spacing-lg"
        >
          <div className="text-center element-spacing">
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-200 element-spacing-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Glasses className="w-5 h-5 mr-3" />
              <span className="text-lg font-semibold">Smart Glasses Integration</span>
            </motion.div>

            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Stream Like a Pro with 
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"> Premium Partners</span>
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Official partnerships with leading smart glasses manufacturers for seamless, high-quality streaming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {smartGlasses.map((glasses, index) => (
              <motion.div
                key={glasses.brand}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                {/* Glasses Visual */}
                <div className={`h-48 bg-gradient-to-br ${glasses.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Glasses className="w-24 h-24 text-white/80" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-green-500 rounded-full text-xs font-bold text-white">
                      PARTNER
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-white mb-2">{glasses.brand}</h4>
                  <p className="text-cyan-400 font-semibold mb-3">{glasses.model}</p>
                  <p className="text-gray-300 mb-4 leading-relaxed">{glasses.description}</p>
                  
                  <div className="space-y-2">
                    {glasses.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-300">
                        <Zap className="w-4 h-4 text-cyan-400 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Change How the World 
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Watches Live Events?</span>
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the revolution. Stream your perspective. Experience every angle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(139,69,19,0.8)] transition-all duration-300"
            >
              <span className="flex items-center">
                Start POV Streaming
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold text-lg hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}