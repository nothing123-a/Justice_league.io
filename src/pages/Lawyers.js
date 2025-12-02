import React, { useState, useEffect } from 'react';

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);

  const mockLawyers = [
    {
      id: 1,
      name: 'John Snow',
      specialization: ['Property Law', 'Contract Disputes'],
      rating: 4.8,
      experience: 12,
      location: 'Downtown District',
      bio: 'Specialized in commercial real estate law with over 12 years of experience.',
      subscription: 'premium'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialization: ['Commercial Real Estate', 'Zoning'],
      rating: 4.9,
      experience: 15,
      location: 'Business District',
      bio: 'Expert in zoning laws and commercial property transactions.',
      subscription: 'premium'
    },
    {
      id: 3,
      name: 'Lisa Martinez',
      specialization: ['Environmental Law', 'Regulatory Compliance'],
      rating: 4.9,
      experience: 14,
      location: 'Legal District',
      bio: 'Expert in environmental regulations and property compliance matters.',
      subscription: 'premium'
    }
  ];

  useEffect(() => {
    setLawyers(mockLawyers);
  }, []);

  const LawyerCard = ({ lawyer }) => (
    <div className="lawyer-card">
      <div className="lawyer-avatar">
        <i className="fas fa-user-tie"></i>
      </div>
      {lawyer.subscription === 'premium' && (
        <span className="premium-badge">Premium</span>
      )}
      <div className="lawyer-name">{lawyer.name}</div>
      <div className="lawyer-specialization">{lawyer.specialization.join(', ')}</div>
      <div className="lawyer-rating">
        <span className="stars">{'★'.repeat(Math.floor(lawyer.rating))}{'☆'.repeat(5-Math.floor(lawyer.rating))}</span>
        <span>{lawyer.rating}</span>
      </div>
      <p>{lawyer.experience} years experience</p>
      <p className="lawyer-location">
        <i className="fas fa-map-marker-alt"></i> {lawyer.location}
      </p>
      <button className="btn-outline">View Profile</button>
    </div>
  );

  return (
    <div className="lawyers-page">
      <div className="page-hero">
        <div className="container">
          <h1>Expert Real Estate Lawyers</h1>
          <p>Connect with qualified legal professionals specialized in real estate law</p>
        </div>
      </div>

      <div className="container">
        <div className="lawyers-filters">
          <select>
            <option value="">All Specializations</option>
            <option value="property-law">Property Law</option>
            <option value="contract-disputes">Contract Disputes</option>
            <option value="zoning">Zoning Issues</option>
            <option value="environmental-law">Environmental Law</option>
          </select>
          <select>
            <option value="">All Experience Levels</option>
            <option value="0-5">0-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10-15">10-15 years</option>
            <option value="15+">15+ years</option>
          </select>
        </div>

        <div className="lawyers-stats">
          <div className="stat-item">
            <i className="fas fa-user-tie"></i>
            <span>Active Lawyers: <strong>{lawyers.length}</strong></span>
          </div>
          <div className="stat-item">
            <i className="fas fa-star"></i>
            <span>Avg Rating: <strong>4.7/5</strong></span>
          </div>
          <div className="stat-item">
            <i className="fas fa-certificate"></i>
            <span>Verified: <strong>100%</strong></span>
          </div>
        </div>

        <div className="lawyers-grid">
          {lawyers.map(lawyer => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>

        <div className="lawyer-cta">
          <h3>Are you a Real Estate Lawyer?</h3>
          <p>Join our platform and connect with brokerage companies needing legal expertise</p>
          <button className="btn-primary">
            <i className="fas fa-user-plus"></i> Join as Lawyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lawyers;