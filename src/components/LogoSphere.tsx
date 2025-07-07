"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { Sphere, Torus } from '@react-three/drei'
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
    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
    
    vec3 glow = mix(color1, color2, sin(time * 0.3 + vPosition.y * 1.5) * 0.5 + 0.5);
    
    // Add atmospheric effect
    float atmosphere = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), 1.5);
    
    gl_FragColor = vec4(glow * intensity + atmosphere * 0.3, intensity * 0.9 + atmosphere * 0.2);
  }
`

const ringVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const ringFragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    
    // Create ring pattern
    float ringPattern = sin(length(vPosition.xy) * 15.0 + time * 2.0) * 0.5 + 0.5;
    
    vec3 glow = mix(color1, color2, ringPattern);
    
    gl_FragColor = vec4(glow * intensity, intensity * 0.4);
  }
`

interface PlanetSphereProps {
  position: [number, number, number]
  scale: number
  speed: number
  hasRings?: boolean
}

const PlanetSphere: React.FC<PlanetSphereProps> = ({ position, scale, speed, hasRings = false }) => {
  const sphereRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const ringMaterialRef = useRef<THREE.ShaderMaterial>(null)

  const sphereUniforms = useMemo(
    () => ({
      time: { value: 0 },
      color1: { value: new THREE.Color('#8D42EC') },
      color2: { value: new THREE.Color('#60A3F9') },
    }),
    []
  )

  const ringUniforms = useMemo(
    () => ({
      time: { value: 0 },
      color1: { value: new THREE.Color('#EC42D1') },
      color2: { value: new THREE.Color('#42ECF5') },
    }),
    []
  )

  useFrame((state) => {
    if (sphereRef.current && materialRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
      sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
    
    if (ringRef.current && ringMaterialRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed * 0.2
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.05
      ringMaterialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <group position={position}>
      {/* Main Planet */}
      <mesh ref={sphereRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={sphereUniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Rings (like Urano) */}
      {hasRings && (
        <>
          <mesh ref={ringRef} scale={scale * 1.5}>
            <torusGeometry args={[1.8, 0.05, 16, 100]} />
            <shaderMaterial
              ref={ringMaterialRef}
              vertexShader={ringVertexShader}
              fragmentShader={ringFragmentShader}
              uniforms={ringUniforms}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 6]} scale={scale * 1.3}>
            <torusGeometry args={[2.2, 0.03, 16, 100]} />
            <shaderMaterial
              vertexShader={ringVertexShader}
              fragmentShader={ringFragmentShader}
              uniforms={ringUniforms}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 8]} scale={scale * 1.1}>
            <torusGeometry args={[2.6, 0.02, 16, 100]} />
            <shaderMaterial
              vertexShader={ringVertexShader}
              fragmentShader={ringFragmentShader}
              uniforms={ringUniforms}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
    </group>
  )
}

const LogoSphereScene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8D42EC" />
      
      {/* Main Uranus-like planet with rings */}
      <PlanetSphere position={[0, 0, 0]} scale={3.5} speed={0.3} hasRings={true} />
      
      {/* Smaller orbiting planets */}
      <PlanetSphere position={[6, 3, -2]} scale={1.2} speed={0.6} />
      <PlanetSphere position={[-5, -2, 3]} scale={0.9} speed={0.8} />
      <PlanetSphere position={[3, -4, -1]} scale={1.0} speed={0.7} />
      <PlanetSphere position={[-3, 4, 2]} scale={0.8} speed={0.9} />
    </>
  )
}

interface LogoSphereProps {
  className?: string
  height?: string | number
}

const LogoSphere: React.FC<LogoSphereProps> = ({ className = "", height = 500 }) => {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <LogoSphereScene />
      </Canvas>
    </div>
  )
}

export default LogoSphere 