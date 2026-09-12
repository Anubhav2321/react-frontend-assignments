import React, { useContext } from 'react';
import { ShoppingCart, Package, Moon, Sun } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ toggleCart, navigateTo, theme, toggleTheme }) => {
  const { totalItems } = useContext(CartContext);

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <div className="logo-section" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
          <img src="/images/logo.jpg" alt="LuxeAura Logo" style={{ height: '40px', borderRadius: '4px', marginRight: '10px' }} />
          <h1 className="logo-text">Luxe<span className="logo-highlight">Aura</span></h1>
        </div>
        
        <div className="nav-actions">
          <button className="premium-btn-outline" style={{ marginRight: '15px', padding: '8px', border: 'none' }} onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>
          <button className="premium-btn" style={{ marginRight: '15px' }} onClick={() => navigateTo('orders')}>
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
