"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    float intensity = pow(0.4 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    
    vec3 glow = mix(color1, color2, sin(time * 0.5 + vPosition.x * 2.0) * 0.5 + 0.5);
    
    gl_FragColor = vec4(glow * intensity, intensity * 0.8);
  }
`

interface AnimatedSphereProps {
  position: [number, number, number]
  scale: number
  speed: number
}

const AnimatedSphere: React.FC<AnimatedSphereProps> = ({ position, scale, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      color1: { value: new THREE.Color('#8D42EC') }, // brandMagenta
      color2: { value: new THREE.Color('#60A3F9') }, // brandCyan
    }),
    []
  )

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

const OrbitingRings: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * (Math.PI / 3)]}>
          <ringGeometry args={[2.8 + i * 0.5, 3 + i * 0.5, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#8D42EC' : '#60A3F9'}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

const SphereLines: React.FC = () => {
  const linesRef = useRef<THREE.Group>(null)

  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < 100; i++) {
      const phi = Math.acos(-1 + (2 * i) / 100)
      const theta = Math.sqrt(100 * Math.PI) * phi
      const x = Math.cos(theta) * Math.sin(phi) * 2.5
      const y = Math.sin(theta) * Math.sin(phi) * 2.5
      const z = Math.cos(phi) * 2.5
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05
    }
  })

  return (
    <group ref={linesRef}>
      {points.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]} scale={0.02}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? '#8D42EC' : '#60A3F9'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

const LogoSphereScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Main animated sphere */}
      <AnimatedSphere position={[0, 0, 0]} scale={2.5} speed={0.5} />
      
      {/* Smaller orbiting spheres */}
      <AnimatedSphere position={[4, 2, 0]} scale={0.8} speed={0.8} />
      <AnimatedSphere position={[-3, -1, 2]} scale={0.6} speed={1.2} />
      <AnimatedSphere position={[2, -3, -1]} scale={0.7} speed={0.9} />
      
      {/* Orbiting rings */}
      <OrbitingRings />
      
      {/* Sphere lines pattern */}
      <SphereLines />
    </>
  )
}

interface LogoSphereProps {
  className?: string
  height?: string | number
}

const LogoSphere: React.FC<LogoSphereProps> = ({ className = "", height = "100vh" }) => {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <LogoSphereScene />
      </Canvas>
    </div>
  )
}

export default LogoSphere 