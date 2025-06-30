"use client"

import { motion } from 'framer-motion'
import { Zap, Users, Globe, Shield, Rocket, Target, Heart, Star } from 'lucide-react'
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
      icon: Rocket,
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
                <Star className="w-5 h-5 text-brandCyan mr-2" />
                <span className="text-white font-medium">About Envimerse</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-orbitron text-white mb-8">
                Revolutionizing <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Entertainment</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-lexend">
                We're building the future of immersive entertainment, connecting venues, creators, and audiences 
                through cutting-edge VR technology and blockchain innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-gradient-to-b from-transparent via-brandMagenta/5 to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                  <Target className="w-12 h-12 text-brandMagenta mb-6" />
                  <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">Our Mission</h2>
                  <p className="text-gray-300 leading-relaxed">
                    To democratize access to premium entertainment experiences by creating a global platform 
                    where anyone can attend world-class events in immersive virtual reality, regardless of 
                    geographic limitations or physical constraints.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                  <Heart className="w-12 h-12 text-brandCyan mb-6" />
                  <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">Our Vision</h2>
                  <p className="text-gray-300 leading-relaxed">
                    A world where distance doesn't limit experience. Where a music fan in São Paulo can 
                    enjoy a concert in New York, where venues can reach global audiences, and where 
                    technology brings people together rather than apart.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
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
                Our <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Values</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-brandMagenta/50 transition-all duration-500"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brandMagenta to-brandCyan flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-orbitron">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-gradient-to-b from-transparent via-brandCyan/5 to-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-orbitron">
                Meet the <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The innovators building the future of entertainment
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-brandMagenta/50 transition-all duration-500"
                >
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-brandMagenta to-brandCyan flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">{member.name}</h3>
                  <p className="text-brandCyan font-medium mb-4">{member.role}</p>
                  <p className="text-gray-400 leading-relaxed">{member.description}</p>
                </motion.div>
              ))}
            </div>
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
      </main>

      <Footer />
    </div>
  )
} 