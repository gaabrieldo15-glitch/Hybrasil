
import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight, X, Sparkles, Clock } from 'lucide-react';

interface BlogPageProps {
  posts: BlogPost[];
}

const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 reveal-anim">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-indigo-500/20">
          <Sparkles size={12} /> Biblioteca de Orbis
        </div>
        <h1 className="font-fantasy text-6xl font-black text-white mb-4 uppercase tracking-tighter">
          CRÔNICAS DE <span className="bg-clip-text text-transparent mystic-gradient">HYBRASIL</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Mantenha-se informado sobre os eventos, atualizações e histórias do nosso reino.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {posts.map((post) => (
          <article key={post.id} className="group glass-panel rounded-[3rem] overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all duration-500 flex flex-col h-full">
            <div className="relative h-72 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-indigo-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
                {post.category}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] to-transparent opacity-60"></div>
            </div>
            <div className="p-10 flex flex-col flex-grow">
              <div className="flex items-center gap-6 text-[10px] text-gray-500 font-black uppercase tracking-widest mb-6">
                <span className="flex items-center gap-2"><Calendar size={14} className="text-indigo-400" /> {post.date}</span>
                <span className="flex items-center gap-2"><User size={14} className="text-indigo-400" /> {post.author}</span>
              </div>
              <h2 className="font-fantasy text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight line-clamp-2">{post.title}</h2>
              <p className="text-gray-400 mb-8 leading-relaxed line-clamp-3 flex-grow">{post.excerpt}</p>
              <button 
                onClick={() => setSelectedPost(post)}
                className="flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.2em] group/btn transition-all hover:text-indigo-400"
              >
                CONTINUAR LENDO <ArrowRight className="w-4 h-4 text-indigo-400 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal de Leitura Imersiva */}
      {selectedPost && (
        <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
          <div className="absolute inset-0 z-0 opacity-20" onClick={() => setSelectedPost(null)}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/10 blur-[200px] rounded-full"></div>
          </div>
          
          <div className="relative z-10 glass-panel w-full max-w-5xl rounded-[3.5rem] border border-white/10 overflow-hidden reveal-anim flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-8 right-8 z-50 p-4 bg-white/5 hover:bg-red-500 text-white rounded-full transition-all group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>

            <div className="overflow-y-auto custom-scrollbar">
              <div className="relative h-[40vh] md:h-[50vh]">
                <img src={selectedPost.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/20 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-6 shadow-xl">
                    {selectedPost.category}
                   </div>
                   <h2 className="font-fantasy text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
                     {selectedPost.title}
                   </h2>
                </div>
              </div>

              <div className="p-8 md:p-16 space-y-10">
                <div className="flex flex-wrap items-center gap-10 border-b border-white/5 pb-10">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                         <User className="text-indigo-400" size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Escrito por</p>
                         <p className="text-white font-bold">{selectedPost.author}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                         <Calendar className="text-indigo-400" size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Data Estelar</p>
                         <p className="text-white font-bold">{selectedPost.date}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                         <Clock className="text-indigo-400" size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Leitura</p>
                         <p className="text-white font-bold">5 min</p>
                      </div>
                   </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-indigo-200/80 text-xl font-medium leading-relaxed italic mb-10">
                    "{selectedPost.excerpt}"
                  </p>
                  <div className="text-gray-300 text-lg leading-[2] space-y-8 font-light whitespace-pre-wrap">
                    {selectedPost.content}
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex justify-center">
                   <button 
                    onClick={() => setSelectedPost(null)}
                    className="mystic-gradient px-12 py-5 rounded-2xl text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-indigo-600/20"
                   >
                     VOLTAR À BIBLIOTECA
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
