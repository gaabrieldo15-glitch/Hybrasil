
import React, { useState } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface LogoProps {
  src: string;
  fallbackSrc?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ src, fallbackSrc, className = "", size = "md" }) => {
  const [error, setError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  const containerClasses = {
    sm: "h-12 min-w-[60px]",
    md: "h-16 min-w-[80px]",
    lg: "h-32 min-w-[150px]",
    xl: "h-40 md:h-64 w-full"
  };

  // Se a logo principal falhou ou não existe, tentamos o fallbackSrc (Símbolo do Reino)
  if ((error || !src) && fallbackSrc && !fallbackError) {
    return (
      <div className={`${containerClasses[size]} ${className} flex items-center justify-center overflow-visible`}>
        <img 
          src={fallbackSrc} 
          alt="Símbolo" 
          className="h-full w-auto object-contain drop-shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-105 transition-transform duration-700"
          onError={() => setFallbackError(true)}
        />
      </div>
    );
  }

  // Se tudo falhou, mostramos o escudo místico
  if (error || !src || fallbackError) {
    return (
      <div className={`${containerClasses[size]} aspect-square bg-indigo-500/10 rounded-2xl border border-white/10 flex items-center justify-center`}>
        <ShieldCheck size={size === 'xl' ? 64 : 24} className="text-indigo-400 animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`${containerClasses[size]} ${className} flex items-center justify-center overflow-visible`}>
      <img 
        src={src} 
        alt="Logo" 
        className="h-full w-auto object-contain drop-shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-105 transition-transform duration-700"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default Logo;
