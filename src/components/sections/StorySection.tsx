import React, { memo } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

export const StorySection = memo(({ isUpsideDown }: { isUpsideDown: boolean }) => {
  if (!isUpsideDown) return null;

  return (
    <section className="py-16 md:py-24 bg-void-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <div className="relative h-64 flex flex-col items-center justify-center border-2 border-dashed border-hawkins-red/10 rounded-3xl">
          <p className="text-gray-800 font-mono text-sm uppercase tracking-widest mb-4">
            [ SCANNING FOR HIDDEN DATA... ]
          </p>
          
          {/* Reveal Layer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center reveal-content pointer-events-none">
            <div className="p-8 bg-hawkins-red/5 rounded-2xl border border-hawkins-red/20">
              <ShieldAlert className="text-hawkins-red mb-4 mx-auto" size={48} />
              <h3 className="text-2xl font-display text-white mb-2">CLASSIFIED EVENT RULES</h3>
              <ul className="text-gray-300 font-mono text-sm space-y-2 text-left">
                <li>• DO NOT ENTER THE LAB WITHOUT CLEARANCE</li>
                <li>• ALL DATA TRANSMISSIONS ARE MONITORED</li>
                <li>• THE UPSIDE DOWN IS NOT A SIMULATION</li>
                <li>• TEAMWORK IS THE ONLY WAY TO SURVIVE</li>
              </ul>
              <div className="mt-6 flex items-center gap-2 text-hawkins-red font-bold animate-pulse">
                <Lock size={16} /> ENCRYPTED DATA DETECTED
              </div>
              <div className="mt-4 pt-4 border-t border-hawkins-red/20 text-[10px] text-gray-500 text-left">
                <p className="mb-1 font-bold">LAB LOG #404: TEXTURE GENERATION PROMPT</p>
                <p className="italic">"Hyper-realistic dark forest ground covered in thick, pulsing black vines, glowing red particles floating in the air, cinematic lighting, 80s synth-wave aesthetic."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
