import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';
import { ParticleWrapper } from './ParticleWrapper';

export const CoordinatorCard = ({ name, phone, role, isUpsideDown }: { name: string, phone: string, role: string, isUpsideDown: boolean }) => (
  <motion.div
    whileHover={{ y: -5, rotate: isUpsideDown ? -1 : 1 }}
    className={`p-6 personnel-file transition-all duration-500 text-left ${
      isUpsideDown ? 'grayscale hover:grayscale-0' : ''
    }`}
  >
    <div className="flex items-start gap-4">
      <div className="w-16 h-20 bg-black/10 border border-black/20 flex items-center justify-center relative overflow-hidden shrink-0">
        <User size={32} className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="flex-1 typewriter-font overflow-hidden">
        <h4 className="text-sm font-bold uppercase leading-tight mb-1 truncate">{name}</h4>
        <p className="text-[8px] uppercase opacity-70 mb-1">{role}</p>
        <ParticleWrapper color="#E71D36" count={5}>
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-[8px] font-bold mb-3 block hover:text-red-600 transition-colors">{phone}</a>
        </ParticleWrapper>
        <div className="h-[1px] w-full bg-black/10 mb-2" />
        <div className="flex gap-2 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span className="text-[7px] uppercase tracking-tighter">Active Duty</span>
        </div>
      </div>
    </div>
  </motion.div>
);
