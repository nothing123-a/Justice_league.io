import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    specialization: user?.specialization || '',
    experience: user?.experience || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.header}>
          <div style={styles.avatar}>
            <i className="fas fa-user-circle"></i>
          </div>
          <div style={styles.headerInfo}>
            <h1>{user?.name}</h1>
            <p style={styles.userType}>
              <i className={`fas ${user?.userType === 'lawyer' ? 'fa-gavel' : 'fa-building'}`}></i>
              {user?.userType === 'lawyer' ? 'Real Estate Lawyer' : 'Brokerage Company'}
            </p>
            <button 
              style={styles.editBtn}
              onClick={() => setIsEditing(!isEditing)}
            >
              <i className="fas fa-edit"></i>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>{user?.userType === 'lawyer' ? 'Law Firm' : 'Company Name'}</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              {user?.userType === 'lawyer' && (
                <>
                  <div style={styles.formGroup}>
                    <label>Specialization</label>
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      style={styles.input}
                    >
                      <option value="">Select Specialization</option>
                      <option value="Property Law">Property Law & Disputes</option>
                      <option value="Contract Issues">Contract Issues & Negotiations</option>
                      <option value="Zoning Problems">Zoning Problems & Variances</option>
                      <option value="Title Issues">Title Issues & Resolution</option>
                      <option value="Lease Disputes">Lease Disputes</option>
                      <option value="Commercial Real Estate">Commercial Real Estate</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label>Experience (Years)</label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </>
              )}
              <div style={styles.formGroup}>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroupFull}>
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  style={styles.textarea}
                  rows="4"
                />
              </div>
            </div>
            <button type="submit" style={styles.saveBtn}>
              <i className="fas fa-save"></i> Save Changes
            </button>
          </form>
        ) : (
          <div style={styles.profileInfo}>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>Email</strong>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <i className="fas fa-phone"></i>
                <div>
                  <strong>Phone</strong>
                  <p>{user?.phone || 'Not provided'}</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <i className="fas fa-building"></i>
                <div>
                  <strong>{user?.userType === 'lawyer' ? 'Law Firm' : 'Company'}</strong>
                  <p>{user?.company || 'Not provided'}</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Location</strong>
                  <p>{user?.location || 'Not provided'}</p>
                </div>
              </div>
              {user?.userType === 'lawyer' && (
                <>
                  <div style={styles.infoItem}>
                    <i className="fas fa-gavel"></i>
                    <div>
                      <strong>Specialization</strong>
                      <p>{user?.specialization || 'Not specified'}</p>
                    </div>
                  </div>
                  <div style={styles.infoItem}>
                    <i className="fas fa-calendar"></i>
                    <div>
                      <strong>Experience</strong>
                      <p>{user?.experience ? `${user.experience} years` : 'Not specified'}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            {user?.bio && (
              <div style={styles.bioSection}>
                <h3><i className="fas fa-user"></i> About</h3>
                <p>{user.bio}</p>
              </div>
            )}

            {/* Achievements & Stats */}
            {user?.userType === 'lawyer' && (
              <div style={styles.achievementsSection}>
                <h3><i className="fas fa-trophy"></i> Achievements & Stats</h3>
                <div style={styles.achievementsGrid}>
                  <div style={styles.achievementCard}>
                    <div style={styles.achievementIcon}>
                      <i className="fas fa-star"></i>
                    </div>
                    <div style={styles.achievementInfo}>
                      <h4>4.8/5.0</h4>
                      <p>Average Rating</p>
                      <small>Based on 24 reviews</small>
                    </div>
                  </div>
                  <div style={styles.achievementCard}>
                    <div style={styles.achievementIcon}>
                      <i className="fas fa-gavel"></i>
                    </div>
                    <div style={styles.achievementInfo}>
                      <h4>15</h4>
                      <p>Cases Won</p>
                      <small>Success rate: 88%</small>
                    </div>
                  </div>
                  <div style={styles.achievementCard}>
                    <div style={styles.achievementIcon}>
                      <i className="fas fa-clock"></i>
                    </div>
                    <div style={styles.achievementInfo}>
                      <h4>2.5 hrs</h4>
                      <p>Avg Response Time</p>
                      <small>Faster than 85% lawyers</small>
                    </div>
                  </div>
                  <div style={styles.achievementCard}>
                    <div style={styles.achievementIcon}>
                      <i className="fas fa-handshake"></i>
                    </div>
                    <div style={styles.achievementInfo}>
                      <h4>32</h4>
                      <p>Happy Clients</p>
                      <small>Repeat client rate: 65%</small>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Reviews */}
            <div style={styles.reviewsSection}>
              <h3><i className="fas fa-comments"></i> Recent Reviews</h3>
              <div style={styles.reviewsList}>
                <div style={styles.reviewItem}>
                  <div style={styles.reviewHeader}>
                    <div style={styles.reviewerInfo}>
                      <strong>Rajesh Properties</strong>
                      <div style={styles.rating}>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                    <small>2 days ago</small>
                  </div>
                  <p>"Excellent service! Resolved our property dispute efficiently and professionally. Highly recommended for real estate legal matters."</p>
                </div>
                <div style={styles.reviewItem}>
                  <div style={styles.reviewHeader}>
                    <div style={styles.reviewerInfo}>
                      <strong>Mumbai Realty Group</strong>
                      <div style={styles.rating}>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                    <small>1 week ago</small>
                  </div>
                  <p>"Great expertise in commercial real estate law. Helped us navigate complex zoning issues smoothly."</p>
                </div>
              </div>
            </div>

            {/* Case History */}
            <div style={styles.caseHistorySection}>
              <h3><i className="fas fa-history"></i> Recent Case History</h3>
              <div style={styles.caseHistoryList}>
                <div style={styles.caseHistoryItem}>
                  <div style={styles.caseStatus}>
                    <span style={{...styles.statusBadge, backgroundColor: '#3DDC97'}}>Completed</span>
                  </div>
                  <div style={styles.caseDetails}>
                    <h4>Property Title Verification</h4>
                    <p>Client: Sharma Builders | Fee: ₹45,000</p>
                    <small>Completed on Dec 10, 2024</small>
                  </div>
                </div>
                <div style={styles.caseHistoryItem}>
                  <div style={styles.caseStatus}>
                    <span style={{...styles.statusBadge, backgroundColor: '#2F5DFF'}}>In Progress</span>
                  </div>
                  <div style={styles.caseDetails}>
                    <h4>Commercial Lease Dispute</h4>
                    <p>Client: Metro Properties | Fee: ₹75,000</p>
                    <small>Started on Dec 5, 2024</small>
                  </div>
                </div>
                <div style={styles.caseHistoryItem}>
                  <div style={styles.caseStatus}>
                    <span style={{...styles.statusBadge, backgroundColor: '#3DDC97'}}>Completed</span>
                  </div>
                  <div style={styles.caseDetails}>
                    <h4>Zoning Variance Application</h4>
                    <p>Client: Green Valley Developers | Fee: ₹60,000</p>
                    <small>Completed on Nov 28, 2024</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '0 20px'
  },
  profileCard: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  header: {
    background: 'linear-gradient(135deg, #2F5DFF 0%, #1e4ae6 100%)',
    color: 'white',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  },
  avatar: {
    fontSize: '4rem',
    color: 'rgba(255,255,255,0.9)'
  },
  headerInfo: {
    flex: 1
  },
  userType: {
    opacity: 0.9,
    margin: '0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  editBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '1rem'
  },
  form: {
    padding: '2rem'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  formGroupFull: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  input: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px'
  },
  textarea: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical'
  },
  saveBtn: {
    background: '#3DDC97',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600'
  },
  profileInfo: {
    padding: '2rem'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px'
  },
  bioSection: {
    borderTop: '1px solid #eee',
    paddingTop: '2rem'
  },
  achievementsSection: {
    borderTop: '1px solid #eee',
    paddingTop: '2rem',
    marginTop: '2rem'
  },
  achievementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  },
  achievementCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    borderRadius: '12px',
    border: '1px solid #dee2e6'
  },
  achievementIcon: {
    fontSize: '2rem',
    color: '#2F5DFF',
    width: '50px',
    textAlign: 'center'
  },
  achievementInfo: {
    flex: 1
  },
  reviewsSection: {
    borderTop: '1px solid #eee',
    paddingTop: '2rem',
    marginTop: '2rem'
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  reviewItem: {
    padding: '1.5rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  reviewerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  rating: {
    color: '#ffc107',
    fontSize: '0.9rem'
  },
  caseHistorySection: {
    borderTop: '1px solid #eee',
    paddingTop: '2rem',
    marginTop: '2rem'
  },
  caseHistoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  caseHistoryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  caseDetails: {
    flex: 1
  },
  statusBadge: {
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    minWidth: '80px',
    textAlign: 'center'
  }
};

export default Profile;