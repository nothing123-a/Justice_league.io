import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="modern-auth-page">
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-brand">
            <div className="brand-logo">
              <i className="fas fa-balance-scale"></i>
            </div>
            <h1>Justice Path</h1>
            <p>Your trusted partner in real estate legal matters</p>
          </div>
          
          <div className="auth-features">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-shield-check"></i>
              </div>
              <div className="feature-content">
                <h3>Secure & Trusted</h3>
                <p>Bank-level security for all your legal documents</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="feature-content">
                <h3>Fast Response</h3>
                <p>Average 2-hour response time from qualified lawyers</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="feature-content">
                <h3>95% Success Rate</h3>
                <p>Proven track record with thousands of resolved cases</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="auth-right">
          <div className="auth-form-container">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Sign in to access your legal dashboard</p>
            </div>
            
            <form onSubmit={handleSubmit} className="modern-auth-form">
              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <i className="fas fa-lock"></i>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <Link to="#" className="forgot-link">Forgot Password?</Link>
              </div>

              <button type="submit" className="modern-auth-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <i className="fas fa-arrow-right"></i>
                  </>
                )}
              </button>

              <div className="auth-divider">
                <span>or continue with</span>
              </div>

              <div className="social-buttons">
                <button type="button" className="social-btn google-btn">
                  <i className="fab fa-google"></i>
                  Google
                </button>
                <button type="button" className="social-btn microsoft-btn">
                  <i className="fab fa-microsoft"></i>
                  Microsoft
                </button>
              </div>
            </form>
            
            <div className="auth-footer">
              <p>Don't have an account? <Link to="/register" className="signup-link">Create one here</Link></p>
              <Link to="/" className="back-home">
                <i className="fas fa-arrow-left"></i> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;