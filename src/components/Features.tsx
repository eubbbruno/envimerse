import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Glasses, Coins, Shield, Users, ShoppingBag, Gift, LucideIcon } from 'lucide-react'

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Glasses className="w-8 h-8" />,
    title: "Immersive VR Experience",
    description: "Step into a world of limitless possibilities with our cutting-edge VR technology.",
    color: "from-blue-500 to-cyan-300"
  },
  {
    icon: <Coins className="w-8 h-8" />,
    title: "ENVI Token Integration",
    description: "Seamlessly use ENVI tokens for transactions within the Envimerse ecosystem.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Blockchain Security",
    description: "Enjoy peace of mind with our robust blockchain-based security measures.",
    color: "from-green-400 to-emerald-600"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community-Driven Content",
    description: "Experience a diverse range of events and environments created by our vibrant community.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: "NFT Marketplace",
    description: "Buy, sell, and trade unique digital assets in our integrated NFT marketplace.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: <Gift className="w-8 h-8" />,
    title: "Rewards Program",
    description: "Earn rewards for your participation and contributions to the Envimerse ecosystem.",
    color: "from-indigo-500 to-purple-500"
  }
]

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group"
  >
    <Card className="bg-gray-900 border-gray-800 overflow-hidden relative h-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg rounded-3xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 rounded-3xl"></div>
      <CardHeader className="relative z-10">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {feature.icon}
        </div>
        <CardTitle className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="text-gray-400 group-hover:text-white transition-colors duration-300">
          {feature.description}
        </CardDescription>
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
    </Card>
  </motion.div>
)

export default function Features() {
  return (
    <section id="features" className="py-20 bg-black relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white font-orbitron"
        >
          Envimerse Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}