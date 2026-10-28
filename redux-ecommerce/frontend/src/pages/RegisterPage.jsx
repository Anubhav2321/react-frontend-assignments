import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../app/hooks.js';
import {
  registerUser,
  clearAuthError,
  selectIsAuthenticated,
  selectAuthStatus,
  selectAuthError,
} from '../features/auth/authSlice.js';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState({});

  useEffect(() => {
    dispatch(clearAuthError());
    if (isAuthenticated) {
      navigate('/account', { replace: true });
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (clientErrors[e.target.name]) {
      setClientErrors({ ...clientErrors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      toast.success('Account created successfully! Welcome to ShopSphere.');
      navigate('/account', { replace: true });
    } catch (err) {
      // Error handled via Redux state
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
          maxWidth: '460px',
          padding: '2.5rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            Create an Account
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Join ShopSphere for exclusive orders and rewards
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
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User
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
                id="register-name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                autoComplete="name"
              />
            </div>
            {clientErrors.name && <p className="form-error">{clientErrors.name}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-email">
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
                id="register-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                autoComplete="email"
              />
            </div>
            {clientErrors.email && <p className="form-error">{clientErrors.email}</p>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-password">
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
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-confirm-password">
              Confirm Password
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
                id="register-confirm-password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                autoComplete="new-password"
              />
            </div>
            {clientErrors.confirmPassword && (
              <p className="form-error">{clientErrors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '0.75rem' }}
          >
            {status === 'loading' ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="spinner" style={{ width: '1.2rem', height: '1.2rem', borderWidth: '2px' }} />
                <span>Creating Account...</span>
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Create Account</span>
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
          <span>Already have an account? </span>
          <Link to="/login" style={{ fontWeight: 600, color: 'var(--primary-600)' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

