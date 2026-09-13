import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
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

  const googleLogin = async (credential, rememberMe) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', { credential });
      handleAuthSuccess(res.data, rememberMe);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Google Auth failed' };
    }
  };

  const handleAuthSuccess = (userData, rememberMe) => {
    // fast-jwt backend returns accessToken and refreshToken
    const token = userData.accessToken || userData.token;
    
    // We don't want to store tokens in the user profile state
    const { accessToken, refreshToken, token: oldToken, ...userProfile } = userData;
    setUser(userProfile);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    if (rememberMe) {
      localStorage.setItem('token', token);
      if (userData.refreshToken) {
         localStorage.setItem('refreshToken', userData.refreshToken);
      }
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refreshToken');
    } else {
      sessionStorage.setItem('token', token);
      if (userData.refreshToken) {
         sessionStorage.setItem('refreshToken', userData.refreshToken);
      }
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
