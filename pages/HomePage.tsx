
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, ArrowRight, Calendar, User } from 'lucide-react';
import { SiteConfig, BlogPost } from '../types';
import Logo from '../components/Logo';

interface HomePageProps {
  config: SiteConfig;
  posts: BlogPost[];
}

const HomePage: React.FC<HomePageProps> = ({ config, posts }) => {
  return (
    <div className="reveal-anim">
      {/* Hero Section */}
      <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={config.heroImage} 
            alt="Background" 
            className="w-full h-full object-cover opacity-30 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030308]/50 via-[#030308] to-[#030308]"></div>
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 blur-[180px] animate-pulse rounded-full"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-7xl space-y-10 flex flex-col items-center">
          <div className="flex justify-center mb-6 w-full max-w-4xl px-4 animate-float">
             <Logo src={config.logoUrl} fallbackSrc={config.serverIconUrl} size="xl" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-panel border-indigo-500/30 text-indigo-300 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 shadow-xl shadow-indigo-500/10">
            <Sparkles size={14} className="animate-spin-slow" /> O Despertar de Hytale
          </div>
          
          <h1 className="font-fantasy text-6xl md:text-9xl font-black mb-8 leading-[0.9] text-white uppercase tracking-tighter drop-shadow-2xl">
            HYBRASIL<br/><span className="bg-clip-text text-transparent mystic-gradient">NETWORK</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link to="/shop" className="group mystic-gradient px-14 py-6 rounded-[2.2rem] font-black text-white flex items-center gap-4 hover-liquid shadow-2xl shadow-indigo-600/30 border border-white/20 uppercase tracking-widest text-sm">
              ABRIR MERCADO <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/blog" className="bg-white/5 backdrop-blur-2xl px-14 py-6 rounded-[2.2rem] font-black text-white flex items-center gap-4 hover:bg-white/10 transition-all border border-white/10 group uppercase tracking-widest text-sm">
              VER CRÔNICAS <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Preview Section... */}
    </div>
  );
};

export default HomePage;
