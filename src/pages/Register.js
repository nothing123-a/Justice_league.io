import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    company: '',
    licenseNumber: '',
    specializations: []
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register } = useAuth();
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!formData.userType) {
      setError('Please select an account type');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate loading for better UX
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === formData.email)) {
        setError('An account with this email already exists');
        setIsLoading(false);
        return;
      }

      register(formData);
      navigate('/');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleUserTypeSelect = (type) => {
    setFormData({
      ...formData,
      userType: type
    });
  };

  const handleSpecializationChange = (spec) => {
    const updatedSpecs = formData.specializations.includes(spec)
      ? formData.specializations.filter(s => s !== spec)
      : [...formData.specializations, spec];
    
    setFormData({
      ...formData,
      specializations: updatedSpecs
    });
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#e74c3c';
    if (passwordStrength < 50) return '#f39c12';
    if (passwordStrength < 75) return '#3498db';
    return '#27ae60';
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
            <h1>Join Our Platform</h1>
            <p>Connect with legal experts and resolve your real estate matters</p>
          </div>
          
          <div className="auth-stats">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Cases Resolved</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Expert Lawyers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
        
        <div className="auth-right">
          <div className="auth-form-container">
            <div className="auth-header">
              <h2>Create Your Account</h2>
              <p>Join thousands of satisfied clients</p>
            </div>
            
            <form onSubmit={handleSubmit} className="modern-auth-form">
              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a strong password"
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
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className="strength-fill" 
                        style={{ 
                          width: `${passwordStrength}%`,
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      ></div>
                    </div>
                    <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <i className="fas fa-lock"></i>
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`fas fa-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Account Type</label>
                <div className="user-type-selector">
                  <div 
                    className={`type-option ${formData.userType === 'brokerage' ? 'selected' : ''}`}
                    onClick={() => handleUserTypeSelect('brokerage')}
                  >
                    <div className="type-icon">
                      <i className="fas fa-building"></i>
                    </div>
                    <div className="type-content">
                      <h4>Brokerage Company</h4>
                      <p>Post cases and find lawyers</p>
                    </div>
                  </div>
                  <div 
                    className={`type-option ${formData.userType === 'lawyer' ? 'selected' : ''}`}
                    onClick={() => handleUserTypeSelect('lawyer')}
                  >
                    <div className="type-icon">
                      <i className="fas fa-user-tie"></i>
                    </div>
                    <div className="type-content">
                      <h4>Real Estate Lawyer</h4>
                      <p>Browse cases and offer services</p>
                    </div>
                  </div>
                </div>
              </div>

              {formData.userType === 'brokerage' && (
                <div className="conditional-fields">
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <div className="input-wrapper">
                      <div className="input-icon">
                        <i className="fas fa-building"></i>
                      </div>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.userType === 'lawyer' && (
                <div className="conditional-fields">
                  <div className="form-group">
                    <label htmlFor="licenseNumber">License Number</label>
                    <div className="input-wrapper">
                      <div className="input-icon">
                        <i className="fas fa-certificate"></i>
                      </div>
                      <input
                        type="text"
                        id="licenseNumber"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        placeholder="Enter your license number"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Specializations</label>
                    <div className="specialization-tags">
                      {['Property Law', 'Contract Disputes', 'Zoning Issues', 'Environmental Law', 'Commercial Real Estate', 'Residential Real Estate'].map(spec => (
                        <label key={spec} className="tag-option">
                          <input 
                            type="checkbox" 
                            checked={formData.specializations.includes(spec)}
                            onChange={() => handleSpecializationChange(spec)}
                          />
                          <span className="tag-label">{spec}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="checkbox-container">
                  <input type="checkbox" required />
                  <span className="checkmark"></span>
                  I agree to the <Link to="#" className="link">Terms of Service</Link> and <Link to="#" className="link">Privacy Policy</Link>
                </label>
              </div>

              <button type="submit" className="modern-auth-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <i className="fas fa-arrow-right"></i>
                  </>
                )}
              </button>

              <div className="auth-divider">
                <span>or sign up with</span>
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
              <p>Already have an account? <Link to="/login" className="signin-link">Sign in here</Link></p>
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

export default Register;