import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        borderTop: '1px solid #1e293b',
        marginTop: 'auto',
      }}
    >
      {/* Trust Badges Banner */}
      <div style={{ borderBottom: '1px solid #1e293b', padding: '2.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: '#818cf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Truck size={22} />
              </div>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '0.925rem', fontWeight: 600 }}>Free Delivery</h4>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Complimentary shipping on orders over ₹999</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: '#818cf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Lock size={22} />
              </div>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '0.925rem', fontWeight: 600 }}>Secure Checkout</h4>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Simulated end-to-end encrypted checkout</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: '#818cf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <RefreshCw size={22} />
              </div>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '0.925rem', fontWeight: 600 }}>30-Day Returns</h4>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Hassle-free exchange & return guarantee</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: '#818cf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '0.925rem', fontWeight: 600 }}>Authentic Quality</h4>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Verified curated external catalogue</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{ padding: '3.5rem 0 2rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2.5rem',
              marginBottom: '3rem',
            }}
          >
            {/* Col 1: Brand */}
            <div>
              <Link
                to="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 800,
                  fontSize: '1.35rem',
                  color: '#ffffff',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--primary-600)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingBag size={18} />
                </div>
                <span>
                  Shop<span style={{ color: '#818cf8' }}>Sphere</span>
                </span>
              </Link>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8', maxWidth: '300px' }}>
                Elevating everyday living with carefully curated fashion, electronics, and lifestyle products. Built with the complete MERN stack.
              </p>
            </div>

            {/* Col 2: Shop */}
            <div>
              <h5 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Shop Catalog
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <li><Link to="/products" style={{ color: '#94a3b8' }}>All Products</Link></li>
                <li><Link to="/products?category=electronics" style={{ color: '#94a3b8' }}>Electronics</Link></li>
                <li><Link to="/products?category=jewelery" style={{ color: '#94a3b8' }}>Jewelry</Link></li>
                <li><Link to="/products?category=men's clothing" style={{ color: '#94a3b8' }}>Men's Fashion</Link></li>
                <li><Link to="/products?category=women's clothing" style={{ color: '#94a3b8' }}>Women's Fashion</Link></li>
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div>
              <h5 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Customer Care
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <li><Link to="/cart" style={{ color: '#94a3b8' }}>View Cart</Link></li>
                <li><Link to="/orders" style={{ color: '#94a3b8' }}>Track Orders</Link></li>
                <li><Link to="/account" style={{ color: '#94a3b8' }}>My Account</Link></li>
                <li><span style={{ color: '#64748b' }}>Shipping Policy</span></li>
                <li><span style={{ color: '#64748b' }}>Privacy & Terms</span></li>
              </ul>
            </div>

            {/* Col 4: Architecture */}
            <div>
              <h5 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Technical Foundation
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {['React 19', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Vite', 'Vitest'].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#1e293b',
                      borderRadius: 'var(--radius-sm)',
                      color: '#cbd5e1',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
                Production-style architecture with authoritative server-side price recalculation & JWT authentication.
              </p>
            </div>
          </div>

          <div
            style={{
              paddingTop: '2rem',
              borderTop: '1px solid #1e293b',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              fontSize: '0.825rem',
            }}
          >
            <p>© {new Date().getFullYear()} ShopSphere Inc. All rights reserved.</p>
            <p style={{ color: '#64748b' }}>Crafted for modern, high-performance commerce.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

