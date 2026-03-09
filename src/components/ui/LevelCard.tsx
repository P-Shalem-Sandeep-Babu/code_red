import React from 'react';
import { motion } from 'motion/react';

export const LevelCard = ({ level, title, description, icon: Icon }: { level: number, title: string, description: string, icon: any }) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -5 }}
    className="relative group p-8 border border-red-900/30 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={80} className="text-hawkins-red" />
    </div>
    <div className="relative z-10">
      <span className="text-hawkins-red font-display text-xl mb-2 block">LEVEL {level}</span>
      <h3 className="text-2xl font-serif font-bold mb-4 text-white reality-glitch transition-colors tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 font-crimson text-lg leading-relaxed">
        {description}
      </p>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hawkins-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);
