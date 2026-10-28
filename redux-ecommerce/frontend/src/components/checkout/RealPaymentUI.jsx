import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone,
  Building2,
  Banknote,
  Check,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects.js';
import PriceDisplay from '../common/PriceDisplay.jsx';

// High-fidelity SVG Logos for UPI Apps, Cards, and Indian Banks
export const UPIAppLogos = {
  GPay: () => (
    <svg viewBox="0 0 48 48" width="28" height="28">
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  ),
  PhonePe: () => (
    <svg viewBox="0 0 100 100" width="28" height="28">
      <circle cx="50" cy="50" r="48" fill="#5f259f"/>
      <path fill="#ffffff" d="M35 22h18c12 0 20 8 20 18 0 11-7 18-18 18H45v20H35V22zm10 26h8c6 0 10-3 10-8s-4-8-10-8h-8v16z"/>
      <path fill="#00d084" d="M62 60l14 18H62l-9-12 9-6z"/>
    </svg>
  ),
  Paytm: () => (
    <svg viewBox="0 0 120 40" width="48" height="22">
      <rect width="120" height="40" rx="8" fill="#002e6e"/>
      <text x="12" y="27" fill="#00b9f5" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22">pay</text>
      <text x="56" y="27" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22">tm</text>
    </svg>
  ),
  BHIM: () => (
    <svg viewBox="0 0 60 40" width="36" height="24">
      <rect width="60" height="40" rx="6" fill="#f97316"/>
      <path d="M12 8h16c6 0 10 3 10 8s-4 8-10 8H12V8zm8 11h7c3 0 5-1 5-3s-2-3-5-3h-7v6z" fill="#ffffff"/>
      <path d="M32 20l12 12H30l-6-6 8-6z" fill="#16a34a"/>
    </svg>
  ),
  Cred: () => (
    <svg viewBox="0 0 40 40" width="26" height="26">
      <rect width="40" height="40" rx="8" fill="#18181b"/>
      <path d="M10 12h20v4H10zm0 8h16v4H10zm0 8h12v4H10z" fill="#f4f4f5"/>
    </svg>
  ),
  AmazonPay: () => (
    <svg viewBox="0 0 80 40" width="44" height="22">
      <rect width="80" height="40" rx="6" fill="#232f3e"/>
      <text x="10" y="25" fill="#ff9900" fontFamily="sans-serif" fontWeight="900" fontSize="16">pay</text>
    </svg>
  ),
};

export const CardLogos = {
  Visa: () => (
    <svg viewBox="0 0 60 36" width="38" height="22">
      <rect width="60" height="36" rx="4" fill="#1a1f71"/>
      <text x="8" y="24" fill="#ffffff" fontStyle="italic" fontWeight="900" fontSize="18" fontFamily="sans-serif">VISA</text>
    </svg>
  ),
  Mastercard: () => (
    <svg viewBox="0 0 60 36" width="38" height="22">
      <rect width="60" height="36" rx="4" fill="#222222"/>
      <circle cx="24" cy="18" r="11" fill="#eb001b"/>
      <circle cx="36" cy="18" r="11" fill="#f79e1b" fillOpacity="0.88"/>
    </svg>
  ),
  RuPay: () => (
    <svg viewBox="0 0 60 36" width="38" height="22">
      <rect width="60" height="36" rx="4" fill="#092854"/>
      <text x="6" y="24" fill="#00a3e0" fontWeight="900" fontSize="15" fontFamily="sans-serif">Ru</text>
      <text x="28" y="24" fill="#f37021" fontWeight="900" fontSize="15" fontFamily="sans-serif">Pay</text>
    </svg>
  ),
};

export const BankLogos = {
  HDFC: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ width: '24px', height: '24px', backgroundColor: '#004c8f', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900, fontSize: '10px' }}>H</div>
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>HDFC Bank</span>
    </div>
  ),
  SBI: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ width: '24px', height: '24px', backgroundColor: '#280071', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00b5ef', fontWeight: 900, fontSize: '11px' }}>●</div>
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>State Bank of India</span>
    </div>
  ),
  ICICI: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ width: '24px', height: '24px', backgroundColor: '#b02a30', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f58220', fontWeight: 900, fontSize: '10px' }}>i</div>
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>ICICI Bank</span>
    </div>
  ),
  Axis: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ width: '24px', height: '24px', backgroundColor: '#97144d', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900, fontSize: '10px' }}>▲</div>
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Axis Bank</span>
    </div>
  ),
  Kotak: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ width: '24px', height: '24px', backgroundColor: '#ed1c24', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900, fontSize: '10px' }}>K</div>
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Kotak Bank</span>
    </div>
  ),
};

