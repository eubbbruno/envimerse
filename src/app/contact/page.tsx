"use client"

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Zap } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      detail: "hello@envimerse.com",
      description: "Send us an email anytime"
    },
    {
      icon: MessageCircle,
      title: "Discord",
      detail: "Join our community",
      description: "Connect with our team and community"
    },
    {
      icon: Clock,
      title: "Response Time",
      detail: "Within 24 hours",
      description: "We typically respond quickly"
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
                <MessageCircle className="w-5 h-5 text-brandCyan mr-2" />
                <span className="text-white font-medium">Get in Touch</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-orbitron text-white mb-8">
                Let's Build the <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Future</span> Together
              </h1>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-lexend">
                Whether you're a venue owner, investor, or just curious about the future of entertainment, 
                we'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">Send us a Message</h2>
                  <p className="text-gray-400">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandMagenta/50 focus:border-brandMagenta/50 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandMagenta/50 focus:border-brandMagenta/50 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandMagenta/50 focus:border-brandMagenta/50 transition-all duration-300"
                      placeholder="Your company (optional)"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brandMagenta/50 focus:border-brandMagenta/50 transition-all duration-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="venue">Venue Integration</option>
                      <option value="investment">Investment Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandMagenta/50 focus:border-brandMagenta/50 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full px-8 py-4 bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-bold rounded-xl transition-all duration-300 font-orbitron group"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">Get in Touch</h2>
                  <p className="text-gray-400">
                    Ready to revolutionize entertainment? Let's talk about how we can work together.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-brandMagenta/50 transition-all duration-500 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brandMagenta to-brandCyan flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1 font-orbitron">{info.title}</h3>
                          <p className="text-brandCyan font-medium mb-1">{info.detail}</p>
                          <p className="text-gray-400 text-sm">{info.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Response */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-brandMagenta/10 to-brandCyan/10 border border-brandMagenta/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <Zap className="w-6 h-6 text-brandCyan" />
                    <h3 className="text-lg font-bold text-white font-orbitron">Quick Response</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    We understand that time is valuable. Our team typically responds to all inquiries within 24 hours. 
                    For urgent matters, reach out via Discord for faster communication.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-24 bg-gradient-to-b from-transparent via-brandMagenta/5 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-orbitron">
                Have <span className="bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] bg-clip-text text-transparent">Questions</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Check out our FAQ section for quick answers to common questions.
              </p>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:border-[#60A3F9] hover:shadow-lg hover:shadow-[#60A3F9]/25 transition-all duration-300 font-orbitron bg-transparent backdrop-blur-md"
              >
                View FAQ
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 