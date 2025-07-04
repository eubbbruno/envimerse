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
import MonetizationModel from '@/components/MonetizationModel'
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
        {/* Hero Section - Enhanced with LogoSphere */}
        <section className="relative min-h-screen flex items-center justify-center px-3 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
          
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content Column */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4 sm:mb-6 flex justify-center lg:justify-start"
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
                  className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                >
                  Connecting venues, resellers, and audiences through immersive VR experiences powered by blockchain technology
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-8 sm:mb-12"
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
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
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
                      className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-center lg:text-left"
                    >
                      <pillar.icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto lg:mx-0 mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                      <p className="text-sm sm:text-base text-gray-400">{pillar.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* 3D Art Column */}
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="flex justify-center"
                >
                  <Suspense fallback={
                    <div className="w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  }>
                    <LogoSphere />
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
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-200">
                <Eye className="w-4 h-4 mr-2" />
                Platform Overview
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
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
                  color: "from-cyan-500 to-blue-500",
                  bgColor: "from-cyan-900/20 to-blue-900/20"
                },
                {
                  icon: Globe,
                  title: "VR-Environments",
                  subtitle: "Virtual Venues",
                  description: "Transform your venue into a virtual destination. Host events, concerts, and experiences for global audiences.",
                  features: ["3D Venue Creation", "Event Management", "Global Reach", "Monetization"],
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-900/20 to-emerald-900/20"
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
                  color: "from-cyan-500 to-blue-500"
                },
                {
                  step: "03",
                  icon: Star,
                  title: "Start Earning",
                  description: "Begin hosting events, selling experiences, or enjoying premium VR content",
                  color: "from-green-500 to-emerald-500"
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
                Advanced Technology
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Cutting-Edge
                </span>
                <br />
                <span className="text-white">Features</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Powered by the latest in VR, blockchain, and web technologies
              </p>
            </motion.div>

            <EnhancedFeatures />
          </div>
        </section>

        {/* VR Experience Showcase */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-200">
                <Gamepad2 className="w-4 h-4 mr-2" />
                VR Showcase
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Immersive
                </span>
                <br />
                <span className="text-white">VR Experiences</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Discover incredible virtual worlds and live events from anywhere
              </p>
            </motion.div>
            <VRExperienceCarousel />
          </div>
        </section>

        {/* Platform Statistics */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-purple-900/10 to-black">
          <div className="max-w-7xl mx-auto">
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
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Impressive
                </span>
                <br />
                <span className="text-white">Growth Numbers</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform continues to grow exponentially worldwide
              </p>
            </motion.div>
            <AnimatedStats />
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

        {/* Monetization Model */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-yellow-900/10 to-black">
          <div className="max-w-7xl mx-auto">
            <MonetizationModel />
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
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-orange-900/10 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-200">
                <Heart className="w-4 h-4 mr-2" />
                Community First
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
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
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black to-blue-900/10" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 text-green-200">
                <Activity className="w-4 h-4 mr-2" />
                Live Analytics
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
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

        {/* Success Stories Section */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-200">
                <Award className="w-4 h-4 mr-2" />
                Success Stories
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Trusted by
                </span>
                <br />
                <span className="text-white">Industry Leaders</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                See how venues and resellers are transforming their business with Envimerse
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Music,
                  name: "Cosmic Arena",
                  type: "Virtual Concert Venue",
                  result: "500% increase in attendance",
                  description: "Transformed their physical venue into a global VR destination, hosting artists for millions worldwide.",
                  metric: "2.5M+ attendees"
                },
                {
                  icon: Building,
                  name: "EventPro Networks",
                  type: "VR Reseller Partner",
                  result: "$1.2M monthly revenue",
                  description: "Built a thriving VR events business by connecting venues with global audiences through our platform.",
                  metric: "150+ events/month"
                },
                {
                  icon: Gamepad2,
                  name: "TechCorp Convention",
                  type: "Corporate Events",
                  result: "90% cost reduction",
                  description: "Moved their annual conference to VR, reaching 10x more participants while cutting costs dramatically.",
                  metric: "50K+ participants"
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-orange-500/30 transition-all duration-300 group-hover:transform group-hover:scale-105">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-4 mb-6">
                      <story.icon className="w-full h-full text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{story.name}</h3>
                    <p className="text-orange-400 font-medium mb-4">{story.type}</p>
                    
                    <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 mb-6">
                      <p className="text-white font-bold text-lg">{story.result}</p>
                      <p className="text-orange-300 text-sm">{story.metric}</p>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">{story.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Revenue Ecosystem Section */}
        <section className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-yellow-900/10 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-black to-green-900/10" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-green-500/20 border-yellow-500/30 text-yellow-200">
                <Coins className="w-4 h-4 mr-2" />
                Revenue Model
              </Badge>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                  Sustainable
                </span>
                <br />
                <span className="text-white">Revenue Ecosystem</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Multiple revenue streams creating value for all platform participants
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Palette,
                  title: "VR Cosmetics & Skins",
                  percentage: "65%",
                  description: "Premium virtual items, avatar customization, and exclusive cosmetics",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: Coins,
                  title: "Transaction Fees",
                  percentage: "20%",
                  description: "Small commission on all marketplace transactions and ticket sales",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: Crown,
                  title: "Premium Experiences",
                  percentage: "10%",
                  description: "VIP access, backstage passes, and exclusive content offerings",
                  color: "from-cyan-500 to-blue-500"
                },
                {
                  icon: MessageCircle,
                  title: "Social Features",
                  percentage: "5%",
                  description: "Enhanced chat, custom emotes, and social interaction tools",
                  color: "from-green-500 to-emerald-500"
                }
              ].map((stream, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-yellow-500/30 transition-all duration-300">
                    <div className={`flex items-center justify-between mb-6`}>
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stream.color} p-4`}>
                        <stream.icon className="w-full h-full text-white" />
                      </div>
                      <div className={`text-4xl font-bold bg-gradient-to-r ${stream.color} bg-clip-text text-transparent`}>
                        {stream.percentage}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{stream.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{stream.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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