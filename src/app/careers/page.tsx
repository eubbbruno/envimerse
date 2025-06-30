"use client"

import { motion } from 'framer-motion'
import { Briefcase, Users, Globe, Zap, ArrowRight, Heart, Star, Rocket } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build amazing user experiences with React, Next.js, and Web3 technologies."
    },
    {
      title: "VR Experience Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Design immersive VR experiences that captivate global audiences."
    },
    {
      title: "Blockchain Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Develop smart contracts and Web3 integrations for our platform."
    },
    {
      title: "Business Development Manager",
      department: "Business",
      location: "São Paulo/Remote",
      type: "Full-time",
      description: "Build partnerships with venues and entertainment companies."
    }
  ]

  const benefits = [
    {
      icon: Globe,
      title: "Remote First",
      description: "Work from anywhere in the world with our global team"
    },
    {
      icon: Rocket,
      title: "Cutting-Edge Tech",
      description: "Work with VR, blockchain, and the latest web technologies"
    },
    {
      icon: Users,
      title: "Amazing Team",
      description: "Collaborate with passionate, talented people who love what they do"
    },
    {
      icon: Heart,
      title: "Impact",
      description: "Help build the future of entertainment and reach millions"
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-brandMagenta/20 to-brandCyan/20 border border-brandMagenta/30 backdrop-blur-md mb-8">
                <Briefcase className="w-5 h-5 text-brandCyan mr-2" />
                <span className="text-white font-medium">Join Our Team</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-orbitron text-white mb-8">
                Build the <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Future</span> With Us
              </h1>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-lexend">
                Join our mission to revolutionize entertainment through immersive VR experiences 
                and blockchain technology. We're looking for passionate innovators to help us build 
                the future of how people experience entertainment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-24 bg-gradient-to-b from-transparent via-brandMagenta/5 to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-orbitron">
                Why <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Envimerse</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Be part of something extraordinary
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-brandMagenta/50 transition-all duration-500"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brandMagenta to-brandCyan flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-orbitron">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-orbitron">
                Open <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Positions</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Find your next opportunity
              </p>
            </motion.div>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-brandMagenta/50 transition-all duration-500"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-white font-orbitron">{position.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 text-xs font-medium bg-brandMagenta/20 text-brandMagenta rounded-full border border-brandMagenta/30">
                            {position.department}
                          </span>
                          <span className="px-3 py-1 text-xs font-medium bg-brandCyan/20 text-brandCyan rounded-full border border-brandCyan/30">
                            {position.location}
                          </span>
                          <span className="px-3 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full border border-white/20">
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{position.description}</p>
                    </div>
                    
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <Button 
                        className="group px-6 py-3 bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-bold rounded-xl transition-all duration-300 font-orbitron"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Don't see your role? */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-brandMagenta/10 to-brandCyan/10 border border-brandMagenta/20"
            >
              <Star className="w-12 h-12 text-brandCyan mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">Don't See Your Role?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We're always looking for exceptional talent. Even if you don't see a specific role that fits, 
                we'd love to hear from you if you're passionate about VR and blockchain technology.
              </p>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#60A3F9] hover:shadow-lg hover:shadow-[#60A3F9]/25 transition-all duration-300 font-orbitron bg-transparent backdrop-blur-md"
                >
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Culture */}
        <section className="py-24 bg-gradient-to-b from-transparent via-brandCyan/5 to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-orbitron">
                  Our <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Culture</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">
                    At Envimerse, we believe that the best innovation comes from diverse perspectives 
                    and collaborative teamwork. We're building more than just a product - we're 
                    creating a new way for people to experience entertainment.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Our team is passionate, curious, and always pushing boundaries. We value 
                    creativity, technical excellence, and the courage to try new things.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-brandMagenta/20 text-brandMagenta rounded-full text-sm font-medium border border-brandMagenta/30">
                      Innovation
                    </span>
                    <span className="px-4 py-2 bg-brandCyan/20 text-brandCyan rounded-full text-sm font-medium border border-brandCyan/30">
                      Collaboration
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-gray-300 rounded-full text-sm font-medium border border-white/20">
                      Growth
                    </span>
                    <span className="px-4 py-2 bg-brandMagenta/20 text-brandMagenta rounded-full text-sm font-medium border border-brandMagenta/30">
                      Impact
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-brandMagenta/20 to-brandCyan/20 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-24 h-24 text-white mx-auto mb-4" />
                    <p className="text-white font-medium">Remote-First Team</p>
                    <p className="text-gray-400 text-sm">Working from around the globe</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 