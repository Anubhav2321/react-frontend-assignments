import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Truck,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartEstimatedShipping,
  selectCartEstimatedTax,
  selectCartEstimatedTotal,
  clearCart,
} from '../features/cart/cartSlice.js';
import { selectCurrentUser } from '../features/auth/authSlice.js';
import {
  createOrder,
  selectOrderCreateStatus,
  selectOrdersError,
} from '../features/orders/ordersSlice.js';
import PriceDisplay from '../components/common/PriceDisplay.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import RealPaymentUI from '../components/checkout/RealPaymentUI.jsx';
import SafeImage from '../components/common/SafeImage.jsx';

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectCurrentUser);
  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const shipping = useAppSelector(selectCartEstimatedShipping);
  const tax = useAppSelector(selectCartEstimatedTax);
  const estimatedTotal = useAppSelector(selectCartEstimatedTotal);

  const createStatus = useAppSelector(selectOrderCreateStatus);
  const orderError = useAppSelector(selectOrdersError);

  const [shippingForm, setShippingForm] = useState({
    fullName: user?.name || '',
    street: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    country: 'India',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const errors = {};
    if (!shippingForm.fullName.trim()) errors.fullName = 'Full name is required';
    if (!shippingForm.street.trim()) errors.street = 'Street address / Flat No is required';
    if (!shippingForm.city.trim()) errors.city = 'City is required';
    if (!shippingForm.state.trim()) errors.state = 'State is required';
    if (!shippingForm.postalCode.trim()) errors.postalCode = 'PIN code is required';
    if (!shippingForm.phone.trim()) errors.phone = 'Contact 10-digit phone number is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSuccess = async (paymentMethodName) => {
    if (!validate()) {
      toast.error('Please complete your shipping address before paying');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      navigate('/products');
      return;
    }

    try {
      const payload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        shippingAddress: shippingForm,
        paymentMethod: paymentMethodName || 'UPI (Google Pay)',
      };

      const createdOrder = await dispatch(createOrder(payload)).unwrap();

      // On successful backend order creation:
      dispatch(clearCart());
      toast.success('Order placed successfully!', { icon: '🎉' });
      navigate('/order-confirmation', { state: { order: createdOrder } });
    } catch (err) {
      toast.error(err || 'Failed to place order');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          Your cart is currently empty
        </h2>
        <Link to="/products" className="btn btn-primary">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <Breadcrumbs
        items={[
          { label: 'Cart', path: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem' }}>
        Express Checkout
      </h1>

      {orderError && (
        <div
          style={{
            backgroundColor: 'var(--danger-bg)',
            color: 'var(--danger-text)',
            border: '1px solid var(--danger-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <AlertCircle size={20} />
          <span>{orderError}</span>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '2.5rem',
          alignItems: 'start',
        }}
        className="checkout-layout"
      >
        {/* Left Column: Shipping Address & Real Payment UI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Shipping Address Section */}
          <div
            className="card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
              <Truck size={22} color="var(--primary-600)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                1. Delivery Address
              </h2>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="ship-fullName">
                Full Name *
              </label>
              <input
                id="ship-fullName"
                name="fullName"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={shippingForm.fullName}
                onChange={handleInputChange}
                className="form-input"
              />
              {formErrors.fullName && <p className="form-error">{formErrors.fullName}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="ship-street">
                Flat, House No., Building, Street *
              </label>
              <input
                id="ship-street"
                name="street"
                type="text"
                placeholder="e.g. 402, Sea Green Apartments, MG Road"
                value={shippingForm.street}
                onChange={handleInputChange}
                className="form-input"
              />
              {formErrors.street && <p className="form-error">{formErrors.street}</p>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="ship-city">
                  City / Town *
                </label>
                <input
                  id="ship-city"
                  name="city"
                  type="text"
                  placeholder="e.g. Mumbai, Bengaluru, Delhi"
                  value={shippingForm.city}
                  onChange={handleInputChange}
                  className="form-input"
                />
                {formErrors.city && <p className="form-error">{formErrors.city}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ship-state">
                  State *
                </label>
                <input
                  id="ship-state"
                  name="state"
                  type="text"
                  placeholder="e.g. Maharashtra, Karnataka"
                  value={shippingForm.state}
                  onChange={handleInputChange}
                  className="form-input"
                />
                {formErrors.state && <p className="form-error">{formErrors.state}</p>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="ship-postalCode">
                  6-Digit PIN Code *
                </label>
                <input
                  id="ship-postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="e.g. 400001"
                  value={shippingForm.postalCode}
                  onChange={handleInputChange}
                  className="form-input"
                />
                {formErrors.postalCode && <p className="form-error">{formErrors.postalCode}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ship-country">
                  Country *
                </label>
                <select
                  id="ship-country"
                  name="country"
                  value={shippingForm.country}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="ship-phone">
                Mobile Number (for delivery updates) *
              </label>
              <input
                id="ship-phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={shippingForm.phone}
                onChange={handleInputChange}
                className="form-input"
              />
              {formErrors.phone && <p className="form-error">{formErrors.phone}</p>}
            </div>
          </div>

          {/* Real Payment UI Component with Sound & Animation */}
          <RealPaymentUI
            amount={estimatedTotal}
            onPaymentComplete={handlePaymentSuccess}
            isProcessing={createStatus === 'loading'}
          />
        </div>

        {/* Right Column: Order Review Panel */}
        <aside
          className="card"
          style={{
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            position: 'sticky',
            top: 'calc(var(--header-height) + 1.5rem)',
          }}
        >
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Review Items ({cartItems.length})
          </h3>

          <div
            style={{
              maxHeight: '260px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              paddingRight: '0.5rem',
            }}
          >
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  category={item.category}
                  style={{
                    width: '44px',
                    height: '44px',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#ffffff',
                    padding: '2px',
                    border: '1px solid var(--border-light)',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.title}
                  </p>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                  </p>
                </div>
                <PriceDisplay price={item.price * item.quantity} size="sm" />
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Subtotal</span>
              <PriceDisplay price={subtotal} size="sm" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span style={{ color: '#059669', fontWeight: 600 }}>FREE</span>
                ) : (
                  <PriceDisplay price={shipping} size="sm" />
                )}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>GST (5%)</span>
              <PriceDisplay price={tax} size="sm" />
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-light)',
                paddingTop: '0.75rem',
                marginTop: '0.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Final Total
              </span>
              <PriceDisplay price={estimatedTotal} size="lg" />
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 840px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
