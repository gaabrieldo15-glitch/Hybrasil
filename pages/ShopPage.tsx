
import React, { useState } from 'react';
import { Product, SiteConfig } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { ShoppingCart, Search, Filter, Sparkles, Package } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  config: SiteConfig;
  onAddToCart: (p: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ products, config, onAddToCart }) => {
  const [filter, setFilter] = useState<'all' | Product['category']>('all');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-indigo-500/20">
          <Sparkles size={12} /> Itens de Hybrasil
        </div>
        <h1 className="font-fantasy text-5xl md:text-8xl font-black mb-4 tracking-tighter text-white uppercase">
          MERCADO <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">ARCANO</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">Fortaleça sua jornada e apoie o crescimento do nosso reino místico em Orbis.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-72 space-y-8">
          <div className="glass-panel p-8 rounded-[2rem] border border-white/5 sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-white font-bold uppercase text-xs tracking-widest opacity-60">
              <Filter className="w-4 h-4" /> Categorias
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => setFilter('all')}
                className={`w-full text-left px-5 py-3 rounded-xl transition-all text-sm font-bold ${filter === 'all' ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:bg-white/5'}`}
              >
                Todos os Artefatos
              </button>
              {(['rank', 'coins', 'cosmetic', 'bundle'] as const).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`w-full text-left px-5 py-3 rounded-xl transition-all flex items-center gap-3 text-sm font-bold ${filter === cat ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:bg-white/5'}`}
                >
                  <span className="opacity-80">{(CATEGORY_ICONS as any)[cat]}</span>
                  <span className="capitalize">{cat === 'bundle' ? 'Pacotes' : cat === 'coins' ? 'Moedas' : cat === 'cosmetic' ? 'Cosméticos' : 'Ranks'}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-grow space-y-8">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Pesquisar artefatos raros..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-[2rem] py-6 pl-14 pr-8 focus:outline-none focus:border-indigo-500/50 transition-all text-white placeholder:text-gray-700 shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.length === 0 ? (
               <div className="col-span-full py-20 text-center opacity-30">
                 <Package size={64} className="mx-auto mb-4" />
                 <p className="font-bold uppercase tracking-widest">Nenhum artefato encontrado</p>
               </div>
            ) : filteredProducts.map((product) => (
              <div key={product.id} className="group glass-panel rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col h-full hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1">
                <div className="relative h-60 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                    {(CATEGORY_ICONS as any)[product.category]}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Oferenda</p>
                      <p className="text-2xl font-black text-white">R$ {product.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="mystic-gradient p-4 rounded-2xl text-white hover:scale-110 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
