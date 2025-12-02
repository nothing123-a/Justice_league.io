// Justice Path - Frontend Only
class JusticePath {
    constructor() {
        this.currentUser = null;
        this.cases = this.getMockCases();
        this.lawyers = this.getMockLawyers();
        this.users = JSON.parse(localStorage.getItem('users') || '[]');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthStatus();
        this.displayCases(this.cases);
        this.displayLawyers();
    }

    setupEventListeners() {
        // Login modal
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeModal = document.querySelector('.close');
        
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'block';
        });
        
        closeModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });

        // Auth tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchAuthTab(tab);
            });
        });

        // User type selection
        document.getElementById('userType').addEventListener('change', (e) => {
            this.toggleConditionalFields(e.target.value);
        });

        // Case posting
        document.getElementById('postCaseBtn').addEventListener('click', () => {
            if (!this.currentUser) {
                this.showNotification('Please login to post a case', 'error');
                return;
            }
            if (this.currentUser.userType !== 'brokerage') {
                this.showNotification('Only brokerage companies can post cases', 'error');
                return;
            }
            document.getElementById('caseModal').style.display = 'block';
        });

        // Case form submission
        document.getElementById('caseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCaseSubmission();
        });

        // Case modal close
        document.querySelector('#caseModal .close').addEventListener('click', () => {
            document.getElementById('caseModal').style.display = 'none';
        });

        // Auth forms
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Case filters
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.filterCases();
        });

        document.getElementById('priorityFilter').addEventListener('change', () => {
            this.filterCases();
        });
    }

    switchAuthTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });

        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}Form`).classList.add('active');
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateUI();
            document.getElementById('loginModal').style.display = 'none';
            this.showNotification('Login successful!', 'success');
        } else {
            this.showNotification('Invalid credentials', 'error');
        }
    }

    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const userType = document.getElementById('userType').value;
        const company = document.getElementById('company').value;
        const licenseNumber = document.getElementById('licenseNumber').value;
        const specialization = Array.from(document.getElementById('specialization').selectedOptions).map(option => option.value);

        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters long', 'error');
            return;
        }

        if (!userType) {
            this.showNotification('Please select account type', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showNotification('User already exists', 'error');
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            userType,
            company: userType === 'brokerage' ? company : undefined,
            licenseNumber: userType === 'lawyer' ? licenseNumber : undefined,
            specialization: userType === 'lawyer' ? specialization : undefined,
            subscription: { plan: 'free', isActive: true },
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        this.updateUI();
        document.getElementById('loginModal').style.display = 'none';
        this.showNotification('Account created successfully!', 'success');
    }

    handleLogout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.updateUI();
        this.showNotification('Logged out successfully', 'success');
    }

    checkAuthStatus() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.updateUI();
        }
    }

    updateUI() {
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            if (loginBtn) loginBtn.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            if (userName) userName.textContent = this.currentUser.name;
            this.updatePricingUI();
        } else {
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (userMenu) userMenu.classList.add('hidden');
        }
    }

    toggleConditionalFields(userType) {
        const brokerageFields = document.querySelectorAll('.brokerage-field');
        const lawyerFields = document.querySelectorAll('.lawyer-field');
        
        brokerageFields.forEach(field => {
            field.style.display = userType === 'brokerage' ? 'block' : 'none';
        });
        
        lawyerFields.forEach(field => {
            field.style.display = userType === 'lawyer' ? 'block' : 'none';
        });
    }

    getMockCases() {
        return [
            {
                _id: '1',
                title: 'Commercial Property Zoning Dispute',
                description: 'Need legal assistance with zoning variance application for commercial property development. City council rejected initial application.',
                category: 'zoning-problem',
                priority: 'high',
                budget: { min: 5000, max: 15000 },
                propertyDetails: {
                    address: '123 Main St, Downtown',
                    propertyType: 'commercial',
                    value: 850000
                },
                client: { name: 'Metro Realty Group', userType: 'brokerage' },
                status: 'open',
                createdAt: '2024-01-15T10:30:00Z'
            },
            {
                _id: '2',
                title: 'Residential Purchase Contract Issue',
                description: 'Buyer backing out of signed purchase agreement. Need to review contract terms and potential remedies for seller.',
                category: 'contract-issue',
                priority: 'urgent',
                budget: { min: 2000, max: 8000 },
                propertyDetails: {
                    address: '456 Oak Avenue, Suburbs',
                    propertyType: 'residential',
                    value: 425000
                },
                client: { name: 'Sunrise Properties', userType: 'brokerage' },
                status: 'open',
                createdAt: '2024-01-14T14:20:00Z'
            },
            {
                _id: '3',
                title: 'Title Defect Resolution',
                description: 'Discovered title defect during closing process. Need immediate legal assistance to resolve lien issues and clear title.',
                category: 'title-issue',
                priority: 'urgent',
                budget: { min: 3000, max: 10000 },
                propertyDetails: {
                    address: '789 Pine Street, Midtown',
                    propertyType: 'residential',
                    value: 320000
                },
                client: { name: 'Premier Real Estate', userType: 'brokerage' },
                status: 'open',
                createdAt: '2024-01-13T09:15:00Z'
            },
            {
                _id: '4',
                title: 'Environmental Compliance Review',
                description: 'Industrial property requires environmental impact assessment and compliance verification before sale. Need expert legal guidance on EPA regulations.',
                category: 'environmental-law',
                priority: 'high',
                budget: { min: 8000, max: 20000 },
                propertyDetails: {
                    address: '1200 Industrial Blvd, Manufacturing District',
                    propertyType: 'industrial',
                    value: 1200000
                },
                client: { name: 'Industrial Properties LLC', userType: 'brokerage' },
                status: 'open',
                createdAt: '2024-01-12T16:45:00Z'
            },
            {
                _id: '5',
                title: 'Multi-Unit Rent Control Dispute',
                description: 'Apartment complex facing rent control violations and tenant complaints. Need legal representation for housing authority hearing.',
                category: 'landlord-tenant',
                priority: 'urgent',
                budget: { min: 5000, max: 15000 },
                propertyDetails: {
                    address: '456 Residential Ave, Downtown',
                    propertyType: 'residential',
                    value: 850000
                },
                client: { name: 'Metro Housing Group', userType: 'brokerage' },
                status: 'open',
                createdAt: '2024-01-11T11:30:00Z'
            }
        ];
    }

    displayCases(cases) {
        const casesList = document.getElementById('casesList');
        if (!casesList) return;
        
        casesList.innerHTML = '';
        
        if (cases.length === 0) {
            casesList.innerHTML = '<p class="no-cases">No cases found matching your criteria.</p>';
            return;
        }
        
        cases.forEach((case_, index) => {
            const caseCard = document.createElement('div');
            caseCard.className = 'case-card';
            caseCard.style.animationDelay = `${index * 0.1}s`;
            caseCard.innerHTML = `
                <div class="case-header">
                    <div>
                        <div class="case-title">${case_.title}</div>
                        <span class="case-category">${case_.category.replace('-', ' ').toUpperCase()}</span>
                    </div>
                    <span class="case-priority ${case_.priority}">${case_.priority.toUpperCase()}</span>
                </div>
                <div class="case-description">${case_.description.substring(0, 150)}...</div>
                ${case_.budget ? `<div class="case-budget">Budget: $${case_.budget.min.toLocaleString()} - $${case_.budget.max.toLocaleString()}</div>` : ''}
                ${case_.propertyDetails ? `<div class="property-info">
                    <i class="fas fa-map-marker-alt"></i> ${case_.propertyDetails.address}
                    <span class="property-value">Value: $${case_.propertyDetails.value.toLocaleString()}</span>
                </div>` : ''}
                <div class="case-features">
                    <div class="case-feature">
                        <i class="fas fa-file-alt"></i> Documents
                    </div>
                    <div class="case-feature">
                        <i class="fas fa-video"></i> Video Call
                    </div>
                    <div class="case-feature">
                        <i class="fas fa-chart-line"></i> Progress Tracking
                    </div>
                </div>
                <div class="case-footer">
                    <span class="case-date">${new Date(case_.createdAt).toLocaleDateString()}</span>
                    <button class="btn-outline" onclick="viewCase('${case_._id}')">View Details</button>
                </div>
            `;
            casesList.appendChild(caseCard);
        });
    }

    getMockLawyers() {
        return [
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
                name: 'Emily Rodriguez',
                specialization: ['Residential Real Estate', 'Title Issues'],
                rating: 4.7,
                experience: 8,
                location: 'Suburban Area',
                bio: 'Focused on residential transactions and title resolution.',
                subscription: 'basic'
            },
            {
                id: 4,
                name: 'David Thompson',
                specialization: ['Landlord-Tenant Law', 'Property Disputes'],
                rating: 4.6,
                experience: 10,
                location: 'City Center',
                bio: 'Experienced in rental property law and dispute resolution.',
                subscription: 'basic'
            },
            {
                id: 5,
                name: 'Lisa Martinez',
                specialization: ['Environmental Law', 'Regulatory Compliance'],
                rating: 4.9,
                experience: 14,
                location: 'Legal District',
                bio: 'Expert in environmental regulations and property compliance matters.',
                subscription: 'premium'
            },
            {
                id: 6,
                name: 'Robert Kim',
                specialization: ['Real Estate Finance', 'Investment Law'],
                rating: 4.7,
                experience: 11,
                location: 'Financial District',
                bio: 'Specialized in real estate investments and financing structures.',
                subscription: 'premium'
            }
        ];
    }

    displayLawyers() {
        const lawyersList = document.getElementById('lawyersList');
        if (!lawyersList) return;
        
        lawyersList.innerHTML = '';
        
        this.lawyers.forEach((lawyer, index) => {
            const lawyerCard = document.createElement('div');
            lawyerCard.className = 'lawyer-card animate-float';
            lawyerCard.style.animationDelay = `${index * 0.2}s`;
            const subscriptionBadge = lawyer.subscription === 'premium' ? '<span class="premium-badge">Premium</span>' : '';
            
            lawyerCard.innerHTML = `
                <div class="lawyer-avatar">
                    <i class="fas fa-user-tie"></i>
                </div>
                ${subscriptionBadge}
                <div class="lawyer-name">${lawyer.name}</div>
                <div class="lawyer-specialization">${lawyer.specialization.join(', ')}</div>
                <div class="lawyer-rating">
                    <span class="stars">${'★'.repeat(Math.floor(lawyer.rating))}${'☆'.repeat(5-Math.floor(lawyer.rating))}</span>
                    <span>${lawyer.rating}</span>
                </div>
                <p>${lawyer.experience} years experience</p>
                <p class="lawyer-location"><i class="fas fa-map-marker-alt"></i> ${lawyer.location}</p>
                <button class="btn-outline" onclick="viewLawyerProfile(${lawyer.id})">View Profile</button>
            `;
            lawyersList.appendChild(lawyerCard);
        });
    }

    handleCaseSubmission() {
        const newCase = {
            _id: Date.now().toString(),
            title: document.getElementById('caseTitle').value,
            description: document.getElementById('caseDescription').value,
            category: document.getElementById('caseCategory').value,
            priority: document.getElementById('casePriority').value,
            budget: {
                min: parseInt(document.getElementById('budgetMin').value) || 0,
                max: parseInt(document.getElementById('budgetMax').value) || 0
            },
            propertyDetails: {
                address: document.getElementById('propertyAddress').value,
                propertyType: document.getElementById('propertyType').value,
                value: parseInt(document.getElementById('propertyValue').value) || 0
            },
            deadline: document.getElementById('caseDeadline').value,
            client: {
                name: this.currentUser.company || this.currentUser.name,
                userType: this.currentUser.userType
            },
            status: 'open',
            createdAt: new Date().toISOString()
        };
        
        this.cases.unshift(newCase);
        localStorage.setItem('cases', JSON.stringify(this.cases));
        
        this.showNotification('Case posted successfully!', 'success');
        document.getElementById('caseModal').style.display = 'none';
        document.getElementById('caseForm').reset();
        this.displayCases(this.cases);
    }

    filterCases() {
        const categoryFilter = document.getElementById('categoryFilter').value;
        const priorityFilter = document.getElementById('priorityFilter').value;
        
        let filteredCases = this.cases;
        
        if (categoryFilter) {
            filteredCases = filteredCases.filter(case_ => case_.category === categoryFilter);
        }
        
        if (priorityFilter) {
            filteredCases = filteredCases.filter(case_ => case_.priority === priorityFilter);
        }
        
        this.displayCases(filteredCases);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#3DDC97';
                break;
            case 'error':
                notification.style.backgroundColor = '#e74c3c';
                break;
            case 'info':
                notification.style.backgroundColor = '#2F5DFF';
                break;
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Utility functions
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

    // Subscription management
    handleSubscription(plan) {
        if (!this.currentUser || this.currentUser.userType !== 'lawyer') {
            this.showNotification('Only lawyers can subscribe to plans', 'error');
            return;
        }
        
        this.currentUser.subscription = {
            plan,
            isActive: true,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Update users array
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex] = this.currentUser;
            localStorage.setItem('users', JSON.stringify(this.users));
        }
        
        this.showNotification(`Subscribed to ${plan} plan successfully!`, 'success');
        this.updatePricingUI();
    }
    
    updatePricingUI() {
        if (this.currentUser && this.currentUser.userType === 'lawyer') {
            const currentPlan = this.currentUser.subscription?.plan || 'free';
            document.querySelectorAll('.pricing-card button').forEach((btn, index) => {
                const plans = ['free', 'basic', 'premium'];
                if (plans[index] === currentPlan) {
                    btn.textContent = 'Current Plan';
                    btn.className = 'btn-outline';
                } else {
                    btn.textContent = 'Upgrade Now';
                    btn.className = 'btn-primary';
                    btn.onclick = () => this.handleSubscription(plans[index]);
                }
            });
        }
    }
}

// Utility functions
function viewCase(caseId) {
    alert(`Viewing case details for case ID: ${caseId}\n\nThis would open a detailed case view with:\n- Full case description\n- Property details\n- Budget information\n- Contact client option\n- Submit proposal option`);
}

function viewLawyerProfile(lawyerId) {
    const lawyer = window.app.lawyers.find(l => l.id === lawyerId);
    if (lawyer) {
        alert(`${lawyer.name}\n\nSpecialization: ${lawyer.specialization.join(', ')}\nExperience: ${lawyer.experience} years\nRating: ${lawyer.rating}/5\nLocation: ${lawyer.location}\n\nBio: ${lawyer.bio}`);
    }
}

function showRegistrationModal(userType) {
    document.getElementById('loginModal').style.display = 'block';
    document.querySelector('[data-tab="register"]').click();
    if (userType) {
        document.getElementById('userType').value = userType;
        document.getElementById('userType').dispatchEvent(new Event('change'));
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new JusticePath();
});