import React, { useContext, useState } from 'react';
import { X } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import CartItem from './CartItem';
import BillSummary from './BillSummary';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, onOrderPlaced }) => {
  const { items, clearCart, grandTotal } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);

    const payload = {
      items: items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
      total: grandTotal
    };

    setTimeout(() => {
      const stored = localStorage.getItem('luxeAuraOrders');
      let orders = stored ? JSON.parse(stored) : [];
      
      const newOrder = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
        items: payload.items,
        total: payload.total,
        status: 'Processing'
      };
      
      orders.push(newOrder);
      localStorage.setItem('luxeAuraOrders', JSON.stringify(orders));
      
      setIsProcessing(false);
      clearCart();
      toast.success(`ORDER ${newOrder.id} PLACED SUCCESSFULLY!`, {
        style: { background: '#f9f9fb', color: '#1a1a1a', border: '1px solid #d4af37' },
        iconTheme: { primary: '#d4af37', secondary: '#fff' }
      });
      if(onOrderPlaced) onOrderPlaced();
    }, 800);
  };

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}
      
      <div className={`cart-drawer glass-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>SHOPPING <span className="logo-highlight">CART</span></h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>NO PRODUCTS SELECTED.</p>
              <div className="glitch-line"></div>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <BillSummary />
            <button 
              className="premium-btn checkout-btn" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'PROCESSING...' : 'SECURE CHECKOUT'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
