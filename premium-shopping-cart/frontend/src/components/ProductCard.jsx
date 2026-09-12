import React, { useContext } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product, onSelectProduct }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: '#1f2833',
        color: '#0ff',
        border: '1px solid #0ff',
      },
      iconTheme: {
        primary: '#0ff',
        secondary: '#000',
      },
    });
  };

  return (
    <div className="product-card glass-panel">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-brand-tag">{product.brand}</div>
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-specs">
          {product.specs.map((spec, index) => (
            <span key={index} className="spec-badge">{spec}</span>
          ))}
        </div>
        
        <div className="product-footer">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          <div className="card-actions" style={{ display: 'flex', gap: '8px' }}>
            <button className="premium-btn" style={{ padding: '8px' }} onClick={() => onSelectProduct(product)} title="View Details">
              <Eye size={18} />
            </button>
            <button className="premium-btn add-btn" onClick={handleAddToCart}>
              <ShoppingCart size={18} />
              <span>ADD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
