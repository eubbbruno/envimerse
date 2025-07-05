"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Rocket, 
  Zap, 
  Globe, 
  Smartphone, 
  Brain, 
  Shield, 
  Gamepad2,
  CheckCircle,
  Clock,
  ArrowRight,
  Users,
  Building
} from 'lucide-react'

interface RoadmapItem {
  id: string
  quarter: string
  year: string
  title: string
  description: string
  features: string[]
  status: 'completed' | 'in-progress' | 'planned'
  icon: React.ReactNode
  color: string
}

const InteractiveRoadmap: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const roadmapData: RoadmapItem[] = [
    {
      id: '2024-q1',
      quarter: 'Q1',
      year: '2024',
      title: 'Platform Launch',
      description: 'Official launch of Envimerse with basic VR features and Web3 integration.',
      features: [
        'Basic VR interface',
        'Web3 wallet integration',
        'Authentication system',
        'Initial marketplace'
      ],
      status: 'completed',
      icon: <Rocket className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-600'
    },
    {
      id: '2024-q2',
      quarter: 'Q2',
      year: '2024',
      title: 'Feature Expansion',
      description: 'Addition of new features and user experience improvements.',
      features: [
        'High-quality streaming',
        'Real-time chat',
        'Rewards system',
        'Multi-device support'
      ],
      status: 'completed',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-400 to-cyan-600'
    },
    {
      id: '2024-q3',
      quarter: 'Q3',
      year: '2024',
      title: 'Global Integration',
      description: 'International expansion and strategic partnerships with global venues.',
      features: [
        'Multi-language support',
        'International partnerships',
        'Global latency optimization',
        'Regulatory compliance'
      ],
      status: 'in-progress',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-brandMagenta to-purple-600'
    },
    {
      id: '2024-q4',
      quarter: 'Q4',
      year: '2024',
      title: 'AI & Automation',
      description: 'Implementation of AI-driven features and automated systems.',
      features: [
        'AI content recommendation',
        'Automated event management',
        'Smart pricing algorithms',
        'Predictive analytics'
      ],
      status: 'planned',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-orange-400 to-red-600'
    },
    {
      id: '2025-q1',
      quarter: 'Q1',
      year: '2025',
      title: 'Metaverse Integration',
      description: 'Full integration with major metaverse platforms and virtual worlds.',
      features: [
        'Cross-platform compatibility',
        'Virtual world hosting',
        'Avatar customization',
        'Social VR features'
      ],
      status: 'planned',
      icon: <Users className="w-6 h-6" />,
      color: 'from-brandCyan to-brandMagenta'
    },
    {
      id: '2025-q2',
      quarter: 'Q2',
      year: '2025',
      title: 'Enterprise Solutions',
      description: 'Launch of enterprise-focused tools and B2B partnerships.',
      features: [
        'Corporate event hosting',
        'Training simulations',
        'Team collaboration tools',
        'Analytics dashboard'
      ],
      status: 'planned',
      icon: <Building className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-600'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-400" />
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      default:
        return 'Planned'
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brandMagenta/5 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandMagenta/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brandCyan/10 rounded-full blur-3xl animate-float" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-brandMagenta via-brandCyan to-brandMagenta opacity-30" />
          
          <div className="space-y-16">
            {roadmapData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center border-4 border-black shadow-neonRing`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}>
                  <motion.div
                    className={`glass-dark rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer ${
                      selectedItem === item.id ? 'ring-2 ring-brandMagenta shadow-neonRing' : ''
                    }`}
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Quarter Badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-black font-bold text-sm mb-4`}>
                      {item.quarter} {item.year}
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        item.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {item.status === 'completed' ? 'Completed' :
                         item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-2xl font-bold font-orbitron text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Features List */}
                    <AnimatePresence>
                      {selectedItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          {item.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`} />
                              <span className="text-gray-400 text-sm">{feature}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Click Indicator */}
                    <div className="text-right mt-4">
                      <span className="text-xs text-gray-500">
                        {selectedItem === item.id ? 'Click to collapse' : 'Click to expand'}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveRoadmap 