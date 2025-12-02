import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      caseUpdates: true,
      lawyerMessages: true,
      paymentAlerts: true
    },
    privacy: {
      profileVisibility: 'public',
      showContactInfo: true,
      allowDirectMessages: true,
      dataSharing: false
    },
    preferences: {
      language: 'en',
      timezone: 'Asia/Kolkata',
      currency: 'INR',
      theme: 'light',
      autoSave: true
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
      sessionTimeout: '30'
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: 'fas fa-user' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'privacy', label: 'Privacy', icon: 'fas fa-shield-alt' },
    { id: 'preferences', label: 'Preferences', icon: 'fas fa-cog' },
    { id: 'security', label: 'Security', icon: 'fas fa-lock' },
    { id: 'billing', label: 'Billing', icon: 'fas fa-credit-card' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Settings</h1>
        <p>Manage your account preferences and security settings</p>
      </div>

      <div style={styles.settingsContainer}>
        <div style={styles.sidebar}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.tabButton,
                ...(activeTab === tab.id ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div style={styles.content}>
          {activeTab === 'account' && (
            <div style={styles.section}>
              <h2>Account Information</h2>
              <div style={styles.accountInfo}>
                <div style={styles.avatar}>
                  <i className="fas fa-user-circle"></i>
                  <button style={styles.changeAvatarBtn}>Change Photo</button>
                </div>
                <div style={styles.accountDetails}>
                  <div style={styles.infoRow}>
                    <label>Name</label>
                    <span>{user?.name}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <label>Email</label>
                    <span>{user?.email}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <label>User Type</label>
                    <span>{user?.userType === 'lawyer' ? 'Real Estate Lawyer' : 'Brokerage Company'}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <label>Member Since</label>
                    <span>December 2024</span>
                  </div>
                </div>
              </div>
              <div style={styles.actionButtons}>
                <button style={styles.primaryBtn}>Edit Profile</button>
                <button style={styles.dangerBtn}>Delete Account</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div style={styles.section}>
              <h2>Notification Preferences</h2>
              <div style={styles.settingsGroup}>
                <h3>Communication</h3>
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} style={styles.settingItem}>
                    <div style={styles.settingInfo}>
                      <label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                      <p>{getNotificationDescription(key)}</p>
                    </div>
                    <label style={styles.switch}>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div style={styles.section}>
              <h2>Privacy Settings</h2>
              <div style={styles.settingsGroup}>
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <label>Profile Visibility</label>
                    <p>Control who can see your profile</p>
                  </div>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                    style={styles.select}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="contacts">Contacts Only</option>
                  </select>
                </div>
                
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <label>Show Contact Information</label>
                    <p>Display your contact details on your profile</p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.privacy.showContactInfo}
                      onChange={(e) => handleSettingChange('privacy', 'showContactInfo', e.target.checked)}
                    />
                    <span style={styles.slider}></span>
                  </label>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <label>Allow Direct Messages</label>
                    <p>Let other users send you direct messages</p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.privacy.allowDirectMessages}
                      onChange={(e) => handleSettingChange('privacy', 'allowDirectMessages', e.target.checked)}
                    />
                    <span style={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div style={styles.section}>
              <h2>General Preferences</h2>
              <div style={styles.settingsGroup}>
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <label>Language</label>
                    <p>Choose your preferred language</p>
                  </div>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                    style={styles.select}
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="mr">मराठी</option>
                  </select>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <label>Timezone</label>
                    <p>Set your local timezone</p>
                  </div>
                  <select
                    value={settings.preferences.timezone}
                    onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                    style={styles.select}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <label>Theme</label>
                    <p>Choose your interface theme</p>
                  </div>
                  <div style={styles.themeOptions}>
                    {['light', 'dark', 'auto'].map(theme => (
                      <button
                        key={theme}
                        style={{
                          ...styles.themeBtn,
                          ...(settings.preferences.theme === theme ? styles.activeTheme : {})
                        }}
                        onClick={() => handleSettingChange('preferences', 'theme', theme)}
                      >
                        <i className={`fas fa-${theme === 'light' ? 'sun' : theme === 'dark' ? 'moon' : 'adjust'}`}></i>
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={styles.section}>
              <h2>Security Settings</h2>
              <div style={styles.settingsGroup}>
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <label>Two-Factor Authentication</label>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label style={styles.switch}>
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactor}
                      onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
                    />
                    <span style={styles.slider}></span>
                  </label>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <label>Session Timeout</label>
                    <p>Automatically log out after inactivity</p>
                  </div>
                  <select
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                    style={styles.select}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <div style={styles.securityActions}>
                  <button style={styles.primaryBtn}>Change Password</button>
                  <button style={styles.secondaryBtn}>Download Data</button>
                  <button style={styles.secondaryBtn}>View Login History</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div style={styles.section}>
              <h2>Billing & Subscription</h2>
              {user?.userType === 'lawyer' ? (
                <div style={styles.billingInfo}>
                  <div style={styles.currentPlan}>
                    <h3>Current Plan: {user?.subscription || 'Free'}</h3>
                    <p>Next billing date: Not applicable (Free plan)</p>
                    <button style={styles.primaryBtn}>Upgrade Plan</button>
                  </div>
                  
                  <div style={styles.billingHistory}>
                    <h3>Billing History</h3>
                    <div style={styles.historyItem}>
                      <span>No billing history available</span>
                      <small>Free plan - no charges</small>
                    </div>
                  </div>

                  <div style={styles.paymentMethods}>
                    <h3>Payment Methods</h3>
                    <button style={styles.secondaryBtn}>
                      <i className="fas fa-plus"></i>
                      Add Payment Method
                    </button>
                  </div>
                </div>
              ) : (
                <div style={styles.brokerageBilling}>
                  <h3>Brokerage Account</h3>
                  <p>Your brokerage account has access to all platform features at no cost.</p>
                  <div style={styles.usageStats}>
                    <div style={styles.usageStat}>
                      <i className="fas fa-file-alt"></i>
                      <div>
                        <strong>12</strong>
                        <span>Cases Posted</span>
                      </div>
                    </div>
                    <div style={styles.usageStat}>
                      <i className="fas fa-handshake"></i>
                      <div>
                        <strong>8</strong>
                        <span>Lawyers Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={styles.saveSection}>
            <button style={styles.saveBtn}>Save Changes</button>
            <button style={styles.cancelBtn}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getNotificationDescription = (key) => {
  const descriptions = {
    email: 'Receive notifications via email',
    sms: 'Get SMS alerts for important updates',
    push: 'Browser push notifications',
    caseUpdates: 'Updates about your cases',
    lawyerMessages: 'Messages from lawyers',
    paymentAlerts: 'Payment and billing notifications'
  };
  return descriptions[key] || '';
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 20px'
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center'
  },
  settingsContainer: {
    display: 'flex',
    gap: '2rem',
    minHeight: '600px'
  },
  sidebar: {
    width: '250px',
    background: 'white',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    height: 'fit-content'
  },
  tabButton: {
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '8px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
    color: '#666'
  },
  activeTab: {
    background: '#2F5DFF',
    color: 'white'
  },
  content: {
    flex: 1,
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  section: {
    marginBottom: '2rem'
  },
  settingsGroup: {
    marginTop: '1.5rem'
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    borderBottom: '1px solid #f0f0f0'
  },
  settingInfo: {
    flex: 1
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '24px'
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    borderRadius: '24px',
    transition: '0.4s'
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    minWidth: '150px'
  },
  accountInfo: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  avatar: {
    textAlign: 'center'
  },
  changeAvatarBtn: {
    background: '#2F5DFF',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  accountDetails: {
    flex: 1
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem'
  },
  primaryBtn: {
    background: '#2F5DFF',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  secondaryBtn: {
    background: '#f8f9fa',
    color: '#333',
    border: '1px solid #ddd',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  dangerBtn: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  themeOptions: {
    display: 'flex',
    gap: '1rem'
  },
  themeBtn: {
    padding: '12px 16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    background: 'white',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease'
  },
  activeTheme: {
    borderColor: '#2F5DFF',
    background: 'rgba(47, 93, 255, 0.1)'
  },
  securityActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem'
  },
  billingInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  currentPlan: {
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #2F5DFF, #3DDC97)',
    color: 'white',
    borderRadius: '12px'
  },
  billingHistory: {
    padding: '1.5rem',
    background: '#f8f9fa',
    borderRadius: '12px'
  },
  historyItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 0'
  },
  paymentMethods: {
    padding: '1.5rem',
    background: '#f8f9fa',
    borderRadius: '12px'
  },
  brokerageBilling: {
    textAlign: 'center',
    padding: '2rem'
  },
  usageStats: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    marginTop: '2rem'
  },
  usageStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '12px'
  },
  saveSection: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    paddingTop: '2rem',
    borderTop: '1px solid #f0f0f0'
  },
  saveBtn: {
    background: '#3DDC97',
    color: 'white',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  cancelBtn: {
    background: 'transparent',
    color: '#666',
    border: '1px solid #ddd',
    padding: '12px 32px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

// Add CSS for switch animation
const switchCSS = `
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2F5DFF;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = switchCSS;
document.head.appendChild(styleSheet);

export default Settings;