import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Cases = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const mockCases = [
    {
      _id: '1',
      title: 'Commercial Property Zoning Dispute',
      description: 'Need legal assistance with zoning variance application for commercial property development. City council rejected initial application.',
      category: 'zoning-problem',
      priority: 'high',
      budget: { min: 400000, max: 1200000 },
      propertyDetails: {
        address: '123 Main St, Downtown',
        propertyType: 'commercial',
        value: 68000000
      },
      client: { name: 'Metro Realty Group', userType: 'brokerage' },
      status: 'open',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: '2',
      title: 'Environmental Compliance Review',
      description: 'Industrial property requires environmental impact assessment and compliance verification before sale.',
      category: 'environmental-law',
      priority: 'high',
      budget: { min: 640000, max: 1600000 },
      propertyDetails: {
        address: '1200 Industrial Blvd, Manufacturing District',
        propertyType: 'industrial',
        value: 96000000
      },
      client: { name: 'Industrial Properties LLC', userType: 'brokerage' },
      status: 'open',
      createdAt: '2024-01-12T16:45:00Z'
    }
  ];

  useEffect(() => {
    setCases(mockCases);
    setFilteredCases(mockCases);
  }, []);

  useEffect(() => {
    let filtered = cases;
    if (categoryFilter) {
      filtered = filtered.filter(case_ => case_.category === categoryFilter);
    }
    if (priorityFilter) {
      filtered = filtered.filter(case_ => case_.priority === priorityFilter);
    }
    setFilteredCases(filtered);
  }, [categoryFilter, priorityFilter, cases]);

  const CaseCard = ({ case_ }) => (
    <div className="case-card">
      <div className="case-header">
        <div>
          <div className="case-title">{case_.title}</div>
          <span className="case-category">{case_.category.replace('-', ' ').toUpperCase()}</span>
        </div>
        <span className={`case-priority ${case_.priority}`}>{case_.priority.toUpperCase()}</span>
      </div>
      <div className="case-description">{case_.description.substring(0, 150)}...</div>
      <div className="case-budget">Budget: ₹{case_.budget.min.toLocaleString()} - ₹{case_.budget.max.toLocaleString()}</div>
      <div className="property-info">
        <i className="fas fa-map-marker-alt"></i> {case_.propertyDetails.address}
        <span className="property-value">Value: ₹{case_.propertyDetails.value.toLocaleString()}</span>
      </div>
      <div className="case-features">
        <div className="case-feature">
          <i className="fas fa-file-alt"></i> Documents
        </div>
        <div className="case-feature">
          <i className="fas fa-video"></i> Video Call
        </div>
        <div className="case-feature">
          <i className="fas fa-chart-line"></i> Progress Tracking
        </div>
      </div>
      <div className="case-footer">
        <span className="case-date">{new Date(case_.createdAt).toLocaleDateString()}</span>
        <button className="btn-outline">View Details</button>
      </div>
    </div>
  );

  return (
    <div className="cases-page">
      <div className="page-hero">
        <div className="container">
          <h1>Legal Cases Marketplace</h1>
          <p>Find and resolve real estate legal matters efficiently</p>
        </div>
      </div>

      <div className="container">
        <div className="cases-header">
          <div className="case-filters">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option value="property-dispute">Property Disputes</option>
              <option value="contract-issue">Contract Issues</option>
              <option value="zoning-problem">Zoning Problems</option>
              <option value="environmental-law">Environmental Law</option>
            </select>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="feature-buttons">
            {user && user.userType === 'brokerage' && (
              <button onClick={() => setShowModal(true)} className="btn-primary">
                <i className="fas fa-plus"></i> Post New Case
              </button>
            )}
            <button className="btn-outline">
              <i className="fas fa-file-upload"></i> Manage Documents
            </button>
            <button className="btn-outline">
              <i className="fas fa-chart-line"></i> Track Progress
            </button>
          </div>
        </div>

        <div className="cases-stats">
          <div className="stat-item">
            <i className="fas fa-folder-open"></i>
            <span>Active Cases: <strong>{filteredCases.length}</strong></span>
          </div>
          <div className="stat-item">
            <i className="fas fa-clock"></i>
            <span>Avg Response: <strong>2 hours</strong></span>
          </div>
          <div className="stat-item">
            <i className="fas fa-check-circle"></i>
            <span>Success Rate: <strong>95%</strong></span>
          </div>
        </div>

        <div className="cases-grid">
          {filteredCases.map(case_ => (
            <CaseCard key={case_._id} case_={case_} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cases;