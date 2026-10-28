import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../app/hooks.js';
import { addToCart } from '../../features/cart/cartSlice.js';
import PriceDisplay from '../common/PriceDisplay.jsx';
import RatingStars from '../common/RatingStars.jsx';
import SafeImage from '../common/SafeImage.jsx';

export const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(addToCart({ product, quantity: 1 }));
    setAdded(true);
    toast.success(`Added ${product.title.slice(0, 24)}... to cart!`, {
      icon: '🛍️',
      duration: 2500,
    });

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <article
      className="card product-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Category Pill Tag */}
      <div
        style={{
          position: 'absolute',
          top: '0.85rem',
          left: '0.85rem',
          zIndex: 2,
        }}
      >
        <span className="badge badge-primary">{product.category}</span>
      </div>

      {/* Image Container */}
      <Link
        to={`/products/${product.id}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '240px',
          padding: '1.75rem',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-light)',
          overflow: 'hidden',
        }}
      >
        <SafeImage
          src={product.image}
          alt={product.title}
          category={product.category}
          loading="lazy"
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </Link>

      {/* Card Body */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          gap: '0.85rem',
        }}
      >
        <div>
          {/* Rating */}
          <div style={{ marginBottom: '0.4rem' }}>
            <RatingStars rate={product.rating?.rate} count={product.rating?.count} size={14} />
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: '0.975rem',
              fontWeight: 600,
              lineHeight: 1.4,
              color: 'var(--text-primary)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            <Link
              to={`/products/${product.id}`}
              style={{ color: 'inherit', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-600)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              {product.title}
            </Link>
          </h3>
        </div>

        {/* Footer info: Price & Add button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <PriceDisplay price={product.price} size="md" />

          <button
            type="button"
            onClick={handleAddToCart}
            className={`btn btn-sm ${added ? 'btn-secondary' : 'btn-primary'}`}
            style={{
              minWidth: '105px',
              backgroundColor: added ? '#ecfdf5' : undefined,
              borderColor: added ? '#a7f3d0' : undefined,
              color: added ? '#065f46' : undefined,
            }}
            aria-label={`Add ${product.title} to cart`}
          >
            {added ? (
              <>
                <Check size={15} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={15} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

