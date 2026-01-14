
import React, { useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import { MessageSquare, Sparkles } from 'lucide-react';
import Logo from '../components/Logo';

interface CountdownPageProps {
  config: SiteConfig;
}

const CountdownPage: React.FC<CountdownPageProps> = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(config.countdownDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [config.countdownDate]);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center p-8 glass-panel rounded-[2.5rem] min-w-[140px] border-white/10 shadow-2xl hover:border-indigo-500/30 transition-all duration-700">
      <span className="text-5xl md:text-7xl font-black text-white font-fantasy drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] uppercase font-black text-indigo-400 tracking-[0.4em] mt-3">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030308] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 z-0">
        <img src={config.heroImage} className="w-full h-full object-cover opacity-20 blur-xl scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-[#030308]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[200px] animate-pulse rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center space-y-16 reveal-anim">
        <div className="space-y-8 flex flex-col items-center">
          <div className="p-4 bg-white/2 rounded-[3rem] border border-white/5 animate-float mb-4">
            <Logo src={config.logoUrl} size="lg" className="rounded-[2.5rem]" />
          </div>
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full glass-panel border-indigo-500/30 text-indigo-300 font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-indigo-500/10">
            <Sparkles size={16} className="animate-spin-slow" /> A Ascensão de Hybrasil
          </div>
          <h1 className="text-5xl md:text-8xl font-fantasy font-black text-white uppercase tracking-tighter leading-none">
            EM BREVE NO <span className="text-transparent bg-clip-text mystic-gradient">ORBIS</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto font-medium text-lg leading-relaxed">{config.countdownMessage}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <TimeUnit value={timeLeft.days} label="Dias" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
          <a href={config.discordLink} target="_blank" className="flex items-center gap-4 px-12 py-6 rounded-[2.5rem] bg-[#5865F2] text-white font-black text-sm uppercase tracking-widest hover-liquid shadow-2xl shadow-[#5865F2]/30 group">
            <MessageSquare size={22} className="group-hover:rotate-12 transition-transform" /> ENTRAR NO DISCORD
          </a>
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;
