/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Calendar, 
  Users, 
  Trophy, 
  MapPin, 
  Zap, 
  Skull, 
  Ghost, 
  Radio, 
  Lightbulb, 
  Compass, 
  EyeOff, 
  Phone,
  User,
  ArrowRight,
  QrCode,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Github,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  Lock,
  Volume2,
  VolumeX,
  Mic
} from 'lucide-react';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { ParticleWrapper } from './components/ui/ParticleWrapper';

const REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSctOgiyaPlKwzO0uRs4-3oXiGiUdD2hgwcUv8xzeu54Rb9WVg/viewform?usp=header";

// --- Audio Utilities ---

const playSound = (type: 'click' | 'beep' | 'static' | 'hum' | 'glitch') => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;

  switch (type) {
    case 'click':
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
      break;
    case 'beep':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
    case 'static':
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.05, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.1);
      break;
    case 'hum':
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
      break;
    case 'glitch':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.setValueAtTime(800, now + 0.05);
      osc.frequency.setValueAtTime(400, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
      break;
  }
};

const AmbientPlayer = () => {
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
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMute}
      className="fixed bottom-8 left-8 z-50 p-4 bg-black/80 border border-hawkins-red/30 rounded-full shadow-[0_0_20px_rgba(231,29,54,0.2)] group"
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
  );
};

const TVTransition = ({ isChanging }: { isChanging: boolean }) => {
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

// --- Components ---

const Vines = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const vines: any[] = [];

    class Vine {
      x: number;
      y: number;
      angle: number;
      width: number;
      color: string;
      length: number;
      maxLength: number;

      constructor(x: number, y: number, angle: number) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.width = 2 + Math.random() * 3;
        this.color = '#1a0505';
        this.length = 0;
        this.maxLength = 100 + Math.random() * 200;
      }

      update() {
        if (this.length >= this.maxLength) return false;

        const nextX = this.x + Math.cos(this.angle) * 2;
        const nextY = this.y + Math.sin(this.angle) * 2;

        ctx!.beginPath();
        ctx!.strokeStyle = this.color;
        ctx!.lineWidth = this.width;
        ctx!.lineCap = 'round';
        ctx!.moveTo(this.x, this.y);
        ctx!.lineTo(nextX, nextY);
        ctx!.stroke();

        this.x = nextX;
        this.y = nextY;
        this.angle += (Math.random() - 0.5) * 0.2;
        this.width *= 0.99;
        this.length += 2;

        if (Math.random() > 0.98 && vines.length < 50) {
          vines.push(new Vine(this.x, this.y, this.angle + (Math.random() - 0.5) * 1));
        }

        return true;
      }
    }

    // Start from corners
    vines.push(new Vine(0, 0, Math.PI / 4));
    vines.push(new Vine(canvas.width, 0, (3 * Math.PI) / 4));
    vines.push(new Vine(0, canvas.height, -Math.PI / 4));
    vines.push(new Vine(canvas.width, canvas.height, (-3 * Math.PI) / 4));

    let animationId: number;
    const animate = () => {
      let growing = false;
      vines.forEach(vine => {
        if (vine.update()) growing = true;
      });
      if (growing) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [active]);

  return <canvas ref={canvasRef} className={`vine-canvas transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`} />;
};

const DimensionToggle = ({ isUpsideDown, onToggle }: { isUpsideDown: boolean, onToggle: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onToggle}
    className={`fixed bottom-6 left-6 z-[60] flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-500 ${
      isUpsideDown 
        ? 'bg-hawkins-red/80 border-neon-red text-white shadow-[0_0_10px_#E71D36]' 
        : 'bg-white/80 border-electric-blue text-electric-blue shadow-[0_0_10px_rgba(0,212,255,0.2)]'
    } backdrop-blur-sm`}
  >
    <span className="font-display text-[10px] font-bold tracking-widest uppercase">
      {isUpsideDown ? 'CODE RED' : 'TECH FEST'}
    </span>
    {isUpsideDown ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
  </motion.button>
);

const Flashlight = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="flashlight" 
      style={{ '--x': `${mousePos.x}px`, '--y': `${mousePos.y}px` } as any} 
    />
  );
};

