import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Zap, Users } from 'lucide-react';
import { CountdownTimer } from '../ui/CountdownTimer';
import { EventDetailCard } from '../ui/EventDetailCard';

export const ScheduleSection = memo(({ isUpsideDown, handleCountdownComplete }: { isUpsideDown: boolean, handleCountdownComplete: () => void }) => {
  return (
    <section id="schedule" className={`scroll-mt-20 py-16 md:py-24 relative z-20 border-b transition-colors duration-1000 ${
      isUpsideDown ? 'bg-void-black border-white/5' : 'bg-white border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h5 className={`text-[10px] uppercase tracking-[0.4em] mb-6 font-bold transition-colors duration-1000 ${
              isUpsideDown ? 'text-hawkins-red' : 'text-electric-blue'
            }`}>Time Remaining Until The Rift Opens</h5>
            <CountdownTimer 
              targetDate="2026-03-17T00:00:00" 
              onComplete={handleCountdownComplete}
            />
          </motion.div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <EventDetailCard 
              label="Participation Fee" 
              value="50 /- per person" 
              icon={Zap} 
            />
            <EventDetailCard 
              label="Team Size" 
              value="3 - 4 Members" 
              icon={Users} 
            />
          </div>
        </div>
      </div>
    </section>
  );
});
