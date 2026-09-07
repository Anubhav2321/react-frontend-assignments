import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import './ProductDetails.css';

const ProductDetails = ({ product, onBack }) => {
  const { addToCart } = React.useContext(CartContext);
  const [activeImage, setActiveImage] = useState(product.images ? product.images[0] : product.image);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: { background: '#1f2833', color: '#0ff', border: '1px solid #0ff' },
      iconTheme: { primary: '#0ff', secondary: '#000' }
    });
  };

  return (
    <div className="product-details-container">
      <button className="back-btn cyber-btn" onClick={onBack}>
        <ArrowLeft size={18} /> BACK TO INVENTORY
      </button>

      <div className="details-layout glass-panel">
        <div className="image-gallery">
          <div className="main-image-container">
            <img src={activeImage} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnail-list">
            {(product.images || [product.image]).map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${product.name} view ${idx}`} 
                className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="details-info">
          <div className="brand-tag">{product.brand}</div>
          <h2 className="product-title-large">{product.name}</h2>
          <div className="price-large">₹{product.price.toLocaleString('en-IN')}</div>
          
          <div className="specs-list">
            <h3>SPECIFICATIONS</h3>
            <div className="specs-badges">
              {product.specs.map((spec, i) => (
                <span key={i} className="spec-badge-large">{spec}</span>
              ))}
            </div>
          </div>

          <button className="cyber-btn add-to-cart-large" onClick={handleAddToCart}>
            <ShoppingCart size={22} />
            ADD TO CART
          </button>

          <div className="reviews-section">
            <h3>USER REVIEWS</h3>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="reviews-list">
                {product.reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <span className="review-user">{review.user}</span>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? 'star-filled' : 'star-empty'} />
                        ))}
                      </div>
                    </div>
                    <p className="review-comment">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reviews">No reviews yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
