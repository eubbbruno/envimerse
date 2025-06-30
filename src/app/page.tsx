"use client"

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, Play, Sparkles, Zap, Users, Globe, CheckCircle, Rocket, Shield, Coins } from 'lucide-react'
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

// Dynamic imports for client-side components
const LogoSphere = dynamic(() => import('@/components/LogoSphere'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-brandMagenta/20 to-brandCyan/20 animate-pulse" />
})

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false })

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      
      <main>
        {/* Hero Section - Enhanced with LogoSphere */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* 3D Background */}
          <div className="absolute inset-0 z-0">
            <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-brandMagenta/20 to-brandCyan/20" />}>
              <LogoSphere />
            </Suspense>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandMagenta/10 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brandCyan/10 rounded-full blur-3xl animate-float" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-brandMagenta to-brandCyan rounded-full blur-2xl animate-pulsate" />
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-brandMagenta/20 to-brandCyan/20 border border-brandMagenta/30 backdrop-blur-md"
              >
                <Sparkles className="w-5 h-5 text-brandCyan mr-2" />
                <span className="text-white font-medium">The Future of Immersive Entertainment</span>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-6xl lg:text-8xl font-bold font-orbitron tracking-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="block text-white mb-4">Welcome to</span>
                <span className="block bg-gradient-to-r from-[#8D42EC] via-[#60A3F9] to-[#8D42EC] bg-clip-text text-transparent animate-gradient-x">
                  Envimerse
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto font-lexend leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Experience live events in virtual reality. Connect venues, resellers, and audiences worldwide through cutting-edge VR technology powered by blockchain on BASE.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <ConnectWalletButton />
                <Link href="/marketplace">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#60A3F9] hover:shadow-lg hover:shadow-[#60A3F9]/25 transition-all duration-300 font-orbitron text-lg bg-transparent backdrop-blur-md"
                  >
                    Explore Platform
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              {/* Three Pillars */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <motion.div 
                  className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-brandMagenta/50 transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brandMagenta to-brandMagenta/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-orbitron">VR-Clients</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Experience premium events from home with immersive VR technology</p>
                </motion.div>
                
                <motion.div 
                  className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-brandCyan/50 transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brandCyan to-brandCyan/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-orbitron">VR-Resellers</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Monetize event experiences and build your VR business</p>
                </motion.div>
                
                <motion.div 
                  className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-brandMagenta/50 transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brandMagenta via-brandCyan to-brandMagenta flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-orbitron">VR-Environments</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Host global VR experiences and reach worldwide audiences</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-24 bg-gradient-to-b from-transparent via-brandMagenta/5 to-transparent">
          <EnhancedFeatures />
        </section>

        {/* How It Works Section */}
        <section className="py-24">
          <HowItWorks />
        </section>

        {/* VR Experience Carousel */}
        <section className="py-24 bg-gradient-to-b from-transparent via-brandCyan/5 to-transparent">
          <VRExperienceCarousel />
        </section>

        {/* Animated Stats */}
        <section className="py-24">
          <AnimatedStats />
        </section>

        {/* Partners Marquee */}
        <section className="py-24 bg-gradient-to-b from-transparent via-brandMagenta/5 to-transparent">
          <PartnersMarquee />
        </section>

        {/* Monetization Model */}
        <section className="py-24">
          <MonetizationModel />
        </section>

        {/* Realtime Metrics */}
        <section className="py-24 bg-gradient-to-b from-transparent via-brandCyan/5 to-transparent">
          <RealtimeMetrics />
        </section>

        {/* Interactive Roadmap */}
        <section className="py-24">
          <InteractiveRoadmap />
        </section>

        {/* Community Driven */}
        <section className="py-24 bg-gradient-to-b from-transparent via-brandMagenta/5 to-transparent">
          <CommunityDriven />
        </section>

        {/* Auth Demo */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl sm:text-6xl font-bold text-white mb-6 font-orbitron"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Try the <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Platform</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl mx-auto font-lexend"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Connect your Web3 wallet and experience the future of immersive entertainment
              </motion.p>
            </div>
            <AuthDemo />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 bg-gradient-to-r from-[#8D42EC]/20 via-transparent to-[#60A3F9]/20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandMagenta/10 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brandCyan/10 rounded-full blur-3xl animate-float" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-brandMagenta/20 to-brandCyan/20 border border-brandMagenta/30 backdrop-blur-md mb-8">
                <Rocket className="w-5 h-5 text-brandCyan mr-2" />
                <span className="text-white font-medium">Ready to Launch</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 font-orbitron">
                Join the VR Revolution
              </h2>
              <p className="text-xl text-gray-300 mb-12 font-lexend max-w-3xl mx-auto">
                Transform how people experience entertainment. Whether you're a venue owner, reseller, or VR enthusiast, Envimerse is your gateway to the metaverse.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <ConnectWalletButton />
                <Link href="/environments/apply">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#60A3F9] hover:shadow-lg hover:shadow-[#60A3F9]/25 transition-all duration-300 font-orbitron bg-transparent backdrop-blur-md"
                  >
                    Become a Partner
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <motion.div 
                className="flex flex-wrap justify-center items-center gap-8 mt-16 opacity-60"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brandCyan" />
                  <span className="text-sm text-gray-400 font-medium">Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-brandMagenta" />
                  <span className="text-sm text-gray-400 font-medium">Lightning Fast</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-brandCyan" />
                  <span className="text-sm text-gray-400 font-medium">Global Reach</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-brandMagenta" />
                  <span className="text-sm text-gray-400 font-medium">Crypto Native</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}