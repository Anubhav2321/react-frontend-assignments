import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Truck, Calendar, MapPin } from 'lucide-react';
import PriceDisplay from '../components/common/PriceDisplay.jsx';
import SafeImage from '../components/common/SafeImage.jsx';

export const OrderConfirmationPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="container" style={{ padding: '3rem 1rem 5rem', maxWidth: '800px' }}>
      {/* Success Hero Header */}
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'var(--bg-surface)',
          padding: '3rem 2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--success-bg)',
            color: 'var(--success-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}
        >
          <CheckCircle2 size={36} />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          Thank You For Your Order!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
          Your order has been verified and placed successfully into our database.
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--bg-subtle)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span>Order ID:</span>
          <strong style={{ color: 'var(--primary-600)', fontFamily: 'monospace', letterSpacing: '0.025em' }}>
            #{order._id}
          </strong>
        </div>
      </div>

      {/* Details Card */}
      <div
        className="card"
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
        }}
      >
        {/* Order Meta Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.25rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Calendar size={18} color="var(--primary-600)" />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date Placed</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{formattedDate}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Package size={18} color="var(--primary-600)" />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Order Status</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#059669' }}>{order.status}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Truck size={18} color="var(--primary-600)" />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payment Method</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Ordered Items List */}
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Purchased Items
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem 0',
                  borderBottom: idx < order.items.length - 1 ? '1px solid var(--border-light)' : 'none',
                }}
              >
                {item.image && (
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    category={item.category}
                    style={{
                      width: '54px',
                      height: '54px',
                      objectFit: 'contain',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: '#ffffff',
                      border: '1px solid var(--border-light)',
                      padding: '4px',
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                  </p>
                </div>
                <PriceDisplay price={item.itemTotal} size="md" />
              </div>
            ))}
          </div>
        </div>

        {/* Financial Breakdown & Shipping Address */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          {/* Shipping Summary */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <MapPin size={18} color="var(--primary-600)" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Shipping Details
              </h4>
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {order.shippingAddress.fullName}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {order.shippingAddress.street}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {order.shippingAddress.country}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Tel: {order.shippingAddress.phone}
            </p>
          </div>

          {/* Pricing Totals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <PriceDisplay price={order.subtotal} size="sm" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Shipping</span>
              <span>
                {order.shippingCost === 0 ? (
                  <span style={{ color: '#059669', fontWeight: 600 }}>FREE</span>
                ) : (
                  <PriceDisplay price={order.shippingCost} size="sm" />
                )}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>GST (5%)</span>
              <PriceDisplay price={order.tax} size="sm" />
            </div>
            <div
              style={{
                borderTop: '1.5px solid var(--border-light)',
                paddingTop: '0.75rem',
                marginTop: '0.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Paid Total
              </span>
              <PriceDisplay price={order.total} size="lg" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem' }}>
          <Link to="/orders" className="btn btn-primary" style={{ flex: 1 }}>
            <span>View All Orders</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/products" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

