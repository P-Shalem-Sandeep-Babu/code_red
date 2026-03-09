import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Radio, Lightbulb, Compass } from 'lucide-react';

export const TechElement: React.FC<{ isUpsideDown: boolean }> = ({ isUpsideDown }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const Icon = [Zap, Radio, Lightbulb, Compass][Math.floor(Math.random() * 4)];

  useEffect(() => {
    setStyle({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    });
  }, []);

  return (
    <motion.div
      animate={{ 
        y: [0, -30, 0],
        rotate: [0, 10, -10, 0],
        opacity: isUpsideDown ? 0 : [0.1, 0.3, 0.1]
      }}
      transition={{ 
        duration: 5 + Math.random() * 5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute pointer-events-none z-0"
      style={style}
    >
      <Icon size={Math.random() * 40 + 20} className="text-electric-blue/40" />
    </motion.div>
  );
};
