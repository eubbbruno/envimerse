import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Wallet, ShoppingCart, Ticket, Glasses } from 'lucide-react'

const carouselItems = [
  {
    title: "VR-Tickets",
    image: "/vr-user.png",
    description: "Purchase virtual tickets to attend live events from anywhere in the world."
  },
  {
    title: "Blockchain Security",
    image: "/blockchain-security.png",
    description: "All transactions on Envimerse are secured by the BASE blockchain."
  },
  {
    title: "ENVI Tokens",
    image: "/envi-token.png",
    description: "Use ENVI tokens to purchase tickets and participate in the Envimerse economy."
  }
]

const accessSteps = [
  {
    icon: <Wallet className="w-12 h-12" />,
    title: "Connect Wallet",
    description: "Access Envimerse using MetaMask, Phantom, or Coinbase Wallet."
  },
  {
    icon: <ShoppingCart className="w-12 h-12" />,
    title: "Enter Marketplace",
    description: "Browse and purchase VR tickets for live events in our WebApp."
  },
  {
    icon: <Ticket className="w-12 h-12" />,
    title: "Secure Your Ticket",
    description: "Buy or sell VR tickets securely using blockchain technology."
  },
  {
    icon: <Glasses className="w-12 h-12" />,
    title: "Join the Event",
    description: "Enter the metaverse event using your VR headset and enjoy the experience."
  }
]

export default function HowItWorks() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length)
  }

  return (
    <section className="w-full relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brandMagenta/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="w-full bg-gradient-to-br from-brandMagenta/20 via-brandCyan/10 to-brandMagenta/20 rounded-3xl overflow-hidden backdrop-blur-md border border-white/10">
          <div className="py-16 px-4 md:px-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center font-orbitron text-white">
              How Envimerse Works
            </h2>
            <div className="relative h-[400px] md:h-[500px] mb-20">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                <div className="flex justify-center items-center space-x-8 md:space-x-16">
                  {[-1, 0, 1].map((offset) => {
                    const index = (currentIndex + offset + carouselItems.length) % carouselItems.length
                    const item = carouselItems[index]
                    const isActive = offset === 0

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: isActive ? 1 : 0.5,
                          scale: isActive ? 1 : 0.8,
                          z: isActive ? 0 : -100
                        }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                      >
                        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
                          <Image
                            src={item.image}
                            alt={item.title}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className="text-center"
                            >
                              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">{item.title}</h3>
                              <p className="text-gray-300 text-xl md:text-2xl max-w-2xl">
                                {item.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
              <button 
                onClick={prevSlide} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors duration-300 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextSlide} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-4 transition-colors duration-300 z-10"
                aria-label="Next slide"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-16 text-center text-white font-orbitron"
            >
              How to Access Envimerse
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {accessSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 h-full flex flex-col items-center text-center relative z-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl transform rotate-3 scale-105"></div>
                    <div className="mb-6 p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{step.title}</h3>
                    <p className="text-gray-300 text-lg md:text-xl">{step.description}</p>
                  </div>
                  {index < accessSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-x-full">
                      <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}