export const RealPaymentUI = ({
  amount = 0,
  onPaymentComplete,
  isProcessing = false,
}) => {
  // Tabs: 'upi' | 'card' | 'netbanking' | 'cod'
  const [activeTab, setActiveTab] = useState('upi');

  // UPI sub-modes: 'apps' | 'qr' | 'id'
  const [upiSubMode, setUpiSubMode] = useState('apps');
  const [selectedUpiApp, setSelectedUpiApp] = useState('GPay');
  const [upiId, setUpiId] = useState('');

  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Net banking
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Sound & Animation State
  const [animatingPayment, setAnimatingPayment] = useState(false);
  const [animationStep, setAnimationStep] = useState(1); // 1: Connect, 2: Process, 3: Success

  const handleTabChange = (tab) => {
    soundEffects.playSelectClick();
    setActiveTab(tab);
  };

  const handleUpiAppSelect = (appKey) => {
    soundEffects.playSelectClick();
    setSelectedUpiApp(appKey);
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const parts = cleaned.match(/[\s\S]{1,4}/g) || [];
    return parts.join(' ');
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const triggerPaymentFlow = () => {
    setAnimatingPayment(true);
    setAnimationStep(1);

    // Step 1: Connecting to Gateway
    setTimeout(() => {
      setAnimationStep(2);
    }, 1100);

    // Step 2: Processing Payment
    setTimeout(() => {
      setAnimationStep(3);
      // Play celebratory UPI chime!
      soundEffects.playPaymentSuccessChime();
    }, 2400);

    // Step 3: Complete & Notify Parent
    setTimeout(() => {
      setAnimatingPayment(false);
      let paymentSummary = '';
      if (activeTab === 'upi') {
        paymentSummary = `UPI (${selectedUpiApp || 'UPI ID'})`;
      } else if (activeTab === 'card') {
        paymentSummary = `Credit/Debit Card (Ending in ${cardNumber.slice(-4) || '8821'})`;
      } else if (activeTab === 'netbanking') {
        paymentSummary = `Net Banking (${selectedBank} Bank)`;
      } else {
        paymentSummary = 'Cash on Delivery (COD)';
      }
      onPaymentComplete(paymentSummary);
    }, 3600);
  };

  return (
    <div
      className="card"
      style={{
        padding: '1.75rem',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Payment Method
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              100% Encrypted & RBI Verified Indian Gateway
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#059669', fontWeight: 600, backgroundColor: 'var(--success-bg)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)' }}>
          <Lock size={13} />
          <span>256-Bit SSL</span>
        </div>
      </div>

      {/* Payment Navigation Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.35rem',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <button
          type="button"
          onClick={() => handleTabChange('upi')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            padding: '0.65rem 0.5rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.85rem',
            backgroundColor: activeTab === 'upi' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'upi' ? 'var(--primary-600)' : 'var(--text-secondary)',
            boxShadow: activeTab === 'upi' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <Smartphone size={16} />
          <span>UPI / QR</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('card')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            padding: '0.65rem 0.5rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.85rem',
            backgroundColor: activeTab === 'card' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'card' ? 'var(--primary-600)' : 'var(--text-secondary)',
            boxShadow: activeTab === 'card' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <CreditCard size={16} />
          <span>Cards</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('netbanking')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            padding: '0.65rem 0.5rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.85rem',
            backgroundColor: activeTab === 'netbanking' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'netbanking' ? 'var(--primary-600)' : 'var(--text-secondary)',
            boxShadow: activeTab === 'netbanking' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <Building2 size={16} />
          <span>Net Banking</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('cod')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            padding: '0.65rem 0.5rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.85rem',
            backgroundColor: activeTab === 'cod' ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === 'cod' ? 'var(--primary-600)' : 'var(--text-secondary)',
            boxShadow: activeTab === 'cod' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.15s ease',
          }}
        >
          <Banknote size={16} />
          <span>COD</span>
        </button>
      </div>

      {/* Tab 1: UPI Options */}
      {activeTab === 'upi' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Sub-toggle: Popular Apps vs Scan QR vs Enter UPI ID */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { id: 'apps', label: 'Popular UPI Apps' },
              { id: 'qr', label: 'Scan QR Code' },
              { id: 'id', label: 'Enter UPI ID' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setUpiSubMode(mode.id)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: '1.5px solid',
                  borderColor: upiSubMode === mode.id ? 'var(--primary-600)' : 'var(--border-medium)',
                  backgroundColor: upiSubMode === mode.id ? 'var(--primary-50)' : 'transparent',
                  color: upiSubMode === mode.id ? 'var(--primary-700)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Submode A: Popular UPI Apps */}
          {upiSubMode === 'apps' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
              }}
            >
              {[
                { key: 'GPay', name: 'Google Pay', Logo: UPIAppLogos.GPay },
                { key: 'PhonePe', name: 'PhonePe', Logo: UPIAppLogos.PhonePe },
                { key: 'Paytm', name: 'Paytm', Logo: UPIAppLogos.Paytm },
                { key: 'BHIM', name: 'BHIM UPI', Logo: UPIAppLogos.BHIM },
                { key: 'Cred', name: 'CRED Pay', Logo: UPIAppLogos.Cred },
                { key: 'AmazonPay', name: 'Amazon Pay', Logo: UPIAppLogos.AmazonPay },
              ].map(({ key, name, Logo }) => {
                const isSelected = selectedUpiApp === key;
                return (
                  <div
                    key={key}
                    onClick={() => handleUpiAppSelect(key)}
                    style={{
                      border: '2px solid',
                      borderColor: isSelected ? 'var(--primary-600)' : 'var(--border-light)',
                      backgroundColor: isSelected ? 'var(--primary-50)' : 'var(--bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '0.9rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative',
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-600)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Check size={10} strokeWidth={3} />
                      </div>
                    )}
                    <Logo />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Submode B: QR Code Scanner */}
          {upiSubMode === 'qr' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'var(--bg-subtle)',
                padding: '1.75rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--border-medium)',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  padding: '1rem',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {/* Visual SVG QR Code */}
                <svg width="150" height="150" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="#ffffff" />
                  {/* Outer corners */}
                  <rect x="10" y="10" width="25" height="25" fill="#0f172a" />
                  <rect x="14" y="14" width="17" height="17" fill="#ffffff" />
                  <rect x="18" y="18" width="9" height="9" fill="#0f172a" />

                  <rect x="65" y="10" width="25" height="25" fill="#0f172a" />
                  <rect x="69" y="14" width="17" height="17" fill="#ffffff" />
                  <rect x="73" y="18" width="9" height="9" fill="#0f172a" />

                  <rect x="10" y="65" width="25" height="25" fill="#0f172a" />
                  <rect x="14" y="69" width="17" height="17" fill="#ffffff" />
                  <rect x="18" y="73" width="9" height="9" fill="#0f172a" />

                  {/* QR Pattern dots */}
                  <rect x="42" y="12" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="12" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="24" width="6" height="6" fill="#0f172a" />
                  <rect x="50" y="32" width="6" height="6" fill="#0f172a" />
                  <rect x="12" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="24" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="36" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="48" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="60" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="72" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="56" width="6" height="6" fill="#0f172a" />
                  <rect x="54" y="56" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="68" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="80" width="6" height="6" fill="#0f172a" />
                  <rect x="70" y="68" width="16" height="16" fill="#4f46e5" />
                </svg>

                {/* Animated Scanner Laser Beam */}
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    right: '15px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #4f46e5, transparent)',
                    boxShadow: '0 0 8px #4f46e5',
                    animation: 'scanLaser 2s ease-in-out infinite alternate',
                  }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Scan with any UPI App (GPay, PhonePe, Paytm)
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  UPI ID: <strong style={{ color: 'var(--primary-600)' }}>shopsphere@upi</strong>
                </p>
              </div>
            </div>
          )}

          {/* Submode C: Enter UPI ID */}
          {upiSubMode === 'id' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label className="form-label">Virtual Payment Address (VPA / UPI ID)</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="mobilenumber@upi or name@okhdfcbank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="form-input"
                  style={{ flex: 1 }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['@okhdfcbank', '@okaxis', '@ybl', '@paytm', '@ibl'].map((suffix) => (
                  <button
                    key={suffix}
                    type="button"
                    onClick={() => {
                      const prefix = upiId.split('@')[0] || 'yourname';
                      setUpiId(`${prefix}${suffix}`);
                    }}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    {suffix}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Credit / Debit Cards */}
      {activeTab === 'card' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Virtual ATM Card Preview */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
              color: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              minHeight: '170px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em' }}>SHOPSPHERE PLATINUM</span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <CardLogos.RuPay />
                <CardLogos.Visa />
                <CardLogos.Mastercard />
              </div>
            </div>

            <p style={{ fontFamily: 'monospace', fontSize: '1.25rem', letterSpacing: '0.15em', fontWeight: 700 }}>
              {cardNumber || '•••• •••• •••• ••••'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <div>
                <span style={{ opacity: 0.7, display: 'block', fontSize: '0.65rem' }}>Cardholder</span>
                <span style={{ fontWeight: 700 }}>{cardHolder || 'CUSTOMER NAME'}</span>
              </div>
              <div>
                <span style={{ opacity: 0.7, display: 'block', fontSize: '0.65rem' }}>Expires</span>
                <span style={{ fontWeight: 700 }}>{cardExpiry || 'MM/YY'}</span>
              </div>
            </div>
          </div>

          {/* Card Input Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label className="form-label">Card Number</label>
              <input
                type="text"
                placeholder="4532 8901 2345 6789"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className="form-input"
                maxLength={19}
              />
            </div>

            <div>
              <label className="form-label">Name on Card</label>
              <input
                type="text"
                placeholder="Rahul Sharma"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                className="form-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                  className="form-input"
                  maxLength={5}
                />
              </div>

              <div>
                <label className="form-label">CVV / CVC</label>
                <input
                  type="password"
                  placeholder="•••"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.slice(0, 4))}
                  className="form-input"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Net Banking */}
      {activeTab === 'netbanking' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label className="form-label">Select Popular Indian Bank</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { id: 'HDFC', Component: BankLogos.HDFC },
              { id: 'SBI', Component: BankLogos.SBI },
              { id: 'ICICI', Component: BankLogos.ICICI },
              { id: 'Axis', Component: BankLogos.Axis },
              { id: 'Kotak', Component: BankLogos.Kotak },
            ].map(({ id, Component }) => {
              const isSelected = selectedBank === id;
              return (
                <div
                  key={id}
                  onClick={() => {
                    soundEffects.playSelectClick();
                    setSelectedBank(id);
                  }}
                  style={{
                    border: '1.5px solid',
                    borderColor: isSelected ? 'var(--primary-600)' : 'var(--border-light)',
                    backgroundColor: isSelected ? 'var(--primary-50)' : 'var(--bg-surface)',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Component />
                  {isSelected && <Check size={16} color="var(--primary-600)" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Cash on Delivery (COD) */}
      {activeTab === 'cod' && (
        <div
          style={{
            backgroundColor: 'var(--bg-subtle)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            border: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontWeight: 700 }}>
            <Banknote size={20} />
            <span>Pay on Delivery Available</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            You can pay with Cash or scan the delivery agent's dynamic UPI QR code when your package arrives at your doorstep.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={14} /> Zero convenience fee. Valid mobile OTP confirmation will be sent.
          </div>
        </div>
      )}

      {/* Action Pay Button */}
      <button
        type="button"
        onClick={triggerPaymentFlow}
        disabled={isProcessing || animatingPayment}
        className="btn btn-primary btn-lg"
        style={{
          width: '100%',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          fontWeight: 800,
          boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
        }}
      >
        <Lock size={18} />
        <span>Pay</span>
        <PriceDisplay price={amount} size="md" className="text-white" />
        <ArrowRight size={18} />
      </button>

      {/* Animated Payment Processing Modal Overlay */}
      {animatingPayment && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              width: '100%',
              maxWidth: '420px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Step 1 & 2: Processing Radar Ring */}
            {animationStep < 3 ? (
              <>
                <div
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      border: '3px solid var(--primary-100)',
                      borderTopColor: 'var(--primary-600)',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-50)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-600)',
                    }}
                  >
                    <Lock size={26} />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {animationStep === 1 ? 'Contacting UPI Gateway...' : 'Verifying Bank Transaction...'}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Please do not refresh or close this browser window.
                </p>

                {/* Progress bar */}
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'var(--border-light)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: 'var(--primary-600)',
                      width: animationStep === 1 ? '50%' : '88%',
                      transition: 'width 1s ease-in-out',
                    }}
                  />
                </div>
              </>
            ) : (
              /* Step 3: Payment Success with Sound Chime! */
              <>
                <div
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    backgroundColor: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 0 10px rgba(16, 185, 129, 0.15)',
                    animation: 'scaleIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  }}
                >
                  <CheckCircle2 size={48} strokeWidth={2.5} />
                </div>

                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: 'var(--primary-50)',
                      color: 'var(--primary-700)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Sparkles size={12} />
                    <span>UPI PAYMENT CONFIRMED</span>
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#059669' }}>
                    Payment Successful!
                  </h3>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    width: '100%',
                    fontSize: '0.875rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Amount Paid:</span>
                    <PriceDisplay price={amount} size="md" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    <span>Ref No:</span>
                    <span style={{ fontFamily: 'monospace' }}>UPI/2026/89410928</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Finalizing order receipt in database...
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes scanLaser {
          0% { top: 15px; }
          100% { top: 135px; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default RealPaymentUI;
