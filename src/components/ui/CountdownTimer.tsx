import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const CountdownTimer = ({ targetDate, onComplete }: { targetDate: string, onComplete?: () => void }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false
        });
      } else {
        setTimeLeft(prev => ({ ...prev, isExpired: true }));
        if (onComplete) onComplete();
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest mb-6 text-center drop-shadow-[0_0_8px_rgba(231,29,54,0.8)]">
        Event Starts In
      </h3>
      <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-8 justify-center">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative">
              <motion.div
                animate={{ 
                  opacity: [0.85, 1, 0.85],
                  textShadow: [
                    "0 0 10px rgba(231, 29, 54, 0.4)",
                    "0 0 20px rgba(231, 29, 54, 0.8)",
                    "0 0 10px rgba(231, 29, 54, 0.4)"
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className={`text-4xl sm:text-5xl md:text-7xl px-3 sm:px-4 md:px-6 py-3 md:py-4 rounded-xl digital-clock text-white font-mono font-bold bg-black/50 border border-hawkins-red/20 backdrop-blur-sm shadow-[0_0_15px_rgba(231,29,54,0.15)] ${
                  timeLeft.isExpired ? 'text-hawkins-red animate-pulse' : ''
                }`}
              >
                {item.value.toString().padStart(2, '0')}
              </motion.div>
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-hawkins-red mt-3 font-bold">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
