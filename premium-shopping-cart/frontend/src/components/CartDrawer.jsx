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

    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setIsProcessing(false);
        clearCart();
        toast.success(`ORDER ${data.id} PLACED SUCCESSFULLY!`, {
          style: { background: '#1f2833', color: '#0ff', border: '1px solid #0ff' },
          iconTheme: { primary: '#0ff', secondary: '#000' }
        });
        if(onOrderPlaced) onOrderPlaced();
      })
      .catch(err => {
        setIsProcessing(false);
        toast.error('Checkout failed. System error.');
      });
  };

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}
      
      <div className={`cart-drawer glass-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>TERMINAL <span className="logo-highlight">CART</span></h2>
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
              className="cyber-btn checkout-btn" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'PROCESSING...' : 'INITIALIZE CHECKOUT'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
