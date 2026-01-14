
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import BlogPage from './pages/BlogPage';
import AuthPage from './pages/AuthPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AdminDashboard from './pages/AdminDashboard';
import CountdownPage from './pages/CountdownPage';
import { Product, SiteConfig, UserSession, CartItem, BlogPost, Order } from './types';
import { INITIAL_PRODUCTS, INITIAL_CONFIG, INITIAL_BLOG_POSTS } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('hybrasil_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('hybrasil_blog');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });

  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('hybrasil_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('hybrasil_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [session, setSession] = useState<UserSession>(() => {
    const saved = localStorage.getItem('hybrasil_session');
    return saved ? JSON.parse(saved) : { isLoggedIn: false, isAdmin: false, username: '', email: '' };
  });

  // Efeito de Sincronização Global (Cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'hybrasil_orders' && e.newValue) {
        setOrders(JSON.parse(e.newValue));
      }
      if (e.key === 'hybrasil_config' && e.newValue) {
        setConfig(JSON.parse(e.newValue));
      }
      if (e.key === 'hybrasil_products' && e.newValue) {
        setProducts(JSON.parse(e.newValue));
      }
      if (e.key === 'hybrasil_blog' && e.newValue) {
        setBlogPosts(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Persistência de Dados
  useEffect(() => { localStorage.setItem('hybrasil_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('hybrasil_config', JSON.stringify(config)); }, [config]);
  useEffect(() => { localStorage.setItem('hybrasil_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('hybrasil_blog', JSON.stringify(blogPosts)); }, [blogPosts]);
  useEffect(() => { localStorage.setItem('hybrasil_session', JSON.stringify(session)); }, [session]);

  const handleLogin = (userData: UserSession) => setSession(userData);
  const handleLogout = () => setSession({ isLoggedIn: false, isAdmin: false, username: '', email: '' });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };
  const clearCart = () => setCart([]);

  const createOrder = (receiptImage: string) => {
    const newOrder: Order = {
      id: `HYB-${Math.floor(Math.random() * 900000 + 100000)}`,
      userId: session.username,
      userEmail: session.email,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'Pendente',
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      items: [...cart],
      receiptImage: receiptImage
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  if (!session.isLoggedIn) {
    return <AuthPage onLogin={handleLogin} config={config} />;
  }

  if (config.countdownActive && !session.isAdmin) {
    return <CountdownPage config={config} />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen selection:bg-indigo-500/30">
        <Navbar 
          isAdmin={session.isAdmin} 
          onLogout={handleLogout} 
          config={config}
          cart={cart}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onClearCart={clearCart}
          onCreateOrder={createOrder}
        />
        
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage config={config} posts={blogPosts} />} />
            <Route path="/shop" element={<ShopPage products={products} config={config} onAddToCart={addToCart} />} />
            <Route path="/blog" element={<BlogPage posts={blogPosts} />} />
            <Route path="/pedidos" element={<OrderTrackingPage orders={orders.filter(o => o.userEmail === session.email)} />} />
            <Route 
              path="/admin/*" 
              element={
                session.isAdmin ? (
                  <AdminDashboard 
                    config={config} 
                    setConfig={setConfig} 
                    products={products} 
                    setProducts={setProducts}
                    blogPosts={blogPosts}
                    setBlogPosts={setBlogPosts}
                    orders={orders}
                    setOrders={setOrders}
                  />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
          </Routes>
        </main>

        <Footer config={config} />
      </div>
    </Router>
  );
};

export default App;
