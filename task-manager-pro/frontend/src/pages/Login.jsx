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
      <div className="login-card">
        <h2 className="neon-text text-center">CyberTask</h2>
        <p className="subtitle text-center mb-4">Initialize System Access</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Operator ID</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter any username" 
              className="cyber-input"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Passcode</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter any password" 
              className="cyber-input"
              required 
            />
          </div>
          
          <button type="submit" className="cyber-btn primary-btn mt-4">
            ACCESS SYSTEM
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
