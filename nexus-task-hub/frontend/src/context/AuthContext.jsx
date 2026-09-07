import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage or sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      // In a real app, verify token with backend here
      // For now, we simulate fetching user profile if token exists
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      // We assume backend is running on 5000
      const res = await axios.get('http://localhost:5000/api/auth/me');
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, rememberMe) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      handleAuthSuccess(res.data, rememberMe);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password, rememberMe) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      handleAuthSuccess(res.data, rememberMe);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const googleLogin = async (tokenId, rememberMe) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', { tokenId });
      handleAuthSuccess(res.data, rememberMe);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Google Auth failed' };
    }
  };

  const handleAuthSuccess = (userData, rememberMe) => {
    const { token, ...userProfile } = userData;
    setUser(userProfile);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    if (rememberMe) {
      localStorage.setItem('token', token);
      sessionStorage.removeItem('token');
    } else {
      sessionStorage.setItem('token', token);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
