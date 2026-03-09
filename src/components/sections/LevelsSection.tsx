import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Compass, EyeOff, Lightbulb } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { TimelineLevel } from '../ui/TimelineLevel';

export const LevelsSection = memo(({ isUpsideDown }: { isUpsideDown: boolean }) => {
  return (
    <section id="events" className={`scroll-mt-20 py-16 md:py-24 px-6 md:px-8 max-w-7xl mx-auto transition-colors duration-1000 ${isUpsideDown ? '' : 'bg-white'}`}>
      <SectionTitle isUpsideDown={isUpsideDown} subtitle={isUpsideDown ? "Survive the challenges of the Upside Down" : "Master the skills of the future"}>
        THE CHALLENGE LEVELS
      </SectionTitle>
      <div className="mt-20 max-w-4xl mx-auto">
        <TimelineLevel 
          level={1} 
          title="Compass Glitch" 
          description="Navigate through magnetic anomalies where your tools betray you. Find the true north before the shadows close in."
          icon={Compass}
        />
        <TimelineLevel 
          level={2} 
          title="Blindfold Retrieval" 
          description="Trust your senses and your team. Retrieve the artifacts from the void while your vision is clouded by the mist."
          icon={EyeOff}
        />
        <TimelineLevel 
          level={3} 
          title="The Light Search" 
          description="Decode the messages hidden in the flickering lights. Every blink is a letter, every shadow is a warning."
          icon={Lightbulb}
        />
      </div>
    </section>
  );
});
