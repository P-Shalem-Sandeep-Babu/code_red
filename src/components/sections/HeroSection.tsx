import React, { memo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { RadioTransmission } from '../ui/RadioTransmission';

const REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSctOgiyaPlKwzO0uRs4-3oXiGiUdD2hgwcUv8xzeu54Rb9WVg/viewform?usp=header";

export const HeroSection = memo(({ isUpsideDown, opacity, scale }: { isUpsideDown: boolean, opacity: any, scale: any }) => {
  return (
    <motion.section 
      style={{ opacity, scale }}
      className="min-h-screen flex flex-col md:flex-row relative overflow-hidden"
    >
      {/* Rift Effect */}
      <motion.div 
        animate={{ 
          opacity: isUpsideDown ? [0.4, 0.8, 0.4] : 0,
          scaleY: isUpsideDown ? [0.98, 1.02, 0.98] : 0.5
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="rift-effect hidden md:block"
      />
      {isUpsideDown && <div className="rift-glow hidden md:block" />}
      
      {/* Left Side: 1980s Retro Tech Lab */}
      <div className={`flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8 transition-colors duration-1000 ${
        isUpsideDown ? 'bg-black crt-screen' : 'bg-white'
      }`}>
        <div className={`absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center transition-opacity duration-1000 ${
          isUpsideDown ? 'bg-[url("https://picsum.photos/seed/lab/1920/1080?grayscale")]' : 'opacity-0'
        }`} />
        <div className="relative z-10 text-center">
          {/* Status box removed from here and moved to fixed HUD */}
        </div>
      </div>

      {/* Right Side: The Upside Down */}
      <div className={`flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8 border-l transition-all duration-1000 ${
        isUpsideDown ? 'bg-[#0a0505] border-hawkins-red/20' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className={`absolute inset-0 opacity-30 pointer-events-none bg-cover bg-center transition-opacity duration-1000 ${
          isUpsideDown ? 'bg-[url("https://picsum.photos/seed/void/1920/1080?blur=10")]' : 'opacity-0'
        }`} />
        
        {/* Red Lightning Effect */}
        {isUpsideDown && (
          <motion.div 
            animate={{ opacity: [0, 0.8, 0, 0.5, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
            className="absolute inset-0 bg-hawkins-red/10 pointer-events-none"
          />
        )}

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <h4 className={`font-serif italic tracking-[0.3em] uppercase mb-4 transition-colors duration-1000 ${
              isUpsideDown ? 'text-hawkins-red text-neon-red' : 'text-gray-400'
            }`}>
              {isUpsideDown ? 'The Rift Is Opening' : 'The Future Is Here'}
            </h4>
          </motion.div>
        </div>
      </div>

      {/* Center: Main Title Header */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full px-4 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-7xl tracking-tighter mb-4 pointer-events-auto transition-all duration-1000 ${
            isUpsideDown ? 'text-hawkins-red text-neon-red' : 'text-gray-900 font-black'
          }`}>
            BHASWARA 2026
          </h2>
          <h1 className={`text-5xl sm:text-7xl md:text-9xl font-display tracking-tighter flex flex-col items-center pointer-events-auto transition-all duration-1000 ${
            isUpsideDown ? 'reality-glitch' : 'text-electric-blue'
          }`}>
            {isUpsideDown ? (
              <div className="relative flex flex-col items-center">
                {/* Top Bar */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -top-4 w-[110%] h-2 bg-hawkins-red shadow-[0_0_15px_#E71D36]"
                />
                <span className="text-5xl sm:text-7xl md:text-[12rem] stranger-title animate-flicker relative">
                  CODE RED
                </span>
                {/* Bottom Bars */}
                <div className="absolute -bottom-2 w-full flex justify-between px-4">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="w-[40%] h-1 bg-hawkins-red shadow-[0_0_10px_#E71D36]"
                  />
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="w-[40%] h-1 bg-hawkins-red shadow-[0_0_10px_#E71D36]"
                  />
                </div>
              </div>
            ) : (
              <span className="text-5xl sm:text-7xl md:text-[12rem] tracking-widest">
                TECH FEST
              </span>
            )}
          </h1>
          
          <RadioTransmission isUpsideDown={isUpsideDown} />
          
          <div className="mt-12 pointer-events-auto">
            <motion.a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, boxShadow: isUpsideDown ? "0 0 40px #E71D36" : "0 0 40px rgba(0,212,255,0.5)" }}
              whileTap={{ scale: 0.9 }}
              className={`px-8 py-4 md:px-12 md:py-6 font-display text-xl md:text-3xl tracking-widest rounded-sm transition-all flex items-center justify-center gap-3 flex-wrap ${
                isUpsideDown 
                  ? 'bg-hawkins-red text-white border-neon-red shadow-[0_0_20px_#E71D36]' 
                  : 'bg-electric-blue text-white shadow-xl'
              }`}
            >
              REGISTER NOW <ArrowRight size={24} className="md:w-7 md:h-7 shrink-0" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});
