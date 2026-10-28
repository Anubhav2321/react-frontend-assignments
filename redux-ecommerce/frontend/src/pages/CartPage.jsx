import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartEstimatedShipping,
  selectCartEstimatedTax,
  selectCartEstimatedTotal,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../features/cart/cartSlice.js';
import PriceDisplay from '../components/common/PriceDisplay.jsx';
import QuantitySelector from '../components/common/QuantitySelector.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ConfirmationModal from '../components/common/ConfirmationModal.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import SafeImage from '../components/common/SafeImage.jsx';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const shipping = useAppSelector(selectCartEstimatedShipping);
  const tax = useAppSelector(selectCartEstimatedTax);
  const total = useAppSelector(selectCartEstimatedTotal);

  const [clearModalOpen, setClearModalOpen] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
    setClearModalOpen(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />
        <EmptyState
          icon={ShoppingBag}
          title="Your shopping cart is empty"
          description="Looks like you haven't added anything to your cart yet. Explore our premier selection of items."
          actionText="Discover Products"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Shopping Cart ({cartItems.length})
        </h1>
        <button
          type="button"
          onClick={() => setClearModalOpen(true)}
          style={{
            fontSize: '0.85rem',
            color: 'var(--danger-text)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <Trash2 size={15} />
          <span>Clear Cart</span>
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '2.5rem',
          alignItems: 'start',
        }}
        className="cart-layout"
      >
        {/* Left: Items Table / List */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cartItems.map((item, index) => {
              const lineTotal = item.price * item.quantity;

              return (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr auto auto',
                    gap: '1.25rem',
                    padding: '1.5rem',
                    alignItems: 'center',
                    borderBottom: index < cartItems.length - 1 ? '1px solid var(--border-light)' : 'none',
                  }}
                  className="cart-item-row"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/products/${item.id}`}
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#ffffff',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      category={item.category}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Link>

                  {/* Title & Category */}
                  <div>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                      {item.category}
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                      <Link to={`/products/${item.id}`} style={{ color: 'inherit' }}>
                        {item.title}
                      </Link>
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                      Unit price: ₹{item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <QuantitySelector
                      quantity={item.quantity}
                      size="sm"
                      onChange={(newQty) => dispatch(updateQuantity({ id: item.id, quantity: newQty }))}
                    />
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      style={{
                        color: 'var(--text-muted)',
                        padding: '0.4rem',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--danger-text)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div style={{ textAlign: 'right', minWidth: '85px' }}>
                    <PriceDisplay price={lineTotal} size="md" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <aside
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.925rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <PriceDisplay price={subtotal} size="sm" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Estimated Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span style={{ color: '#059669', fontWeight: 600 }}>FREE</span>
                ) : (
                  <PriceDisplay price={shipping} size="sm" />
                )}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Estimated GST (5%)</span>
              <PriceDisplay price={tax} size="sm" />
            </div>

            {subtotal > 0 && subtotal < 999 && (
              <div
                style={{
                  backgroundColor: 'var(--accent-gold-bg)',
                  border: '1px solid #fde68a',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.8rem',
                  color: '#92400e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Truck size={16} />
                <span>Add ₹{(999 - subtotal).toFixed(2)} more for Free Delivery!</span>
              </div>
            )}

            <div
              style={{
                borderTop: '1px solid var(--border-light)',
                paddingTop: '0.85rem',
                marginTop: '0.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Estimated Total
              </span>
              <PriceDisplay price={total} size="lg" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>

          <Link
            to="/products"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', textAlign: 'center' }}
          >
            Continue Shopping
          </Link>

          <div
            style={{
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={16} color="var(--primary-600)" />
            <span>Guaranteed Safe & Secure Checkout</span>
          </div>
        </aside>
      </div>

      <ConfirmationModal
        isOpen={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        onConfirm={handleClearCart}
        title="Empty Shopping Cart?"
        message="Are you sure you want to remove all items from your shopping cart? This cannot be undone."
        confirmText="Yes, Clear Cart"
      />

      <style>{`
        @media (max-width: 840px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
          }
          .cart-item-row {
            grid-template-columns: 70px 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;

