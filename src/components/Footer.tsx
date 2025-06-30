"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Twitter, MessageCircle, Zap, ArrowRight, Globe, Shield, Coins, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Platform",
      links: [
        { href: "/marketplace", label: "Marketplace" },
        { href: "/events", label: "Events" },
        { href: "/environments", label: "Environments" },
        { href: "/dashboard", label: "Dashboard" },
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "/docs", label: "Documentation" },
        { href: "/api", label: "API Reference" },
        { href: "/support", label: "Support" },
        { href: "/status", label: "System Status" },
      ]
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/careers", label: "Careers" },
        { href: "/press", label: "Press Kit" },
        { href: "/contact", label: "Contact" },
      ]
    }
  ]

  const socialLinks = [
    { href: "https://github.com/eubbbruno/envimerse", icon: Github, label: "GitHub" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: MessageCircle, label: "Discord" },
  ]

  return (
    <footer className="relative bg-black border-t border-brandMagenta/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brandMagenta/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brandCyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8D42EC] to-[#60A3F9] flex items-center justify-center">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold font-orbitron text-white">
                      Envimerse
                    </span>
                    <span className="text-xs text-gray-400 font-medium tracking-wider">
                      VR PLATFORM
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                  The future of immersive entertainment. Experience live events in virtual reality and connect with audiences worldwide through cutting-edge VR technology.
                </p>

                {/* Newsletter Signup */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-lg">Stay Updated</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandMagenta/50 focus:border-brandMagenta/50 transition-all duration-300"
                    />
                    <Button className="px-6 py-3 bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-semibold rounded-lg transition-all duration-300 group">
                      Subscribe
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {footerSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-white font-semibold text-lg mb-6 font-orbitron">
                      {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 block"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center gap-4 text-gray-400 text-sm"
            >
              <span>© {currentYear} Envimerse. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-brandMagenta/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 mt-8 pt-8 border-t border-white/5"
          >
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Shield className="w-4 h-4 text-brandCyan" />
              <span>Blockchain Secured</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Globe className="w-4 h-4 text-brandMagenta" />
              <span>Global Platform</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Coins className="w-4 h-4 text-brandCyan" />
              <span>Web3 Native</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Rocket className="w-4 h-4 text-brandMagenta" />
              <span>Next-Gen VR</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
} 