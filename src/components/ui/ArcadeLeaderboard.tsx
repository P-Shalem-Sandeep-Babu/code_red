import React from 'react';
import { motion } from 'motion/react';

export const ArcadeLeaderboard = () => (
  <div className="bg-black border-4 border-gray-800 p-8 font-mono relative overflow-hidden rounded-lg shadow-2xl">
    {/* CRT Scanline effect */}
    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_3px,4px_100%]" />
    
    <div className="relative z-20">
      <div className="flex justify-between items-center mb-10 border-b-2 border-dashed border-gray-800 pb-4">
        <h3 className="text-xl sm:text-2xl text-yellow-400 tracking-[0.3em] font-bold">HIGH SCORES</h3>
        <div className="text-[10px] sm:text-xs text-gray-500">CREDITS: 00</div>
      </div>
      
      <div className="space-y-8">
        <motion.div 
          whileHover={{ x: 10 }}
          className="flex justify-between items-center group cursor-default"
        >
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-pink-500 font-bold text-lg sm:text-xl">1ST</span>
            <span className="text-white group-hover:text-pink-400 transition-colors text-sm sm:text-base">ULTIMATE SURVIVOR</span>
          </div>
          <span className="text-yellow-400 text-xl sm:text-2xl font-bold shadow-yellow-400/20 drop-shadow-md">1800 /-</span>
        </motion.div>
        
        <motion.div 
          whileHover={{ x: 10 }}
          className="flex justify-between items-center group cursor-default"
        >
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-blue-400 font-bold text-lg sm:text-xl">2ND</span>
            <span className="text-white group-hover:text-blue-300 transition-colors text-sm sm:text-base">BRAVE RUNNER</span>
          </div>
          <span className="text-pink-500 text-xl sm:text-2xl font-bold shadow-pink-500/20 drop-shadow-md">1200 /-</span>
        </motion.div>
        
        <div className="flex justify-between items-center opacity-30">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-gray-500 font-bold text-lg sm:text-xl">3RD</span>
            <span className="text-gray-400 text-sm sm:text-base">SHADOW WALKER</span>
          </div>
          <span className="text-gray-400 text-xl sm:text-2xl font-bold">800 /-</span>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-gray-900 text-center">
        <div className="text-[10px] text-hawkins-red tracking-[0.5em] animate-pulse font-bold">
          INSERT COIN TO CONTINUE
        </div>
      </div>
    </div>
  </div>
);
