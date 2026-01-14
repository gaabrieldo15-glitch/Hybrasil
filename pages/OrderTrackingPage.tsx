
import React from 'react';
import { Package, Clock, CheckCircle2, ShieldAlert, MessageCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingPageProps {
  orders: Order[];
}

const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ orders }) => {
  const getStatusInfo = (status: Order['status']) => {
    switch(status) {
      case 'Processando': return { 
        color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', 
        label: 'EM PROCESSAMENTO',
        desc: 'Os Druidas estão preparando seu artefato.' 
      };
      case 'Entregue': return { 
        color: 'text-green-400 bg-green-400/10 border-green-400/20', 
        label: 'ENTREGUE NO REINO',
        desc: 'O item já foi enviado para sua alma em Orbis!' 
      };
      case 'Cancelado': return { 
        color: 'text-red-400 bg-red-400/10 border-red-400/20', 
        label: 'OFERENDA NEGADA',
        desc: 'Houve um problema com sua oferenda.' 
      };
      default: return { 
        color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', 
        label: 'AGUARDANDO DRUIDAS',
        desc: 'Estamos validando seu comprovante.' 
      };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 reveal-anim">
      <div className="mb-16 flex justify-between items-end">
        <div>
          <h1 className="font-hytale text-6xl text-white uppercase tracking-tighter">MEUS <span className="text-indigo-400">PEDIDOS</span></h1>
          <p className="text-gray-500 mt-2">Histórico privado das suas oferendas em Hybrasil.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-gray-700 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5 animate-pulse">
           <RefreshCw size={12} /> Sincronizado com o Reino
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="glass-panel p-20 rounded-[3rem] text-center border-white/5 opacity-50">
          <Package size={80} className="mx-auto mb-6 text-gray-700" />
          <h3 className="font-hytale text-3xl text-white uppercase">BAÚ VAZIO</h3>
          <p className="text-gray-500 max-w-xs mx-auto mt-4">Você ainda não realizou nenhuma oferenda em nosso mercado arcano.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <div key={order.id} className="glass-panel rounded-[3rem] border-white/5 overflow-hidden hover:border-indigo-500/30 transition-all duration-700">
                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12">
                  <div className="flex-grow space-y-8">
                    <div className="flex flex-wrap items-center gap-6">
                      <span className="text-indigo-400 font-mono text-xl font-black">{order.id}</span>
                      <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      <span className="text-gray-600 text-xs font-bold uppercase">{order.date}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white/2 p-4 rounded-2xl border border-white/5">
                          <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                          <div>
                            <p className="text-white font-bold text-sm">{item.name}</p>
                            <p className="text-indigo-400 text-xs font-black">{item.quantity}x R$ {item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.adminMessage && (
                      <div className="bg-indigo-500/5 border border-indigo-500/20 p-8 rounded-[2rem] space-y-3 relative group">
                        <MessageCircle className="absolute -top-3 -right-3 text-indigo-400 animate-bounce" />
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">MENSAGEM DOS DRUIDAS</p>
                        <p className="text-white text-sm italic font-medium leading-relaxed">"{order.adminMessage}"</p>
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-64 space-y-6">
                     <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 text-center shadow-inner">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Total da Oferenda</p>
                        <p className="text-4xl font-hytale text-white">R$ {order.total.toFixed(2)}</p>
                     </div>
                     <div className="bg-white/2 p-6 rounded-2xl border border-white/5 space-y-2">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Status Atual</p>
                        <div className="flex items-center gap-4">
                           <div className={`w-3 h-3 rounded-full ${order.status === 'Entregue' ? 'bg-green-500' : order.status === 'Cancelado' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                           <span className="text-white text-xs font-bold uppercase">{statusInfo.desc}</span>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
