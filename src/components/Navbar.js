import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <i className="fas fa-balance-scale"></i>
          <span>Justice Path</span>
        </div>
        <div className="nav-menu">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About
          </Link>
          <Link to="/cases" className={`nav-link ${location.pathname === '/cases' ? 'active' : ''}`}>
            Cases
          </Link>
          <Link to="/lawyers" className={`nav-link ${location.pathname === '/lawyers' ? 'active' : ''}`}>
            Lawyers
          </Link>
          <Link to="/pricing" className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}>
            Pricing
          </Link>
          <Link to="/information" className={`nav-link ${location.pathname === '/information' ? 'active' : ''}`}>
            Information
          </Link>
          


          {/* Language Selector */}
          <div className="nav-feature">
            <div className="language-selector">
              <i className="fas fa-globe"></i>
              <select className="language-select">
                <option value="en">EN</option>
                <option value="hi">हिं</option>
                <option value="mr">मर</option>
              </select>
            </div>
          </div>
          
          {user ? (
            <div className="user-menu">
              <div className="notification-center">
                <div className="notification-toggle" onClick={() => setShowNotifications(!showNotifications)}>
                  <i className="fas fa-bell"></i>
                  <span className="notification-count">3</span>
                </div>
                {showNotifications && (
                  <div className="notification-dropdown">
                    <div className="notification-header">
                      <h4>Notifications</h4>
                      <button className="mark-all-read">Mark all read</button>
                    </div>
                    <div className="notification-list">
                      <div className="notification-item">
                        <i className="fas fa-briefcase"></i>
                        <div>
                          <p>New case response received</p>
                          <span>2 minutes ago</span>
                        </div>
                      </div>
                      <div className="notification-item">
                        <i className="fas fa-user-tie"></i>
                        <div>
                          <p>Lawyer profile viewed</p>
                          <span>1 hour ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="profile-menu">
                <div className="profile-toggle" onClick={() => setShowProfile(!showProfile)}>
                  <div className="user-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <span className="user-name">{user.name}</span>
                  <i className="fas fa-chevron-down"></i>
                </div>
                {showProfile && (
                  <div className="profile-dropdown">
                    <Link to="/profile" className="profile-item">
                      <i className="fas fa-user"></i>
                      My Profile
                    </Link>
                    <Link to="/dashboard" className="profile-item">
                      <i className="fas fa-tachometer-alt"></i>
                      Dashboard
                    </Link>
                    <Link to="/settings" className="profile-item">
                      <i className="fas fa-cog"></i>
                      Settings
                    </Link>
                    <div className="profile-divider"></div>
                    <button onClick={logout} className="profile-item logout">
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;