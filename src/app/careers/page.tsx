"use client"

import { motion } from 'framer-motion'
import { Code, Zap, Users, TrendingUp, Heart, Shield, Globe, Coffee, Gamepad2, Headphones, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      type: "Full-time",
      location: "Remote",
      description: "Join our team to build the next generation of VR interfaces using React, Three.js, and WebXR."
    },
    {
      title: "Blockchain Developer",
      type: "Full-time", 
      location: "São Paulo, Brazil",
      description: "Develop smart contracts and Web3 integrations for our VR entertainment platform."
    },
    {
      title: "VR Experience Designer",
      type: "Full-time",
      location: "Remote",
      description: "Create immersive VR experiences and design innovative interaction patterns."
    },
    {
      title: "Business Development Manager",
      type: "Full-time",
      location: "São Paulo, Brazil",
      description: "Drive partnerships with venues and resellers to expand our platform globally."
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Complete health insurance and mental wellness support"
    },
    {
      icon: Coffee,
      title: "Flexible Schedule",
      description: "Work-life balance with flexible hours and remote work"
    },
    {
      icon: TrendingUp,
      title: "Professional Growth",
      description: "Continuous learning and career development opportunities"
    },
    {
      icon: Gamepad2,
      title: "Innovation Time",
      description: "20% of your time dedicated to personal projects"
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
                Join Our Team
              </span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-gray-300 leading-relaxed px-2">
              Help us build the future of VR entertainment and revolutionize the industry
            </p>
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
              Open Positions
            </h2>
            <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-2">
              Join the most innovative team in VR technology
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
                className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{job.title}</h3>
                  <span className="text-xs sm:text-sm bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-cyan-400 mb-3 sm:mb-4 flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  {job.location}
                </p>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                  {job.description}
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
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
              Why Work With Us
            </h2>
            <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto px-2">
              Benefits and advantages that make the difference
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
                className="bg-white/5 p-4 sm:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center"
              >
                <benefit.icon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
              Our Culture
            </h2>
            <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 p-6 sm:p-8 rounded-2xl border border-purple-500/20">
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                At Envimerse, we believe innovation emerges from collaboration and diversity. 
                Our team is passionate about creating the future of entertainment through VR technology.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                We value creativity, technical excellence, and the constant pursuit of learning. 
                Each team member has autonomy to contribute meaningfully to our mission.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                Join us and be part of the team that's transforming how people experience 
                entertainment in the digital age.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-cyan-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Don't See Your Role?
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 px-2">
              We're always looking for exceptional talent. Send us your resume!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              >
                Open Application
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
              >
                <Headphones className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 