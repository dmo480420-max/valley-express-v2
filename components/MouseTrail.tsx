'use client';

import { useEffect, useState } from 'react';

export default function MouseTrail() {
  const [dots, setDots] = useState<{ x: number, y: number, id: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newDot = { x: e.clientX, y: e.clientY, id: Date.now() };
      setDots((prev) => [...prev.slice(-15), newDot]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {dots.map((dot, index) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-[#FFC627] blur-[1px]"
          style={{
            left: dot.x,
            top: dot.y,
            width: `${(index + 1) * 2}px`,
            height: `${(index + 1) * 2}px`,
            opacity: (index / 15) * 0.6,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.15s ease-out'
          }}

        />
      ))}
    </div>
  );
}
