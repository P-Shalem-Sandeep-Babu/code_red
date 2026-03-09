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

export const playSound = (type: 'click' | 'beep' | 'static' | 'hum' | 'glitch') => {
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
