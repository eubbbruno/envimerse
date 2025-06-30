"use client"

import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, Users, Code, Palette, TrendingUp, MessageSquare, Heart, Globe, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CareersPage() {
  const jobs = [
    {
      title: "Desenvolvedor Frontend Sênior",
      department: "Engenharia",
      location: "São Paulo, Brasil / Remoto",
      type: "Tempo Integral",
      icon: Code,
      description: "Construa interfaces incríveis para nossa plataforma VR usando React, Next.js e Three.js"
    },
    {
      title: "Designer de Experiência VR",
      department: "Design",
      location: "Remoto",
      type: "Tempo Integral",
      icon: Palette,
      description: "Crie experiências VR imersivas e intuitivas que encantam nossos usuários"
    },
    {
      title: "Engenheiro Blockchain",
      department: "Engenharia",
      location: "São Paulo, Brasil / Remoto",
      type: "Tempo Integral",
      icon: Shield,
      description: "Desenvolva smart contracts e integre soluções Web3 na nossa plataforma"
    },
    {
      title: "Gerente de Desenvolvimento de Negócios",
      department: "Negócios",
      location: "São Paulo, Brasil",
      type: "Tempo Integral",
      icon: TrendingUp,
      description: "Expanda nossa rede de parceiros e identifique novas oportunidades de mercado"
    }
  ]

  const benefits = [
    {
      icon: Globe,
      title: "Remote First",
      description: "Trabalhe de qualquer lugar do mundo"
    },
    {
      icon: Zap,
      title: "Tecnologia de Ponta",
      description: "Use as ferramentas mais avançadas do mercado"
    },
    {
      icon: Users,
      title: "Time Incrível",
      description: "Colabore com os melhores talentos"
    },
    {
      icon: Heart,
      title: "Impacto",
      description: "Construa o futuro do entretenimento"
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
                Junte-se ao Futuro
              </span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-gray-300 leading-relaxed px-2 mb-6 sm:mb-8">
              Construa o próximo capítulo do entretenimento conosco
            </p>
            <Badge className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-purple-200">
              <Users className="w-4 h-4 mr-2" />
              4 vagas abertas
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Posições Abertas
            </h2>
            <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-2">
              Encontre sua próxima oportunidade na vanguarda da tecnologia VR
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <job.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 leading-tight">
                      {job.title}
                    </h3>
                    <p className="text-sm text-purple-400 font-medium">
                      {job.department}
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  <div className="flex items-center text-xs sm:text-sm text-gray-400">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-400">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {job.type}
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-sm sm:text-base"
                >
                  Candidatar-se
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
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
              Por que Envimerse?
            </h2>
            <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-2">
              Benefícios que fazem a diferença na sua jornada profissional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 sm:p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <benefit.icon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Nossa Cultura
            </h2>
            <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 p-6 sm:p-8 rounded-2xl border border-white/10">
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Na Envimerse, acreditamos que as melhores inovações vêm de equipes diversas e 
                colaborativas. Criamos um ambiente onde cada pessoa pode crescer, aprender e 
                contribuir para o futuro do entretenimento.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                Valorizamos a criatividade, a autonomia e o pensamento disruptivo. Se você é 
                apaixonado por tecnologia e quer fazer parte da revolução VR, este é o seu lugar.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Application */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-cyan-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Não encontrou sua vaga?
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
              Estamos sempre em busca de talentos excepcionais. Envie seu currículo mesmo assim!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Candidatura Espontânea
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
              >
                Ver Todas as Vagas
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 