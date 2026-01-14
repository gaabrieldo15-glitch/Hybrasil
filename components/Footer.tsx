
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, MessageCircle, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types';
import Logo from './Logo';

interface FooterProps {
  config: SiteConfig;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  const copyIP = () => {
    navigator.clipboard.writeText(config.serverIP);
    alert("Endereço IP copiado para o seu pergaminho!");
  };

  return (
    <footer className="bg-[#020205] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">
        <div className="space-y-8">
          <Link to="/" className="flex items-center gap-4 group">
             <Logo src={config.logoUrl} fallbackSrc={config.serverIconUrl} size="sm" />
             <span className="font-hytale text-2xl font-bold tracking-widest text-white uppercase group-hover:text-indigo-400 transition-colors">
               {config.serverName.split(' ')[0]}
             </span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
            {config.footerAbout}
          </p>
          <div className="flex gap-4 pt-2">
             {config.twitterLink && (
               <a href={config.twitterLink} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-white/5 border border-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all">
                 <Twitter size={18} />
               </a>
             )}
             {config.instagramLink && (
               <a href={config.instagramLink} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-white/5 border border-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-pink-500/20 hover:border-pink-500/30 transition-all">
                 <Instagram size={18} />
               </a>
             )}
             {config.discordLink && (
               <a href={config.discordLink} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-white/5 border border-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-600/30 transition-all">
                 <MessageCircle size={18} />
               </a>
             )}
          </div>
        </div>

        <div>
           <h4 className="text-white font-black mb-10 uppercase tracking-[0.3em] text-[10px]">Navegação</h4>
           <ul className="space-y-5 text-gray-500 text-sm font-bold uppercase tracking-widest">
             <li><Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group"><ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all" /> Início do Reino</Link></li>
             <li><Link to="/shop" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group"><ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all" /> Mercado Arcano</Link></li>
             <li><Link to="/blog" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group"><ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all" /> Escriba (Notícias)</Link></li>
             <li><Link to="/pedidos" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group"><ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all" /> Rastreamento de Poder</Link></li>
           </ul>
        </div>

        <div>
           <h4 className="text-white font-black mb-10 uppercase tracking-[0.3em] text-[10px]">Suporte do Éden</h4>
           <ul className="space-y-5 text-gray-500 text-sm font-bold uppercase tracking-widest">
             <li><a href="#" className="hover:text-indigo-400 transition-colors">Central de Ajuda</a></li>
             <li><a href="#" className="hover:text-indigo-400 transition-colors">Recuperar Itens</a></li>
             <li><a href="#" className="hover:text-indigo-400 transition-colors">Termos de Uso</a></li>
             <li className="flex flex-col gap-1 pt-2">
                <span className="text-[9px] text-gray-600">Fale Conosco</span>
                <a href={`mailto:${config.adminEmail}`} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors lowercase tracking-normal text-xs font-medium">
                  <Mail size={14} /> {config.adminEmail}
                </a>
             </li>
           </ul>
        </div>

        <div className="space-y-6">
           <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 space-y-6 bg-indigo-500/5 group hover:border-indigo-500/30 transition-all">
              <h4 className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-indigo-400" /> Endereço de Conexão
              </h4>
              <div 
                className="bg-black/60 p-5 rounded-2xl border border-white/5 text-center cursor-pointer group/ip relative"
                onClick={copyIP}
              >
                <code className="text-green-400 font-mono text-sm group-hover/ip:text-indigo-400 transition-colors">
                  {config.serverIP}
                </code>
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-600 rounded-2xl opacity-0 group-hover/ip:opacity-100 transition-all">
                   <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Copiar IP</span>
                </div>
              </div>
              <p className="text-[9px] text-gray-600 text-center uppercase font-black tracking-widest leading-relaxed">
                Clique para copiar o IP e entrar em Orbis agora mesmo!
              </p>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
         <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] text-center md:text-left">
           {config.footerCopyright}
         </p>
         <div className="flex gap-10 text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-indigo-400 transition-all">Privacidade</a>
            <a href="#" className="hover:text-indigo-400 transition-all">Segurança</a>
            <a href="#" className="hover:text-indigo-400 transition-all">Cookies</a>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
