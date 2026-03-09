import React, { memo } from 'react';
import { motion } from 'motion/react';
import { QrCode, Instagram, Twitter, Facebook, Youtube, Github } from 'lucide-react';

export const Footer = memo(({ isUpsideDown }: { isUpsideDown: boolean }) => (
  <footer className="py-16 md:py-24 px-6 md:px-8 border-t border-red-900/30 bg-black">
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="max-w-xs w-full mb-12">
        <div className={`p-8 overhead-projection transition-all duration-1000 ${
          isUpsideDown ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
        }`}>
          <div className="relative group">
            <div className="absolute -inset-4 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className={`aspect-square flex items-center justify-center border-4 border-dashed relative z-10 ${
              isUpsideDown ? 'border-hawkins-red/40' : 'border-electric-blue/40'
            }`}>
              <QrCode size={120} className={isUpsideDown ? 'text-hawkins-red chromatic-aberration' : 'text-electric-blue'} />
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-current" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-current" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-current" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-current" />
            </div>
          </div>
          <p className={`mt-6 text-[10px] font-bold uppercase tracking-widest typewriter-font ${
            isUpsideDown ? 'text-hawkins-red' : 'text-gray-500'
          }`}>
            {isUpsideDown ? 'SCAN FOR CLEARANCE' : 'SCAN TO REGISTER'}
          </p>
        </div>
      </div>
      
      <div className="relative mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-display text-white tracking-widest mb-2 reality-glitch">FRIENDS DON'T LIE</h2>
        <div className="flex justify-center gap-2 mb-8">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
                boxShadow: ["0 0 0px #fff", "0 0 10px #fff", "0 0 0px #fff"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className={`w-3 h-3 rounded-full ${['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][i % 4]}`}
            />
          ))}
        </div>
        
        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-8">
          {[
            { icon: Instagram, label: 'Instagram' },
            { icon: Twitter, label: 'Twitter' },
            { icon: Facebook, label: 'Facebook' },
            { icon: Youtube, label: 'Youtube' },
            { icon: Github, label: 'Github' }
          ].map((social, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ 
                scale: 1.2,
                color: "#E71D36",
                filter: "drop-shadow(0 0 8px #E71D36)"
              }}
              className="text-gray-500 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </div>
      </div>

      <p className="text-gray-600 text-xs uppercase tracking-[0.4em] font-sans">
        &copy; 2026 BHASWARA - CODE RED | GEETHANJALI COLLEGE
      </p>
    </div>
  </footer>
));
