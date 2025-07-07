"use client"

import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, Play, Sparkles, Zap, Users, Globe, CheckCircle, Rocket, Shield, Coins, TrendingUp, Star, Target, Heart, Trophy, MapPin, Calendar, ChevronRight, Eye, Brain, Code, Layers, Network, MessageCircle, Headphones, Gamepad2, Monitor, Activity, BarChart3, Award, Palette, Video, Music, Building, Crown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EnhancedFeatures from '@/components/EnhancedFeatures'
import HowItWorks from '@/components/HowItWorks'
import VRExperienceCarousel from '@/components/VRExperienceCarousel'
import AnimatedStats from '@/components/AnimatedStats'
import PartnersMarquee from '@/components/PartnersMarquee'

import RealtimeMetrics from '@/components/RealtimeMetrics'
import InteractiveRoadmap from '@/components/InteractiveRoadmap'
import CommunityDriven from '@/components/CommunityDriven'
import ConnectWalletButton from '@/components/ConnectWalletButton'
import AuthDemo from '@/components/demo/AuthDemo'
import { Badge } from '@/components/ui/badge'

// Dynamic imports for client-side components
const LogoSphere = dynamic(() => import('@/components/LogoSphere'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
})

export default function HomePage() {
  const [metrics, setMetrics] = useState([
    { label: "Active Users", value: 52847, trend: 12.5, color: "from-purple-500 to-pink-500" },
    { label: "Live Events", value: 127, trend: 8.3, color: "from-cyan-500 to-blue-500" },
    { label: "Revenue", value: 2847000, trend: 23.8, color: "from-yellow-500 to-orange-500" },
    { label: "Satisfaction", value: 98.7, trend: 2.1, color: "from-green-500 to-emerald-500" }
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

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      
      <main>
        {/* Hero Section - Enhanced with Video Background */}
        <section className="relative min-h-screen flex items-center justify-center px-3 sm:px-6 lg:px-8 pt-16 sm:pt-20 overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-30"
            >
              <source src="/bg-envi.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/60 to-cyan-900/40" />
          </div>
          
          {/* Animated Grid Overlay */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center">
              {/* Content Column - Centralizado */}
              <div className="max-w-4xl mx-auto mb-12">
                {/* Premium Badge */}
                                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 sm:mb-6 flex justify-center"
                  >
                  <Badge className="px-3 py-1 text-xs sm:text-sm bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Next-Gen VR Platform
                  </Badge>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                >
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    The Future of
                  </span>
                  <br />
                  <span className="text-white">VR Entertainment</span>
                </motion.h1>

                {/* Subtitle */}
                                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed"
                  >
                  Connecting venues, resellers, and audiences through immersive VR experiences powered by blockchain technology
                </motion.p>

                {/* Action Buttons */}
                                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12"
                  >
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Get Started
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                  >
                    Watch Demo
                  </Button>
                </motion.div>

                {/* Platform Pillars */}
                                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto"
                  >
                    {[
                      {
                        icon: Users,
                        title: "VR-Clients",
                        desc: "Premium experiences for users"
                      },
                      {
                        icon: TrendingUp,
                        title: "VR-Resellers",
                        desc: "Profitable reseller platform"
                      },
                      {
                        icon: Globe,
                        title: "VR-Environments",
                        desc: "Unique virtual venues"
                      }
                    ].map((pillar, index) => (
                      <div 
                        key={index}
                        className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
                      >
                        <pillar.icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto mb-3 sm:mb-4" />
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                        <p className="text-sm sm:text-base text-gray-400">{pillar.desc}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>

              {/* 3D Art Section - Centralizado */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-full max-w-2xl"
                >
                  <Suspense fallback={
                    <div className="w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  }>
                    <LogoSphere height={600} />
                  </Suspense>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Overview Section */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-900/10 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-20"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
                <Eye className="w-4 h-4 mr-2" />
                Platform Overview
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Three Worlds,
                </span>
                <br />
                <span className="text-white">One Revolution</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover how Envimerse connects three distinct ecosystems into a unified VR entertainment platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Monitor,
                  title: "VR-Clients",
                  subtitle: "Immersive Experiences",
                  description: "Access premium VR events, concerts, and entertainment from the comfort of your home. Join millions in shared virtual spaces.",
                  features: ["HD VR Streaming", "Social Interaction", "Premium Content", "Cross-Platform"],
                  color: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-900/20 to-pink-900/20"
                },
                {
                  icon: TrendingUp,
                  title: "VR-Resellers",
                  subtitle: "Profitable Partnerships",
                  description: "Build your business by reselling VR experiences. Earn commissions and grow your network in the booming VR market.",
                  features: ["Revenue Sharing", "Marketing Tools", "Analytics", "Support"],
                  color: "from-cyan-500 to-purple-500",
                  bgColor: "from-cyan-900/20 to-purple-900/20"
                },
                {
                  icon: Globe,
                  title: "VR-Environments",
                  subtitle: "Virtual Venues",
                  description: "Transform your venue into a virtual destination. Host events, concerts, and experiences for global audiences.",
                  features: ["3D Venue Creation", "Event Management", "Global Reach", "Monetization"],
                  color: "from-purple-500 to-cyan-500",
                  bgColor: "from-purple-900/20 to-cyan-900/20"
                }
              ].map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.bgColor} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`} />
                  
                  {/* Main Card */}
                  <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 h-full hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:scale-105">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platform.color} p-4 mb-6 mx-auto lg:mx-0`}>
                      <platform.icon className="w-full h-full text-white" />
                    </div>

                    {/* Content */}
                    <div className="text-center lg:text-left">
                      <h3 className="text-2xl font-bold text-white mb-2">{platform.title}</h3>
                      <p className={`text-lg font-medium bg-gradient-to-r ${platform.color} bg-clip-text text-transparent mb-4`}>
                        {platform.subtitle}
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {platform.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2">
                        {platform.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center justify-center lg:justify-start">
                            <CheckCircle className="w-4 h-4 mr-2 text-purple-400" />
                            <span className="text-sm text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Button 
                        className={`w-full mt-6 bg-gradient-to-r ${platform.color} hover:opacity-90 transition-opacity`}
                        size="lg"
                      >
                        Explore {platform.title}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
                <Rocket className="w-4 h-4 mr-2" />
                Simple Process
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                How It <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Works</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Get started with Envimerse in three simple steps. No complex setup required.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  step: "01",
                  icon: Users,
                  title: "Choose Your Role",
                  description: "Select whether you're a venue owner, reseller, or looking for VR experiences",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: "02", 
                  icon: Zap,
                  title: "Connect & Setup",
                  description: "Link your wallet, configure your profile, and access our intuitive dashboard",
                  color: "from-cyan-500 to-purple-500"
                },
                {
                  step: "03",
                  icon: Star,
                  title: "Start Earning",
                  description: "Begin hosting events, selling experiences, or enjoying premium VR content",
                  color: "from-purple-500 to-cyan-500"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Step Number */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${step.color} text-white font-bold text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {step.step}
                    </div>
                    
                    {/* Connector Line (except last item) */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-10" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 group-hover:border-white/20">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${step.color} p-3`}>
                      <step.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-cyan-900/10 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 text-cyan-200">
                <Code className="w-4 h-4 mr-2" />
                Features
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Cutting-Edge Features
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Powered by the latest in VR, blockchain, and web technologies
              </p>
            </motion.div>

            <EnhancedFeatures />
          </div>
        </section>

        {/* VR Experience Showcase - REDESIGNED */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Futuristic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header with Holographic Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-200">
                <Gamepad2 className="w-4 h-4 mr-2" />
                VR Showcase
              </Badge>
              
              {/* Holographic Title */}
              <div className="relative">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 relative z-10">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Immersive
                  </span>
                  <br />
                  <span className="text-white relative">
                    VR Experiences
                    {/* Holographic Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse" />
                  </span>
                </h2>
                
                {/* Scanning Lines Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent h-1"
                  animate={{ y: [0, 200, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Step into incredible virtual worlds and live events from anywhere in the universe
              </p>
            </motion.div>

            {/* 3D Floating Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
              {[
                {
                  title: "Virtual Concerts",
                  description: "Front row seats to the world's biggest artists",
                  icon: Music,
                  color: "from-purple-500 to-pink-500",
                  bgImage: "bg-gradient-to-br from-purple-900/50 to-pink-900/50",
                  delay: 0
                },
                {
                  title: "Sports Events", 
                  description: "Feel the energy of live sports in VR",
                  icon: Trophy,
                  color: "from-cyan-500 to-blue-500",
                  bgImage: "bg-gradient-to-br from-cyan-900/50 to-blue-900/50",
                  delay: 0.2
                },
                {
                  title: "Gaming Tournaments",
                  description: "Compete in immersive VR competitions",
                  icon: Gamepad2,
                  color: "from-green-500 to-emerald-500", 
                  bgImage: "bg-gradient-to-br from-green-900/50 to-emerald-900/50",
                  delay: 0.4
                },
                {
                  title: "Art Galleries",
                  description: "Explore virtual museums and exhibitions",
                  icon: Palette,
                  color: "from-orange-500 to-red-500",
                  bgImage: "bg-gradient-to-br from-orange-900/50 to-red-900/50",
                  delay: 0.6
                },
                {
                  title: "Educational Events",
                  description: "Learn in interactive virtual environments",
                  icon: Brain,
                  color: "from-yellow-500 to-orange-500",
                  bgImage: "bg-gradient-to-br from-yellow-900/50 to-orange-900/50",
                  delay: 0.8
                },
                {
                  title: "Social Spaces",
                  description: "Connect with friends in virtual worlds",
                  icon: Users,
                  color: "from-indigo-500 to-purple-500",
                  bgImage: "bg-gradient-to-br from-indigo-900/50 to-purple-900/50",
                  delay: 1.0
                }
              ].map((experience, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: experience.delay }}
                  viewport={{ once: true }}
                  className="group relative transform-gpu"
                  whileHover={{ 
                    y: -20, 
                    rotateX: -10, 
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Floating Card */}
                  <div className={`relative h-80 rounded-2xl ${experience.bgImage} backdrop-blur-sm border border-white/20 overflow-hidden group-hover:border-white/40 transition-all duration-300`}>
                    
                    {/* Holographic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Scanning Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${experience.color} opacity-0 group-hover:opacity-20 blur-xl`}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                      
                      {/* Icon with Glow */}
                      <div className="relative">
                        <motion.div
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${experience.color} p-4 mb-6 shadow-2xl`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <experience.icon className="w-full h-full text-white" />
                        </motion.div>
                        
                        {/* Icon Glow Effect */}
                        <div className={`absolute top-0 left-0 w-16 h-16 rounded-xl bg-gradient-to-br ${experience.color} opacity-50 blur-lg animate-pulse`} />
                      </div>

                      {/* Text Content */}
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
                          {experience.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          {experience.description}
                        </p>
                      </div>

                      {/* Interactive Elements */}
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${experience.color}`}
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            />
                          ))}
                        </div>
                        
                        <motion.div
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ x: 5 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${experience.color} opacity-20 blur-2xl`} />
                    <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${experience.color} opacity-20 blur-2xl`} />
                  </div>

                  {/* Shadow/Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl transform translate-y-2 blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
              className="text-center mt-20"
            >
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-2xl relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Explore VR Worlds
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                
                {/* Button Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Platform Statistics - REDESIGNED */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Terminal/Console Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-blue-900/20" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,.03)_25px,rgba(255,255,255,.03)_26px,transparent_27px,transparent_74px,rgba(255,255,255,.03)_75px,rgba(255,255,255,.03)_76px,transparent_77px,transparent_24px),linear-gradient(rgba(255,255,255,.03)_50%,transparent_50%)] bg-[size:100px_4px]" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Terminal Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 text-green-200">
                <BarChart3 className="w-4 h-4 mr-2" />
                Platform Stats
              </Badge>
              
              {/* Terminal Window Title */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-gray-900/80 rounded-t-lg border border-gray-700 p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 text-gray-400 text-sm font-mono">envimerse://analytics/dashboard</div>
                  </div>
                </div>
                
                <div className="bg-black/90 rounded-b-lg border-x border-b border-gray-700 p-6">
                  <div className="font-mono text-green-400 text-sm mb-2">
                    <span className="text-gray-500">user@envimerse:~$</span> show platform --stats --live
                  </div>
                  <div className="font-mono text-blue-400 text-xs">
                    Fetching real-time platform metrics...
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1"
                    >
                      █
                    </motion.span>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 font-mono">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  System Status:
                </span>
                <br />
                <span className="text-white">OPERATIONAL</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-mono">
                Real-time metrics from our global infrastructure
              </p>
            </motion.div>

            {/* Stats Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Active Users",
                  value: 52847,
                  unit: "",
                  trend: "+12.5%",
                  color: "from-green-400 to-emerald-500",
                  icon: Users,
                  prefix: "",
                  format: "number"
                },
                {
                  label: "Live Events", 
                  value: 127,
                  unit: "",
                  trend: "+8.3%",
                  color: "from-blue-400 to-cyan-500",
                  icon: Activity,
                  prefix: "",
                  format: "number"
                },
                {
                  label: "Revenue",
                  value: 2847000,
                  unit: "",
                  trend: "+23.8%",
                  color: "from-yellow-400 to-orange-500",
                  icon: TrendingUp,
                  prefix: "$",
                  format: "currency"
                },
                {
                  label: "Satisfaction",
                  value: 98.7,
                  unit: "%",
                  trend: "+2.1%",
                  color: "from-purple-400 to-pink-500",
                  icon: Heart,
                  prefix: "",
                  format: "percentage"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Terminal Window */}
                  <div className="bg-gray-900/90 rounded-lg border border-gray-700 overflow-hidden hover:border-green-500/50 transition-all duration-300">
                    
                    {/* Window Header */}
                    <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <stat.icon className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-xs font-mono">{stat.label.toLowerCase().replace(' ', '_')}.log</span>
                        </div>
                        <div className="text-green-400 text-xs font-mono">{stat.trend}</div>
                      </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-6 bg-black/50">
                      
                      {/* Value Display */}
                      <div className="mb-4">
                        <motion.div
                          className={`text-4xl font-bold font-mono bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.8, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        >
                          {stat.format === "currency" ? `$${(stat.value / 1000000).toFixed(1)}M` :
                           stat.format === "percentage" ? `${stat.value}%` :
                           stat.value.toLocaleString()}{stat.unit}
                        </motion.div>
                        <div className="text-gray-400 text-sm font-mono mt-1">{stat.label}</div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs font-mono text-gray-500 mb-1">
                          <span>0</span>
                          <span>MAX</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${stat.color} rounded-full relative`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "85%" }}
                            transition={{ duration: 1.5, delay: index * 0.2 + 0.5 }}
                            viewport={{ once: true }}
                          >
                            {/* Scanning effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            />
                          </motion.div>
                        </div>
                      </div>

                      {/* Terminal Output */}
                      <div className="space-y-1">
                        <div className="text-green-400 text-xs font-mono">
                          <span className="text-gray-500">{'>'}</span> status: ONLINE
                        </div>
                        <div className="text-blue-400 text-xs font-mono">
                          <span className="text-gray-500">{'>'}</span> trend: {stat.trend}
                        </div>
                        <div className="text-yellow-400 text-xs font-mono">
                          <span className="text-gray-500">{'>'}</span> updated: {new Date().toLocaleTimeString()}
                        </div>
                      </div>

                      {/* Live Indicator */}
                      <div className="flex items-center mt-4 space-x-2">
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-green-400 text-xs font-mono">LIVE</span>
                      </div>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-xl rounded-lg transition-opacity duration-300 -z-10`} />
                </motion.div>
              ))}
            </div>

            {/* System Status Footer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="max-w-4xl mx-auto bg-gray-900/80 rounded-lg border border-gray-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-green-400 text-2xl font-mono font-bold">99.9%</div>
                    <div className="text-gray-400 text-sm font-mono">Uptime</div>
                  </div>
                  <div>
                    <div className="text-blue-400 text-2xl font-mono font-bold">{'<'} 50ms</div>
                    <div className="text-gray-400 text-sm font-mono">Latency</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 text-2xl font-mono font-bold">24/7</div>
                    <div className="text-gray-400 text-sm font-mono">Monitoring</div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="text-green-400 text-sm font-mono">
                    All systems operational • Last updated: {new Date().toLocaleString()}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-200">
                <Building className="w-4 h-4 mr-2" />
                Trusted Partners
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Industry
                </span>
                <br />
                <span className="text-white">Leading Partners</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Collaborating with the best companies to deliver exceptional experiences
              </p>
            </motion.div>
            <PartnersMarquee />
          </div>
        </section>



        {/* Roadmap Section */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
                <Target className="w-4 h-4 mr-2" />
                Future Vision
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  2025
                </span>
                <br />
                <span className="text-white">Platform Roadmap</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Our ambitious plan to revolutionize the future of VR entertainment
              </p>
            </motion.div>
            <InteractiveRoadmap />
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-900/10 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
                <Heart className="w-4 h-4 mr-2" />
                Community First
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Community
                </span>
                <br />
                <span className="text-white">Driven Platform</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Built by the community, for the community
              </p>
            </motion.div>
            <CommunityDriven />
          </div>
        </section>

        {/* Live Metrics Dashboard */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-cyan-900/10" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
                <Activity className="w-4 h-4 mr-2" />
                Live Analytics
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Real-Time
                </span>
                <br />
                <span className="text-white">Platform Metrics</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Track Envimerse's explosive growth with live-updated data from our global platform
              </p>
            </motion.div>

            <RealtimeMetrics />
          </div>
        </section>

        {/* Success Stories - REDESIGNED */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Cinematic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(141,66,236,0.1)_0%,transparent_70%)]" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Cinematic Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
                <Star className="w-4 h-4 mr-2" />
                Success Stories
              </Badge>
              
              {/* Film Strip Effect */}
              <div className="relative mb-8">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 relative z-10">
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Epic
                  </span>
                  <br />
                  <span className="text-white">Success Stories</span>
                </h2>
                
                {/* Film Strip Decoration */}
                <div className="absolute -top-4 -bottom-4 left-1/2 transform -translate-x-1/2 w-2 bg-gradient-to-b from-purple-500/30 to-cyan-500/30 rounded-full" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full animate-pulse" />
              </div>
              
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Real stories from real clients who transformed their business with Envimerse
              </p>
            </motion.div>

            {/* Timeline Layout */}
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500/50 to-cyan-500/50 rounded-full" />
              
              {/* Timeline Stories */}
              <div className="space-y-24">
                {[
                  {
                    icon: Music,
                    name: "Global Music Festival",
                    type: "Music Events",
                    result: "500% attendance increase",
                    description: "Transformed their annual festival into a global VR experience, reaching fans worldwide and creating an unforgettable immersive concert series.",
                    metric: "2.5M+ attendees",
                    year: "2024",
                    side: "left",
                    color: "from-purple-500 to-pink-500",
                    bgColor: "from-purple-900/50 to-pink-900/50"
                  },
                  {
                    icon: Trophy,
                    name: "Champions League VR",
                    type: "Sports Broadcasting",
                    result: "Record-breaking viewership",
                    description: "Revolutionized sports viewing with immersive VR broadcasts, allowing fans to feel like they're on the field with their favorite teams.",
                    metric: "50M+ viewers",
                    year: "2023",
                    side: "right",
                    color: "from-cyan-500 to-purple-500",
                    bgColor: "from-cyan-900/50 to-purple-900/50"
                  },
                  {
                    icon: Gamepad2,
                    name: "TechCorp Convention",
                    type: "Corporate Events",
                    result: "90% cost reduction",
                    description: "Moved their annual conference to VR, reaching 10x more participants while cutting costs dramatically and improving engagement.",
                    metric: "150K+ participants",
                    year: "2023",
                    side: "left",
                    color: "from-purple-500 to-cyan-500",
                    bgColor: "from-purple-900/50 to-cyan-900/50"
                  }
                ].map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: story.side === 'left' ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.3 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${story.side === 'left' ? 'justify-end pr-8' : 'justify-start pl-8'}`}
                  >
                    {/* Timeline Node */}
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 border-4 border-black shadow-2xl z-20"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 animate-ping opacity-20" />
                    </motion.div>

                    {/* Story Card */}
                    <motion.div
                      className={`w-full max-w-md group cursor-pointer ${story.side === 'right' ? 'ml-8' : 'mr-8'}`}
                      whileHover={{ scale: 1.05, rotateY: story.side === 'left' ? 5 : -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`relative bg-gradient-to-br ${story.bgColor} backdrop-blur-sm border border-white/20 rounded-2xl p-8 overflow-hidden group-hover:border-orange-500/50 transition-all duration-300`}>
                        
                        {/* Year Badge */}
                        <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1">
                          <span className="text-orange-400 text-sm font-bold">{story.year}</span>
                        </div>

                        {/* Spotlight Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle at ${story.side === 'left' ? '20%' : '80%'} 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
                          }}
                        />

                        {/* Icon with Cinematic Glow */}
                        <div className="relative mb-6">
                          <motion.div
                            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${story.color} p-5 shadow-2xl`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8 }}
                          >
                            <story.icon className="w-full h-full text-white" />
                          </motion.div>
                          
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${story.color} opacity-50 blur-xl animate-pulse`} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                            {story.name}
                          </h3>
                          <p className="text-orange-400 font-medium mb-4">{story.type}</p>
                          
                          {/* Result Highlight */}
                          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 mb-6 border border-orange-500/30">
                            <p className="text-white font-bold text-lg mb-1">{story.result}</p>
                            <p className="text-orange-300 text-sm font-medium">{story.metric}</p>
                          </div>
                          
                          <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                            {story.description}
                          </p>

                          {/* Action Button */}
                          <motion.button
                            className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors duration-300 group-hover:translate-x-2"
                            whileHover={{ x: 5 }}
                          >
                            <span className="text-sm font-medium">Read Full Story</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Decorative Elements */}
                        <div className={`absolute top-0 ${story.side === 'left' ? 'right-0' : 'left-0'} w-32 h-32 bg-gradient-to-br ${story.color} opacity-10 blur-3xl`} />
                        <div className={`absolute bottom-0 ${story.side === 'left' ? 'left-0' : 'right-0'} w-24 h-24 bg-gradient-to-tr ${story.color} opacity-10 blur-2xl`} />
                      </div>
                    </motion.div>

                    {/* Connection Line */}
                    <motion.div
                      className={`absolute top-1/2 ${story.side === 'left' ? 'right-4' : 'left-4'} w-8 h-0.5 bg-gradient-to-r ${story.color} opacity-50`}
                      initial={{ width: 0 }}
                      whileInView={{ width: 32 }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
              className="text-center mt-24"
            >
              <div className="relative">
                <motion.button
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-2xl relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Start Your Success Story
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  
                  {/* Button Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-30 blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.button>
                
                {/* Spotlight Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent blur-3xl animate-pulse" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Auth Demo Section */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
                <Shield className="w-4 h-4 mr-2" />
                Web3 Authentication
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Try Our
                </span>
                <br />
                <span className="text-white">Secure Platform</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Experience our decentralized authentication system powered by blockchain
              </p>
            </motion.div>
            <AuthDemo />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-cyan-600/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
                <Rocket className="w-4 h-4 mr-2" />
                Join the Revolution
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Ready to <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Transform</span>
                <br />
                <span className="text-white">Entertainment?</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 px-4">
                Join thousands of venues, resellers, and users already building the future of VR entertainment
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-4 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}