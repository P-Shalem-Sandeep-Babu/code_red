import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const TVTransition = ({ isChanging }: { isChanging: boolean }) => {
  return (
    <AnimatePresence>
      {isChanging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
        >
          {/* TV Off Effect */}
          <motion.div
            initial={{ scaleX: 1, scaleY: 1, opacity: 1 }}
            animate={{ 
              scaleX: [1, 1, 0.01, 0],
              scaleY: [1, 0.005, 0.005, 0],
              opacity: [1, 1, 1, 0]
            }}
            transition={{ 
              duration: 0.8,
              times: [0, 0.4, 0.8, 1],
              ease: "easeInOut"
            }}
            className="w-full h-full bg-white"
          />
          {/* Static Flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.2, delay: 0.4 }}
            className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWUqnW9Fe/giphy.gif')] bg-repeat opacity-20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
