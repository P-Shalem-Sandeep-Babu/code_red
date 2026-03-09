import React from 'react';
import { motion } from 'motion/react';

export const SectionTitle = ({ children, subtitle, isUpsideDown }: { children: React.ReactNode, subtitle?: string, isUpsideDown?: boolean }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-display uppercase tracking-widest ${
        isUpsideDown ? 'text-hawkins-red reality-glitch' : 'text-gray-900'
      }`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`text-sm font-serif italic mt-2 ${isUpsideDown ? 'text-red-200' : 'text-gray-500'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "100px" }}
      viewport={{ once: true }}
      className={`h-px mx-auto mt-4 shadow-[0_0_10px_#E71D36] ${
        isUpsideDown ? 'bg-hawkins-red' : 'bg-gray-400'
      }`}
    />
  </div>
);
