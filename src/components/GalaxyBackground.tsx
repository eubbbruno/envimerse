"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Galaxy3DWrapper from './3d/Galaxy3DWrapper';
import GalaxyCSS from './3d/GalaxyCSS';

interface GalaxyBackgroundProps {
  variant?: 'hero' | 'section' | 'loading';
  className?: string;
  interactive?: boolean;
  useCSS?: boolean;
}

export default function GalaxyBackground({ 
  variant = 'hero', 
  className = '',
  interactive = true,
  useCSS = false
}: GalaxyBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL not supported, using CSS fallback');
        setHasWebGLError(true);
      }
    } catch (error) {
      console.warn('WebGL detection failed, using CSS fallback');
      setHasWebGLError(true);
    }
    
    // Listen for Three.js errors
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('Three') || 
          event.message?.includes('WebGL') || 
          event.message?.includes('color') ||
          event.message?.includes('ReactCurrentOwner')) {
        console.warn('3D rendering error detected, falling back to CSS Galaxy');
        setHasWebGLError(true);
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (!mounted) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-black to-cyan-900/20" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Galaxy Component - com fallback automático */}
      {hasWebGLError || useCSS ? (
        <div className="opacity-60">
          <GalaxyCSS />
        </div>
      ) : (
        <div className="opacity-60">
          <Galaxy3DWrapper />
        </div>
      )}

      {/* Floating Particles */}
      {variant === 'hero' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400/60 to-cyan-400/60 rounded-full"
              style={{
                left: `${(i * 127) % 100}%`,
                top: `${(i * 179) % 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: (i % 5) * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Overlay Gradients */}
      {variant === 'hero' && (
        <>
          {/* Radial gradient from center */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 pointer-events-none" />
          
          {/* Top to bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
          
          {/* Color overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10 pointer-events-none" />
          
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none" />
        </>
      )}

      {/* Interactive glow effects */}
      {interactive && variant === 'hero' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(96, 163, 249, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(139, 69, 19, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(96, 163, 249, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.05) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}

// Loading component para galáxias
export function GalaxyLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/20">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer ring */}
        <div className="w-20 h-20 border-2 border-purple-500/30 border-t-purple-500 rounded-full" />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 border-2 border-cyan-500/30 border-b-cyan-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  )
} 