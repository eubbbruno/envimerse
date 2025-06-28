import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vec3 newPosition = position;
    newPosition.z += sin(position.x * 10.0 + time) * 0.1;
    newPosition.z += cos(position.y * 10.0 + time) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform sampler2D texture1;
  
  void main() {
    vec2 uv = vUv;
    vec3 color = vec3(0.0);
    
    // Create a grid effect
    float gridSize = 50.0;
    vec2 gridUv = fract(uv * gridSize);
    float grid = smoothstep(0.95, 0.96, max(gridUv.x, gridUv.y));
    
    // Add a pulsating glow
    float glow = sin(time * 2.0) * 0.5 + 0.5;
    color += vec3(0.1, 0.5, 1.0) * glow * 0.5;
    
    // Add the grid
    color += vec3(0.0, 0.7, 1.0) * grid;
    
    // Sample the texture
    vec4 texColor = texture2D(texture1, uv);
    color = mix(color, texColor.rgb, 0.5);
    
    gl_FragColor = vec4(color, 1.0);
  }
`

function VREnvironment() {
  const mesh = useRef<THREE.Mesh>(null)
  const { clock } = useThree()
  
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    texture1: { value: new THREE.Texture() }
  }), [])

  const texture = useTexture('/logo.png')
  
  useEffect(() => {
    if (texture) {
      uniforms.texture1.value = texture
    }
  }, [texture, uniforms])

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
      mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
      uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[5, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

function FloatingText({ children, position, color = "#ffffff" }: { children: React.ReactNode, position: [number, number, number], color?: string }) {
  const textRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1
    }
  })
  return (
    <Text ref={textRef} position={position} fontSize={0.3} color={color} anchorX="center" anchorY="middle">
      {children}
    </Text>
  )
}

function VRUser() {
  const mesh = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.5
    }
  })

  return (
    <group ref={mesh}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 32]} />
        <meshStandardMaterial color="#2980b9" />
      </mesh>
      <mesh position={[0, 0.1, 0.1]}>
        <boxGeometry args={[0.4, 0.2, 0.2]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
    </group>
  )
}

export default function AdvancedVRScene() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        
        <VREnvironment />
        <VRUser />

        <FloatingText position={[0, 2, 0]} color="#3498db">Envimerse VR Experience</FloatingText>
        <FloatingText position={[-2, 0, 2]} color="#2ecc71">Live Events</FloatingText>
        <FloatingText position={[2, 0, 2]} color="#e74c3c">Interactive</FloatingText>
        <FloatingText position={[0, -2, 2]} color="#f39c12">Blockchain Powered</FloatingText>
      </Canvas>
    </div>
  )
}