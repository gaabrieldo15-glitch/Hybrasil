
import React, { useState } from 'react';
import { Product, SiteConfig, BlogPost, Order } from '../types';
import { 
  LayoutDashboard, Settings, ShoppingBag, Plus, Trash2, Edit2, 
  Save, X, Globe, Rss, FileText, Mail, Image as ImageIcon, Upload, 
  Package, User, Eye, CheckCircle, MessageSquare, Shield, Twitter, 
  Instagram, Link, ExternalLink, Search, Clock, CreditCard
} from 'lucide-react';
import { CATEGORY_ICONS } from '../constants';

interface AdminDashboardProps {
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  config, setConfig, products, setProducts, blogPosts, setBlogPosts, orders, setOrders 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'products' | 'blog' | 'orders' | 'customers'>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [adminMsgInput, setAdminMsgInput] = useState('');

  const updateConfig = (key: keyof SiteConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Funções de Gerenciamento de Produtos
  const saveProduct = () => {
    if (!editingProduct) return;
    if (editingProduct.id === 'new') {
      const newProd = { ...editingProduct, id: Math.random().toString(36).substr(2, 9) };
      setProducts(prev => [...prev, newProd]);
    } else {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    }
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    if (confirm('Deseja banir este artefato da loja?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Funções de Gerenciamento de Blog
  const savePost = () => {
    if (!editingPost) return;
    if (editingPost.id === 'new') {
      const newPost = { ...editingPost, id: Math.random().toString(36).substr(2, 9), date: new Date().toLocaleDateString('pt-BR') };
      setBlogPosts(prev => [...prev, newPost]);
    } else {
      setBlogPosts(prev => prev.map(p => p.id === editingPost.id ? editingPost : p));
    }
    setEditingPost(null);
  };

  const deletePost = (id: string) => {
    if (confirm('Deseja apagar esta crônica para sempre?')) {
      setBlogPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Funções de Gerenciamento de Pedidos
  const handleStatusChange = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const sendAdminMessage = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, adminMessage: adminMsgInput } : o));
    setAdminMsgInput('');
    alert("Mensagem enviada ao pergaminho do herói!");
  };

  const customers = Array.from(new Set(orders.map(o => o.userEmail))).map(email => {
    const userOrders = orders.filter(o => o.userEmail === email);
    return {
      email,
      username: userOrders[0]?.userId,
      totalSpent: userOrders.reduce((acc, o) => acc + o.total, 0),
      orderCount: userOrders.length
    };
  });

  const SidebarItem = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === id ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
    >
      <Icon size={18} />
      <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-[90vh] gap-8 py-8 max-w-7xl mx-auto px-4 reveal-anim">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:flex flex-col gap-2">
        <SidebarItem id="overview" icon={LayoutDashboard} label="Visão Geral" />
        <SidebarItem id="orders" icon={Package} label="Pedidos" />
        <SidebarItem id="products" icon={ShoppingBag} label="Produtos" />
        <SidebarItem id="blog" icon={Rss} label="Blog" />
        <SidebarItem id="customers" icon={User} label="Clientes" />
        <SidebarItem id="settings" icon={Settings} label="Configurações" />
      </aside>

      {/* Main Content */}
      <main className="flex-grow space-y-8">
        
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="glass-panel p-8 rounded-[2rem] border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Pedidos Pendentes</p>
                <h3 className="text-4xl font-hytale text-white">{orders.filter(o => o.status === 'Pendente').length}</h3>
             </div>
             <div className="glass-panel p-8 rounded-[2rem] border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Faturamento Total</p>
                <h3 className="text-3xl font-hytale text-green-400">R$ {orders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}</h3>
             </div>
             <div className="glass-panel p-8 rounded-[2rem] border-white/5">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Heróis Ativos</p>
                <h3 className="text-4xl font-hytale text-white">{customers.length}</h3>
             </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="font-hytale text-3xl text-white uppercase tracking-tighter">FLUXO DE OFERENDAS</h2>
            <div className="space-y-4">
              {orders.length === 0 ? <p className="text-gray-600 text-center py-20 font-bold uppercase tracking-widest">Nenhuma oferenda detectada</p> : orders.map(order => (
                <div key={order.id} className="glass-panel p-6 rounded-3xl border-white/5 flex flex-wrap items-center gap-6">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-indigo-400 font-mono font-black">{order.id}</span>
                      <span className="text-white text-xs font-bold">{order.userId} ({order.userEmail})</span>
                    </div>
                    <div className="flex gap-2">
                      {order.items.map((it, i) => <span key={i} className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400">{it.name} x{it.quantity}</span>)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-hytale text-xl">R$ {order.total.toFixed(2)}</p>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                      className="bg-[#0a0a14] text-[10px] font-black uppercase text-indigo-400 border border-white/10 rounded-lg px-2 py-1 mt-2 focus:outline-none"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Processando">Processando</option>
                      <option value="Entregue">Entregue</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                  <button onClick={() => setSelectedOrder(order)} className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
                    <Eye size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-hytale text-3xl text-white uppercase tracking-tighter">MERCADO ARCANO</h2>
              <button 
                onClick={() => setEditingProduct({ id: 'new', name: '', price: 0, description: '', category: 'rank', image: '' })}
                className="mystic-gradient px-8 py-4 rounded-2xl text-white font-bold flex items-center gap-2 hover:scale-105 transition-all text-xs uppercase"
              >
                <Plus size={18} /> NOVO ARTEFATO
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p.id} className="glass-panel p-5 rounded-3xl border-white/5 flex gap-4 group">
                  <img src={p.image} className="w-20 h-20 rounded-2xl object-cover" />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="text-white font-bold">{p.name}</h4>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingProduct(p)} className="text-indigo-400 hover:text-white p-1"><Edit2 size={16}/></button>
                        <button onClick={() => deleteProduct(p.id)} className="text-red-400 hover:text-white p-1"><Trash2 size={16}/></button>
                      </div>
                    </div>
                    <p className="text-indigo-400 font-black text-sm">R$ {p.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-[10px] uppercase font-bold mt-1 tracking-widest">{p.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-hytale text-3xl text-white uppercase tracking-tighter">ESCRIBA DO REINO</h2>
              <button 
                onClick={() => setEditingPost({ id: 'new', title: '', excerpt: '', content: '', date: '', author: config.serverName, image: '', category: 'Update' })}
                className="mystic-gradient px-8 py-4 rounded-2xl text-white font-bold flex items-center gap-2 hover:scale-105 transition-all text-xs uppercase"
              >
                <Plus size={18} /> NOVA CRÔNICA
              </button>
            </div>
            <div className="space-y-4">
              {blogPosts.map(post => (
                <div key={post.id} className="glass-panel p-6 rounded-3xl border-white/5 flex items-center gap-6">
                  <img src={post.image} className="w-24 h-16 rounded-xl object-cover" />
                  <div className="flex-grow">
                    <h4 className="text-white font-bold text-lg">{post.title}</h4>
                    <p className="text-gray-500 text-xs">{post.date} • {post.author}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setEditingPost(post)} className="p-3 bg-white/5 rounded-xl hover:text-indigo-400 transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => deletePost(post.id)} className="p-3 bg-white/5 rounded-xl hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h2 className="font-hytale text-3xl text-white uppercase tracking-tighter">LENDAS DE ORBIS</h2>
            <div className="glass-panel rounded-3xl border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Herói</th>
                    <th className="px-8 py-5">Email</th>
                    <th className="px-8 py-5">Oferendas</th>
                    <th className="px-8 py-5 text-right">Faturamento</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-white font-medium divide-y divide-white/5">
                  {customers.map((c, i) => (
                    <tr key={i} className="hover:bg-white/2 transition-colors">
                      <td className="px-8 py-5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black">{c.username?.charAt(0)}</div>
                        {c.username}
                      </td>
                      <td className="px-8 py-5 text-gray-400">{c.email}</td>
                      <td className="px-8 py-5">{c.orderCount} pedidos</td>
                      <td className="px-8 py-5 text-right text-indigo-400 font-bold">R$ {c.totalSpent.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 space-y-12">
            <div>
              <h2 className="font-hytale text-3xl text-white uppercase tracking-tighter flex items-center gap-3 mb-8">
                <Settings className="text-indigo-400" /> NÚCLEO DO REINO
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Nome do Servidor</label>
                  <input type="text" value={config.serverName} onChange={(e) => updateConfig('serverName', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">E-mail de Suporte</label>
                  <input type="text" value={config.adminEmail} onChange={(e) => updateConfig('adminEmail', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Endereço IP</label>
                  <input type="text" value={config.serverIP} onChange={(e) => updateConfig('serverIP', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-white/5">
              <h3 className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                <CreditCard size={14} /> FINANÇAS & PAGAMENTO
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">QR Code de Pagamento (PIX)</label>
                  <div className="flex gap-3">
                    <input type="text" value={config.qrCodeUrl} onChange={(e) => updateConfig('qrCodeUrl', e.target.value)} className="flex-grow bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs" placeholder="Link da imagem do QR Code" />
                    <label className="bg-indigo-600 p-4 rounded-2xl cursor-pointer hover:bg-indigo-500 transition-all flex items-center justify-center">
                      <Upload size={18} className="text-white" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => updateConfig('qrCodeUrl', url))} />
                    </label>
                  </div>
                  <p className="text-[9px] text-gray-600 mt-1 ml-2">Esta imagem será mostrada ao jogador no momento do checkout.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-white/5">
              <h3 className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                <Link size={14} /> REDES SOCIAIS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 flex items-center gap-2"><Twitter size={12} /> Twitter</label>
                  <input type="text" value={config.twitterLink} onChange={(e) => updateConfig('twitterLink', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 flex items-center gap-2"><Instagram size={12} /> Instagram</label>
                  <input type="text" value={config.instagramLink} onChange={(e) => updateConfig('instagramLink', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 flex items-center gap-2"><MessageSquare size={12} /> Discord</label>
                  <input type="text" value={config.discordLink} onChange={(e) => updateConfig('discordLink', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs" />
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-white/5">
              <h3 className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                <ImageIcon size={14} /> IDENTIDADE VISUAL
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Logo Principal</label>
                  <div className="flex gap-3">
                    <input type="text" value={config.logoUrl} onChange={(e) => updateConfig('logoUrl', e.target.value)} className="flex-grow bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs" />
                    <label className="bg-indigo-600 p-4 rounded-2xl cursor-pointer hover:bg-indigo-500"><Upload size={18} className="text-white" /><input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => updateConfig('logoUrl', url))} /></label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Símbolo (Fallback)</label>
                  <div className="flex gap-3">
                    <input type="text" value={config.serverIconUrl} onChange={(e) => updateConfig('serverIconUrl', e.target.value)} className="flex-grow bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs" />
                    <label className="bg-indigo-600 p-4 rounded-2xl cursor-pointer hover:bg-indigo-500"><Upload size={18} className="text-white" /><input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => updateConfig('serverIconUrl', url))} /></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL EDITAR PRODUTO */}
      {editingProduct && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="glass-panel w-full max-w-2xl rounded-[3rem] border border-white/10 p-10 space-y-8 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center">
              <h3 className="font-hytale text-2xl text-white uppercase">{editingProduct.id === 'new' ? 'FORJAR ARTEFATO' : 'RECRIAR ARTEFATO'}</h3>
              <button onClick={() => setEditingProduct(null)} className="p-2 text-gray-500 hover:text-white"><X size={24} /></button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Nome</label>
                <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Preço (R$)</label>
                <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Categoria</label>
                <select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})} className="w-full bg-[#0a0a14] border border-white/10 rounded-2xl p-4 text-white">
                  <option value="rank">Rank</option>
                  <option value="coins">Coins</option>
                  <option value="cosmetic">Cosmético</option>
                  <option value="bundle">Bundle</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Imagem (URL/Upload)</label>
                <div className="flex gap-2">
                  <input type="text" value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} className="flex-grow bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs" />
                  <label className="bg-indigo-600 p-4 rounded-xl cursor-pointer"><Upload size={18} /><input type="file" className="hidden" onChange={e => handleFileUpload(e, (url) => setEditingProduct({...editingProduct, image: url}))} /></label>
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Descrição Arcaica</label>
                <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white h-24" />
              </div>
            </div>
            <button onClick={saveProduct} className="w-full mystic-gradient py-5 rounded-2xl font-black text-white text-xs uppercase tracking-widest shadow-2xl">SALVAR NO MERCADO</button>
          </div>
        </div>
      )}

      {/* MODAL EDITAR POST */}
      {editingPost && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="glass-panel w-full max-w-3xl rounded-[3rem] border border-white/10 p-10 space-y-6 animate-in zoom-in duration-300">
             <div className="flex justify-between items-center">
              <h3 className="font-hytale text-2xl text-white uppercase">{editingPost.id === 'new' ? 'ESCREVER CRÔNICA' : 'EDITAR CRÔNICA'}</h3>
              <button onClick={() => setEditingPost(null)} className="p-2 text-gray-500 hover:text-white"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Título da Notícia" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-xl font-bold text-white" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Autor" value={editingPost.author} onChange={e => setEditingPost({...editingPost, author: e.target.value})} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white" />
                <input type="text" placeholder="Categoria" value={editingPost.category} onChange={e => setEditingPost({...editingPost, category: e.target.value})} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white" />
              </div>
              <input type="text" placeholder="URL da Capa" value={editingPost.image} onChange={e => setEditingPost({...editingPost, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white" />
              <textarea placeholder="Resumo curto para o card..." value={editingPost.excerpt} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white h-20" />
              <textarea placeholder="Conteúdo completo da crônica..." value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white h-48" />
            </div>
            <button onClick={savePost} className="w-full mystic-gradient py-5 rounded-2xl font-black text-white text-xs uppercase tracking-widest">PUBLICAR NO REINO</button>
          </div>
        </div>
      )}

      {/* MODAL DETALHES PEDIDO */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="glass-panel w-full max-w-4xl rounded-[4rem] border border-white/10 overflow-hidden flex flex-col md:flex-row h-[85vh] animate-in slide-in-from-bottom-10 duration-500">
             <div className="w-full md:w-1/2 bg-black/40 flex flex-col p-10">
                <h3 className="text-gray-500 font-black text-[10px] uppercase tracking-widest mb-6">Comprovante de Oferenda</h3>
                {selectedOrder.receiptImage ? (
                  <img src={selectedOrder.receiptImage} className="w-full h-full object-contain rounded-3xl border border-white/5" />
                ) : (
                  <div className="flex-grow flex items-center justify-center text-gray-700 font-bold uppercase italic">Sem comprovante</div>
                )}
             </div>
             <div className="flex-grow p-12 space-y-10 overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-white font-mono font-black text-2xl">{selectedOrder.id}</h2>
                    <p className="text-indigo-400 font-bold uppercase text-xs mt-1">{selectedOrder.userId}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="p-3 bg-white/5 rounded-full hover:bg-red-500 transition-colors"><X size={20}/></button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mensagem para o Herói</h4>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={adminMsgInput} 
                      onChange={e => setAdminMsgInput(e.target.value)} 
                      placeholder="Diga algo ao jogador..." 
                      className="flex-grow bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm"
                    />
                    <button onClick={() => sendAdminMessage(selectedOrder.id)} className="bg-indigo-600 p-4 rounded-2xl hover:bg-indigo-500"><Save size={20}/></button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Itens Requeridos</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 bg-white/2 p-4 rounded-2xl border border-white/5">
                        <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="text-white font-bold text-sm">{item.name} <span className="text-indigo-400 ml-2">x{item.quantity}</span></span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                   <div className="text-3xl font-hytale text-white">R$ {selectedOrder.total.toFixed(2)}</div>
                   <button 
                    onClick={() => { handleStatusChange(selectedOrder.id, 'Entregue'); setSelectedOrder(null); }}
                    className="bg-green-600 px-8 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest hover:bg-green-500 flex items-center gap-2"
                   >
                     <CheckCircle size={18} /> CONFIRMAR ENTREGA
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
