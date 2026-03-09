import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Mic } from 'lucide-react';
import { playSound } from '../../utils/audio';
import { ParticleWrapper } from './ParticleWrapper';

export const AmbientPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleMute = () => {
    if (isMuted) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Create a low-frequency synth drone
        const osc1 = audioCtxRef.current.createOscillator();
        const osc2 = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        const filter = audioCtxRef.current.createBiquadFilter();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(55, audioCtxRef.current.currentTime); // A1

        osc2.type = 'square';
        osc2.frequency.setValueAtTime(55.5, audioCtxRef.current.currentTime); // Slight detune

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, audioCtxRef.current.currentTime);
        filter.Q.setValueAtTime(10, audioCtxRef.current.currentTime);

        gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, audioCtxRef.current.currentTime + 2);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc1.start();
        osc2.start();

        oscillatorRef.current = osc1; // Just keep one for reference
        gainNodeRef.current = gain;
      } else {
        gainNodeRef.current?.gain.linearRampToValueAtTime(0.1, audioCtxRef.current.currentTime + 1);
      }
      setIsMuted(false);
      playSound('beep');
    } else {
      gainNodeRef.current?.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
      setIsMuted(true);
      playSound('click');
    }
  };

  return (
    <ParticleWrapper color="#E71D36" count={15} className="fixed bottom-8 left-8 z-50">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMute}
      className="p-4 bg-black/80 border border-hawkins-red/30 rounded-full shadow-[0_0_20px_rgba(231,29,54,0.2)] group"
    >
      <div className="relative">
        <Mic size={24} className={`${isMuted ? 'text-gray-500' : 'text-hawkins-red'} transition-colors`} />
        {!isMuted && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-hawkins-red rounded-full"
          />
        )}
      </div>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-hawkins-red text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono border border-hawkins-red/30">
        {isMuted ? 'RADIO OFF' : 'RADIO ON'}
      </div>
    </motion.button>
    </ParticleWrapper>
  );
};
