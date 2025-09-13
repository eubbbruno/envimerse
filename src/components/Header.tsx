"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useClientOnly, useSeededRandom } from '@/hooks/useClientOnly'
import { Menu, X, Sparkles, Zap } from 'lucide-react'
import ConnectWalletButton from './ConnectWalletButton'
import Image from 'next/image'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoverItem, setHoverItem] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const hasMounted = useClientOnly()
  const getSeededRandom = useSeededRandom('header-particles')
  
  // Scroll animations
  const { scrollY } = useScroll()
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.8])
  const logoRotate = useTransform(scrollY, [0, 500], [0, 180])
  const headerOpacity = useTransform(scrollY, [0, 50], [0.9, 1])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'How It Works', href: '/how-it-works', icon: Sparkles },
    { name: 'Technology', href: '/technology', icon: Zap },
    { name: 'Marketplace', href: '/marketplace', icon: Sparkles },
    { name: 'Events', href: '/events', icon: Zap },
    { name: 'For Venues', href: '/for-venues', icon: Sparkles },
    { name: 'Pricing', href: '/pricing', icon: Zap },
    { name: 'Contact', href: '/contact', icon: Sparkles },
  ]

  // Particle animation variants
  const particleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.7, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.header 
      ref={headerRef}
      style={{ opacity: headerOpacity }}
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/20 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-purple-500/10' 
          : 'bg-black/10 backdrop-blur-xl border border-white/10'
      } rounded-2xl`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 animate-pulse" />
      <div className="absolute inset-[1px] rounded-2xl bg-black/40 backdrop-blur-2xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo with 3D animation */}
          <Link href="/" className="flex items-center group relative">
            {/* Logo particles */}
            {hasMounted && (
              <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                    style={{
                      left: `${getSeededRandom(i * 2) * 100}%`,
                      top: `${getSeededRandom(i * 2 + 1) * 100}%`,
                    }}
                    variants={particleVariants}
                    animate="animate"
                    transition={{ delay: i * 0.2 }}
                  />
                ))}
              </div>
            )}
            
            <motion.div
              style={{ 
                scale: logoScale,
                rotateY: logoRotate 
              }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 360,
                transition: { duration: 0.6, ease: "easeInOut" }
              }}
              className="w-20 h-20 sm:w-24 sm:h-24 relative"
            >
              <Image
                src="/logo.png"
                alt="Envimerse Logo"
                width={96}
                height={96}
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(139,69,19,0.5)] group-hover:drop-shadow-[0_0_30px_rgba(139,69,19,0.8)] transition-all duration-300"
              />
              
              {/* Logo glow ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-purple-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation with neon effects */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoverItem(item.name)}
                  onMouseLeave={() => setHoverItem(null)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/5 group flex items-center space-x-2"
                  >
                    <IconComponent className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{item.name}</span>
                    
                    {/* Neon glow effect */}
                    {hoverItem === item.name && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-sm"
                        layoutId="navGlow"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Underline animation */}
                    <motion.div
                      className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ConnectWalletButton />
          </div>

          {/* Mobile menu button with portal effect */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className="hidden sm:block">
              <ConnectWalletButton />
            </div>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-gray-300 hover:text-white transition-colors rounded-xl hover:bg-white/5 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Portal vortex effect */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 relative z-10" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 relative z-10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu with portal animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ 
                opacity: 0, 
                height: 0,
                scale: 0.8,
                y: -20 
              }}
              animate={{ 
                opacity: 1, 
                height: 'auto',
                scale: 1,
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                scale: 0.8,
                y: -20 
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98]
              }}
              className="lg:hidden overflow-hidden"
            >
              <motion.div 
                className="px-4 pt-4 pb-6 space-y-2 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 mt-4 relative"
                initial={{ backdropFilter: "blur(0px)" }}
                animate={{ backdropFilter: "blur(24px)" }}
              >
                {/* Portal background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-2xl" />
                
                {navigation.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1 + 0.2 
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 group relative"
                      >
                        <IconComponent className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span>{item.name}</span>
                        
                        {/* Mobile item glow */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.div>
                  )
                })}
                
                <motion.div 
                  className="pt-4 sm:hidden border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <ConnectWalletButton />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
} 