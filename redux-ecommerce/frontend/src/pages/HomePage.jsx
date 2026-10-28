import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  Send,
  Zap,
  Clock,
  Copy,
  Check,
  Star,
  ShoppingBag,
  Flame,
  BadgeCheck,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import {
  fetchProducts,
  selectFeaturedProducts,
  selectTrendingProducts,
  selectProductsStatus,
  setSelectedCategory,
} from '../features/products/productsSlice.js';
import ProductGrid from '../components/products/ProductGrid.jsx';
import PriceDisplay from '../components/common/PriceDisplay.jsx';
import SafeImage from '../components/common/SafeImage.jsx';
import { soundEffects } from '../utils/soundEffects.js';
import toast from 'react-hot-toast';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useAppSelector(selectProductsStatus);
  const featuredProducts = useAppSelector(selectFeaturedProducts);
  const trendingProducts = useAppSelector(selectTrendingProducts);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Live Flash Sale Countdown Timer (Simulated remaining time)
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 19 });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (cat) => {
    soundEffects.playSelectClick();
    dispatch(setSelectedCategory(cat));
    navigate('/products');
  };

  const handleCopyCode = () => {
    soundEffects.playSelectClick();
    navigator.clipboard.writeText('FESTIVE15');
    setCopiedCode(true);
    toast.success('Coupon FESTIVE15 copied to clipboard! Enjoy 15% OFF.', {
      icon: '🎉',
    });
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    soundEffects.playPaymentSuccessChime();
    toast.success('VIP Pass Unlocked! 15% discount applied for your account.', {
      icon: '🎁',
      duration: 4000,
    });
    setNewsletterEmail('');
  };

  const categories = [
    {
      name: 'Electronics',
      slug: 'electronics',
      gradient: 'linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(147, 51, 234, 0.85) 100%)',
      accentColor: '#818cf8',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      description: 'Audio, 4K displays & smart accessories',
      count: '6 Products',
    },
    {
      name: 'Precious Jewelry',
      slug: 'jewelery',
      gradient: 'linear-gradient(135deg, rgba(217, 119, 6, 0.9) 0%, rgba(180, 83, 9, 0.85) 100%)',
      accentColor: '#fbbf24',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
      description: 'Gold station bracelets & silver rings',
      count: '4 Products',
    },
    {
      name: "Men's Apparel",
      slug: "men's clothing",
      gradient: 'linear-gradient(135deg, rgba(13, 148, 136, 0.9) 0%, rgba(15, 118, 110, 0.85) 100%)',
      accentColor: '#2dd4bf',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80',
      description: 'Premium jackets, t-shirts & slim fits',
      count: '4 Products',
    },
    {
      name: "Women's Fashion",
      slug: "women's clothing",
      gradient: 'linear-gradient(135deg, rgba(225, 29, 72, 0.9) 0%, rgba(190, 18, 60, 0.85) 100%)',
      accentColor: '#fb7185',
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&auto=format&fit=crop&q=80',
      description: 'Windbreakers, winter coats & casual tops',
      count: '6 Products',
    },
  ];

  const testimonials = [
    {
      name: 'Ananya Deshmukh',
      city: 'Bengaluru, Karnataka',
      rating: 5,
      comment: 'Ordered the Fjallraven backpack. Delivery arrived in 2 days in mint packaging, and the UPI payment with GPay was instant and smooth!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      verified: true,
    },
    {
      name: 'Rohan Mehta',
      city: 'Mumbai, Maharashtra',
      rating: 5,
      comment: 'The Acer full HD monitor was verified on the backend with exact Indian INR pricing. Dark mode looks incredible on OLED displays.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      verified: true,
    },
    {
      name: 'Priya Iyer',
      city: 'Chennai, Tamil Nadu',
      rating: 5,
      comment: 'Loved the dragon station bracelet. The simulated payment with QR scan sound effect was so satisfying! Highly recommend.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      verified: true,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
      {/* 1. Flash Deals Announcement Header Bar with Live Countdown */}
      <div
        style={{
          background: 'linear-gradient(90deg, #3730a3 0%, #6b21a8 50%, #9d174d 100%)',
          color: '#ffffff',
          padding: '0.65rem 1rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <Flame size={14} style={{ color: '#fbbf24' }} /> FESTIVAL SALE
            </span>
            <span>Flat 15% OFF Storewide with instant UPI & RuPay Card discounts!</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'monospace', fontWeight: 700 }}>
              <Clock size={15} />
              <span>Ends In:</span>
              <span style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              :
              <span style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              :
              <span style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              style={{
                backgroundColor: '#ffffff',
                color: '#4338ca',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                cursor: 'pointer',
              }}
              title="Copy Coupon Code"
            >
              {copiedCode ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedCode ? 'COPIED' : 'FESTIVE15'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Visual Modern Hero Section with Fluid Gradients & Floating Glassmorphic Showcase */}
      <section
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #17153a 45%, #2a1147 100%)',
          color: '#ffffff',
          padding: '4.5rem 0 5.5rem',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
        }}
      >
        {/* Ambient Gradient Glow Lights */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '5%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '3.5rem',
              alignItems: 'center',
            }}
            className="hero-grid-layout"
          >
            {/* Left Hero Column: Copy & Calls to Action */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#e0e7ff',
                  width: 'fit-content',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Sparkles size={16} style={{ color: '#fbbf24' }} />
                <span>India's Premier Digital Storefront</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5.2vw, 3.85rem)',
                  fontWeight: 900,
                  lineHeight: 1.15,
                  letterSpacing: '-0.035em',
                }}
              >
                Curated Luxury &{' '}
                <span className="text-gradient">Modern Tech</span>.
              </h1>

              <p
                style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.6,
                  color: '#cbd5e1',
                  maxWidth: '540px',
                }}
              >
                Discover authentic jewelry, premium apparel, and audio essentials. Powered by instant UPI checkout, full price recalculation in Indian Rupees (₹), and fast delivery across India.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem' }}>
                <Link to="/products" className="btn btn-gradient btn-lg">
                  <span>Explore Collection</span>
                  <ArrowRight size={18} />
                </Link>

                <button
                  type="button"
                  onClick={() => handleCategoryClick('electronics')}
                  className="btn btn-secondary btn-lg"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Sparkles size={17} style={{ color: '#fbbf24' }} />
                  <span>Trending Electronics</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: '0.85rem',
                  color: '#cbd5e1',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Star size={16} fill="#eab308" stroke="#eab308" />
                  <span><strong>4.9/5</strong> (12k+ Indian Shoppers)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Zap size={16} color="#38bdf8" />
                  <span>Free Express Delivery over ₹999</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} color="#34d399" />
                  <span>100% Encrypted UPI & Cards</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Floating 3D Showcase Card with Badges */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '420px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1.5px solid rgba(255, 255, 255, 0.18)',
                  padding: '2rem',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem',
                }}
              >
                {/* Floating Micro Badge Top Left */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '-14px',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Sparkles size={14} /> ₹9,345.75 • Top Seller
                </div>

                {/* Floating Micro Badge Bottom Right */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-12px',
                    right: '-10px',
                    backgroundColor: '#4f46e5',
                    color: '#ffffff',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Zap size={14} /> Same-day Dispatch
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '240px',
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <SafeImage
                    src={featuredProducts[0]?.image || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png'}
                    alt="Featured Product"
                    category="men's clothing"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))',
                    }}
                  />
                </div>

                <div style={{ width: '100%', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    FEATURED SPOTLIGHT
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginTop: '0.2rem' }}>
                    Fjallraven No. 1 Backpack (15" Laptop)
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                    <PriceDisplay price={9345.75} size="lg" className="text-white" />
                    <Link to="/products/1" className="btn btn-sm btn-gradient">
                      View Item →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Shortcuts with Vibrant Gradient Cards */}
      <section className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2rem',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: 'var(--primary-600)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              EXPLORE CURATED COLLECTIONS
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              Shop by Category
            </h2>
          </div>
          <Link
            to="/products"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontWeight: 700,
              color: 'var(--primary-600)',
              fontSize: '0.95rem',
            }}
          >
            <span>All Categories</span>
            <ArrowRight size={17} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                height: '260px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="gradient-card-glow"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
              />
              {/* Vibrant Gradient Color Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: cat.gradient,
                  opacity: 0.88,
                  mixBlendMode: 'multiply',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 65%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.75rem',
                  color: '#ffffff',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: cat.accentColor,
                    textTransform: 'uppercase',
                    marginBottom: '0.25rem',
                  }}
                >
                  {cat.count}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Dual Promotional Split Banners with Modern Gradient Accents */}
      <section className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {/* Banner 1: Audio / Tech */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
              color: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '340px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                AUDIO & PERIPHERALS
              </span>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 900, marginTop: '0.3rem', lineHeight: 1.25 }}>
                Ultra-Wide Displays & Fast Storage
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.5rem' }}>
                Up to 30% savings with instant UPI cashback on electronics.
              </p>
            </div>
            <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
              <button
                type="button"
                onClick={() => handleCategoryClick('electronics')}
                className="btn btn-sm btn-gradient"
              >
                <span>Shop Electronics</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Banner 2: Jewelry & Fashion */}
          <div
            style={{
              background: 'linear-gradient(135deg, #451a03 0%, #78350f 60%, #b45309 100%)',
              color: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '220px',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '340px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fde047', textTransform: 'uppercase' }}>
                HANDCRAFTED HERITAGE
              </span>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 900, marginTop: '0.3rem', lineHeight: 1.25 }}>
                Solid Gold & Silver Dragon Stations
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#fef3c7', marginTop: '0.5rem' }}>
                Certified authenticity & complimentary insured transit.
              </p>
            </div>
            <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
              <button
                type="button"
                onClick={() => handleCategoryClick('jewelery')}
                className="btn btn-sm"
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#0f172a',
                  fontWeight: 800,
                }}
              >
                <span>Explore Jewelry</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Highlights Showcase */}
      <section className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2rem',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: 'var(--primary-600)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              TOP SELECTIONS
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              Featured Highlights
            </h2>
          </div>
          <Link
            to="/products"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontWeight: 700,
              color: 'var(--primary-600)',
              fontSize: '0.95rem',
            }}
          >
            <span>See Entire Catalog</span>
            <ArrowRight size={17} />
          </Link>
        </div>

        <ProductGrid
          products={featuredProducts}
          loading={status === 'loading'}
          skeletonCount={4}
        />
      </section>

      {/* 6. Indian Customer Reviews & Testimonials Grid */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-600)', textTransform: 'uppercase' }}>
            VERIFIED EXPERIENCES
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            What Indian Shoppers Are Saying
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
            Trusted by over 12,000 satisfied customers across Mumbai, Delhi, Bengaluru, and Chennai.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <div style={{ display: 'flex', gap: '2px', color: '#eab308' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#eab308" stroke="#eab308" />
                ))}
              </div>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, fontStyle: 'italic' }}>
                "{t.comment}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</h4>
                    <BadgeCheck size={16} color="#059669" />
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Trending Best Sellers Grid */}
      <section className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ea580c', marginBottom: '0.2rem' }}>
              <TrendingUp size={16} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>
                HOT RIGHT NOW
              </span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)' }}>
              Top-Rated Best Sellers
            </h2>
          </div>
          <Link
            to="/products"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontWeight: 700,
              color: 'var(--primary-600)',
              fontSize: '0.95rem',
            }}
          >
            <span>Explore All</span>
            <ArrowRight size={17} />
          </Link>
        </div>

        <ProductGrid
          products={trendingProducts}
          loading={status === 'loading'}
          skeletonCount={8}
        />
      </section>

      {/* 8. VIP Club Newsletter with Gradient Glow */}
      <section className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
            color: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
            boxShadow: '0 20px 30px -10px rgba(79, 70, 229, 0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: '0.35rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              color: '#e0e7ff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            EXCLUSIVELY FOR SHOPPERS
          </span>

          <h2 style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.75rem)', fontWeight: 900, maxWidth: '640px', lineHeight: 1.2 }}>
            Unlock ₹500 OFF Your Next Purchase
          </h2>

          <p style={{ fontSize: '1rem', color: '#cbd5e1', maxWidth: '520px', lineHeight: 1.6 }}>
            Subscribe to our weekly curated catalog digest for member-only flash drops and instant UPI cashback vouchers.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              width: '100%',
              maxWidth: '480px',
              marginTop: '0.5rem',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className="form-input"
              style={{
                flex: '1 1 240px',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                padding: '0.85rem 1.15rem',
                border: 'none',
                borderRadius: 'var(--radius-md)',
              }}
            />
            <button
              type="submit"
              className="btn btn-gradient"
              style={{
                padding: '0.85rem 1.75rem',
                fontWeight: 800,
              }}
            >
              <span>Get ₹500 Code</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
