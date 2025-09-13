"use client"

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Cpu, 
  Shield, 
  Zap, 
  Globe, 
  Layers, 
  Lock, 
  Database, 
  Smartphone,
  Monitor,
  Headphones,
  Wifi,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Code,
  Cloud,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GalaxyCSS from '@/components/3d/GalaxyCSS'

interface TechStackItemProps {
  icon: React.ReactNode
  title: string
  description: string
  technologies: string[]
  color: string
  delay?: number
}

function TechStackItem({ icon, title, description, technologies, color, delay = 0 }: TechStackItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/5 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${color}`}>
        {icon}
      </div>
      
      <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
        {title}
      </h3>
      
      <p className="text-gray-300 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="space-y-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: delay + 0.2 + (index * 0.1) }}
            className="flex items-center"
          >
            <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
            <span className="text-sm text-gray-300">{tech}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

interface ArchitectureLayerProps {
  title: string
  description: string
  technologies: string[]
  position: 'top' | 'middle' | 'bottom'
  delay?: number
}

function ArchitectureLayer({ title, description, technologies, position, delay = 0 }: ArchitectureLayerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bg-gradient-to-br from-purple-900/40 to-purple-700/40 border-purple-500/30'
      case 'middle':
        return 'bg-gradient-to-br from-blue-900/40 to-cyan-700/40 border-cyan-500/30'
      case 'bottom':
        return 'bg-gradient-to-br from-gray-900/40 to-gray-700/40 border-gray-500/30'
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: position === 'middle' ? 0 : position === 'top' ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { 
        opacity: 0, 
        x: position === 'middle' ? 0 : position === 'top' ? -50 : 50 
      }}
      transition={{ duration: 0.8, delay }}
      className={`relative p-6 lg:p-8 rounded-xl border ${getPositionClasses()} backdrop-blur-sm`}
    >
      <h3 className="text-lg lg:text-xl font-bold text-white mb-3">
        {title}
      </h3>
      
      <p className="text-gray-300 text-sm lg:text-base mb-4">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function TechnologyPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const techStack = [
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Frontend",
      description: "Modern React-based interface with immersive 3D graphics and responsive design that works across all devices.",
      technologies: [
        "Next.js 15 with App Router",
        "React Three Fiber for 3D",
        "Framer Motion animations",
        "TypeScript for type safety",
        "Tailwind CSS styling"
      ],
      color: "bg-gradient-to-br from-blue-600/30 to-cyan-600/30"
    },
    {
      icon: <Database className="w-8 h-8 text-white" />,
      title: "Backend",
      description: "Scalable microservices architecture built for high-performance streaming and real-time interactions.",
      technologies: [
        "Node.js with Express",
        "WebSocket for real-time",
        "MongoDB for data storage",
        "Redis for caching",
        "Docker containerization"
      ],
      color: "bg-gradient-to-br from-green-600/30 to-emerald-600/30"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Blockchain",
      description: "Secure, decentralized infrastructure for payments, NFT tickets, and transparent event management.",
      technologies: [
        "Ethereum smart contracts",
        "IPFS for distributed storage",
        "Web3 wallet integration",
        "Polygon for low fees",
        "NFT ticket system"
      ],
      color: "bg-gradient-to-br from-purple-600/30 to-pink-600/30"
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Streaming",
      description: "Low-latency, high-quality video streaming infrastructure optimized for VR and traditional viewing.",
      technologies: [
        "WebRTC for real-time",
        "CDN global distribution",
        "Adaptive bitrate streaming",
        "360° video support",
        "Spatial audio processing"
      ],
      color: "bg-gradient-to-br from-orange-600/30 to-red-600/30"
    },
    {
      icon: <Cloud className="w-8 h-8 text-white" />,
      title: "Infrastructure",
      description: "Cloud-native architecture with auto-scaling and global edge distribution for optimal performance.",
      technologies: [
        "AWS/Azure cloud hosting",
        "Kubernetes orchestration",
        "Auto-scaling systems",
        "Global edge network",
        "99.9% uptime SLA"
      ],
      color: "bg-gradient-to-br from-indigo-600/30 to-blue-600/30"
    },
    {
      icon: <Lock className="w-8 h-8 text-white" />,
      title: "Security",
      description: "Enterprise-grade security with end-to-end encryption and privacy-first architecture.",
      technologies: [
        "End-to-end encryption",
        "Zero-knowledge protocols",
        "Multi-factor authentication",
        "GDPR compliance",
        "SOC 2 Type II certified"
      ],
      color: "bg-gradient-to-br from-gray-600/30 to-slate-600/30"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <GalaxyCSS />
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-200 backdrop-blur-sm mb-8">
              <Code className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Technology Stack</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Built with
              </span>
              <br />
              <span className="text-white">
                Cutting-Edge Technology
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto">
              Envimerse leverages the latest in web technologies, blockchain, and streaming infrastructure 
              to deliver unparalleled live entertainment experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 text-lg">
                View Source Code
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 px-8 py-4 text-lg"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Performance Metrics
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                System Architecture
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              A scalable, secure, and performant architecture designed for the future of live entertainment
            </p>
          </motion.div>

          <div className="space-y-6">
            <ArchitectureLayer
              title="Frontend Layer"
              description="User interface, 3D rendering, and real-time interactions"
              technologies={["React", "Three.js", "WebGL", "WebXR", "PWA"]}
              position="top"
              delay={0}
            />
            <ArchitectureLayer
              title="API & Services Layer"
              description="Business logic, authentication, and microservices orchestration"
              technologies={["GraphQL", "REST APIs", "Microservices", "JWT", "OAuth2"]}
              position="middle"
              delay={0.2}
            />
            <ArchitectureLayer
              title="Data & Infrastructure Layer"
              description="Storage, streaming, blockchain, and cloud infrastructure"
              technologies={["MongoDB", "Redis", "Ethereum", "CDN", "Kubernetes"]}
              position="bottom"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Each component carefully selected for performance, scalability, and developer experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {techStack.map((item, index) => (
              <TechStackItem
                key={index}
                {...item}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Performance Metrics
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Built for speed, reliability, and scale
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { value: "<100ms", label: "Latency", description: "Ultra-low streaming delay" },
              { value: "99.9%", label: "Uptime", description: "Guaranteed availability" },
              { value: "10K+", label: "Concurrent", description: "Users per event" },
              { value: "4K", label: "Quality", description: "Streaming resolution" }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-purple-400 mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-400">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source CTA */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 p-8 lg:p-12 rounded-2xl border border-purple-500/20"
          >
            <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Open Source & Community Driven
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Envimerse is built with transparency in mind. Explore our codebase, contribute, 
              and help shape the future of live entertainment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 text-lg">
                View on GitHub
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 px-8 py-4 text-lg"
              >
                <Code className="w-5 h-5 mr-2" />
                Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
