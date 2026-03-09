import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSctOgiyaPlKwzO0uRs4-3oXiGiUdD2hgwcUv8xzeu54Rb9WVg/viewform?usp=header";

export const RegistrationForm = ({ isUpsideDown }: { isUpsideDown: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={`max-w-3xl mx-auto mt-24 p-8 md:p-12 personnel-file transition-all duration-1000 relative ${
      isUpsideDown ? 'rotate-1' : 'rotate-0'
    }`}
  >
    <div className="dossier-tab" />
    <div className="flex justify-between items-start mb-12 border-b-2 border-black/20 pb-4">
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tighter uppercase typewriter-font text-left">Registration Dossier</span>
        <span className="text-[10px] uppercase opacity-60 typewriter-font text-left">Hawkins National Laboratory // Department of Energy</span>
      </div>
      <div className="px-3 py-1 border-2 border-red-600 text-red-600 font-bold uppercase -rotate-12 typewriter-font">
        Top Secret
      </div>
    </div>

    <div className="typewriter-font text-center py-12">
      <p className="text-base md:text-lg mb-8 text-gray-800 font-bold uppercase tracking-widest">
        Clearance Required for Bhaswara 2026 Participation
      </p>
      <p className="text-xs md:text-sm mb-12 text-gray-600 leading-relaxed max-w-md mx-auto">
        To ensure your entry into the lab and participation in the Code Red event, 
        you must complete the official registration form hosted on our secure external servers.
      </p>
      
      <motion.a
        href={REGISTRATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 md:gap-3 px-6 py-4 md:px-10 md:py-5 bg-red-700 text-white font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-red-800 transition-colors text-xs md:text-base text-center justify-center flex-wrap"
      >
        Access Registration Form <ArrowRight size={20} className="shrink-0" />
      </motion.a>
      
      <div className="mt-12 pt-8 border-t border-black/10 flex justify-between items-center opacity-40 grayscale">
        <div className="flex gap-4">
          <div className="w-12 h-12 border border-black flex items-center justify-center font-bold">DOE</div>
          <div className="w-12 h-12 border border-black flex items-center justify-center font-bold">HNL</div>
        </div>
        <div className="text-[8px] text-right">
          FORM ID: HNL-2026-CR<br />
          SUBJECT: MULTIDIMENSIONAL ANOMALY
        </div>
      </div>
    </div>
  </motion.div>
);
