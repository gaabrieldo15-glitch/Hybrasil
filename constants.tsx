
import React from 'react';
import { Shield, Coins, Sparkles, Box, Crown } from 'lucide-react';
import { BlogPost, Product, SiteConfig } from './types';

export const CATEGORY_ICONS = {
  rank: <Crown className="w-5 h-5 text-yellow-400" />,
  coins: <Coins className="w-5 h-5 text-cyan-400" />,
  cosmetic: <Sparkles className="w-5 h-5 text-purple-400" />,
  bundle: <Box className="w-5 h-5 text-pink-400" />
};

export const HYBRASIL_LOGO = "https://storage.googleapis.com/pigeon-strategy-350508.appspot.com/e37d559e-e314-46c5-a13f-91d6c382173e.png";
export const PAYMENT_QR_CODE = "https://storage.googleapis.com/pigeon-strategy-350508.appspot.com/7968565b-f06a-4952-b91a-7b83047240a1.png";
export const DEFAULT_ICON = "https://storage.googleapis.com/pigeon-strategy-350508.appspot.com/e37d559e-e314-46c5-a13f-91d6c382173e.png";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Eldritch Sovereign',
    price: 149.90,
    description: 'O posto mais alto de Hybrasil. Comande as energias do servidor com kits exclusivos e permissões de lenda.',
    category: 'rank',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    name: 'Essência de Mana (100k)',
    price: 45.00,
    description: 'Poderosa reserva de mana concentrada para transações mágicas em Orbis.',
    category: 'coins',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '3',
    name: 'Capa das Sombras',
    price: 29.90,
    description: 'Um cosmético raro que emana partículas de escuridão pura ao caminhar.',
    category: 'cosmetic',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '4',
    name: 'Kit Pioneiro de Orbis',
    price: 89.90,
    description: 'O pacote completo para novos exploradores: Rank Bronze + 50k Mana + Kit Inicial.',
    category: 'bundle',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'O Despertar de Orbis',
    excerpt: 'Antigas ruínas foram descobertas ao norte do mapa. O que elas escondem?',
    content: 'Exploradores relatam luzes estranhas emanando das profundezas de Orbis. Anciões dizem que o portal para Hybrasil está mais forte do que nunca.',
    date: '15/10/2024',
    author: 'Gab15',
    category: 'Evento',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_CONFIG: SiteConfig = {
  serverName: 'Hybrasil Místico',
  serverIP: 'jogar.hybrasil.com',
  discordLink: 'https://discord.gg/hybrasil',
  twitterLink: 'https://twitter.com/hybrasil',
  instagramLink: 'https://instagram.com/hybrasil',
  announcement: '✨ ECLIPSE DE INVERNO: Ranks com 30% de desconto!',
  heroImage: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=2070',
  logoUrl: HYBRASIL_LOGO,
  serverIconUrl: DEFAULT_ICON,
  qrCodeUrl: PAYMENT_QR_CODE,
  adminEmail: 'gaabrieldo15@gmail.com',
  footerAbout: 'O Hybrasil não é afiliado à Hypixel Studios ou à Mojang AB. Hytale é uma marca registrada da Hypixel Studios.',
  footerCopyright: 'TODOS OS DIREITOS RESERVADOS © 2024 HYBRASIL NETWORK',
  countdownActive: false,
  countdownDate: new Date(Date.now() + 604800000).toISOString(),
  countdownMessage: 'O Portal de Hybrasil se abrirá em breve. Prepare sua alma.'
};

export const ADMIN_CREDENTIALS = {
  username: 'Gab15',
  email: 'gaabrieldo15@gmail.com',
  password: '@Supernigga125674'
};
