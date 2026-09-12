import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import OrdersView from './components/OrdersView';
import CartDrawer from './components/CartDrawer';
import AddProductModal from './components/AddProductModal';
import './index.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'product', 'orders'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('luxeAuraTheme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('luxeAuraTheme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navigateTo = (view, data = null) => {
    setCurrentView(view);
    if (view === 'product' && data) {
      setSelectedProduct(data);
    } else {
      setSelectedProduct(null);
    }
  };

  return (
    <CartProvider>
      <div className="app-container">
        <Toaster position="bottom-right" />
        <Navbar 
          toggleCart={() => setIsCartOpen(!isCartOpen)} 
          navigateTo={navigateTo} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <main>
          {currentView === 'home' && (
            <ProductList onSelectProduct={(prod) => navigateTo('product', prod)} />
          )}
          {currentView === 'product' && selectedProduct && (
            <ProductDetails 
              product={selectedProduct} 
              onBack={() => navigateTo('home')} 
            />
          )}
          {currentView === 'orders' && (
            <OrdersView onBack={() => navigateTo('home')} />
          )}
        </main>
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          onOrderPlaced={() => {
            setIsCartOpen(false);
            navigateTo('orders');
          }}
        />

        <AddProductModal 
          isOpen={isAddProductOpen} 
          onClose={() => setIsAddProductOpen(false)} 
        />
        
        <button 
          className="admin-fab premium-btn" 
          onClick={() => setIsAddProductOpen(true)}
        >
          + ADD PRODUCT
        </button>
      </div>
    </CartProvider>
  );
}

export default App;
