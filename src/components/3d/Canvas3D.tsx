'use client';

import { useEffect, useState } from 'react';

interface Canvas3DProps {
  children: React.ReactNode;
  className?: string;
  camera?: any;
  style?: React.CSSProperties;
}

export default function Canvas3D({ children, className = '', camera, style }: Canvas3DProps) {
  const [Canvas, setCanvas] = useState<any>(null);

  useEffect(() => {
    // Importar Canvas apenas no cliente
    import('@react-three/fiber').then((module) => {
      setCanvas(() => module.Canvas);
    });
  }, []);

  if (!Canvas) {
    return <div className={`${className} bg-black`} style={style} />;
  }

  return (
    <Canvas className={className} camera={camera} style={style}>
      {children}
    </Canvas>
  );
} 