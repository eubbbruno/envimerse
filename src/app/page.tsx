"use client"

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, Play, Sparkles, Zap, Users, Globe, CheckCircle, Rocket, Shield, Coins, TrendingUp, Star, Target, Heart, Trophy, MapPin, Calendar, ChevronRight } from 'lucide-react'
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

        {/* Features Section */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Advanced Features
                </span>
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Cutting-edge technology to revolutionize entertainment
              </p>
            </div>
            <EnhancedFeatures />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                How It Works
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Simple and efficient process for all users
              </p>
            </div>
            <HowItWorks />
          </div>
        </section>

        {/* VR Experience Carousel */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                VR Experiences
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Discover incredible virtual worlds
              </p>
            </div>
            <VRExperienceCarousel />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Impressive Numbers
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Our platform in constant growth
              </p>
            </div>
            <AnimatedStats />
          </div>
        </section>

        {/* Partners */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Our Partners
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Working with the best companies in the industry
              </p>
            </div>
            <PartnersMarquee />
          </div>
        </section>

        {/* Monetization Model */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-900/10">
          <div className="max-w-7xl mx-auto">
            <MonetizationModel />
          </div>
        </section>

        {/* Realtime Metrics */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <RealtimeMetrics />
          </div>
        </section>

        {/* Interactive Roadmap */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                2025 Roadmap
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Our plan for the future of the platform
              </p>
            </div>
            <InteractiveRoadmap />
          </div>
        </section>

        {/* Community Driven */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <CommunityDriven />
          </div>
        </section>

        {/* Auth Demo */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Try the Platform
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Experience our authentication system
              </p>
            </div>
            <AuthDemo />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-cyan-600/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready for the Future?
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
              Join the VR entertainment revolution
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              >
                Get Started
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}