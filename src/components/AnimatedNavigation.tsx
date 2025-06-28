"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import ConnectWalletButton from '@/components/ConnectWalletButton'

interface AnimatedNavigationProps {
  onEnterClick?: () => void
}

const AnimatedNavigation: React.FC<AnimatedNavigationProps> = ({ onEnterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Check if scrolled enough to show glassmorphic effect
      setIsScrolled(currentScrollY > 50)
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Hide on scroll down
      } else {
        setIsVisible(true) // Show on scroll up
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navItems = [
    { href: '/marketplace', label: 'Marketplace' },
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#partners', label: 'Partners' },
  ]

  const handleEnterClick = () => {
    if (onEnterClick) {
      onEnterClick()
    } else {
      const element = document.getElementById('signup')
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-glassDark' 
          : 'bg-transparent'
      }`}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="text-2xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan hover:scale-105 transition-transform duration-300"
          >
            Envimerse
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden lg:flex space-x-6 xl:space-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <Link 
                href={item.href} 
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group font-medium"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brandMagenta to-brandCyan group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Desktop Actions */}
        <motion.div 
          className="hidden lg:flex items-center space-x-3 xl:space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ThemeToggle />
          <ConnectWalletButton />
          <Button
            onClick={handleEnterClick}
            className="bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-semibold px-6 py-2 rounded-xl shadow-neonRing hover:shadow-neonRingHover transition-all duration-300 flex items-center gap-2 group"
          >
            Enter Envimerse
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div 
          className="lg:hidden flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-glass-white backdrop-blur-md border border-white/20 hover:border-brandMagenta/50 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-6 space-y-6">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href} 
                      className="text-gray-300 hover:text-white transition-colors text-lg font-medium block py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <motion.div 
                className="pt-4 border-t border-white/10 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <ConnectWalletButton />
                <Button
                  onClick={() => {
                    handleEnterClick()
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-gradient-to-r from-brandMagenta to-brandCyan hover:from-brandMagenta/80 hover:to-brandCyan/80 text-white font-semibold px-6 py-3 rounded-xl shadow-neonRing hover:shadow-neonRingHover transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Enter Envimerse
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default AnimatedNavigation 