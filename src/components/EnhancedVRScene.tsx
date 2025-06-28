"use client"

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float, Text3D, Center } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function FloatingElements() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[0.3, 32, 32]} position={[-4, 2, -2]}>
          <MeshDistortMaterial
            distort={0.2}
            speed={1.5}
            roughness={0.2}
            metalness={0.6}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.5}>
        <Sphere args={[0.2, 32, 32]} position={[3, -1, -1]}>
          <MeshDistortMaterial
            distort={0.4}
            speed={2.5}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
        <Sphere args={[0.15, 32, 32]} position={[2, 3, 1]}>
          <MeshDistortMaterial
            distort={0.5}
            speed={3}
            roughness={0.3}
            metalness={0.7}
          />
        </Sphere>
      </Float>
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      
      <AnimatedSphere />
      <FloatingElements />
      
      <Environment preset="night" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export default function EnhancedVRScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full h-[600px] relative"
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  )
} 