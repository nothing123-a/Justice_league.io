import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const brokerageStats = {
    activeCases: 5,
    totalCases: 12,
    lawyersConnected: 8,
    avgResponseTime: '4 hours'
  };

  const lawyerStats = {
    appliedCases: 3,
    wonCases: 15,
    totalEarnings: '₹2,45,000',
    rating: 4.7
  };

  const recentCases = [
    {
      id: 1,
      title: 'Property Title Dispute',
      status: 'In Progress',
      lawyer: 'Adv. Priya Sharma',
      lastUpdate: '2 hours ago'
    },
    {
      id: 2,
      title: 'Lease Agreement Issue',
      status: 'Completed',
      lawyer: 'Adv. Rajesh Kumar',
      lastUpdate: '1 day ago'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'case',
      message: 'New lawyer applied to your Property Dispute case',
      time: '30 minutes ago',
      icon: 'fas fa-gavel'
    },
    {
      id: 2,
      type: 'message',
      message: 'Message from Adv. Priya Sharma regarding title verification',
      time: '2 hours ago',
      icon: 'fas fa-envelope'
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment of ₹25,000 processed successfully',
      time: '1 day ago',
      icon: 'fas fa-credit-card'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's what's happening with your {user?.userType === 'lawyer' ? 'legal practice' : 'cases'}</p>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {user?.userType === 'brokerage' ? (
          <>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <i className="fas fa-folder-open"></i>
              </div>
              <div style={styles.statInfo}>
                <h3>{brokerageStats.activeCases}</h3>
                <p>Active Cases</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <i className="fas fa-chart-line"></i>
              </div>
              <div style={styles.statInfo}>
                <h3>{brokerageStats.totalCases}</h3>
                <p>Total Cases</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <i className="fas fa-users"></i>
              </div>
              <div style={styles.statInfo}>
                <h3>{brokerageStats.lawyersConnected}</h3>
                <p>Lawyers Connected</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <i className="fas fa-clock"></i>
              </div>
              <div style={styles.statInfo}>
                <h3>{brokerageStats.avgResponseTime}</h3>
                <p>Avg Response Time</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <i className="fas fa-hand-paper"></i>
              </div>
              <div style={styles.statInfo}>
                <h3>{lawyerStats.appliedCases}</h3>
                <p>Applied Cases</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <i className="fas fa-trophy"></i>
              </div>
              <div style={styles.statInfo}>
                <h3>{lawyerStats.wonCases}</h3>
                <p>Won Cases</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <i className="fas fa-rupee-sign"></i>
              </div>
              <div style={styles.statInfo}>
                <h3>{lawyerStats.totalEarnings}</h3>
                <p>Total Earnings</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <i className="fas fa-star"></i>
              </div>
              <div style={styles.statInfo}>
                <h3>{lawyerStats.rating}</h3>
                <p>Rating</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div style={styles.dashboardGrid}>
        {/* Recent Cases */}
        <div style={styles.dashboardCard}>
          <div style={styles.cardHeader}>
            <h3>Recent Cases</h3>
            <Link to="/cases" style={styles.viewAllLink}>View All</Link>
          </div>
          <div style={styles.casesList}>
            {recentCases.map(caseItem => (
              <div key={caseItem.id} style={styles.caseItem}>
                <div style={styles.caseInfo}>
                  <h4>{caseItem.title}</h4>
                  <p>{caseItem.lawyer}</p>
                  <small>{caseItem.lastUpdate}</small>
                </div>
                <div style={styles.caseStatus}>
                  <span 
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: caseItem.status === 'Completed' ? '#3DDC97' : '#2F5DFF'
                    }}
                  >
                    {caseItem.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div style={styles.dashboardCard}>
          <div style={styles.cardHeader}>
            <h3>Notifications</h3>
            <button style={styles.markAllRead}>Mark All Read</button>
          </div>
          <div style={styles.notificationsList}>
            {notifications.map(notification => (
              <div key={notification.id} style={styles.notificationItem}>
                <div style={styles.notificationIcon}>
                  <i className={notification.icon}></i>
                </div>
                <div style={styles.notificationContent}>
                  <p>{notification.message}</p>
                  <small>{notification.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <h3>Quick Actions</h3>
        <div style={styles.actionsGrid}>
          {user?.userType === 'brokerage' ? (
            <>
              <Link to="/cases" style={styles.actionCard}>
                <i className="fas fa-plus-circle"></i>
                <span>Post New Case</span>
              </Link>
              <Link to="/lawyers" style={styles.actionCard}>
                <i className="fas fa-search"></i>
                <span>Find Lawyers</span>
              </Link>
              <Link to="/profile" style={styles.actionCard}>
                <i className="fas fa-user-edit"></i>
                <span>Update Profile</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/cases" style={styles.actionCard}>
                <i className="fas fa-search"></i>
                <span>Browse Cases</span>
              </Link>
              <Link to="/pricing" style={styles.actionCard}>
                <i className="fas fa-crown"></i>
                <span>Upgrade Plan</span>
              </Link>
              <Link to="/profile" style={styles.actionCard}>
                <i className="fas fa-user-edit"></i>
                <span>Update Profile</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Calendar & Activity Section */}
      <div style={styles.dashboardGrid}>
        {/* Calendar Widget */}
        <div style={styles.dashboardCard}>
          <div style={styles.cardHeader}>
            <h3>Upcoming Schedule</h3>
            <button style={styles.viewAllLink}>View Calendar</button>
          </div>
          <div style={styles.calendarWidget}>
            <div style={styles.calendarItem}>
              <div style={styles.calendarDate}>
                <span style={styles.dateDay}>15</span>
                <span style={styles.dateMonth}>Dec</span>
              </div>
              <div style={styles.calendarInfo}>
                <h4>Client Meeting</h4>
                <p>Property dispute consultation</p>
                <small>2:00 PM - 3:00 PM</small>
              </div>
            </div>
            <div style={styles.calendarItem}>
              <div style={styles.calendarDate}>
                <span style={styles.dateDay}>18</span>
                <span style={styles.dateMonth}>Dec</span>
              </div>
              <div style={styles.calendarInfo}>
                <h4>Court Hearing</h4>
                <p>Title verification case</p>
                <small>10:00 AM - 12:00 PM</small>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.dashboardCard}>
          <div style={styles.cardHeader}>
            <h3>Recent Activity</h3>
          </div>
          <div style={styles.activityList}>
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}>
                <i className="fas fa-file-alt" style={{color: '#3DDC97'}}></i>
              </div>
              <div style={styles.activityContent}>
                <p><strong>Document uploaded</strong> for Property Dispute case</p>
                <small>2 hours ago</small>
              </div>
            </div>
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}>
                <i className="fas fa-handshake" style={{color: '#2F5DFF'}}></i>
              </div>
              <div style={styles.activityContent}>
                <p><strong>New lawyer application</strong> received</p>
                <small>5 hours ago</small>
              </div>
            </div>
            <div style={styles.activityItem}>
              <div style={styles.activityIcon}>
                <i className="fas fa-rupee-sign" style={{color: '#ff6b35'}}></i>
              </div>
              <div style={styles.activityContent}>
                <p><strong>Payment processed</strong> ₹25,000</p>
                <small>1 day ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Info for Lawyers */}
      {user?.userType === 'lawyer' && (
        <div style={styles.subscriptionCard}>
          <div style={styles.subscriptionHeader}>
            <h3>Current Plan: {user?.subscription || 'Free'}</h3>
            <Link to="/pricing" style={styles.upgradeBtn}>
              <i className="fas fa-arrow-up"></i>
              Upgrade
            </Link>
          </div>
          <div style={styles.subscriptionInfo}>
            <div style={styles.planFeature}>
              <i className="fas fa-eye"></i>
              <span>Cases viewed this month: 3/5</span>
            </div>
            <div style={styles.planFeature}>
              <i className="fas fa-calendar"></i>
              <span>Next billing: Not applicable (Free plan)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 20px'
  },
  header: {
    marginBottom: '2rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  statIcon: {
    fontSize: '2.5rem',
    color: '#2F5DFF',
    width: '60px',
    textAlign: 'center'
  },
  statInfo: {
    flex: 1
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  dashboardCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '1rem'
  },
  viewAllLink: {
    color: '#2F5DFF',
    textDecoration: 'none',
    fontSize: '0.9rem'
  },
  markAllRead: {
    background: 'none',
    border: 'none',
    color: '#2F5DFF',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  casesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  caseItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px'
  },
  caseInfo: {
    flex: 1
  },
  caseStatus: {
    marginLeft: '1rem'
  },
  statusBadge: {
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  notificationItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px'
  },
  notificationIcon: {
    fontSize: '1.2rem',
    color: '#2F5DFF',
    marginTop: '0.2rem'
  },
  notificationContent: {
    flex: 1
  },
  quickActions: {
    marginBottom: '2rem'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  },
  actionCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    transition: 'transform 0.3s ease'
  },
  subscriptionCard: {
    background: 'linear-gradient(135deg, #2F5DFF 0%, #1e4ae6 100%)',
    color: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  subscriptionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  upgradeBtn: {
    background: '#3DDC97',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem'
  },
  subscriptionInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  planFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    opacity: 0.9
  },
  calendarWidget: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  calendarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef'
  },
  calendarDate: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#2F5DFF',
    color: 'white',
    padding: '0.5rem',
    borderRadius: '8px',
    minWidth: '50px'
  },
  dateDay: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  dateMonth: {
    fontSize: '0.8rem',
    textTransform: 'uppercase'
  },
  calendarInfo: {
    flex: 1
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px'
  },
  activityIcon: {
    fontSize: '1.2rem',
    marginTop: '0.2rem'
  },
  activityContent: {
    flex: 1
  }
};

export default Dashboard;