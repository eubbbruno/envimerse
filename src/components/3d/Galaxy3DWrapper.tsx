'use client';

import { useEffect, useState } from 'react';
import Canvas3D from './Canvas3D';
import Galaxy3D from '../Galaxy3D';

interface Galaxy3DWrapperProps {
  className?: string;
}

export default function Galaxy3DWrapper({ className = '' }: Galaxy3DWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`absolute inset-0 -z-10 ${className} bg-black`}>
        {/* Placeholder enquanto carrega */}
        <div className="w-full h-full bg-gradient-to-b from-magenta-900/20 to-cyan-900/20" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas3D camera={{ position: [0, 2, 8], fov: 75 }}>
        <Galaxy3D />
      </Canvas3D>
    </div>
  );
} 