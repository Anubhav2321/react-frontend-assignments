import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication
    if (username && password) {
      localStorage.setItem('dummy-auth-token', 'dummy-auth-token-123');
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-card">
        <h2 className="text-center logo-text">TaskPro</h2>
        <p className="subtitle text-center mb-4">Sign in to your account</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username" 
              className="form-input"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              className="form-input"
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary mt-4 w-100">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
