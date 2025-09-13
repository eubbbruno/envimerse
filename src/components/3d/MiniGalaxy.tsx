"use client"

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function MiniGalaxy() {
  const pointsRef = useRef<THREE.Points>(null!)
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    const colors = new Float32Array(1000 * 3)
    
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3
      const radius = Math.random() * 1.5
      const angle = (i % 3) / 3 * Math.PI * 2
      const spinAngle = radius * 2
      
      positions[i3] = Math.cos(angle + spinAngle) * radius
      positions[i3 + 1] = (Math.random() - 0.5) * 0.3
      positions[i3 + 2] = Math.sin(angle + spinAngle) * radius
      
      // Magenta to Cyan gradient
      const factor = radius / 1.5
      colors[i3] = 0.925 * (1 - factor) + 0.133 * factor     // R
      colors[i3 + 1] = 0.282 * (1 - factor) + 0.827 * factor // G
      colors[i3 + 2] = 0.6 * (1 - factor) + 0.933 * factor   // B
    }
    
    return { positions, colors }
  }, [])
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.3
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={1000}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </>
  )
} 