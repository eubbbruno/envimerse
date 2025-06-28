'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#16162a] to-[#1a1a2e] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-[#8D42EC]/30 border-t-[#8D42EC] rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.h2 
          className="text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Carregando Marketplace
        </motion.h2>
        <motion.p 
          className="text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Preparing amazing VR experiences...
        </motion.p>
      </div>
    </div>
  );
} 