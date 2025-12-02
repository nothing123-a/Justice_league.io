// Justice Path - Main Application Entry Point
// This is a simplified version for direct HTML usage

class JusticePath {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.renderApp();
    }

    loadUserData() {
        const userData = localStorage.getItem('justicePathUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link')) {
                e.preventDefault();
                this.navigate(e.target.getAttribute('href'));
            }
        });

        // Legal Assistant
        document.addEventListener('click', (e) => {
            if (e.target.matches('.assistant-toggle') || e.target.closest('.assistant-toggle')) {
                this.openLegalAssistant();
            }
        });
    }

    navigate(path) {
        // Simple routing simulation
        const content = document.getElementById('main-content');
        if (!content) return;

        switch(path) {
            case '/':
                content.innerHTML = this.renderHome();
                break;
            case '/cases':
                content.innerHTML = this.renderCases();
                break;
            case '/lawyers':
                content.innerHTML = this.renderLawyers();
                break;
            case '/information':
                content.innerHTML = this.renderInformation();
                break;
            default:
                content.innerHTML = this.renderHome();
        }
    }

    renderApp() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-logo">
                        <i class="fas fa-balance-scale"></i>
                        <span>Justice Path</span>
                    </div>
                    <div class="nav-menu">
                        <a href="/" class="nav-link">Home</a>
                        <a href="/cases" class="nav-link">Cases</a>
                        <a href="/lawyers" class="nav-link">Lawyers</a>
                        <a href="/information" class="nav-link">Information</a>
                        
                        <div class="nav-feature">
                            <div class="assistant-toggle">
                                <i class="fas fa-robot"></i>
                                <span class="feature-label">Legal Assistant</span>
                            </div>
                        </div>

                        <div class="nav-feature">
                            <div class="language-selector">
                                <i class="fas fa-globe"></i>
                                <select class="language-select">
                                    <option value="en">EN</option>
                                    <option value="hi">हिं</option>
                                    <option value="mr">मर</option>
                                </select>
                            </div>
                        </div>

                        ${this.currentUser ? this.renderUserMenu() : '<a href="/login" class="btn-primary">Login</a>'}
                    </div>
                </div>
            </nav>
            <div id="main-content" style="margin-top: 70px;">
                ${this.renderHome()}
            </div>
        `;
    }

    renderUserMenu() {
        return `
            <div class="user-menu">
                <div class="notification-center">
                    <div class="notification-toggle">
                        <i class="fas fa-bell"></i>
                        <span class="notification-count">3</span>
                    </div>
                </div>
                <div class="profile-menu">
                    <div class="profile-toggle">
                        <div class="user-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <span class="user-name">${this.currentUser.name}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>
        `;
    }

    renderHome() {
        return `
            <section class="hero">
                <div class="container">
                    <div class="hero-content">
                        <h1>Justice Path</h1>
                        <p>Connect with specialized real estate lawyers and resolve your legal matters efficiently</p>
                        <div class="hero-buttons">
                            <a href="/cases" class="btn-primary">
                                <i class="fas fa-search"></i>
                                Browse Cases
                            </a>
                            <a href="/lawyers" class="btn-secondary">
                                <i class="fas fa-user-tie"></i>
                                Find Lawyers
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="features-section">
                <div class="container">
                    <h2>Why Choose Justice Path?</h2>
                    <div class="grid grid-3">
                        <div class="card">
                            <div class="feature-icon">
                                <i class="fas fa-gavel"></i>
                            </div>
                            <h3>Expert Lawyers</h3>
                            <p>Connect with specialized real estate lawyers with proven track records</p>
                        </div>
                        <div class="card">
                            <div class="feature-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h3>Secure Platform</h3>
                            <p>Your legal matters are handled with complete confidentiality and security</p>
                        </div>
                        <div class="card">
                            <div class="feature-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h3>Quick Resolution</h3>
                            <p>Fast-track your legal processes with our efficient matching system</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderCases() {
        return `
            <div class="page-hero">
                <div class="container">
                    <h1>Legal Cases</h1>
                    <p>Browse and manage real estate legal cases</p>
                </div>
            </div>
            <div class="container" style="padding: 2rem 20px;">
                <div class="cases-grid">
                    <div class="case-card">
                        <div class="case-header">
                            <div>
                                <h3 class="case-title">Property Title Dispute</h3>
                                <span class="case-category">Property Law</span>
                            </div>
                            <span class="case-priority high">High</span>
                        </div>
                        <p class="case-description">Complex title verification issue requiring immediate legal attention for commercial property transaction.</p>
                        <div class="case-budget">Budget: ₹4,00,000 - ₹8,00,000</div>
                        <div class="property-info">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Mumbai, Maharashtra</span>
                            <span class="property-value">₹6.8 crores</span>
                        </div>
                    </div>
                    <div class="case-card">
                        <div class="case-header">
                            <div>
                                <h3 class="case-title">Lease Agreement Dispute</h3>
                                <span class="case-category">Contract Law</span>
                            </div>
                            <span class="case-priority medium">Medium</span>
                        </div>
                        <p class="case-description">Commercial lease dispute requiring expert negotiation and legal resolution.</p>
                        <div class="case-budget">Budget: ₹6,40,000 - ₹12,00,000</div>
                        <div class="property-info">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Delhi, NCR</span>
                            <span class="property-value">₹9.6 crores</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderLawyers() {
        return `
            <div class="page-hero">
                <div class="container">
                    <h1>Expert Lawyers</h1>
                    <p>Connect with specialized real estate legal professionals</p>
                </div>
            </div>
            <div class="container" style="padding: 2rem 20px;">
                <div class="lawyers-grid">
                    <div class="lawyer-card">
                        <div class="lawyer-avatar">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <h3 class="lawyer-name">Adv. Priya Sharma</h3>
                        <p class="lawyer-specialization">Property Law & Disputes</p>
                        <div class="lawyer-rating">
                            <span class="stars">★★★★★</span>
                            <span>4.8 (24 reviews)</span>
                        </div>
                        <p class="lawyer-location">
                            <i class="fas fa-map-marker-alt"></i>
                            Mumbai, Maharashtra
                        </p>
                        <button class="btn-primary">Contact Lawyer</button>
                    </div>
                    <div class="lawyer-card">
                        <div class="lawyer-avatar">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <h3 class="lawyer-name">Adv. Rajesh Kumar</h3>
                        <p class="lawyer-specialization">Commercial Real Estate</p>
                        <div class="lawyer-rating">
                            <span class="stars">★★★★☆</span>
                            <span>4.6 (18 reviews)</span>
                        </div>
                        <p class="lawyer-location">
                            <i class="fas fa-map-marker-alt"></i>
                            Delhi, NCR
                        </p>
                        <button class="btn-primary">Contact Lawyer</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderInformation() {
        return `
            <div class="page-hero">
                <div class="container">
                    <h1>Legal Information Center</h1>
                    <p>Comprehensive guide to IPC sections, court procedures, and legal documentation</p>
                </div>
            </div>
            <div class="container" style="padding: 2rem 20px;">
                <div class="grid grid-2">
                    <div class="card">
                        <h3><i class="fas fa-gavel"></i> IPC Sections</h3>
                        <p>Learn about Indian Penal Code sections relevant to real estate and property law</p>
                        <ul>
                            <li>Section 420 - Cheating and dishonestly inducing delivery of property</li>
                            <li>Section 406 - Criminal breach of trust</li>
                            <li>Section 463 - Forgery</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3><i class="fas fa-university"></i> Court Procedures</h3>
                        <p>Understanding the legal process and court hierarchy</p>
                        <ul>
                            <li>District Court - Property disputes up to ₹20 lakhs</li>
                            <li>High Court - Appeals and high-value cases</li>
                            <li>Supreme Court - Final court of appeal</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3><i class="fas fa-file-alt"></i> Legal Documents</h3>
                        <p>Essential documents for real estate transactions</p>
                        <ul>
                            <li>Sale Deed - Property ownership transfer</li>
                            <li>NOC - No Objection Certificate</li>
                            <li>Encumbrance Certificate - Transaction history</li>
                        </ul>
                    </div>
                    <div class="card">
                        <h3><i class="fas fa-rupee-sign"></i> Legal Costs</h3>
                        <p>Understanding legal fees and court costs</p>
                        <ul>
                            <li>Property Registration: 1-8% of value</li>
                            <li>Lawyer Consultation: ₹2,000-₹10,000</li>
                            <li>Court Filing Fee: ₹500-₹5,000</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    openLegalAssistant() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        modal.innerHTML = `
            <div style="
                width: 90%;
                max-width: 600px;
                height: 80vh;
                background: white;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                <div style="
                    background: linear-gradient(135deg, #2F5DFF 0%, #1e4ae6 100%);
                    color: white;
                    padding: 1rem;
                    border-radius: 12px 12px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <i class="fas fa-robot" style="font-size: 2rem;"></i>
                        <div>
                            <h3>Legal Assistant</h3>
                            <p>AI-powered legal guidance</p>
                        </div>
                    </div>
                    <button onclick="this.closest('.modal').remove()" style="
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        padding: 8px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 1.2rem;
                    ">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div style="padding: 1rem; flex: 1; overflow-y: auto;">
                    <div style="margin-bottom: 1rem;">
                        <div style="
                            background: #f8f9fa;
                            padding: 12px 16px;
                            border-radius: 12px;
                            border: 1px solid #dee2e6;
                            margin-bottom: 1rem;
                        ">
                            <strong>Legal Assistant:</strong><br>
                            Hello! I can help you with:<br>
                            • IPC Sections & Legal Codes<br>
                            • Case Law Information<br>
                            • Court Procedures<br>
                            • Real Estate Legal Queries<br>
                            • Document Requirements<br><br>
                            What would you like to know?
                        </div>
                    </div>
                </div>
                
                <div style="
                    padding: 1rem;
                    border-top: 1px solid #eee;
                    display: flex;
                    gap: 1rem;
                ">
                    <input type="text" placeholder="Ask about IPC sections, court procedures, property law..." style="
                        flex: 1;
                        padding: 12px;
                        border: 1px solid #ddd;
                        border-radius: 25px;
                        outline: none;
                    ">
                    <button style="
                        background: #2F5DFF;
                        color: white;
                        border: none;
                        padding: 12px 16px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 1rem;
                    ">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;

        modal.className = 'modal';
        document.body.appendChild(modal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JusticePath();
});