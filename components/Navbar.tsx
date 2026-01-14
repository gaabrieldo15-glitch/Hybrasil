
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, LogOut, LayoutDashboard, Trash2, Plus, Minus, CreditCard, Sparkles, X, Package, Upload, CheckCircle, ArrowLeft, Send } from 'lucide-react';
import { CartItem, SiteConfig } from '../types';
import Logo from './Logo';

interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
  config: SiteConfig;
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  onCreateOrder: (receipt: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, onLogout, config, cart, onRemoveFromCart, onUpdateQuantity, onClearCart, onCreateOrder }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutStep, setShowCheckoutStep] = useState<'cart' | 'qr' | 'receipt' | 'success'>('cart');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [scrolled, setSetScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setSetScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReceiptImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const submitOrder = () => {
    if (!receiptImage) return alert("Por favor, anexe o comprovante de pagamento.");
    onCreateOrder(receiptImage);
    setShowCheckoutStep('success');
    setTimeout(() => {
      setIsCartOpen(false);
      setShowCheckoutStep('cart');
      setReceiptImage(null);
    }, 3000);
  };

  return (
    <>
      <nav className={`fixed w-full top-0 z-[100] transition-all duration-700 ${scrolled ? 'py-2 bg-[#030308]/90 backdrop-blur-md shadow-2xl' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <Logo src={config.logoUrl} fallbackSrc={config.serverIconUrl} size="sm" />
            <span className="font-hytale text-2xl font-bold tracking-widest text-white hidden lg:block group-hover:text-indigo-400 transition-colors uppercase">{config.serverName}</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {[
              { path: '/', label: 'Início' },
              { path: '/shop', label: 'Loja' },
              { path: '/blog', label: 'Crônicas' },
              { path: '/pedidos', label: 'Meus Pedidos' }
            ].map(nav => (
              <Link key={nav.path} to={nav.path} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${location.pathname === nav.path ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                {nav.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link to="/admin" className="p-3 text-indigo-400 hover:bg-indigo-400/10 rounded-xl border border-indigo-500/20 transition-all">
                <LayoutDashboard size={18} />
              </Link>
            )}
            <button onClick={() => { setIsCartOpen(true); setShowCheckoutStep('cart'); }} className="relative p-3.5 bg-indigo-500 text-white rounded-xl shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all group">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-indigo-600 text-[10px] font-black flex items-center justify-center rounded-full animate-bounce">{cartCount}</span>}
            </button>
            <button onClick={onLogout} className="p-3 text-gray-500 hover:text-red-400 transition-all"><LogOut size={18} /></button>
          </div>
        </div>
      </nav>

      {/* Sidebar de Carrinho e Checkout */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-[#05050a] border-l border-white/5 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
            
            {/* ETAPA 1: CARRINHO */}
            {showCheckoutStep === 'cart' && (
              <>
                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                  <h2 className="font-hytale text-2xl text-white flex items-center gap-3 uppercase"><ShoppingCart className="text-indigo-400" /> SEU BAÚ</h2>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-500 hover:text-white transition-all"><X size={24} /></button>
                </div>
                <div className="flex-grow overflow-y-auto p-8 space-y-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-20">
                      <Package size={48} className="mx-auto text-gray-800 mb-4" />
                      <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">Seu baú de tesouros está vazio</p>
                    </div>
                  ) : cart.map(item => (
                    <div key={item.id} className="glass-panel p-5 rounded-3xl flex gap-4 border-white/5 group">
                      <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                        <p className="text-indigo-400 font-black text-sm">R$ {item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 text-gray-500 hover:text-white"><Minus size={14} /></button>
                          <span className="text-white text-xs font-black">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 text-gray-500 hover:text-white"><Plus size={14} /></button>
                          <button onClick={() => onRemoveFromCart(item.id)} className="ml-auto text-red-400/30 hover:text-red-400"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div className="p-10 border-t border-white/5 space-y-8 bg-white/2">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-600 font-black text-[10px] tracking-[0.3em] uppercase">Soma Total</span>
                      <span className="text-4xl font-hytale text-white">R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <button onClick={() => setShowCheckoutStep('qr')} className="w-full mystic-gradient py-6 rounded-2xl font-black text-white text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-2xl">PROSSEGUIR OFERENDA</button>
                  </div>
                )}
              </>
            )}

            {/* ETAPA 2: QR CODE */}
            {showCheckoutStep === 'qr' && (
              <>
                <div className="p-10 border-b border-white/5 flex items-center gap-4">
                  <button onClick={() => setShowCheckoutStep('cart')} className="p-2 text-gray-500 hover:text-white"><ArrowLeft size={20} /></button>
                  <h2 className="font-hytale text-2xl text-white uppercase">PAGAMENTO PIX</h2>
                </div>
                <div className="flex-grow overflow-y-auto p-10 flex flex-col items-center justify-center space-y-8">
                  <div className="text-center space-y-2">
                    <p className="text-indigo-400 font-black text-[10px] uppercase tracking-widest">Escaneie o QR Code abaixo</p>
                    <p className="text-gray-500 text-xs">O valor total é de <span className="text-white font-bold">R$ {cartTotal.toFixed(2)}</span></p>
                  </div>
                  <div className="p-6 bg-white rounded-[2rem] shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                    <img src={config.qrCodeUrl} className="w-64 h-64 object-contain" alt="QR Code PIX" />
                  </div>
                  <div className="bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-2xl text-center max-w-xs">
                    <p className="text-[10px] text-indigo-300 font-medium leading-relaxed">Após o pagamento, clique no botão abaixo para anexar o seu comprovante.</p>
                  </div>
                </div>
                <div className="p-10 border-t border-white/5">
                  <button onClick={() => setShowCheckoutStep('receipt')} className="w-full bg-white/5 border border-white/10 py-6 rounded-2xl font-black text-white text-xs uppercase tracking-widest hover:bg-white/10 transition-all">JÁ PAGUEI, ENVIAR COMPROVANTE</button>
                </div>
              </>
            )}

            {/* ETAPA 3: COMPROVANTE */}
            {showCheckoutStep === 'receipt' && (
              <>
                <div className="p-10 border-b border-white/5 flex items-center gap-4">
                  <button onClick={() => setShowCheckoutStep('qr')} className="p-2 text-gray-500 hover:text-white"><ArrowLeft size={20} /></button>
                  <h2 className="font-hytale text-2xl text-white uppercase">COMPROVANTE</h2>
                </div>
                <div className="flex-grow p-10 space-y-8">
                   <div className="space-y-4">
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Anexe a imagem do comprovante</p>
                     <label className="block w-full aspect-square bg-white/2 border-2 border-dashed border-white/10 rounded-[3rem] cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all relative overflow-hidden group">
                        {receiptImage ? (
                          <img src={receiptImage} className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-4">
                             <Upload size={48} className="group-hover:text-indigo-400 transition-colors" />
                             <span className="font-bold text-xs">CLIQUE PARA SUBIR</span>
                          </div>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                     </label>
                   </div>
                </div>
                <div className="p-10 border-t border-white/5">
                  <button 
                    onClick={submitOrder}
                    disabled={!receiptImage}
                    className="w-full mystic-gradient py-6 rounded-2xl font-black text-white text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    <Send size={18} /> CONFIRMAR OFERENDA
                  </button>
                </div>
              </>
            )}

            {/* ETAPA 4: SUCESSO */}
            {showCheckoutStep === 'success' && (
              <div className="flex-grow flex flex-col items-center justify-center p-12 text-center space-y-8 animate-in zoom-in duration-500">
                <div className="w-32 h-32 rounded-full bg-green-500/10 flex items-center justify-center border-2 border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                   <CheckCircle size={64} className="text-green-500 animate-bounce" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-hytale text-4xl text-white uppercase">OFERENDA RECEBIDA!</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">Sua alma agora será processada pelos Druidas. Você poderá acompanhar o status em <span className="text-indigo-400 font-bold">Meus Pedidos</span>.</p>
                </div>
                <div className="pt-8 w-full">
                  <button onClick={() => setIsCartOpen(false)} className="w-full bg-white/5 py-4 rounded-xl text-white font-bold text-xs uppercase">FECHAR BAÚ</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
