"use client"

import { motion } from 'framer-motion'
import { Target, Heart, Shield, Globe, Users, Zap, TrendingUp, Award } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Bruno Briote",
      role: "Founder & CEO",
      description: "Visionary entrepreneur with expertise in VR technology and blockchain innovation.",
      image: "/team/bruno.jpg" // placeholder
    },
    {
      name: "Tech Team",
      role: "Development",
      description: "Expert developers building the future of immersive entertainment.",
      image: "/team/tech.jpg" // placeholder
    }
  ]

  const values = [
    {
      icon: Zap,
      title: "Innovation First",
      description: "We push the boundaries of what's possible in VR and blockchain technology."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our platform is built by and for the immersive entertainment community."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Blockchain-secured transactions and user data protection are our priority."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Connecting venues and audiences worldwide through immersive experiences."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Sobre a Envimerse
              </span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-gray-300 leading-relaxed px-2">
              Revolucionando o entretenimento através de experiências VR imersivas e tecnologia blockchain de ponta
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-900/30 to-purple-700/20 p-6 sm:p-8 rounded-2xl border border-purple-500/20"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mr-3" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Nossa Missão</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                Conectar venues, revendedores e audiências através de experiências VR imersivas, 
                democratizando o acesso ao entretenimento de alta qualidade e criando novas 
                oportunidades de negócio no metaverso.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-900/30 to-cyan-700/20 p-6 sm:p-8 rounded-2xl border border-cyan-500/20"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mr-3" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Nossa Visão</h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                Ser a plataforma líder mundial em entretenimento VR, criando um ecossistema 
                sustentável onde a tecnologia blockchain potencializa experiências únicas 
                e conecta pessoas globalmente.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Nossos Valores
            </h2>
            <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-2">
              Os princípios que guiam cada decisão e inovação na Envimerse
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Zap,
                title: "Inovação Primeiro",
                desc: "Sempre na vanguarda da tecnologia VR e blockchain"
              },
              {
                icon: Users,
                title: "Comunidade Unida",
                desc: "Construindo juntos o futuro do entretenimento"
              },
              {
                icon: Shield,
                title: "Confiança & Segurança",
                desc: "Proteção total para usuários e parceiros"
              },
              {
                icon: Globe,
                title: "Impacto Global",
                desc: "Conectando pessoas e culturas mundialmente"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 p-4 sm:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <value.icon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Nossa Equipe
            </h2>
            <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-2">
              Conheça os visionários por trás da revolução VR
            </p>
          </motion.div>

          {/* Founder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 p-6 sm:p-8 rounded-2xl border border-white/10 text-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Bruno Briote
            </h3>
            <p className="text-base sm:text-lg text-purple-400 mb-3 sm:mb-4 font-semibold">
              Fundador & CEO
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Visionário em tecnologia VR e blockchain, com mais de 10 anos de experiência 
              em desenvolvimento de plataformas digitais inovadoras. Especialista em 
              Web3 e arquitetura de sistemas distribuídos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
              Nossa História
            </h2>
            <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10">
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                A Envimerse nasceu da visão de democratizar o acesso a experiências de entretenimento 
                premium através da realidade virtual. Em 2024, identificamos uma lacuna no mercado: 
                a falta de uma plataforma que conectasse eficientemente venues, revendedores e audiências.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                Combinando nossa expertise em VR, blockchain e desenvolvimento de plataformas, criamos 
                um ecossistema inovador que transforma como as pessoas experienciam entretenimento, 
                criando novas oportunidades de negócio e conexões globais autênticas.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-orbitron">
              Ready to <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Join Us</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of the future of immersive entertainment
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-bold rounded-xl transition-all duration-300 font-orbitron"
                >
                  Get in Touch
                </Button>
              </Link>
              <Link href="/careers">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#60A3F9] hover:shadow-lg hover:shadow-[#60A3F9]/25 transition-all duration-300 font-orbitron bg-transparent backdrop-blur-md"
                >
                  View Careers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 