const TechElement: React.FC<{ isUpsideDown: boolean }> = ({ isUpsideDown }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const Icon = [Zap, Radio, Lightbulb, Compass][Math.floor(Math.random() * 4)];

  useEffect(() => {
    setStyle({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    });
  }, []);

  return (
    <motion.div
      animate={{ 
        y: [0, -30, 0],
        rotate: [0, 10, -10, 0],
        opacity: isUpsideDown ? 0 : [0.1, 0.3, 0.1]
      }}
      transition={{ 
        duration: 5 + Math.random() * 5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute pointer-events-none z-0"
      style={style}
    >
      <Icon size={Math.random() * 40 + 20} className="text-electric-blue/40" />
    </motion.div>
  );
};

const Particle: React.FC = () => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const size = useRef(Math.random() * 5 + 2);
  const color = useRef(Math.random() > 0.8 ? 'rgba(231, 29, 54, 0.5)' : 'rgba(255, 255, 255, 0.3)');

  useEffect(() => {
    setStyle({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${size.current}px`,
      height: `${size.current}px`,
      backgroundColor: color.current,
      filter: `blur(${size.current / 2}px)`,
      boxShadow: color.current.includes('231') ? '0 0 10px rgba(231, 29, 54, 0.4)' : 'none',
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        y: [0, -300],
        x: [0, (Math.random() - 0.5) * 150],
        rotate: [0, 720],
        scale: [0, 1.5, 0]
      }}
      transition={{ 
        duration: 15 + Math.random() * 15, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="upside-down-particle"
      style={style}
    />
  );
};

const EventDetailCard = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative p-6 bg-black/40 backdrop-blur-xl border border-hawkins-red/30 rounded-xl shadow-[0_0_15px_rgba(231,29,54,0.1)] overflow-hidden group"
  >
    {/* Top Secret Stamp */}
    <div className="absolute -top-1 -right-1 rotate-12 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none z-20">
      <div className="border-2 border-hawkins-red px-2 py-0.5 rounded text-[8px] font-bold text-hawkins-red uppercase tracking-tighter">
        TOP SECRET
      </div>
    </div>
    
    <div className="flex items-center gap-4 relative z-10">
      <div className="p-3 bg-hawkins-red/10 rounded-lg border border-hawkins-red/20">
        <Icon className="text-hawkins-red" size={20} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-sans mb-0.5">{label}</p>
        <p className="text-lg font-display text-white">{value}</p>
      </div>
    </div>
    
    {/* Subtle Glow Border Animation */}
    <motion.div 
      animate={{ opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute inset-0 border border-hawkins-red/20 rounded-xl pointer-events-none"
    />
  </motion.div>
);

const TimelineLevel = ({ level, title, description, icon: Icon }: { level: number, title: string, description: string, icon: any }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative flex gap-4 md:gap-8 mb-20 last:mb-0">
      {/* LED Indicator Column */}
      <div className="flex flex-col items-center">
        <motion.div 
          variants={{
            hidden: { backgroundColor: "#1a1a1a", boxShadow: "none" },
            visible: { 
              backgroundColor: "#E71D36", 
              boxShadow: "0 0 20px #E71D36, 0 0 40px #E71D36",
              transition: { duration: 0.5 }
            }
          }}
          className="w-5 h-5 rounded-full border-2 border-black z-10 transition-all duration-500"
        />
        <div className="w-0.5 h-full bg-gradient-to-b from-hawkins-red/40 to-transparent -mt-1" />
      </div>
      
      {/* Content */}
      <motion.div 
        variants={itemVariants}
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

const ArcadeLeaderboard = () => (
  <div className="bg-black border-4 border-gray-800 p-8 font-mono relative overflow-hidden rounded-lg shadow-2xl">
    {/* CRT Scanline effect */}
    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_3px,4px_100%]" />
    
    <div className="relative z-20">
      <div className="flex justify-between items-center mb-10 border-b-2 border-dashed border-gray-800 pb-4">
        <h3 className="text-xl sm:text-2xl text-yellow-400 tracking-[0.3em] font-bold">HIGH SCORES</h3>
        <div className="text-[10px] sm:text-xs text-gray-500">CREDITS: 00</div>
      </div>
      
      <div className="space-y-8">
        <motion.div 
          whileHover={{ x: 10 }}
          className="flex justify-between items-center group cursor-default"
        >
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-pink-500 font-bold text-lg sm:text-xl">1ST</span>
            <span className="text-white group-hover:text-pink-400 transition-colors text-sm sm:text-base">ULTIMATE SURVIVOR</span>
          </div>
          <span className="text-yellow-400 text-xl sm:text-2xl font-bold shadow-yellow-400/20 drop-shadow-md">1800 /-</span>
        </motion.div>
        
        <motion.div 
          whileHover={{ x: 10 }}
          className="flex justify-between items-center group cursor-default"
        >
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-blue-400 font-bold text-lg sm:text-xl">2ND</span>
            <span className="text-white group-hover:text-blue-300 transition-colors text-sm sm:text-base">BRAVE RUNNER</span>
          </div>
          <span className="text-pink-500 text-xl sm:text-2xl font-bold shadow-pink-500/20 drop-shadow-md">1200 /-</span>
        </motion.div>
        
        <div className="flex justify-between items-center opacity-30">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-gray-500 font-bold text-lg sm:text-xl">3RD</span>
            <span className="text-gray-400 text-sm sm:text-base">SHADOW WALKER</span>
          </div>
          <span className="text-gray-400 text-xl sm:text-2xl font-bold">800 /-</span>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-gray-900 text-center">
        <div className="text-[10px] text-hawkins-red tracking-[0.5em] animate-pulse font-bold">
          INSERT COIN TO CONTINUE
        </div>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ children, subtitle, isUpsideDown }: { children: React.ReactNode, subtitle?: string, isUpsideDown?: boolean }) => (
  <div className="mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-display uppercase tracking-widest ${
        isUpsideDown ? 'text-hawkins-red reality-glitch' : 'text-gray-900'
      }`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`text-sm font-serif italic mt-2 ${isUpsideDown ? 'text-red-200' : 'text-gray-500'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "100px" }}
      viewport={{ once: true }}
      className={`h-px mx-auto mt-4 shadow-[0_0_10px_#E71D36] ${
        isUpsideDown ? 'bg-hawkins-red' : 'bg-gray-400'
      }`}
    />
  </div>
);

const LevelCard = ({ level, title, description, icon: Icon }: { level: number, title: string, description: string, icon: any }) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -5 }}
    className="relative group p-8 border border-red-900/30 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={80} className="text-hawkins-red" />
    </div>
    <div className="relative z-10">
      <span className="text-hawkins-red font-display text-xl mb-2 block">LEVEL {level}</span>
      <h3 className="text-2xl font-serif font-bold mb-4 text-white reality-glitch transition-colors tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 font-crimson text-lg leading-relaxed">
        {description}
      </p>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hawkins-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

const CoordinatorCard = ({ name, phone, role, isUpsideDown }: { name: string, phone: string, role: string, isUpsideDown: boolean }) => (
  <motion.div
    whileHover={{ y: -5, rotate: isUpsideDown ? -1 : 1 }}
    className={`p-6 personnel-file transition-all duration-500 text-left ${
      isUpsideDown ? 'grayscale hover:grayscale-0' : ''
    }`}
  >
    <div className="flex items-start gap-4">
      <div className="w-16 h-20 bg-black/10 border border-black/20 flex items-center justify-center relative overflow-hidden shrink-0">
        <User size={32} className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="flex-1 typewriter-font overflow-hidden">
        <h4 className="text-sm font-bold uppercase leading-tight mb-1 truncate">{name}</h4>
        <p className="text-[8px] uppercase opacity-70 mb-1">{role}</p>
        <ParticleWrapper color="#E71D36" count={5}>
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-[8px] font-bold mb-3 block hover:text-red-600 transition-colors">{phone}</a>
        </ParticleWrapper>
        <div className="h-[1px] w-full bg-black/10 mb-2" />
        <div className="flex gap-2 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span className="text-[7px] uppercase tracking-tighter">Active Duty</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const RegistrationForm = ({ isUpsideDown }: { isUpsideDown: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={`max-w-3xl mx-auto mt-24 p-8 md:p-12 personnel-file transition-all duration-1000 relative ${
      isUpsideDown ? 'rotate-1' : 'rotate-0'
    }`}
  >
    <div className="dossier-tab" />
    <div className="flex justify-between items-start mb-12 border-b-2 border-black/20 pb-4">
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tighter uppercase typewriter-font text-left">Registration Dossier</span>
        <span className="text-[10px] uppercase opacity-60 typewriter-font text-left">Hawkins National Laboratory // Department of Energy</span>
      </div>
      <div className="px-3 py-1 border-2 border-red-600 text-red-600 font-bold uppercase -rotate-12 typewriter-font">
        Top Secret
      </div>
    </div>

    <div className="typewriter-font text-center py-12">
      <p className="text-base md:text-lg mb-8 text-gray-800 font-bold uppercase tracking-widest">
        Clearance Required for Bhaswara 2026 Participation
      </p>
      <p className="text-xs md:text-sm mb-12 text-gray-600 leading-relaxed max-w-md mx-auto">
        To ensure your entry into the lab and participation in the Code Red event, 
        you must complete the official registration form hosted on our secure external servers.
      </p>
      
      <ParticleWrapper color="#E71D36" count={20}>
      <motion.a
        href={REGISTRATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 md:gap-3 px-6 py-4 md:px-10 md:py-5 bg-red-700 text-white font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-red-800 transition-colors text-xs md:text-base text-center justify-center flex-wrap"
      >
        Access Registration Form <ArrowRight size={20} className="shrink-0" />
      </motion.a>
      </ParticleWrapper>
      
      <div className="mt-12 pt-8 border-t border-black/10 flex justify-between items-center opacity-40 grayscale">
        <div className="flex gap-4">
          <div className="w-12 h-12 border border-black flex items-center justify-center font-bold">DOE</div>
          <div className="w-12 h-12 border border-black flex items-center justify-center font-bold">HNL</div>
        </div>
        <div className="text-[8px] text-right">
          FORM ID: HNL-2026-CR<br />
          SUBJECT: MULTIDIMENSIONAL ANOMALY
        </div>
      </div>
    </div>
  </motion.div>
);

const PortalSection = () => (
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
          
          <ParticleWrapper color="#E71D36" count={30}>
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
          </ParticleWrapper>
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

const RadioTransmission = ({ isUpsideDown }: { isUpsideDown: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`max-w-xl mx-auto mt-6 md:mt-10 p-4 md:p-6 border-l-4 relative overflow-hidden transition-all duration-1000 ${
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
    <p className="font-mono text-xs md:text-sm leading-relaxed italic">
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

const CountdownTimer = ({ targetDate, onComplete }: { targetDate: string, onComplete?: () => void }) => {
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
    <div className="flex gap-4 md:gap-8 justify-center mt-8">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="relative">
            <motion.div
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`text-3xl sm:text-4xl md:text-6xl px-2 sm:px-4 py-2 rounded-lg digital-clock text-white ${
                timeLeft.isExpired ? 'text-hawkins-red animate-pulse' : ''
              }`}
            >
              {item.value.toString().padStart(2, '0')}
            </motion.div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-hawkins-red mt-2 font-bold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isUpsideDown, setIsUpsideDown] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles] = useState(() => Array.from({ length: 80 }, (_, i) => i));
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const toggleDimension = () => {
    setIsTransitioning(true);
    playSound('static');
    setTimeout(() => {
      setIsUpsideDown(!isUpsideDown);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }, 400);
  };
  
  const handleCountdownComplete = () => {
    if (!isShaking) {
      setIsShaking(true);
      // Optional: stop shaking after some time if desired, 
      // but the prompt says "trigger a screen-shake animation"
    }
  };

  return (
    <div className={`min-h-screen relative font-mono selection:bg-hawkins-red selection:text-white cursor-none dimension-transition ${
      isUpsideDown ? 'bg-void-black text-white' : 'bg-gray-50 text-gray-900'
    } ${isShaking ? 'animate-shake' : ''}`}>
      <ScrollProgressBar />
      <TVTransition isChanging={isTransitioning} />
      <AmbientPlayer />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md border-b transition-colors duration-1000 ${
        isUpsideDown ? 'bg-black/80 border-red-900/30' : 'bg-white/80 border-gray-200'
      }`}>
        <ParticleWrapper color={isUpsideDown ? '#E71D36' : '#00D4FF'} count={15}>
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
        </ParticleWrapper>
        
        <div className="hidden md:flex items-center gap-8">
          {['Events', 'Schedule', 'Prizes', 'Team'].map((item) => (
            <ParticleWrapper key={item} color={isUpsideDown ? '#E71D36' : '#00D4FF'} count={10}>
            <a 
              href={`#${item.toLowerCase()}`} 
              onMouseEnter={() => playSound('click')}
              className={`text-xs uppercase tracking-[0.3em] font-bold transition-all hover:tracking-[0.5em] block ${
                isUpsideDown ? 'text-gray-400 hover:text-hawkins-red' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {item}
            </a>
            </ParticleWrapper>
          ))}
        </div>
      </nav>

      <Flashlight />
      <DimensionToggle isUpsideDown={isUpsideDown} onToggle={toggleDimension} />
      <Vines active={isUpsideDown} />
      <div className={`grain-overlay transition-opacity duration-1000 ${isUpsideDown ? 'opacity-10' : 'opacity-0'}`} />
      
      {/* Background Atmosphere */}
      <AnimatePresence>
        {isUpsideDown && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 overflow-hidden"
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
        
        {/* Hero Section: Split Screen */}
        <motion.section 
          style={{ opacity, scale }}
          className="min-h-screen flex flex-col md:flex-row relative overflow-hidden"
        >
          {/* Rift Effect */}
          <motion.div 
            animate={{ 
              opacity: isUpsideDown ? [0.4, 0.8, 0.4] : 0,
              scaleY: isUpsideDown ? [0.98, 1.02, 0.98] : 0.5
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rift-effect hidden md:block"
          />
          {isUpsideDown && <div className="rift-glow hidden md:block" />}
          {/* Left Side: 1980s Retro Tech Lab */}
          <div className={`flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8 transition-colors duration-1000 ${
            isUpsideDown ? 'bg-black crt-screen' : 'bg-white'
          }`}>
            <div className={`absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center transition-opacity duration-1000 ${
              isUpsideDown ? 'bg-[url("https://picsum.photos/seed/lab/1920/1080?grayscale")]' : 'opacity-0'
            }`} />
            {!isUpsideDown && Array.from({ length: 10 }).map((_, i) => (
              <TechElement key={i} isUpsideDown={isUpsideDown} />
            ))}
            <div className="relative z-10 text-center">
              {/* Status box removed from here and moved to fixed HUD */}
            </div>
          </div>

          {/* Right Side: The Upside Down */}
          <div className={`flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8 border-l transition-all duration-1000 ${
            isUpsideDown ? 'bg-[#0a0505] border-hawkins-red/20' : 'bg-gray-100 border-gray-200'
          }`}>
            <div className={`absolute inset-0 opacity-30 pointer-events-none bg-cover bg-center transition-opacity duration-1000 ${
              isUpsideDown ? 'bg-[url("https://picsum.photos/seed/void/1920/1080?blur=10")]' : 'opacity-0'
            }`} />
            
            {/* Red Lightning Effect */}
            {isUpsideDown && (
              <motion.div 
                animate={{ opacity: [0, 0.8, 0, 0.5, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
                className="absolute inset-0 bg-hawkins-red/10 pointer-events-none"
              />
            )}

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
              >
                <h4 className={`font-serif italic tracking-[0.3em] uppercase mb-4 transition-colors duration-1000 ${
                  isUpsideDown ? 'text-hawkins-red text-neon-red' : 'text-gray-400'
                }`}>
                  {isUpsideDown ? 'The Rift Is Opening' : 'The Future Is Here'}
                </h4>
              </motion.div>
            </div>
          </div>

          {/* Center: Main Title Header */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full px-4 text-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <h2 className={`font-serif text-2xl sm:text-3xl md:text-5xl tracking-tighter mb-2 md:mb-6 pointer-events-auto transition-all duration-1000 ${
                isUpsideDown ? 'text-hawkins-red text-neon-red' : 'text-gray-900 font-black'
              }`}>
                BHASWARA 2026
              </h2>
              <h1 className={`text-4xl sm:text-6xl md:text-8xl font-display tracking-tighter flex flex-col items-center pointer-events-auto transition-all duration-1000 ${
                isUpsideDown ? 'reality-glitch' : 'text-electric-blue'
              }`}>
                {isUpsideDown ? (
                  <div className="relative flex flex-col items-center">
                    {/* Top Bar */}
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute -top-2 md:-top-4 w-[110%] h-1 md:h-2 bg-hawkins-red shadow-[0_0_15px_#E71D36]"
                    />
                    <span className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[10rem] stranger-title animate-flicker relative leading-none">
                      CODE RED
                    </span>
                    {/* Bottom Bars */}
                    <div className="absolute -bottom-1 md:-bottom-2 w-full flex justify-between px-4">
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="w-[40%] h-0.5 md:h-1 bg-hawkins-red shadow-[0_0_10px_#E71D36]"
                      />
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="w-[40%] h-0.5 md:h-1 bg-hawkins-red shadow-[0_0_10px_#E71D36]"
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[10rem] tracking-widest leading-none">
                    TECH FEST
                  </span>
                )}
              </h1>
              
              <RadioTransmission isUpsideDown={isUpsideDown} />
              
              <div className="mt-6 md:mt-8 pointer-events-auto">
                <ParticleWrapper color={isUpsideDown ? '#E71D36' : '#00D4FF'} count={30}>
                <motion.a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, boxShadow: isUpsideDown ? "0 0 40px #E71D36" : "0 0 40px rgba(0,212,255,0.5)" }}
                  whileTap={{ scale: 0.9 }}
                  className={`px-6 py-3 md:px-10 md:py-5 font-display text-lg md:text-2xl tracking-widest rounded-sm transition-all flex items-center justify-center gap-3 flex-wrap ${
                    isUpsideDown 
                      ? 'bg-hawkins-red text-white border-neon-red shadow-[0_0_20px_#E71D36]' 
                      : 'bg-electric-blue text-white shadow-xl'
                  }`}
                >
                  REGISTER NOW <ArrowRight size={20} className="md:w-6 md:h-6 shrink-0" />
                </motion.a>
                </ParticleWrapper>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Info Section (Countdown & Event Details) */}
        <section id="schedule" className={`scroll-mt-20 py-16 md:py-24 relative z-20 border-b transition-colors duration-1000 ${
          isUpsideDown ? 'bg-void-black border-white/5' : 'bg-white border-gray-100'
        }`}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-6 md:px-8"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <h5 className={`text-[10px] uppercase tracking-[0.4em] mb-6 font-bold transition-colors duration-1000 ${
                  isUpsideDown ? 'text-hawkins-red' : 'text-electric-blue'
                }`}>Time Remaining Until The Rift Opens</h5>
                <CountdownTimer 
                  targetDate="2026-03-17T00:00:00" 
                  onComplete={handleCountdownComplete}
                />
              </div>
              
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
          </motion.div>
        </section>

        {/* Hidden Easter Eggs Section (Only visible under flashlight) */}
        {isUpsideDown && (
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
        )}

        {/* Levels Section (Vertical Timeline) */}
        <section id="events" className={`scroll-mt-20 py-16 md:py-24 px-6 md:px-8 max-w-7xl mx-auto transition-colors duration-1000 ${isUpsideDown ? '' : 'bg-white'}`}>
          <SectionTitle isUpsideDown={isUpsideDown} subtitle={isUpsideDown ? "Survive the challenges of the Upside Down" : "Master the skills of the future"}>
            THE CHALLENGE LEVELS
          </SectionTitle>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="mt-20 max-w-4xl mx-auto"
          >
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
          </motion.div>
        </section>

        {/* Prize Pool Section (Arcade Leaderboard) */}
        <section id="prizes" className={`scroll-mt-20 py-16 md:py-24 border-y transition-colors duration-1000 ${
          isUpsideDown ? 'bg-red-950/5 border-red-900/10' : 'bg-gray-50 border-gray-200'
        }`}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-6 md:px-8"
          >
            <SectionTitle isUpsideDown={isUpsideDown} subtitle={isUpsideDown ? "The highest scores win the ultimate reward" : "Compete for the top spot"}>
              REWARDS FOR SURVIVAL
            </SectionTitle>
            <div className="mt-16 max-w-4xl mx-auto">
              <ArcadeLeaderboard />
            </div>
          </motion.div>
        </section>

        {/* Portal Section (Creative Registration) */}
        <PortalSection />

        {/* Registration Form Section */}
        <section className={`py-16 md:py-24 px-6 md:px-8 transition-colors duration-1000 ${isUpsideDown ? 'bg-void-black' : 'bg-gray-100'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <h2 className={`text-4xl md:text-6xl font-display mb-12 ${isUpsideDown ? 'text-neon-red' : 'text-gray-900'}`}>
              {isUpsideDown ? 'SECURE CLEARANCE' : 'EVENT REGISTRATION'}
            </h2>
            <RegistrationForm isUpsideDown={isUpsideDown} />
          </div>
        </section>

        {/* Coordinators Section */}
        <section id="team" className={`scroll-mt-20 py-16 md:py-24 px-6 md:px-8 max-w-7xl mx-auto transition-colors duration-1000 ${isUpsideDown ? 'bg-void-black' : 'bg-white'}`}>
          <SectionTitle isUpsideDown={isUpsideDown} subtitle="Friends don't lie, and they'll help you through">THE GATEKEEPERS</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`text-2xl font-display mb-8 border-b pb-2 tracking-widest uppercase transition-colors duration-1000 ${
                isUpsideDown ? 'text-hawkins-red border-red-900/30' : 'text-electric-blue border-blue-900/10'
              }`}>FACULTY COORDINATORS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <CoordinatorCard name="Dr. G. Kalyani" phone="90004 14256" role="Overall" isUpsideDown={isUpsideDown} />
                <CoordinatorCard name="Dr. U. Rakesh" phone="95508 08096" role="Overall" isUpsideDown={isUpsideDown} />
                <CoordinatorCard name="Mrs. Spandana" phone="88976 11266" role="Event Lead" isUpsideDown={isUpsideDown} />
                <CoordinatorCard name="Ms. Raveena" phone="92982 50764" role="Event Lead" isUpsideDown={isUpsideDown} />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`text-2xl font-display mb-8 border-b pb-2 tracking-widest uppercase transition-colors duration-1000 ${
                isUpsideDown ? 'text-hawkins-red border-red-900/30' : 'text-electric-blue border-blue-900/10'
              }`}>STUDENT COORDINATORS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <CoordinatorCard name="Mr. Sai Lochan" phone="96768 30744" role="Overall" isUpsideDown={isUpsideDown} />
                <CoordinatorCard name="B. Sam Benedict" phone="79939 73214" role="Overall" isUpsideDown={isUpsideDown} />
                <CoordinatorCard name="D Alekhya Ashwini" phone="89190 97668" role="Lead" isUpsideDown={isUpsideDown} />
                <CoordinatorCard name="M. Lakshmi Manogna" phone="74165 20371" role="Lead" isUpsideDown={isUpsideDown} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer / Registration */}
        <footer className="py-16 md:py-24 px-6 md:px-8 border-t border-red-900/30 bg-black">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto flex flex-col items-center text-center"
          >
            <div className="max-w-xs w-full mb-12">
              <div className={`p-8 overhead-projection transition-all duration-1000 ${
                isUpsideDown ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
              }`}>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <ParticleWrapper color={isUpsideDown ? '#E71D36' : '#00D4FF'} count={20}>
                  <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className={`aspect-square flex items-center justify-center border-4 border-dashed relative z-10 ${
                    isUpsideDown ? 'border-hawkins-red/40' : 'border-electric-blue/40'
                  }`}>
                    <QrCode size={120} className={isUpsideDown ? 'text-hawkins-red chromatic-aberration' : 'text-electric-blue'} />
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-current" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-current" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-current" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-current" />
                  </a>
                  </ParticleWrapper>
                </div>
                <p className={`mt-6 text-[10px] font-bold uppercase tracking-widest typewriter-font ${
                  isUpsideDown ? 'text-hawkins-red' : 'text-gray-500'
                }`}>
                  {isUpsideDown ? 'SCAN FOR CLEARANCE' : 'SCAN TO REGISTER'}
                </p>
              </div>
            </div>
            
            <div className="relative mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display text-white tracking-widest mb-2 reality-glitch">FRIENDS DON'T LIE</h2>
              <div className="flex justify-center gap-2 mb-8">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1],
                      boxShadow: ["0 0 0px #fff", "0 0 10px #fff", "0 0 0px #fff"]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                    className={`w-3 h-3 rounded-full ${['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][i % 4]}`}
                  />
                ))}
              </div>
              
              {/* Social Media Icons */}
              <div className="flex justify-center gap-6 mb-8">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Youtube, label: 'Youtube' },
                  { icon: Github, label: 'Github' }
                ].map((social, i) => (
                  <ParticleWrapper key={i} color="#E71D36" count={8}>
                  <motion.a
                    href="#"
                    whileHover={{ 
                      scale: 1.2,
                      color: "#E71D36",
                      filter: "drop-shadow(0 0 8px #E71D36)"
                    }}
                    className="text-gray-500 transition-all duration-300 block"
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </motion.a>
                  </ParticleWrapper>
                ))}
              </div>
            </div>

            <p className="text-gray-600 text-xs uppercase tracking-[0.4em] font-sans">
              &copy; 2026 BHASWARA - CODE RED | GEETHANJALI COLLEGE
            </p>
          </motion.div>
        </footer>
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
}
