"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles, Zap, Users, Globe, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EnhancedFeatures from '@/components/EnhancedFeatures'
import HowItWorks from '@/components/HowItWorks'
import VRExperienceCarousel from '@/components/VRExperienceCarousel'
import AnimatedStats from '@/components/AnimatedStats'
import ConnectWalletButton from '@/components/ConnectWalletButton'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.h1 
                className="text-4xl sm:text-6xl lg:text-7xl font-bold font-orbitron tracking-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block text-white mb-4">Bem-vindo ao</span>
                <span className="block bg-gradient-to-r from-[#8D42EC] via-[#60A3F9] to-[#8D42EC] bg-clip-text text-transparent">
                  Envimerse
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto font-lexend leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                A primeira plataforma VR que conecta venues, revendedores e audiências globalmente. 
                Experimente eventos ao vivo em realidade virtual de qualquer lugar do mundo.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <ConnectWalletButton />
                <Link href="/marketplace">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#60A3F9] hover:shadow-lg hover:shadow-[#60A3F9]/25 transition-all duration-300 font-orbitron text-lg bg-transparent"
                  >
                    Explorar Marketplace
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>

              {/* Features Preview */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <Users className="w-8 h-8 text-[#8D42EC] mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Para Clientes</h3>
                  <p className="text-gray-400 text-sm">Acesse eventos VR premium de casa</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <Zap className="w-8 h-8 text-[#60A3F9] mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Para Revendedores</h3>
                  <p className="text-gray-400 text-sm">Monetize experiências de eventos</p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <Globe className="w-8 h-8 text-[#8D42EC] mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Para Venues</h3>
                  <p className="text-gray-400 text-sm">Hospede experiências VR globais</p>
                </div>
              </motion.div>
            </motion.div>
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

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-[#8D42EC]/20 to-[#60A3F9]/20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-orbitron">
                Pronto para começar?
              </h2>
              <p className="text-xl text-gray-300 mb-8 font-lexend">
                Junte-se à revolução VR e transforme a forma como as pessoas experienciam entretenimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ConnectWalletButton />
                <Link href="/environments/apply">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#60A3F9] transition-all duration-300 font-orbitron bg-transparent"
                  >
                    Torne-se um Parceiro
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}