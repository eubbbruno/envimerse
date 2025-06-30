"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Twitter, MessageCircle, Mail, MapPin, Phone, Zap, Shield, Globe, Wifi } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

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
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Zap className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">Envimerse</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
              Revolucionando o entretenimento através de experiências VR imersivas e tecnologia blockchain.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Newsletter</h4>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu email"
                  className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-sm"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? 'Inscrito!' : 'Inscrever-se'}
                </Button>
              </form>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Plataforma</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'Marketplace', href: '/marketplace' },
                { name: 'Eventos', href: '/events' },
                { name: 'Ambientes', href: '/environments' },
                { name: 'Dashboard', href: '/dashboard/client' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Empresa</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'Sobre', href: '/about' },
                { name: 'Carreiras', href: '/careers' },
                { name: 'Contato', href: '/contact' },
                { name: 'Blog', href: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Contato</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">contato@envimerse.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">São Paulo, Brasil</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">+55 (11) 9999-9999</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-4 sm:mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Redes Sociais</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Github, href: 'https://github.com/eubbbruno/envimerse', label: 'GitHub' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: MessageCircle, href: '#', label: 'Discord' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators - Hidden on small mobile */}
        <div className="hidden sm:block border-t border-white/10 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: Shield, text: 'Blockchain Secured' },
              { icon: Globe, text: 'Global Platform' },
              { icon: Wifi, text: 'Web3 Native' },
              { icon: Zap, text: 'Next-Gen VR' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <item.icon className="w-4 h-4 text-purple-400" />
                <span className="text-xs sm:text-sm text-gray-400">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              © 2024 Envimerse. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              <Link href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Termos
              </Link>
              <Link href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 