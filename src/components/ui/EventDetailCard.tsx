import React from 'react';
import { motion } from 'motion/react';

export const EventDetailCard = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative p-6 bg-black/40 backdrop-blur-xl border border-hawkins-red/30 rounded-xl shadow-[0_0_15px_rgba(231,29,54,0.1)] overflow-hidden group"
  >
    {/* Top Secret Stamp */}
    <div className="absolute -top-1 -right-1 rotate-12 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none z-20">
      <div className="border-2 border-hawkins-red px-2 py-0.5 rounded text-[8px] font-bold text-hawkins-red uppercase tracking-tighter">
        TOP SECRET
      </div>
    </div>
    
    <div className="flex items-center gap-4 relative z-10">
      <div className="p-3 bg-hawkins-red/10 rounded-lg border border-hawkins-red/20">
        <Icon className="text-hawkins-red" size={20} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-sans mb-0.5">{label}</p>
        <p className="text-lg font-display text-white">{value}</p>
      </div>
    </div>
    
    {/* Subtle Glow Border Animation */}
    <motion.div 
      animate={{ opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute inset-0 border border-hawkins-red/20 rounded-xl pointer-events-none"
    />
  </motion.div>
);
