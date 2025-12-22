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

const POVSection = dynamic(
  () => import('@/components/sections/POVSection'),
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

        {/* POV Section - Revolutionary Multi-Perspective Technology */}
        <ErrorBoundary>
          <Suspense fallback={
            <div className="py-20 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <POVSection />
          </Suspense>
        </ErrorBoundary>

        {/* Strategic Partnerships Section */}
        <section className="section-spacing bg-gradient-to-b from-black via-gray-900/50 to-black">
          <div className="container-spacing text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-200 element-spacing-sm">
              <span className="text-lg font-bold">🤝 OFFICIAL TECHNOLOGY PARTNERS</span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white element-spacing">
              Powered By The World's
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"> Best Technology</span>
            </h2>
            
            <p className="text-xl text-gray-300 element-spacing max-w-4xl mx-auto">
              Official partnerships with <span className="text-amber-400 font-bold">Ray-Ban Meta</span>, <span className="text-gray-300 font-bold">Apple Vision Pro</span>, and <span className="text-red-400 font-bold">Oakley Prizm</span>
              <br className="hidden lg:block" />
              ensuring professional-grade streaming quality and seamless integration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 element-spacing max-w-6xl mx-auto">
              {/* Ray-Ban Meta */}
              <div className="group relative bg-gradient-to-br from-amber-900/20 to-orange-900/20 p-8 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-green-500 rounded-full text-xs font-bold text-white">
                    OFFICIAL PARTNER
                  </div>
                </div>
                <div className="text-6xl mb-4">🕶️</div>
                <h3 className="text-2xl font-bold text-white mb-2">Ray-Ban Meta</h3>
                <p className="text-amber-300 font-semibold mb-3">Smart Glasses</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Stream live events hands-free with Meta AI powered smart glasses. 4K quality with voice control.
                </p>
                    </div>
                    
              {/* Apple Vision Pro */}
              <div className="group relative bg-gradient-to-br from-gray-900/20 to-slate-900/20 p-8 rounded-2xl border border-gray-500/20 hover:border-gray-500/50 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-green-500 rounded-full text-xs font-bold text-white">
                    OFFICIAL PARTNER
                  </div>
                </div>
                <div className="text-6xl mb-4">🥽</div>
                <h3 className="text-2xl font-bold text-white mb-2">Apple Vision Pro</h3>
                <p className="text-gray-300 font-semibold mb-3">Spatial Computing</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Professional 8K spatial recording with real-time processing. The ultimate broadcasting experience.
                </p>
                    </div>

              {/* Oakley Prizm */}
              <div className="group relative bg-gradient-to-br from-red-900/20 to-pink-900/20 p-8 rounded-2xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-green-500 rounded-full text-xs font-bold text-white">
                    OFFICIAL PARTNER
                  </div>
            </div>
                <div className="text-6xl mb-4">🏃</div>
                <h3 className="text-2xl font-bold text-white mb-2">Oakley Prizm</h3>
                <p className="text-red-300 font-semibold mb-3">Sport Series</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  HDR vision optimized for sports events. Wind-resistant with all-day battery for outdoor concerts.
                </p>
              </div>
              </div>
              
            <div className="element-spacing">
              <p className="text-sm text-gray-400">
                * Official technology partnerships ensuring seamless integration and professional-grade quality
              </p>
            </div>
          </div>
        </section>

        {/* Premium Events Showcase */}
        <section className="section-spacing bg-gradient-to-b from-transparent to-purple-900/10">
          <div className="container-spacing text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-white element-spacing">
              Premium Multi-POV
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Experiences</span>
              </h2>
            <p className="text-xl lg:text-2xl text-gray-300 element-spacing max-w-4xl mx-auto">
              Join millions of viewers experiencing live events from <span className="text-cyan-400 font-semibold">multiple perspectives simultaneously</span>.
              <br className="hidden lg:block" />
              Every event, every angle, every moment—captured and streamed in real-time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 element-spacing">
              {[
                {
                  title: "Multi-POV Concert Experience",
                  artist: "Global Electronic Festival",
                  time: "Tonight 8PM • 15 Camera Angles",
                  image: "from-purple-600 to-pink-600",
                  viewers: "47.2K"
                },
                {
                  title: "Championship Tennis Finals",
                  artist: "Wimbledon Center Court",
                  time: "Tomorrow 3PM • Courtside + Player POV", 
                  image: "from-blue-600 to-cyan-600",
                  viewers: "89.1K"
                },
                {
                  title: "Fashion Week Runway",
                  artist: "Milan Fashion Week",
                  time: "Friday 7PM • Backstage Access",
                  image: "from-emerald-600 to-teal-600",
                  viewers: "23.8K"
                }
              ].map((event, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
                  <div className={`h-48 bg-gradient-to-br ${event.image} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-300 mb-2">{event.artist}</p>
                    <p className="text-cyan-400 text-sm font-medium mb-2">{event.time}</p>
                      <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-purple-400">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                        <span>{event.viewers} watching</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        Multi-POV
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-bold text-xl hover:shadow-[0_0_40px_rgba(139,69,19,0.8)] transform hover:scale-105 transition-all duration-300">
              Explore All Multi-POV Events
            </button>
          </div>
        </section>

        {/* Revolutionary CTA */}
        <section className="cta-spacing bg-gradient-to-t from-purple-900/20 to-transparent">
          <div className="container-spacing text-center">
            <h2 className="text-4xl lg:text-7xl font-bold text-white element-spacing">
              Ready to Revolutionize
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Live Entertainment?
                </span>
              </h2>
            <p className="text-xl lg:text-2xl text-gray-300 element-spacing max-w-4xl mx-auto leading-relaxed">
              Join <span className="text-cyan-400 font-semibold">over 2.5 million creators and viewers</span> already earning and experiencing 
              <br className="hidden lg:block" />
              live events from multiple perspectives simultaneously.
              <br className="hidden lg:block" />
              <span className="text-purple-400 font-semibold">The future is multidimensional. The future is now.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-6 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-bold text-xl hover:shadow-[0_0_50px_rgba(139,69,19,0.8)] transform hover:scale-105 transition-all duration-300">
                Start Multi-POV Streaming
              </button>
              <button className="px-12 py-6 border-2 border-white/30 rounded-full text-white font-bold text-xl hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all duration-300">
                Watch Live Demo
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}