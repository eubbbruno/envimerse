'use client';

import { useState, useEffect } from 'react';

export default function GalaxyCSS() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Gerar valores determinísticos para evitar problemas de hidratação
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      // Usar valores determinísticos baseados no índice
      const x = ((i * 127) % 100);
      const y = ((i * 179) % 100);
      const size = (i % 3) + 1;
      const duration = 20 + ((i % 30));
      const delay = (i % 20);
      
      stars.push({
        key: i,
        x: `${x}%`,
        y: `${y}%`,
        size: `${size}px`,
        duration: `${duration}s`,
        delay: `${delay}s`
      });
    }
    return stars;
  };

  if (!mounted) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-purple-900/20 via-black to-cyan-900/20" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="galaxy-container">
        {generateStars().map((star) => (
          <div
            key={star.key}
            className="star"
            style={{
              '--x': star.x,
              '--y': star.y,
              '--size': star.size,
              '--duration': star.duration,
              '--delay': star.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <style jsx>{`
        .galaxy-container {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, #1a0033 0%, #000 100%);
        }
        .star {
          position: absolute;
          left: var(--x);
          top: var(--y);
          width: var(--size);
          height: var(--size);
          background: white;
          border-radius: 50%;
          animation: twinkle var(--duration) var(--delay) infinite;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
} 