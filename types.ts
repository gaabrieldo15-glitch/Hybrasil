
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'rank' | 'coins' | 'cosmetic' | 'bundle';
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  date: string;
  status: 'Pendente' | 'Processando' | 'Entregue' | 'Cancelado';
  total: number;
  items: CartItem[];
  receiptImage?: string; // URL ou Base64 do comprovante
  adminMessage?: string; // Mensagem do admin para o cliente
}

export interface SiteConfig {
  serverName: string;
  serverIP: string;
  discordLink: string;
  twitterLink: string; // Novo
  instagramLink: string; // Novo
  announcement: string;
  heroImage: string;
  logoUrl: string;
  serverIconUrl: string;
  qrCodeUrl: string;
  adminEmail: string;
  footerAbout: string;
  footerCopyright: string;
  countdownActive: boolean;
  countdownDate: string;
  countdownMessage: string;
}

export interface UserSession {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  email: string;
}
