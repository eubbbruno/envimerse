import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Text } from '@react-three/drei'
import { AnimatedIcon } from './AnimatedIcon'
import * as THREE from 'three'

interface FloatingTextProps {
  children: React.ReactNode
  position: [number, number, number]
  color?: string
}

function FloatingText({ children, position, color = "#ffffff" }: FloatingTextProps) {
  const textRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.05
    }
  })
  return (
    <Text ref={textRef} position={position} fontSize={0.2} color={color} anchorX="center" anchorY="middle">
      {children}
    </Text>
  )
}

function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })
  return (
    <group ref={linesRef}>
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2, 0, 0), new THREE.Vector3(0, 0, 0)])} />
        <lineBasicMaterial attach="material" color="#3498db" linewidth={2} />
      </line>
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 0, 0)])} />
        <lineBasicMaterial attach="material" color="#3498db" linewidth={2} />
      </line>
    </group>
  )
}

export default function VRScene() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
        
        <AnimatedIcon type="vr" position={[-2, 0, 0]} />
        <AnimatedIcon type="blockchain" position={[0, 0, 0]} />
        <AnimatedIcon type="ticket" position={[2, 0, 0]} />

        <FloatingText position={[-2, -1, 0]} color="#3498db">VR Experience</FloatingText>
        <FloatingText position={[0, -1, 0]} color="#2ecc71">Blockchain Security</FloatingText>
        <FloatingText position={[2, -1, 0]} color="#e74c3c">VR-Tickets</FloatingText>

        <ConnectionLines />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}