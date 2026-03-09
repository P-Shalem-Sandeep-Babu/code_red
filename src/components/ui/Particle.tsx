import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'motion/react';

export const Particle: React.FC = memo(() => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const size = useRef(Math.random() * 5 + 2);
  const color = useRef(Math.random() > 0.8 ? 'rgba(231, 29, 54, 0.5)' : 'rgba(255, 255, 255, 0.3)');

  useEffect(() => {
    setStyle({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${size.current}px`,
      height: `${size.current}px`,
      backgroundColor: color.current,
      filter: `blur(${size.current / 2}px)`,
      boxShadow: color.current.includes('231') ? '0 0 10px rgba(231, 29, 54, 0.4)' : 'none',
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        y: [0, -300],
        x: [0, (Math.random() - 0.5) * 150],
        rotate: [0, 720],
        scale: [0, 1, 0]
      }}
      transition={{ 
        duration: 10 + Math.random() * 20, 
        repeat: Infinity,
        ease: "linear",
        delay: Math.random() * 20
      }}
      className="absolute rounded-full pointer-events-none z-10"
      style={style}
    />
  );
});
