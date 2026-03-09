import React from 'react';
import { motion } from 'motion/react';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import { ParticleWrapper } from './ParticleWrapper';

export const DimensionToggle = ({ isUpsideDown, onToggle }: { isUpsideDown: boolean, onToggle: () => void }) => (
  <ParticleWrapper color={isUpsideDown ? '#E71D36' : '#00D4FF'} count={10} className="fixed bottom-6 left-6 z-[60]">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onToggle}
    className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-500 ${
      isUpsideDown 
        ? 'bg-hawkins-red/80 border-neon-red text-white shadow-[0_0_10px_#E71D36]' 
        : 'bg-white/80 border-electric-blue text-electric-blue shadow-[0_0_10px_rgba(0,212,255,0.2)]'
    } backdrop-blur-sm`}
  >
    <span className="font-display text-[10px] font-bold tracking-widest uppercase">
      {isUpsideDown ? 'CODE RED' : 'TECH FEST'}
    </span>
    {isUpsideDown ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
  </motion.button>
  </ParticleWrapper>
);
