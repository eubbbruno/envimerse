import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Box, Cylinder, Torus, Text } from '@react-three/drei'
import * as THREE from 'three'

type AnimatedIconProps = {
  type: 'vr' | 'blockchain' | 'ticket'
  position: [number, number, number]
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ type, position }) => {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 100; i++) {
      const t = Math.random() * Math.PI * 2
      const r = 0.5 + Math.random() * 0.5
      const x = r * Math.cos(t)
      const y = r * Math.sin(t)
      const z = -1 + Math.random() * 2
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  const renderVR = () => (
    <>
      {/* VR Headset */}
      <Box args={[0.8, 0.5, 0.1]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#2c3e50" metalness={0.6} roughness={0.2} />
      </Box>
      <Cylinder args={[0.08, 0.08, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0.3, 0.3, 0.1]}>
        <meshStandardMaterial color="#34495e" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} position={[-0.3, 0.3, 0.1]}>
        <meshStandardMaterial color="#34495e" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Torus args={[0.15, 0.02, 16, 100]} position={[0, 0.3, 0.05]}>
        <meshStandardMaterial color="#3498db" emissive="#3498db" emissiveIntensity={0.5} />
      </Torus>

      {/* Person's head */}
      <Sphere args={[0.25, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ecf0f1" />
      </Sphere>

      {/* Person's body */}
      <Cylinder args={[0.2, 0.3, 0.6, 32]} position={[0, -0.4, 0]}>
        <meshStandardMaterial color="#3498db" />
      </Cylinder>

      {/* Person's arms */}
      <Cylinder args={[0.05, 0.05, 0.4, 32]} position={[0.25, -0.2, 0]} rotation={[0, 0, Math.PI / 3]}>
        <meshStandardMaterial color="#3498db" />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.4, 32]} position={[-0.25, -0.2, 0]} rotation={[0, 0, -Math.PI / 3]}>
        <meshStandardMaterial color="#3498db" />
      </Cylinder>

      <Text position={[0, -0.8, 0]} fontSize={0.1} color="#ecf0f1">
        VR
      </Text>
    </>
  )

  const renderBlockchain = () => (
    <>
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} args={[0.3, 0.3, 0.3]} position={[Math.cos(i * Math.PI / 2) * 0.4, Math.sin(i * Math.PI / 2) * 0.4, 0]}>
          <meshStandardMaterial color="#3498db" metalness={0.6} roughness={0.2} />
        </Box>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Cylinder key={i} args={[0.03, 0.03, 0.8, 32]} position={[Math.cos((i + 0.5) * Math.PI / 2) * 0.3, Math.sin((i + 0.5) * Math.PI / 2) * 0.3, 0]} rotation={[0, 0, (i + 0.5) * Math.PI / 2]}>
          <meshStandardMaterial color="#2980b9" metalness={0.8} roughness={0.2} />
        </Cylinder>
      ))}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.01} color="#3498db" />
      </points>
    </>
  )

  const renderTicket = () => (
    <>
      <Box args={[0.8, 0.5, 0.05]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e74c3c" metalness={0.4} roughness={0.6} />
      </Box>
      <Cylinder args={[0.06, 0.06, 0.5, 32]} position={[-0.35, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#c0392b" metalness={0.6} roughness={0.4} />
      </Cylinder>
      <Text position={[0.1, 0, 0.03]} fontSize={0.1} color="#ecf0f1">
        VR-Ticket
      </Text>
      <Box args={[0.2, 0.1, 0.01]} position={[0.25, -0.15, 0.03]}>
        <meshStandardMaterial color="#f39c12" metalness={0.6} roughness={0.4} />
      </Box>
    </>
  )

  return (
    <group ref={groupRef} position={position}>
      {type === 'vr' && renderVR()}
      {type === 'blockchain' && renderBlockchain()}
      {type === 'ticket' && renderTicket()}
    </group>
  )
}