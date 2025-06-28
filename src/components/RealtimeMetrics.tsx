"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Globe, Zap, Eye, Heart, Star, Trophy } from 'lucide-react'

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
      color: "from-brandMagenta to-purple-600",
      trend: 12.5,
      description: "Users online now"
    },
    {
      label: "Live Events",
      value: 127,
      suffix: "",
      icon: <Eye className="w-6 h-6" />,
      color: "from-brandCyan to-blue-600",
      trend: 8.3,
      description: "Active streams"
    },
    {
      label: "Countries Served",
      value: 28,
      suffix: "",
      icon: <Globe className="w-6 h-6" />,
      color: "from-green-400 to-emerald-600",
      trend: 15.2,
      description: "Global coverage"
    },
    {
      label: "Satisfaction",
      value: 98.7,
      suffix: "%",
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-400 to-rose-600",
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
          : metric.label === "Transactions/min"
          ? metric.value + Math.floor(Math.random() * 100) - 50
          : metric.value,
        trend: metric.trend + (Math.random() * 2 - 1)
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold font-orbitron mb-6 text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan">
            Real-Time Metrics
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Track Envimerse's explosive growth with real-time updated data. 
            <span className="text-brandCyan font-medium"> Our platform is revolutionizing digital entertainment.</span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                {/* Icon and Trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} bg-opacity-20`}>
                    <div className="text-white">
                      {metric.icon}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium">
                      +{metric.trend.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Value */}
                <div className="mb-2">
                  <motion.div
                    className={`text-3xl md:text-4xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r ${metric.color}`}
                    key={metric.value}
                    initial={{ scale: 1.1, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {metric.value.toLocaleString()}{metric.suffix}
                  </motion.div>
                </div>

                {/* Label and Description */}
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    {metric.label}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {metric.description}
                  </p>
                </div>

                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
                
                {/* Pulse Effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 glass-dark rounded-full px-6 py-3 border border-white/10">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white font-medium">
              Real-time data updates
            </span>
            <div className="text-gray-400 text-sm">
              • Last updated: now
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default RealtimeMetrics 