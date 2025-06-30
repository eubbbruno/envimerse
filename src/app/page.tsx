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
    <div className="w-full h-32 sm:h-40 lg:h-80 flex items-center justify-center">
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
          
          <div className="relative z-10 text-center max-w-5xl mx-auto">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 sm:mb-6"
            >
              <Badge className="px-3 py-1 text-xs sm:text-sm bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Plataforma VR Next-Gen
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                O Futuro do
              </span>
              <br />
              <span className="text-white">Entretenimento VR</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Conectamos venues, revendedores e audiências através de experiências VR imersivas e tecnologia blockchain
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
                Começar Agora
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              >
                Ver Demo
              </Button>
            </motion.div>

            {/* 3D Logo Sphere */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8 sm:mb-12"
            >
              <Suspense fallback={
                <div className="w-full h-32 sm:h-40 lg:h-80 flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <LogoSphere />
              </Suspense>
            </motion.div>

            {/* Platform Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {[
                {
                  icon: Users,
                  title: "VR-Clients",
                  desc: "Experiências premium para usuários"
                },
                {
                  icon: TrendingUp,
                  title: "VR-Resellers",
                  desc: "Plataforma de revenda lucrativa"
                },
                {
                  icon: Globe,
                  title: "VR-Environments",
                  desc: "Ambientes virtuais únicos"
                }
              ].map((pillar, index) => (
                <div 
                  key={index}
                  className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <pillar.icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400">{pillar.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Recursos Avançados
                </span>
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Tecnologia de ponta para revolucionar o entretenimento
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
                Como Funciona
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Processo simples e eficiente para todos os usuários
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
                Experiências VR
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Descubra mundos virtuais incríveis
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
                Números Impressionantes
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Nossa plataforma em constante crescimento
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
                Nossos Parceiros
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Trabalhando com as melhores empresas do setor
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
                Roadmap 2025
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Nosso plano para o futuro da plataforma
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
                Teste a Plataforma
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Experimente nosso sistema de autenticação
              </p>
            </div>
            <AuthDemo />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-cyan-600/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Pronto para o Futuro?
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
              Junte-se à revolução do entretenimento VR
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              >
                Começar Agora
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              >
                Saber Mais
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}