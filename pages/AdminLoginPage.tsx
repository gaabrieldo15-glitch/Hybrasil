
import React, { useState, useEffect } from 'react';
import { Lock, User, Mail, ShieldAlert, ChevronRight, Fingerprint, Terminal } from 'lucide-react';
import { ADMIN_CREDENTIALS } from '../constants';

interface AdminLoginPageProps {
  onLogin: (username: string) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Implementação da verificação rígida solicitada
    setTimeout(() => {
      if (
        username === ADMIN_CREDENTIALS.username && 
        email === ADMIN_CREDENTIALS.email && 
        password === ADMIN_CREDENTIALS.password
      ) {
        onLogin(username);
      } else {
        setAttempts(prev => prev + 1);
        setError(`Acesso Negado. Credenciais inválidas (Tentativa ${attempts + 1}).`);
        setLoading(false);
      }
    }, 1500); // Delay intencional para simular processamento de segurança
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#020205]">
      {/* Background Decorativo */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
      </div>

      <div className="w-full max-w-lg z-10 reveal-anim">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 animate-pulse">
            <Fingerprint className="w-12 h-12 text-indigo-400" />
          </div>
          <h1 className="font-fantasy text-4xl font-black text-white tracking-widest">ACESSO RESTRITO</h1>
          <div className="flex items-center justify-center gap-2 text-indigo-400/60 mt-2 font-mono text-xs uppercase">
            <Terminal size={12} />
            <span>Hybrasil Secure Kernel v4.0.2</span>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-2">Identidade (Nick)</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder:text-gray-700"
                  placeholder="Nick do administrador..."
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-2">E-mail de Segurança</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder:text-gray-700"
                  placeholder="exemplo@servico.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-2">Chave Mestra</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all placeholder:text-gray-700"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 text-red-400 bg-red-400/5 p-4 rounded-2xl text-xs font-mono border border-red-400/20 animate-bounce">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>{error.toUpperCase()}</span>
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full mystic-gradient text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  CRIPTOGRAFANDO...
                </span>
              ) : (
                <>
                  EFETUAR LOGIN ADMIN
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 flex justify-center gap-8 text-[10px] text-gray-600 font-mono tracking-widest uppercase">
          <span>IP LOGGING: ENABLED</span>
          <span>SSL: SECURE</span>
          <span>HYBRASIL FIREWALL ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
