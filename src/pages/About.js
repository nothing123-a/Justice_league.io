import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-hero">
        <div className="container">
          <h1>About Justice Path</h1>
          <p>Connecting real estate professionals with specialized legal expertise</p>
        </div>
      </div>

      <div className="container">
        <div className="about-content">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Mission</h2>
              <p>We bridge the gap between brokerage companies and qualified real estate lawyers, making legal expertise accessible and affordable for the real estate industry.</p>
              
              <h3>Why Choose Us?</h3>
              <ul className="feature-list">
                <li><i className="fas fa-check-circle"></i> Specialized in real estate law</li>
                <li><i className="fas fa-check-circle"></i> Vetted legal professionals</li>
                <li><i className="fas fa-check-circle"></i> Transparent pricing</li>
                <li><i className="fas fa-check-circle"></i> Quick case resolution</li>
              </ul>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <i className="fas fa-balance-scale"></i>
                <h3>Legal Excellence</h3>
                <p>Professional legal services tailored for real estate</p>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-number">500</div>
              <div className="stat-label">Cases Resolved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">150</div>
              <div className="stat-label">Expert Lawyers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95</div>
              <div className="stat-label">Success Rate %</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24</div>
              <div className="stat-label">Hour Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;