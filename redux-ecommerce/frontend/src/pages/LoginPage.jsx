import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import {
  loginUser,
  clearAuthError,
  selectIsAuthenticated,
  selectAuthStatus,
  selectAuthError,
} from '../features/auth/authSlice.js';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState({});

  const from = location.state?.from?.pathname || '/account';

  useEffect(() => {
    dispatch(clearAuthError());
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from, dispatch]);

  const validate = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please provide a valid email';
    }

    if (!password) {
      errors.password = 'Password is required';
    }
    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success('Successfully logged in! Welcome back.');
      navigate(from, { replace: true });
    } catch (err) {
      // Handled via redux state authError
    }
  };

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem',
        minHeight: '75vh',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Sign in to access your orders and checkout
          </p>
        </div>

        {authError && (
          <div
            style={{
              backgroundColor: 'var(--danger-bg)',
              color: 'var(--danger-text)',
              border: '1px solid var(--danger-border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                id="email-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                autoComplete="email"
              />
            </div>
            {clientErrors.email && <p className="form-error">{clientErrors.email}</p>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password-input">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {clientErrors.password && <p className="form-error">{clientErrors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {status === 'loading' ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="spinner" style={{ width: '1.2rem', height: '1.2rem', borderWidth: '2px' }} />
                <span>Signing in...</span>
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </span>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-light)',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
          }}
        >
          <span>Don't have an account? </span>
          <Link
            to="/register"
            style={{ fontWeight: 600, color: 'var(--primary-600)' }}
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

