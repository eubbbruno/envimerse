import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const experiences = [
  {
    title: "Live Concerts",
    description: "Feel the energy of live music as if you're in the front row. Experience your favorite artists' performances in stunning virtual reality.",
    image: "/girl-concert.png"
  },
  {
    title: "Basketball Games",
    description: "Get courtside seats to the biggest basketball games. Watch every dunk, three-pointer, and buzzer-beater in immersive VR.",
    image: "/vr-user-2.png"
  },
  {
    title: "Football Matches",
    description: "Be in the stadium for the most exciting football matches. Experience the roar of the crowd and the thrill of every goal in VR.",
    image: "/vr-user-3.png"
  }
]

export default function VRExperienceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-brandMagenta/30 via-brandCyan/20 to-black backdrop-blur-md border border-white/10">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-1/2 p-12 z-10">
            <motion.h3 
              className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-brandMagenta to-brandCyan font-orbitron"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {experiences[currentIndex].title}
            </motion.h3>
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {experiences[currentIndex].description}
            </motion.p>
            <motion.button
              className="mt-8 px-8 py-3 bg-gradient-to-r from-brandMagenta to-brandCyan text-white rounded-full font-semibold hover:from-brandMagenta/80 hover:to-brandCyan/80 transition-all duration-300 shadow-neonRing hover:shadow-neonRingHover"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Experience Now
            </motion.button>
          </div>
          <div className="w-1/2 p-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brandMagenta/30 to-brandCyan/30 opacity-50 rounded-3xl blur-2xl"></div>
            <motion.div
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src={experiences[currentIndex].image}
                alt={experiences[currentIndex].title}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {experiences.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-brandCyan scale-125 shadow-cyanGlow' : 'bg-gray-500 scale-100'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}