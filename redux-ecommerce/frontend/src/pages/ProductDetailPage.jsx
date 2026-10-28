import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import {
  fetchProductById,
  clearCurrentProduct,
  selectCurrentProduct,
  selectCurrentProductStatus,
  selectCurrentProductError,
  selectAllProducts,
  fetchProducts,
} from '../features/products/productsSlice.js';
import { addToCart } from '../features/cart/cartSlice.js';
import PriceDisplay from '../components/common/PriceDisplay.jsx';
import RatingStars from '../components/common/RatingStars.jsx';
import QuantitySelector from '../components/common/QuantitySelector.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import SafeImage from '../components/common/SafeImage.jsx';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useAppSelector(selectCurrentProduct);
  const status = useAppSelector(selectCurrentProductStatus);
  const error = useAppSelector(selectCurrentProductError);
  const allProducts = useAppSelector(selectAllProducts);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      if (allProducts.length === 0) {
        dispatch(fetchProducts());
      }
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity }));
    setAdded(true);
    toast.success(`Added ${quantity} item(s) to your cart!`, { icon: '🛍️' });
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity }));
    navigate('/checkout');
  };

  if (status === 'loading') {
    return (
      <div className="container" style={{ padding: '3rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          <div className="skeleton" style={{ height: '440px', borderRadius: 'var(--radius-xl)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="skeleton" style={{ width: '30%', height: '24px' }} />
            <div className="skeleton" style={{ width: '85%', height: '36px' }} />
            <div className="skeleton" style={{ width: '40%', height: '28px' }} />
            <div className="skeleton" style={{ width: '100%', height: '120px' }} />
            <div className="skeleton" style={{ width: '60%', height: '48px', borderRadius: 'var(--radius-md)' }} />
          </div>
        </div>
      </div>
    );
  }

  if (status === 'failed' || (!product && status === 'succeeded')) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-surface)',
            padding: '2.5rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
          }}
        >
          <AlertCircle size={48} color="#dc2626" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Product Not Found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {error || "The product you requested doesn't exist or is currently unavailable."}
          </p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} /> Return to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  // Related products from the same category
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <Breadcrumbs
        items={[
          { label: 'Catalog', path: '/products' },
          { label: product.category, path: `/products?category=${product.category}` },
          { label: product.title },
        ]}
      />

      {/* Main Product Showcase */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          backgroundColor: 'var(--bg-surface)',
          padding: '2.5rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '4rem',
        }}
        className="product-detail-card"
      >
        {/* Left: Product Image */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--border-light)',
            minHeight: '400px',
            maxHeight: '520px',
          }}
        >
          <SafeImage
            src={product.image}
            alt={product.title}
            category={product.category}
            style={{
              maxHeight: '380px',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Right: Product Info & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
              {product.category}
            </span>
            <h1
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
                marginBottom: '0.75rem',
              }}
            >
              {product.title}
            </h1>
            <RatingStars rate={product.rating?.rate} count={product.rating?.count} size={18} />
          </div>

          <div
            style={{
              padding: '1rem 0',
              borderTop: '1px solid var(--border-light)',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
            }}
          >
            <PriceDisplay price={product.price} size="xl" />
            <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <CheckCircle2 size={16} /> In Stock & Ready to Ship
            </span>
          </div>

          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
              Description
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {product.description}
            </p>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Quantity:
              </span>
              <QuantitySelector quantity={quantity} onChange={setQuantity} min={1} max={20} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem' }}>
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg"
                style={{ flex: '1 1 200px' }}
              >
                <ShoppingBag size={18} />
                <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="btn btn-secondary btn-lg"
                style={{ flex: '1 1 160px', borderColor: 'var(--primary-600)', color: 'var(--primary-700)' }}
              >
                <Zap size={18} />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Guarantees Box */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.75rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              marginTop: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              <Truck size={16} color="var(--primary-600)" />
              <span>Free delivery over ₹999</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              <RotateCcw size={16} color="var(--primary-600)" />
              <span>30-day money-back guarantee</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} color="var(--primary-600)" />
              <span>Verified genuine item</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            More in {product.category}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 640px) {
          .product-detail-card {
            padding: 1.25rem !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;

