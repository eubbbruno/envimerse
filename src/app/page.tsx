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

        {/* Premium Events Showcase */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-900/10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Experiências Premium
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Multi-POV</span>
                </h2>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Junte-se a milhões de espectadores vivenciando eventos ao vivo de <span className="text-cyan-400 font-semibold">múltiplas perspectivas simultaneamente</span>.
              <br className="hidden lg:block" />
              Cada evento, cada ângulo, cada momento—capturado e transmitido em tempo real.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Experiência Multi-POV de Show",
                  artist: "Festival Eletrônico Global",
                  time: "Hoje 20h • 15 Ângulos de Câmera",
                  image: "from-purple-600 to-pink-600",
                  viewers: "47.2K"
                },
                {
                  title: "Final do Campeonato de Tênis",
                  artist: "Quadra Central de Wimbledon",
                  time: "Amanhã 15h • Quadra + POV do Jogador", 
                  image: "from-blue-600 to-cyan-600",
                  viewers: "89.1K"
                },
                {
                  title: "Desfile da Semana de Moda",
                  artist: "Semana de Moda de Milão",
                  time: "Sexta 19h • Acesso aos Bastidores",
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
                        <span>{event.viewers} assistindo</span>
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
              Explorar Todos os Eventos Multi-POV
            </button>
          </div>
        </section>

        {/* Revolutionary CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-purple-900/20 to-transparent">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl lg:text-7xl font-bold text-white mb-8">
              Pronto para Revolucionar
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                o Entretenimento Ao Vivo?
                </span>
              </h2>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Junte-se a <span className="text-cyan-400 font-semibold">mais de 2.5 milhões de criadores e espectadores</span> já ganhando dinheiro e vivenciando 
              <br className="hidden lg:block" />
              eventos ao vivo de múltiplas perspectivas simultaneamente.
              <br className="hidden lg:block" />
              <span className="text-purple-400 font-semibold">O futuro é multidimensional. O futuro é agora.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-6 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-bold text-xl hover:shadow-[0_0_50px_rgba(139,69,19,0.8)] transform hover:scale-105 transition-all duration-300">
                Começar Streaming Multi-POV
              </button>
              <button className="px-12 py-6 border-2 border-white/30 rounded-full text-white font-bold text-xl hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all duration-300">
                Assistir Demo Ao Vivo
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}