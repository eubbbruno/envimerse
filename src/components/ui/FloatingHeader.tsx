'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Play, Zap, Building2, Code } from 'lucide-react';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="px-4 py-2 text-gray-300 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
  >
    {children}
  </Link>
);

export default function FloatingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      fixed top-0 w-full z-50 px-4 transition-all duration-500
      ${scrolled ? 'py-2' : 'py-4'}
    `}>
      <nav className="
        mx-auto max-w-7xl
        bg-black/20 backdrop-blur-xl
        border border-white/10
        rounded-full
        px-6 py-3
        shadow-[0_0_50px_rgba(236,72,153,0.3)]
        hover:shadow-[0_0_70px_rgba(236,72,153,0.5)]
        transition-all duration-300
      ">
        <div className="flex items-center justify-between">
          {/* Logo SEM 3D por enquanto */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-magenta-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-magenta-400 to-cyan-400">
              Envimerse
            </span>
          </Link>
          
          {/* Menu items */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/events">Live Events</NavLink>
            <NavLink href="/how-it-works">How it Works</NavLink>
            <NavLink href="/for-venues">For Venues</NavLink>
            <NavLink href="/technology">Technology</NavLink>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="
              px-6 py-2 rounded-full
              bg-gradient-to-r from-magenta-500 to-cyan-500
              hover:shadow-[0_0_30px_rgba(236,72,153,0.7)]
              transform hover:scale-105
              transition-all duration-300
              font-semibold
              text-white
            ">
              Connect Wallet
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="mt-4 mx-4"
          >
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
              {[
                { name: 'Live Events', href: '/events', icon: Play },
                { name: 'How it Works', href: '/how-it-works', icon: Zap },
                { name: 'For Venues', href: '/for-venues', icon: Building2 },
                { name: 'Technology', href: '/technology', icon: Code },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                  >
                    <item.icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                    <span className="text-white font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4 border-t border-white/10"
              >
                <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] transition-all duration-300">
                  Connect Wallet
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 