import React, { useState, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Skull, Ghost, Radio } from 'lucide-react';
import { playSound } from '../utils/audio';

import { AmbientPlayer } from '../components/ui/AmbientPlayer';
import { TVTransition } from '../components/ui/TVTransition';
import { DimensionToggle } from '../components/ui/DimensionToggle';
import { Flashlight } from '../components/ui/Flashlight';
import { Particle } from '../components/ui/Particle';

// Lazy load heavy components
const Vines = lazy(() => import('../components/ui/Vines').then(m => ({ default: m.Vines })));
const HeroSection = lazy(() => import('../components/sections/HeroSection').then(m => ({ default: m.HeroSection })));
const ScheduleSection = lazy(() => import('../components/sections/ScheduleSection').then(m => ({ default: m.ScheduleSection })));
const StorySection = lazy(() => import('../components/sections/StorySection').then(m => ({ default: m.StorySection })));
const LevelsSection = lazy(() => import('../components/sections/LevelsSection').then(m => ({ default: m.LevelsSection })));
const PrizesSection = lazy(() => import('../components/sections/PrizesSection').then(m => ({ default: m.PrizesSection })));
const PortalSection = lazy(() => import('../components/ui/PortalSection').then(m => ({ default: m.PortalSection })));
const RegistrationSection = lazy(() => import('../components/sections/RegistrationSection').then(m => ({ default: m.RegistrationSection })));
const CoordinatorsSection = lazy(() => import('../components/sections/CoordinatorsSection').then(m => ({ default: m.CoordinatorsSection })));
const Footer = lazy(() => import('../components/sections/Footer').then(m => ({ default: m.Footer })));

export const Home = () => {
  const [isUpsideDown, setIsUpsideDown] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles] = useState(() => Array.from({ length: 40 }, (_, i) => i)); // Reduced particle count for performance
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const toggleDimension = useCallback(() => {
    setIsTransitioning(true);
    playSound('static');
    setTimeout(() => {
      setIsUpsideDown(prev => !prev);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }, 400);
  }, []);
  
  const handleCountdownComplete = useCallback(() => {
    setIsShaking(true);
  }, []);

  return (
    <div className={`min-h-screen relative font-mono selection:bg-hawkins-red selection:text-white cursor-none dimension-transition ${
      isUpsideDown ? 'bg-void-black text-white' : 'bg-gray-50 text-gray-900'
    } ${isShaking ? 'animate-shake' : ''}`}>
      <TVTransition isChanging={isTransitioning} />
      <AmbientPlayer />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md border-b transition-colors duration-1000 ${
        isUpsideDown ? 'bg-black/80 border-red-900/30' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="flex items-center gap-2 group cursor-pointer" onMouseEnter={() => playSound('beep')}>
          <div className="relative">
            <Radio className={isUpsideDown ? 'text-hawkins-red' : 'text-gray-900'} />
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute -inset-1 rounded-full blur-sm ${isUpsideDown ? 'bg-hawkins-red/20' : 'bg-gray-900/10'}`}
            />
          </div>
          <span className="font-display text-xl tracking-tighter uppercase">Bhaswara '26</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Events', 'Schedule', 'Prizes', 'Team'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onMouseEnter={() => playSound('click')}
              className={`text-xs uppercase tracking-[0.3em] font-bold transition-all hover:tracking-[0.5em] ${
                isUpsideDown ? 'text-gray-400 hover:text-hawkins-red' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      <Flashlight />
      <DimensionToggle isUpsideDown={isUpsideDown} onToggle={toggleDimension} />
      <Suspense fallback={null}>
        <Vines active={isUpsideDown} />
      </Suspense>
      <div className={`grain-overlay transition-opacity duration-1000 ${isUpsideDown ? 'opacity-10' : 'opacity-0'}`} />
      
      {/* Background Atmosphere */}
      <AnimatePresence>
        {isUpsideDown && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
          >
            <motion.div 
              animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-upside-down" 
            />
            <div className="absolute inset-0 upside-down-atmosphere" />
            <div className="absolute inset-0 bg-vignette opacity-90" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30" />
            {particles.map((id) => (
              <Particle key={id} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <HeroSection isUpsideDown={isUpsideDown} opacity={opacity} scale={scale} />
          <ScheduleSection isUpsideDown={isUpsideDown} handleCountdownComplete={handleCountdownComplete} />
          <StorySection isUpsideDown={isUpsideDown} />
          <LevelsSection isUpsideDown={isUpsideDown} />
          <PrizesSection isUpsideDown={isUpsideDown} />
          <PortalSection />
          <RegistrationSection isUpsideDown={isUpsideDown} />
          <CoordinatorsSection isUpsideDown={isUpsideDown} />
          <Footer isUpsideDown={isUpsideDown} />
        </Suspense>
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 right-0 p-8 opacity-10 pointer-events-none z-0">
        <Skull size={300} className="text-red-900" />
      </div>
      <div className="fixed top-0 left-0 p-8 opacity-10 pointer-events-none z-0">
        <Ghost size={300} className="text-red-900" />
      </div>
    </div>
  );
};
