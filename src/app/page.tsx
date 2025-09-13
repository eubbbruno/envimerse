"use client"

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ErrorBoundary from '@/components/ErrorBoundary'

// Importar componentes dinamicamente
const Header = dynamic(
  () => import('@/components/Header'),
  { ssr: false }
)

const HeroSection = dynamic(
  () => import('@/components/sections/HeroSection'),
  { ssr: false }
)

const FeaturesSection = dynamic(
  () => import('@/components/sections/FeaturesSection'),
  { ssr: false }
)

import Footer from '@/components/Footer'

// Componente de loading
const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-cyan-400">Loading experience...</div>
    </div>
  )

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Main Header */}
      <ErrorBoundary>
        <Suspense fallback={null}>
      <Header />
        </Suspense>
      </ErrorBoundary>
      
      <main>
        {/* Hero Section - Full Screen with Galaxy 3D */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <HeroSection />
          </Suspense>
        </ErrorBoundary>

        {/* Features Section - Bento Grid */}
        <ErrorBoundary>
                <Suspense fallback={
            <div className="py-20 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }>
            <FeaturesSection />
                </Suspense>
        </ErrorBoundary>

        {/* Quick Events Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-900/10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Live Events
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> This Week</span>
              </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join thousands of fans in virtual venues around the world
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Virtual Concert Hall",
                  artist: "Electronic Dreams",
                  time: "Tonight 8PM",
                  image: "from-purple-600 to-pink-600"
                },
                {
                  title: "Sports Arena VR",
                  artist: "Championship Finals",
                  time: "Tomorrow 3PM", 
                  image: "from-blue-600 to-cyan-600"
                },
                {
                  title: "Art Gallery Opening",
                  artist: "Digital Masters",
                  time: "Friday 7PM",
                  image: "from-emerald-600 to-teal-600"
                }
              ].map((event, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
                  <div className={`h-48 bg-gradient-to-br ${event.image} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-300 mb-2">{event.artist}</p>
                    <p className="text-cyan-400 text-sm font-medium">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:shadow-[0_0_40px_rgba(139,69,19,0.8)] transform hover:scale-105 transition-all duration-300">
              View All Events
            </button>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-purple-900/20 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Step Into
                <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                The Future?
              </span>
              </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users already experiencing live events like never before
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(139,69,19,0.8)] transform hover:scale-105 transition-all duration-300">
                Get Started Now
              </button>
              <button className="px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold text-lg hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300">
                Learn More
              </button>
              </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}