import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export const HoverParticles = ({ 
  isHovered, 
  color = '#E71D36',
  count = 15
}: { 
  isHovered: boolean;
  color?: string;
  count?: number;
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isHovered) {
      const newParticles = Array.from({ length: count }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 100, // -50 to 50
        y: (Math.random() - 0.5) * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 0.6 + 0.4
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered, count]);

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none z-0 flex items-center justify-center">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: Math.random() * 1.5 + 0.5,
              x: p.x, 
              y: p.y 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: color,
              boxShadow: `0 0 ${p.size * 2}px ${color}`
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
