"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Twitter, Linkedin, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <footer className="bg-gradient-to-b from-black to-purple-900/20 text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Envimerse
                </span>
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Revolutionizing entertainment through immersive VR experiences and 
                cutting-edge blockchain technology.
              </p>
              
              {/* Newsletter */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm font-semibold text-white mb-2 sm:mb-3">
                  Stay Updated
                </h4>
                {isSubscribed ? (
                  <div className="flex items-center text-green-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Subscribed successfully!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      required
                    />
                    <Button 
                      type="submit" 
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 px-3 py-2"
                    >
                      <Send className="w-3 h-3" />
                    </Button>
                  </form>
                )}
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-2 sm:mb-3">
                  Follow Us
                </h4>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Platform */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Platform</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link href="/environments" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors">
                    VR Environments
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Company */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Company</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link href="/about" className="text-sm sm:text-base text-gray-300 hover:text-cyan-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm sm:text-base text-gray-300 hover:text-cyan-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm sm:text-base text-gray-300 hover:text-cyan-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm sm:text-base text-gray-300 hover:text-cyan-400 transition-colors">
                    Press Kit
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Contact</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Email</p>
                    <a href="mailto:brunobriote@hotmail.com" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors">
                      brunobriote@hotmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Phone</p>
                    <a href="tel:+5543996466446" className="text-sm sm:text-base text-gray-300 hover:text-purple-400 transition-colors">
                      +55 43 99646-6446
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Location</p>
                    <p className="text-sm sm:text-base text-gray-300">
                      São Paulo, Brazil
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              © 2024 Envimerse. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="hidden sm:flex justify-center items-center space-x-8 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Blockchain Verified</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>VR Certified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 