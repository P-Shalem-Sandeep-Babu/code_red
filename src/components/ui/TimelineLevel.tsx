import React from 'react';
import { motion } from 'motion/react';

export const TimelineLevel = ({ level, title, description, icon: Icon }: { level: number, title: string, description: string, icon: any }) => {
  return (
    <div className="relative flex gap-4 md:gap-8 mb-20 last:mb-0">
      {/* LED Indicator Column */}
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ backgroundColor: "#1a1a1a", boxShadow: "none" }}
          whileInView={{ 
            backgroundColor: "#E71D36", 
            boxShadow: "0 0 20px #E71D36, 0 0 40px #E71D36" 
          }}
          viewport={{ margin: "-100px" }}
          className="w-5 h-5 rounded-full border-2 border-black z-10 transition-all duration-500"
        />
        <div className="w-0.5 h-full bg-gradient-to-b from-hawkins-red/40 to-transparent -mt-1" />
      </div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1 pb-8"
      >
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="p-2 bg-hawkins-red/10 rounded-md border border-hawkins-red/20 shrink-0">
            <Icon size={20} className="text-hawkins-red" />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight">
            <span className="text-hawkins-red font-display mr-2 sm:mr-3 block sm:inline">LEVEL {level}</span>
            {title}
          </h3>
        </div>
        <p className="text-gray-400 font-crimson text-base sm:text-lg max-w-2xl leading-relaxed mt-2 sm:mt-0">
          {description}
        </p>
      </motion.div>
    </div>
  );
};
