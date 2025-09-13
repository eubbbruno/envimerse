"use client"

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Play, 
  Users, 
  Smartphone, 
  Globe, 
  Headphones, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Eye,
  Share2,
  CreditCard,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GalaxyCSS from '@/components/3d/GalaxyCSS'

interface StepProps {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  delay?: number
}

function TimelineStep({ number, title, description, icon, features, delay = 0 }: StepProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: number % 2 === 0 ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: number % 2 === 0 ? 50 : -50 }}
      transition={{ duration: 0.8, delay }}
      className={`relative flex items-center ${number % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} mb-16 lg:mb-24`}
    >
      {/* Timeline Line */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-purple-500/50 to-cyan-500/50 transform -translate-x-1/2 hidden lg:block" />
      
      {/* Step Number Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
        className="absolute left-1/2 top-8 w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 border-4 border-black hidden lg:flex"
      >
        <span className="text-white font-bold text-xl">{number}</span>
      </motion.div>

      {/* Content Card */}
      <div className={`w-full lg:w-5/12 ${number % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
          className="bg-white/5 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
        >
          {/* Mobile step number */}
          <div className="flex items-center mb-4 lg:hidden">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold">{number}</span>
            </div>
            <div className="w-8 h-8 text-purple-400">
              {icon}
            </div>
          </div>

          {/* Desktop icon */}
          <div className="hidden lg:flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-xl mb-6 text-purple-400">
            {icon}
          </div>

          <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
            {title}
          </h3>
          
          <p className="text-gray-300 text-base lg:text-lg mb-6 leading-relaxed">
            {description}
          </p>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: delay + 0.5 + (index * 0.1) }}
                className="flex items-center text-gray-300"
              >
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-sm lg:text-base">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function HowItWorksPage() {
  const [playingVideo, setPlayingVideo] = useState(false)

  const steps = [
    {
      number: 1,
      title: "Discover Events",
      description: "Browse our curated selection of live events from concerts to conferences. Find the perfect experience that matches your interests.",
      icon: <Eye className="w-8 h-8" />,
      features: [
        "Real-time event discovery",
        "Personalized recommendations",
        "Filter by genre, date, and location",
        "Preview venue spaces"
      ]
    },
    {
      number: 2,
      title: "Choose Your Experience",
      description: "Select between HD streaming or full VR immersion. Each option is designed to give you the best possible experience.",
      icon: <Headphones className="w-8 h-8" />,
      features: [
        "HD streaming for any device",
        "Full VR immersion experience",
        "Multiple camera angles",
        "Interactive elements"
      ]
    },
    {
      number: 3,
      title: "Secure Payment",
      description: "Purchase your tickets with confidence using our secure payment system. Support for crypto and traditional payment methods.",
      icon: <CreditCard className="w-8 h-8" />,
      features: [
        "Secure blockchain transactions",
        "Multiple payment options",
        "Instant ticket delivery",
        "Refund protection"
      ]
    },
    {
      number: 4,
      title: "Join the Experience",
      description: "Connect your device and join thousands of others in the ultimate live experience. Interact, share, and enjoy together.",
      icon: <Users className="w-8 h-8" />,
      features: [
        "Cross-platform compatibility",
        "Social interaction features",
        "Real-time chat and reactions",
        "Share moments instantly"
      ]
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-200 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">How It Works</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Experience the Future
              </span>
              <br />
              <span className="text-white">
                In 4 Simple Steps
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8">
              From discovery to immersion, here's how Envimerse transforms live entertainment
            </p>

            <Button 
              onClick={() => setPlayingVideo(!playingVideo)}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.number}
                {...step}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
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
                Why Choose Envimerse?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge technology to deliver unparalleled live experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Cross-Platform",
                description: "Works on any device - phone, tablet, computer, or VR headset"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Access",
                description: "Connect to events worldwide, breaking geographical barriers"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure & Private",
                description: "Blockchain-powered security with full privacy protection"
              },
              {
                icon: <Share2 className="w-8 h-8" />,
                title: "Social Features",
                description: "Share moments, chat with friends, and meet new people"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Premium Quality",
                description: "4K streaming and immersive audio for the best experience"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Driven",
                description: "Built by the community, for the community"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="text-purple-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 p-8 lg:p-12 rounded-2xl border border-purple-500/20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Join thousands of users already experiencing live events like never before
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 text-lg">
                Explore Events
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 hover:border-cyan-400 text-white hover:text-cyan-400 px-8 py-4 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
