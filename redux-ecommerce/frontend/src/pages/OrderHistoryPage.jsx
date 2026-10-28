import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PackageCheck,
  Calendar,
  Truck,
  ChevronDown,
  ChevronUp,
  MapPin,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import {
  fetchUserOrders,
  selectOrders,
  selectOrdersStatus,
  selectOrdersError,
} from '../features/orders/ordersSlice.js';
import PriceDisplay from '../components/common/PriceDisplay.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import SafeImage from '../components/common/SafeImage.jsx';

export const OrderHistoryPage = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectOrdersStatus);
  const error = useAppSelector(selectOrdersError);

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container" style={{ paddingBottom: '4rem', maxWidth: '960px' }}>
      <Breadcrumbs items={[{ label: 'Account', path: '/account' }, { label: 'Order History' }]} />

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Order History
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
          Track and view invoices for all purchases placed with your account
        </p>
      </div>

      {status === 'loading' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[1, 2].map((i) => (
            <div key={i} className="card skeleton" style={{ height: '160px', borderRadius: 'var(--radius-xl)' }} />
          ))}
        </div>
      )}

      {status === 'failed' && (
        <div
          style={{
            backgroundColor: 'var(--danger-bg)',
            color: 'var(--danger-text)',
            border: '1px solid var(--danger-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertCircle size={22} />
            <div>
              <p style={{ fontWeight: 600 }}>Failed to fetch orders</p>
              <p style={{ fontSize: '0.85rem' }}>{error}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dispatch(fetchUserOrders())}
            className="btn btn-primary btn-sm"
          >
            Retry
          </button>
        </div>
      )}

      {status !== 'loading' && orders.length === 0 && (
        <EmptyState
          icon={PackageCheck}
          title="No orders placed yet"
          description="When you check out items from your cart, your confirmed invoices and tracking details will appear here."
          actionText="Browse Catalog"
          actionLink="/products"
        />
      )}

      {orders.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order._id;
            const dateStr = new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={order._id}
                className="card"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s ease',
                }}
              >
                {/* Order Summary Header Bar */}
                <div
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    backgroundColor: 'var(--bg-surface)',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Order ID</p>
                      <p style={{ fontSize: '0.925rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary-700)' }}>
                        #{order._id}
                      </p>
                    </div>

                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date</p>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {dateStr}
                      </p>
                    </div>

                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total</p>
                      <PriceDisplay price={order.total} size="sm" />
                    </div>

                    <div>
                      <span className="badge badge-success" style={{ fontSize: '0.8rem', padding: '0.25rem 0.65rem' }}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleOrderDetails(order._id)}
                    className="btn btn-secondary btn-sm"
                    style={{ marginLeft: 'auto' }}
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                {/* Collapsible Order Breakdown */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '1.75rem',
                      borderTop: '1px solid var(--border-light)',
                      backgroundColor: 'var(--bg-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem',
                    }}
                  >
                    {/* Items Purchased */}
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                        Items in this Order ({order.items.length})
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              backgroundColor: 'var(--bg-surface)',
                              padding: '0.75rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--border-light)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {item.image && (
                                <SafeImage
                                  src={item.image}
                                  alt={item.title}
                                  category={item.category}
                                  style={{
                                    width: '44px',
                                    height: '44px',
                                    objectFit: 'contain',
                                    borderRadius: 'var(--radius-sm)',
                                  }}
                                />
                              )}
                              <div>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                  {item.title}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                  Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <PriceDisplay price={item.itemTotal} size="sm" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address & Cost Summary */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '1.5rem',
                        backgroundColor: 'var(--bg-surface)',
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                          <MapPin size={16} color="var(--primary-600)" />
                          <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            Delivering To
                          </h5>
                        </div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{order.shippingAddress.fullName}</p>
                        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{order.shippingAddress.street}</p>
                        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                        </p>
                        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{order.shippingAddress.country}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tel: {order.shippingAddress.phone}</p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                          <span>Subtotal</span>
                          <PriceDisplay price={order.subtotal} size="sm" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                          <span>Shipping</span>
                          <span>{order.shippingCost === 0 ? 'FREE' : `₹${order.shippingCost.toFixed(2)}`}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                          <span>GST (5%)</span>
                          <PriceDisplay price={order.tax} size="sm" />
                        </div>
                        <div
                          style={{
                            borderTop: '1px solid var(--border-light)',
                            paddingTop: '0.5rem',
                            marginTop: '0.25rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                          }}
                        >
                          <span>Grand Total</span>
                          <PriceDisplay price={order.total} size="md" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;

