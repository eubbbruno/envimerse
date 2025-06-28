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
  ArrowRight
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
      title: 'Mobile App & AR',
      description: 'Launch of mobile application with Augmented Reality features.',
      features: [
        'iOS and Android apps',
        'AR features',
        'Push notifications',
        'Cross-platform sync'
      ],
      status: 'in-progress',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'from-brandCyan to-blue-600'
    },
    {
      id: '2025-q1',
      quarter: 'Q1',
      year: '2025',
      title: 'AI & Machine Learning',
      description: 'Implementation of AI for personalization and intelligent recommendations.',
      features: [
        'Personalized recommendations',
        'Behavior analysis',
        'Intelligent chatbot',
        'Automatic optimization'
      ],
      status: 'planned',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-600'
    },
    {
      id: '2025-q2',
      quarter: 'Q2',
      year: '2025',
      title: 'Advanced Security',
      description: 'Implementation of advanced security and privacy features.',
      features: [
        'Biometric authentication',
        'End-to-end encryption',
        'Security auditing',
        'GDPR/CCPA compliance'
      ],
      status: 'planned',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-400 to-orange-600'
    },
    {
      id: '2025-q3',
      quarter: 'Q3',
      year: '2025',
      title: 'Gaming & Interactivity',
      description: 'Addition of gamification elements and interactive experiences.',
      features: [
        'VR mini-games',
        'Achievement system',
        'Tournaments and competitions',
        'Token economy'
      ],
      status: 'planned',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-600'
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
      <div className="absolute inset-0 bg-gradient-to-b from-brandMagenta/5 to-brandCyan/5" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-brandMagenta/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-brandCyan/10 rounded-full blur-3xl animate-float" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan">
            Interactive Roadmap
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Follow our innovation journey and the upcoming milestones that will define the future of VR entertainment. 
            <span className="text-brandCyan font-medium"> Each step brings us closer to the digital revolution.</span>
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brandMagenta via-brandCyan to-brandMagenta opacity-30" />
          
          {roadmapData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <motion.div
                  className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} bg-opacity-20`}>
                        <div className="text-white">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">
                          {item.quarter} {item.year}
                        </div>
                        <h3 className="text-xl font-bold text-white font-orbitron">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm text-gray-300">
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Features Preview */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      {item.features.length} key features
                    </div>
                    <ArrowRight className="w-4 h-4 text-brandCyan group-hover:translate-x-1 transition-transform duration-300" />
                  </div>

                  {/* Expanded Features */}
                  <AnimatePresence>
                    {selectedItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                        <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {item.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.1 }}
                              className="flex items-center gap-2 text-gray-300"
                            >
                              <div className="w-1.5 h-1.5 bg-brandCyan rounded-full" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.color} border-4 border-black shadow-lg`}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
                {item.status === 'in-progress' && (
                  <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-brandMagenta to-brandCyan animate-ping opacity-30" />
                )}
              </div>

              {/* Empty Space */}
              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-dark rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan">
              Join the Journey
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Join our community and be among the first to experience each new feature. 
              Your feedback shapes the future of Envimerse.
            </p>
            <motion.button
              className="bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-bold px-8 py-3 rounded-xl shadow-neonRing hover:shadow-neonRingHover transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Beta Program
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveRoadmap 