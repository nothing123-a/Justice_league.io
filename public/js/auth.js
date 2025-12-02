// Authentication JavaScript
class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupPasswordStrength();
        this.setupUserTypeSelector();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }

    setupPasswordStrength() {
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                this.updatePasswordStrength(e.target.value);
            });
        }
    }

    setupUserTypeSelector() {
        const typeOptions = document.querySelectorAll('.type-option');
        typeOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectUserType(option.dataset.type);
            });
        });
    }

    selectUserType(type) {
        // Remove previous selection
        document.querySelectorAll('.type-option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Add selection to clicked option
        document.querySelector(`[data-type="${type}"]`).classList.add('selected');
        document.getElementById('userType').value = type;

        // Show/hide conditional fields
        document.getElementById('brokerageFields').style.display = type === 'brokerage' ? 'block' : 'none';
        document.getElementById('lawyerFields').style.display = type === 'lawyer' ? 'block' : 'none';
    }

    updatePasswordStrength(password) {
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        if (!strengthFill || !strengthText) return;

        let strength = 0;
        let text = 'Weak';
        let color = '#e74c3c';

        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;

        if (strength >= 75) {
            text = 'Strong';
            color = '#27ae60';
        } else if (strength >= 50) {
            text = 'Medium';
            color = '#f39c12';
        }

        strengthFill.style.width = `${strength}%`;
        strengthFill.style.background = color;
        strengthText.textContent = `Password strength: ${text}`;
        strengthText.style.color = color;
    }

    async handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Show loading state
        const submitBtn = document.querySelector('.auth-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.delay(1500);

            // Dummy login - accept any email/password for demo
            const dummyUser = {
                id: Date.now(),
                name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
                email: email,
                userType: email.includes('lawyer') ? 'lawyer' : 'brokerage',
                company: email.includes('lawyer') ? undefined : 'Demo Company',
                licenseNumber: email.includes('lawyer') ? 'LIC123456' : undefined,
                subscription: { plan: 'free', isActive: true },
                createdAt: new Date().toISOString()
            };

            localStorage.setItem('currentUser', JSON.stringify(dummyUser));
            this.showNotification('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } catch (error) {
            this.showNotification('Login failed. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async handleRegister() {
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) return;

        // Show loading state
        const submitBtn = document.querySelector('.auth-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.delay(2000);

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === formData.email)) {
                this.showNotification('User with this email already exists', 'error');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString(),
                subscription: { plan: 'free', isActive: true }
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            this.showNotification('Account created successfully! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } catch (error) {
            this.showNotification('Registration failed. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    getFormData() {
        const formData = {
            name: document.getElementById('fullName')?.value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            userType: document.getElementById('userType').value
        };

        if (formData.userType === 'brokerage') {
            formData.company = document.getElementById('company').value;
        } else if (formData.userType === 'lawyer') {
            formData.licenseNumber = document.getElementById('licenseNumber').value;
            formData.specialization = Array.from(document.querySelectorAll('input[name="specialization"]:checked'))
                .map(cb => cb.value);
        }

        return formData;
    }

    validateForm(formData) {
        if (!formData.userType) {
            this.showNotification('Please select an account type', 'error');
            return false;
        }

        if (formData.password.length < 6) {
            this.showNotification('Password must be at least 6 characters long', 'error');
            return false;
        }

        if (formData.userType === 'brokerage' && !formData.company) {
            this.showNotification('Company name is required for brokerage accounts', 'error');
            return false;
        }

        if (formData.userType === 'lawyer' && !formData.licenseNumber) {
            this.showNotification('License number is required for lawyer accounts', 'error');
            return false;
        }

        return true;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Global functions
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});