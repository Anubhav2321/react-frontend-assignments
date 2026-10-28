import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  PackageCheck,
  LogOut,
  ShoppingBag,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import {
  selectCurrentUser,
  logoutUser,
} from '../features/auth/authSlice.js';
import {
  fetchUserOrders,
  selectOrders,
} from '../features/orders/ordersSlice.js';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ConfirmationModal from '../components/common/ConfirmationModal.jsx';

export const AccountPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectCurrentUser);
  const orders = useAppSelector(selectOrders);

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Signed out successfully');
      setLogoutModalOpen(false);
      navigate('/');
    } catch (err) {
      toast.error('Failed to sign out');
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Recent Member';

  return (
    <div className="container" style={{ paddingBottom: '4rem', maxWidth: '900px' }}>
      <Breadcrumbs items={[{ label: 'My Account' }]} />

      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem' }}>
        Account Profile
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Profile Card */}
        <div
          className="card"
          style={{
            padding: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-600)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: 800,
                boxShadow: '0 4px 6px rgba(79, 70, 229, 0.25)',
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {user?.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                <Mail size={16} />
                <span>{user?.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.825rem', marginTop: '0.35rem' }}>
                <Calendar size={14} />
                <span>Member since {memberSince}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="btn btn-danger btn-sm"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Account Overview Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <Link
            to="/orders"
            className="card"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PackageCheck size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Orders Placed
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {orders.length} total orders recorded in database
              </p>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary-600)', fontWeight: 600, marginTop: 'auto' }}>
              View order history →
            </span>
          </Link>

          <div
            className="card"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--success-bg)',
                color: 'var(--success-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Security & Session
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Protected with HTTP-only cookies and bcrypt password hashing
              </p>
            </div>
            <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600, marginTop: 'auto' }}>
              Active Session Verified ✓
            </span>
          </div>

          <Link
            to="/products"
            className="card"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Continue Shopping
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Explore more curated items from the catalog
              </p>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary-600)', fontWeight: 600, marginTop: 'auto' }}>
              Browse products →
            </span>
          </Link>
        </div>
      </div>

      <ConfirmationModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Sign Out of ShopSphere?"
        message="Are you sure you want to end your current session? You can sign back in anytime."
        confirmText="Sign Out"
        danger={false}
      />
    </div>
  );
};

export default AccountPage;

