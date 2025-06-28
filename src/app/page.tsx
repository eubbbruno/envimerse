"use client"

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, Play, Sparkles, Zap, Users, Globe, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import AdvancedVRScene from '@/components/AdvancedVRScene'
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
const AnimatedNavigation = dynamic(() => import('@/components/AnimatedNavigation'), { 
  ssr: false,
  loading: () => <div className="h-20" />
})

const LogoSphere = dynamic(() => import('@/components/LogoSphere'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-brandMagenta/20 to-brandCyan/20 animate-pulse" />
})

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false })

// NoSSR wrapper component
const NoSSR = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}

// Loading fallback for heavy components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-16 h-16 border-4 border-brandMagenta/30 border-t-brandMagenta rounded-full animate-spin"></div>
  </div>
)

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const scrollToDemo = () => {
    const element = document.getElementById('demo')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section with VR Scene */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
        <Suspense fallback={<div>Loading VR Scene...</div>}>
          <AdvancedVRScene />
        </Suspense>
        
        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-orbitron tracking-tight">
              <span className="block text-white mb-4">Envimerse</span>
              <span className="block bg-gradient-to-r from-[#8D42EC] via-[#60A3F9] to-[#8D42EC] bg-clip-text text-transparent">
                VR Platform
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto font-lexend leading-relaxed">
              Experience live events in virtual reality. Connect venues, resellers, and audiences worldwide through cutting-edge VR technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <ConnectWalletButton />
              <button className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#60A3F9] hover:shadow-lg hover:shadow-[#60A3F9]/25 transition-all duration-300 font-orbitron text-lg">
                Explore Platform
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24">
        <EnhancedFeatures />
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <HowItWorks />
      </section>

      {/* VR Experience Carousel */}
      <section className="py-24">
        <VRExperienceCarousel />
      </section>

      {/* Animated Stats */}
      <section className="py-24">
        <AnimatedStats />
      </section>

      {/* Partners Marquee */}
      <section className="py-24">
        <PartnersMarquee />
      </section>

      {/* Monetization Model */}
      <section className="py-24">
        <MonetizationModel />
      </section>

      {/* Realtime Metrics */}
      <section className="py-24">
        <RealtimeMetrics />
      </section>

      {/* Interactive Roadmap */}
      <section className="py-24">
        <InteractiveRoadmap />
      </section>

      {/* Community Driven */}
      <section className="py-24">
        <CommunityDriven />
      </section>

      {/* Auth Demo */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-orbitron">
              Try the <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Platform</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-lexend">
              Connect your Web3 wallet and experience the platform
            </p>
          </div>
          <AuthDemo />
        </div>
      </section>
    </main>
  )
}