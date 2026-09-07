import React, { useState, useContext } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import './BillSummary.css';

const BillSummary = () => {
  const { 
    subtotal, 
    discountAmount, 
    gstAmount, 
    grandTotal, 
    couponCode,
    applyCoupon,
    removeCoupon
  } = useContext(CartContext);
  
  const [validating, setValidating] = useState(false);

  const availableCoupons = ["NEON20", "CYBER15", "SPEED10"];

  const handleApplyCoupon = async (codeToApply) => {
    if (!codeToApply) return;

    setValidating(true);
    try {
      const res = await fetch('http://localhost:5000/api/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToApply })
      });
      
      const data = await res.json();
      
      if (data.valid) {
        applyCoupon(codeToApply.toUpperCase(), data.discountPercentage);
        toast.success(data.message, {
          style: { background: '#1f2833', color: '#0ff', border: '1px solid #0ff' },
          iconTheme: { primary: '#0ff', secondary: '#000' }
        });
      } else {
        toast.error(data.message, {
          style: { background: '#1f2833', color: '#f0f', border: '1px solid #f0f' },
          iconTheme: { primary: '#f0f', secondary: '#000' }
        });
      }
    } catch (err) {
      toast.error('Failed to validate coupon.');
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="bill-summary">
      <div className="summary-row">
        <span>SUBTOTAL</span>
        <span className="value">₹{subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
      </div>

      {!couponCode ? (
        <div className="coupon-easy-select">
          <p className="coupon-hint">Available Promos:</p>
          <div className="coupon-buttons">
            {availableCoupons.map(code => (
              <button 
                key={code} 
                className="apply-btn easy-btn" 
                onClick={() => handleApplyCoupon(code)}
                disabled={validating}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="active-coupon">
          <div className="coupon-tag">
            <Check size={14} />
            <span>{couponCode}</span>
          </div>
          <button className="remove-coupon-btn" onClick={removeCoupon}>
            <X size={14} />
          </button>
        </div>
      )}

      {discountAmount > 0 && (
        <div className="summary-row discount-row">
          <span>DISCOUNT</span>
          <span className="value">-₹{discountAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
      )}

      <div className="summary-row gst-row">
        <span>GST (18%)</span>
        <span className="value">₹{gstAmount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row grand-total">
        <span>GRAND TOTAL</span>
        <span className="value glow-text">₹{grandTotal.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
      </div>
    </div>
  );
};

export default BillSummary;
