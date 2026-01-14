
import React, { useState } from 'react';
import { Lock, User, Mail, ShieldAlert, ChevronRight, Sparkles } from 'lucide-react';
import { UserSession, SiteConfig } from '../types';
import Logo from '../components/Logo';
import { ADMIN_CREDENTIALS } from '../constants';

interface AuthPageProps {
  onLogin: (session: UserSession) => void;
  config: SiteConfig;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, config }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Verificação específica solicitada para ADMIN
      if (isLogin && email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        onLogin({
          isLoggedIn: true,
          isAdmin: true,
          username: ADMIN_CREDENTIALS.username,
          email: email
        });
      } else if (isLogin) {
        if (password.length >= 6) {
          onLogin({
            isLoggedIn: true,
            isAdmin: false,
            username: username || email.split('@')[0],
            email: email
          });
        } else {
          setError("Sua chave é fraca demais para este portal.");
          setLoading(false);
        }
      } else {
        setIsLogin(true);
        setLoading(false);
        alert("Sua alma foi registrada! Agora conecte-se.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#020205] relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-indigo-600/10 blur-[200px] rounded-full animate-pulse"></div>
      </div>

      <div className="w-full max-w-lg z-10 reveal-anim">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <Logo src={config.logoUrl} size="lg" className="animate-float" />
          </div>
          <h1 className="font-fantasy text-4xl font-black text-white tracking-[0.3em] uppercase drop-shadow-lg">
            {isLogin ? `PORTAL ${config.serverName.toUpperCase()}` : 'REGISTRO DE ALMA'}
          </h1>
          <p className="text-gray-600 text-[10px] mt-4 uppercase tracking-[0.4em] font-black">Acesso restrito a heróis de Hybrasil</p>
        </div>

        <div className="glass-panel p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase ml-4 tracking-[0.2em]">Nick em Hytale</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-all w-5 h-5" />
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/2 border border-white/10 rounded-[1.8rem] py-5 pl-14 pr-6 text-white focus:outline-none focus:border-indigo-500/50 transition-all text-sm font-medium"
                    placeholder="Seu nome no jogo..."
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-4 tracking-[0.2em]">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-all w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/2 border border-white/10 rounded-[1.8rem] py-5 pl-14 pr-6 text-white focus:outline-none focus:border-indigo-500/50 transition-all text-sm font-medium"
                  placeholder="exemplo@reino.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-4 tracking-[0.2em]">Chave de Acesso</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-all w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/2 border border-white/10 rounded-[1.8rem] py-5 pl-14 pr-6 text-white focus:outline-none focus:border-indigo-500/50 transition-all text-sm font-medium"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-4 text-red-400 bg-red-400/5 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-400/20 animate-in fade-in zoom-in duration-300">
                <ShieldAlert size={18} /> <span>{error}</span>
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full mystic-gradient text-white font-black py-6 rounded-[2rem] flex items-center justify-center gap-4 hover-liquid shadow-2xl shadow-indigo-600/30 disabled:opacity-50 uppercase tracking-[0.2em] text-xs"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (
                <> {isLogin ? 'CONECTAR AO REINO' : 'REGISTRAR ALMA'} <ChevronRight size={18} /> </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em] hover:text-white transition-colors duration-500"
            >
              {isLogin ? 'NÃO POSSUI UMA ALMA? CRIE UMA AQUI' : 'JÁ É UM HERÓI? ENTRE NO PORTAL'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
