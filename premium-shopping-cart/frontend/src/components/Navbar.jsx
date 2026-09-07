import React, { useContext } from 'react';
import { ShoppingCart, Hexagon, Package } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ toggleCart, navigateTo }) => {
  const { totalItems } = useContext(CartContext);

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <div className="logo-section" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
          <Hexagon className="logo-icon neon-glow" size={32} />
          <h1 className="logo-text">NEON<span className="logo-highlight">MART</span></h1>
        </div>
        
        <div className="nav-actions">
          <button className="cyber-btn" style={{ marginRight: '15px' }} onClick={() => navigateTo('orders')}>
            <Package size={20} style={{ marginRight: '8px' }} />
            ORDERS
          </button>
          <button className="cart-btn" onClick={toggleCart}>
            <ShoppingCart size={28} className="cart-icon" />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
