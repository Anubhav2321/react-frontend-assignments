import React, { useState } from 'react';
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
          className="admin-fab cyber-btn" 
          onClick={() => setIsAddProductOpen(true)}
        >
          + ADD PRODUCT
        </button>
      </div>
    </CartProvider>
  );
}

export default App;
