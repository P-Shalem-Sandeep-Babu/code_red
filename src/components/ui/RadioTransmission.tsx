import React from 'react';
import { motion } from 'motion/react';
import { Radio } from 'lucide-react';

export const RadioTransmission = ({ isUpsideDown }: { isUpsideDown: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`max-w-2xl mx-auto mt-12 p-6 border-l-4 relative overflow-hidden transition-all duration-1000 ${
      isUpsideDown 
        ? 'bg-red-950/20 border-hawkins-red text-red-100' 
        : 'bg-blue-50 border-electric-blue text-gray-700'
    }`}
  >
    <div className="absolute top-2 right-2 flex gap-1">
      <div className={`w-2 h-2 rounded-full animate-pulse ${isUpsideDown ? 'bg-hawkins-red' : 'bg-electric-blue'}`} />
      <span className="text-[8px] font-mono opacity-50 uppercase tracking-tighter">LIVE SIGNAL</span>
    </div>
    <Radio className={`mb-4 ${isUpsideDown ? 'text-hawkins-red' : 'text-electric-blue'}`} size={24} />
    <p className="font-mono text-sm leading-relaxed italic">
      {isUpsideDown ? (
        "\"Listen up! This is Dustin. We’ve got a massive energy spike at Geethanjali College. The magnetic fields are going haywire and the compasses are spinning. The gate... it’s opening. If you can hear this, get to the lab. We need every mind we can get. Code Red. I repeat, Code Red!\""
      ) : (
        "\"Attention students: Bhaswara 2026 is officially underway. Please report to the main campus for technical briefings and project demonstrations. The future of innovation starts here. Stay curious, stay technical.\""
      )}
    </p>
    <div className="mt-4 flex items-center gap-2">
      <div className={`h-1 flex-1 bg-current opacity-10`} />
      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
        {isUpsideDown ? 'SENDER: D. HENDERSON' : 'SENDER: CAMPUS ADMIN'}
      </span>
    </div>
  </motion.div>
);
