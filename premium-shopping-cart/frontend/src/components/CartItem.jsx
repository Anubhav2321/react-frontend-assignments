import React, { useContext } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { increaseQty, decreaseQty, removeItem } = useContext(CartContext);

  return (
    <div className="cart-item">
      <div className="cart-item-img-container">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <div className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</div>
        
        <div className="cart-item-controls">
          <div className="qty-controls">
            <button className="qty-btn" onClick={() => decreaseQty(item.id)}>
              <Minus size={14} />
            </button>
            <span className="qty-display">{item.quantity}</span>
            <button className="qty-btn" onClick={() => increaseQty(item.id)}>
              <Plus size={14} />
            </button>
          </div>
          
          <button className="remove-btn" onClick={() => removeItem(item.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
