'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GalaxyPoints({ count = 30000 }) {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const radius = Math.random() * 5;
      const spinAngle = radius * 5;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.3;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;
      
      const mixFactor = radius / 5;
      colors[i3] = 0.925 * (1 - mixFactor) + 0.133 * mixFactor;
      colors[i3 + 1] = 0.282 * (1 - mixFactor) + 0.827 * mixFactor;
      colors[i3 + 2] = 0.6 * (1 - mixFactor) + 0.933 * mixFactor;
    }
    
    return [positions, colors];
  }, [count]);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function Galaxy3D() {
  return <GalaxyPoints />;
} 