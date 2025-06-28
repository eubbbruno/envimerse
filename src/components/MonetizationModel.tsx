"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Palette, 
  MessageCircle, 
  Coins,
  TrendingUp,
  Users,
  Eye,
  Sparkles,
  Crown,
  Shirt,
  Glasses,
  Watch,
  Headphones,
  Gamepad2,
  Star
} from 'lucide-react'

interface SkinExample {
  id: string
  name: string
  category: string
  price: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  icon: React.ReactNode
  description: string
  preview: string
}

interface RevenueStream {
  title: string
  description: string
  percentage: string
  icon: React.ReactNode
  color: string
  examples: string[]
}

const MonetizationModel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('avatar')

  const revenueStreams: RevenueStream[] = [
    {
      title: "Transaction Fees",
      description: "Commission on all marketplace transactions and ticket sales",
      percentage: "2.5%",
      icon: <Coins className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-600",
      examples: [
        "Event ticket purchases",
        "VR skin marketplace sales",
        "Premium content access",
        "Virtual merchandise"
      ]
    },
    {
      title: "VR Skins & Cosmetics",
      description: "Premium virtual items and customization options",
      percentage: "65%",
      icon: <Palette className="w-6 h-6" />,
      color: "from-brandMagenta to-purple-600",
      examples: [
        "Avatar customization",
        "Virtual clothing",
        "Exclusive accessories",
        "Animated effects"
      ]
    },
    {
      title: "Chat & Social Features",
      description: "Premium communication and social interaction tools",
      percentage: "15%",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-brandCyan to-blue-600",
      examples: [
        "Custom emotes",
        "VIP chat badges",
        "Private messaging",
        "Group chat rooms"
      ]
    },
    {
      title: "Premium Experiences",
      description: "Exclusive events and enhanced viewing experiences",
      percentage: "17.5%",
      icon: <Crown className="w-6 h-6" />,
      color: "from-purple-400 to-pink-600",
      examples: [
        "VIP event access",
        "Backstage experiences",
        "Meet & greet sessions",
        "Exclusive content"
      ]
    }
  ]

  const skinCategories = {
    avatar: [
      {
        id: 'neon-suit',
        name: 'Neon Cyber Suit',
        category: 'Avatar',
        price: '0.05 ETH',
        rarity: 'legendary' as const,
        icon: <Shirt className="w-5 h-5" />,
        description: 'Glowing cyberpunk outfit with animated neon lines',
        preview: 'Full-body suit with reactive lighting'
      },
      {
        id: 'holographic-hair',
        name: 'Holographic Hair',
        category: 'Avatar',
        price: '0.02 ETH',
        rarity: 'epic' as const,
        icon: <Sparkles className="w-5 h-5" />,
        description: 'Shimmering hair that changes color with music',
        preview: 'Dynamic color-shifting hairstyle'
      },
      {
        id: 'cyber-tattoos',
        name: 'Cyber Tattoos',
        category: 'Avatar',
        price: '0.01 ETH',
        rarity: 'rare' as const,
        icon: <Zap className="w-5 h-5" />,
        description: 'Animated circuit-pattern tattoos',
        preview: 'Glowing tech-inspired body art'
      }
    ],
    accessories: [
      {
        id: 'ar-glasses',
        name: 'AR Smart Glasses',
        category: 'Accessories',
        price: '0.03 ETH',
        rarity: 'epic' as const,
        icon: <Glasses className="w-5 h-5" />,
        description: 'Futuristic glasses with HUD display',
        preview: 'Interactive holographic interface'
      },
      {
        id: 'quantum-watch',
        name: 'Quantum Watch',
        category: 'Accessories',
        price: '0.025 ETH',
        rarity: 'rare' as const,
        icon: <Watch className="w-5 h-5" />,
        description: 'Time-bending wrist device with particle effects',
        preview: 'Floating time distortion effects'
      },
      {
        id: 'neural-headset',
        name: 'Neural Headset',
        category: 'Accessories',
        price: '0.04 ETH',
        rarity: 'legendary' as const,
        icon: <Headphones className="w-5 h-5" />,
        description: 'Mind-controlled audio device with brain wave visualization',
        preview: 'Pulsing neural activity display'
      }
    ],
    effects: [
      {
        id: 'particle-aura',
        name: 'Particle Aura',
        category: 'Effects',
        price: '0.015 ETH',
        rarity: 'rare' as const,
        icon: <Sparkles className="w-5 h-5" />,
        description: 'Swirling particle effects around your avatar',
        preview: 'Customizable particle colors and patterns'
      },
      {
        id: 'hologram-trail',
        name: 'Hologram Trail',
        category: 'Effects',
        price: '0.02 ETH',
        rarity: 'epic' as const,
        icon: <TrendingUp className="w-5 h-5" />,
        description: 'Leave holographic trails when moving',
        preview: 'Glowing movement traces'
      },
      {
        id: 'energy-shield',
        name: 'Energy Shield',
        category: 'Effects',
        price: '0.035 ETH',
        rarity: 'legendary' as const,
        icon: <Crown className="w-5 h-5" />,
        description: 'Protective energy barrier with lightning effects',
        preview: 'Crackling energy dome protection'
      }
    ]
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500'
      case 'epic': return 'from-purple-400 to-pink-500'
      case 'rare': return 'from-blue-400 to-cyan-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400/50'
      case 'epic': return 'border-purple-400/50'
      case 'rare': return 'border-blue-400/50'
      default: return 'border-gray-400/50'
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-brandCyan/5 to-brandMagenta/5" />
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
            Revenue Model
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powered by transaction fees and premium VR experiences. 
            <span className="text-brandCyan font-medium"> Create, customize, and monetize your virtual presence.</span>
          </p>
        </motion.div>

        {/* Revenue Streams */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {revenueStreams.map((stream, index) => (
            <motion.div
              key={stream.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stream.color} bg-opacity-20 mb-4`}>
                <div className="text-white">
                  {stream.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                {stream.title}
              </h3>
              
              <div className={`text-3xl font-bold font-orbitron mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stream.color}`}>
                {stream.percentage}
              </div>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {stream.description}
              </p>
              
              <ul className="space-y-1">
                {stream.examples.map((example, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                    <div className="w-1 h-1 bg-brandCyan rounded-full" />
                    {example}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* VR Skins Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-4xl font-bold font-orbitron text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan">
            VR Skins & Cosmetics
          </h3>
          
          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="glass-dark rounded-2xl p-2 border border-white/10">
              {Object.keys(skinCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-brandMagenta to-brandCyan text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Skins Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skinCategories[selectedCategory as keyof typeof skinCategories].map((skin, index) => (
              <motion.div
                key={skin.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-dark rounded-2xl p-6 border-2 ${getRarityBorder(skin.rarity)} hover:border-opacity-100 transition-all duration-300 group hover:scale-105`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${getRarityColor(skin.rarity)} bg-opacity-20`}>
                    <div className="text-white">
                      {skin.icon}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${getRarityColor(skin.rarity)} border border-current border-opacity-30`}>
                    {skin.rarity.toUpperCase()}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2 font-orbitron">
                  {skin.name}
                </h4>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {skin.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r ${getRarityColor(skin.rarity)}`}>
                    {skin.price}
                  </span>
                  <button className="px-4 py-2 bg-gradient-to-r from-brandMagenta to-brandCyan text-white rounded-lg font-medium hover:opacity-80 transition-opacity duration-300">
                    Preview
                  </button>
                </div>
                
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs text-gray-400">
                    {skin.preview}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Projections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-dark rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-3xl font-bold font-orbitron text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan">
            Revenue Projections
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                period: "Year 1",
                revenue: "$2.5M",
                users: "50K",
                transactions: "500K",
                description: "Foundation phase with core marketplace"
              },
              {
                period: "Year 2", 
                revenue: "$12M",
                users: "250K",
                transactions: "2.5M",
                description: "Expansion with premium features"
              },
              {
                period: "Year 3",
                revenue: "$45M",
                users: "1M",
                transactions: "10M",
                description: "Global scale with enterprise partnerships"
              }
            ].map((projection, index) => (
              <div key={projection.period} className="text-center">
                <h4 className="text-2xl font-bold font-orbitron text-white mb-4">
                  {projection.period}
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan">
                      {projection.revenue}
                    </div>
                    <div className="text-sm text-gray-400">Revenue</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-brandCyan">
                      {projection.users}
                    </div>
                    <div className="text-sm text-gray-400">Active Users</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-brandMagenta">
                      {projection.transactions}
                    </div>
                    <div className="text-sm text-gray-400">Transactions</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                  {projection.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MonetizationModel 