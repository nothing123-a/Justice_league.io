import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Your Path to Legal Justice</h1>
            <p>Connecting brokerage companies with qualified real estate lawyers for swift legal resolution</p>
            <div className="hero-buttons">
              <Link to="/cases" className="btn-primary">
                <i className="fas fa-briefcase"></i>
                Browse Cases
              </Link>
              <Link to="/lawyers" className="btn-secondary">
                <i className="fas fa-user-tie"></i>
                Find Lawyers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Why Choose Justice Path?</h2>
          <div className="grid grid-3">
            <div className="card">
              <div className="feature-icon">
                <i className="fas fa-shield-check"></i>
              </div>
              <h3>Verified Professionals</h3>
              <p>All lawyers are thoroughly vetted and licensed real estate legal experts</p>
            </div>
            <div className="card">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Fast Response</h3>
              <p>Average 2-hour response time from qualified legal professionals</p>
            </div>
            <div className="card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>95% Success Rate</h3>
              <p>Proven track record with thousands of successfully resolved cases</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="grid grid-3">
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Cases Resolved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Expert Lawyers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;