"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Globe, Zap, Eye, Heart, Star, Trophy, Activity, DollarSign, ArrowUp } from 'lucide-react'

interface MetricData {
  label: string
  value: number
  suffix: string
  icon: React.ReactNode
  color: string
  trend: number
  description: string
}

const RealtimeMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      label: "Active Users",
      value: 52847,
      suffix: "",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      trend: 12.5,
      description: "Users online now"
    },
    {
      label: "Live Events",
      value: 127,
      suffix: "",
      icon: <Eye className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-500",
      trend: 8.3,
      description: "Active streams"
    },
    {
      label: "Revenue",
      value: 2847000,
      suffix: "",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500",
      trend: 23.8,
      description: "Total revenue"
    },
    {
      label: "Satisfaction",
      value: 98.7,
      suffix: "%",
      icon: <Heart className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      trend: 2.1,
      description: "User rating"
    },
    {
      label: "Transactions/min",
      value: 1847,
      suffix: "",
      icon: <Zap className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-600",
      trend: 23.8,
      description: "BASE Blockchain"
    },
    {
      label: "Average Rating",
      value: 4.9,
      suffix: "/5",
      icon: <Star className="w-6 h-6" />,
      color: "from-amber-400 to-yellow-600",
      trend: 5.7,
      description: "Platform rating"
    },
    {
      label: "Awards Won",
      value: 15,
      suffix: "",
      icon: <Trophy className="w-6 h-6" />,
      color: "from-indigo-400 to-purple-600",
      trend: 25.0,
      description: "Industry recognition"
    },
    {
      label: "Growth",
      value: 340,
      suffix: "%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-teal-400 to-cyan-600",
      trend: 45.2,
      description: "Annual growth"
    }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.label === "Active Users" 
          ? metric.value + Math.floor(Math.random() * 10) - 5
          : metric.label === "Live Events"
          ? Math.max(100, metric.value + Math.floor(Math.random() * 6) - 3)
          : metric.value
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brandMagenta/5 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandMagenta/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brandCyan/10 rounded-full blur-3xl animate-float" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${metric.color} p-4`}>
                    {index === 0 && <Users className="w-full h-full text-white" />}
                    {index === 1 && <Eye className="w-full h-full text-white" />}
                    {index === 2 && <DollarSign className="w-full h-full text-white" />}
                    {index === 3 && <Heart className="w-full h-full text-white" />}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-400">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">+{metric.trend}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    {metric.label === "Revenue" ? `$${(metric.value / 1000000).toFixed(1)}M` : 
                     metric.label === "Satisfaction" ? `${metric.value}%` :
                     metric.value.toLocaleString()}
                  </h3>
                  <p className="text-gray-400 text-sm">{metric.label}</p>
                </div>

                <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(100, (metric.value / (metric.label === "Revenue" ? 3000000 : metric.label === "Satisfaction" ? 100 : 60000)) * 100)}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RealtimeMetrics 