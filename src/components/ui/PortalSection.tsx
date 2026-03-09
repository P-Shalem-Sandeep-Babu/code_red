import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

const REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSctOgiyaPlKwzO0uRs4-3oXiGiUdD2hgwcUv8xzeu54Rb9WVg/viewform?usp=header";

export const PortalSection = () => (
  <section className="py-32 px-4 relative overflow-hidden">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative inline-block"
      >
        {/* The Rift Effect */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
            boxShadow: [
              "0 0 40px rgba(231, 29, 54, 0.3)",
              "0 0 80px rgba(231, 29, 54, 0.6)",
              "0 0 40px rgba(231, 29, 54, 0.3)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-hawkins-red/20 blur-3xl rounded-full -z-10"
        />
        
        <div className="relative p-8 md:p-12 border-2 border-hawkins-red/30 rounded-full bg-black/40 backdrop-blur-md">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-hawkins-red/20 rounded-full"
          />
          
          <h2 className="text-4xl md:text-7xl font-display text-neon-red mb-6 animate-flicker">THE GATE IS OPEN</h2>
          <p className="text-lg md:text-xl font-serif italic text-red-200/70 mb-10">Access the official registration dossier via our secure portal.</p>
          
          <motion.a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, backgroundColor: "#E71D36", color: "#fff" }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 md:px-12 md:py-5 bg-transparent border-2 border-hawkins-red text-hawkins-red font-display text-xl md:text-3xl tracking-widest rounded-full transition-all hover:shadow-[0_0_30px_#E71D36] flex-wrap"
          >
            ENTER THE VOID <Zap size={24} className="md:w-7 md:h-7 shrink-0" />
          </motion.a>
        </div>
      </motion.div>
    </div>

    {/* Decorative Rift Particles */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, (Math.random() - 0.5) * 400],
            y: [0, (Math.random() - 0.5) * 400],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 4, 
            repeat: Infinity, 
            delay: i * 0.5 
          }}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-hawkins-red rounded-full blur-sm"
        />
      ))}
    </div>
  </section>
);
