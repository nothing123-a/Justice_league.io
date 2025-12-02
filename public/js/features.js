// Enhanced Features for Justice Path
class EnhancedFeatures {
    constructor() {
        this.documents = JSON.parse(localStorage.getItem('documents') || '[]');
        this.notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        this.caseUpdates = JSON.parse(localStorage.getItem('caseUpdates') || '[]');
        this.init();
    }

    init() {
        this.setupDocumentManagement();
        this.setupNotificationSystem();
        this.setupCaseTracking();
        this.setupVideoConsultation();
    }

    // Feature 1: Document Management System
    setupDocumentManagement() {
        this.createDocumentUploadModal();
        this.setupDocumentEventListeners();
    }

    createDocumentUploadModal() {
        const modalHTML = `
            <div id="documentModal" class="modal">
                <div class="modal-content document-modal">
                    <span class="close" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
                    <h3><i class="fas fa-file-upload"></i> Document Management</h3>
                    <div class="document-upload-area">
                        <div class="upload-zone" id="uploadZone">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Drag & drop files here or click to browse</p>
                            <input type="file" id="fileInput" multiple accept=".pdf,.doc,.docx,.jpg,.png">
                        </div>
                    </div>
                    <div class="document-list" id="documentList">
                        <h4>Uploaded Documents</h4>
                        <div id="documentsContainer"></div>
                    </div>
                    <div class="document-actions">
                        <button class="btn-primary" onclick="window.features.shareDocuments()">
                            <i class="fas fa-share"></i> Share with Lawyer
                        </button>
                        <button class="btn-secondary" onclick="window.features.downloadAll()">
                            <i class="fas fa-download"></i> Download All
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    setupDocumentEventListeners() {
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');

        if (uploadZone && fileInput) {
            uploadZone.addEventListener('click', () => fileInput.click());
            uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadZone.classList.add('drag-over');
            });
            uploadZone.addEventListener('dragleave', () => {
                uploadZone.classList.remove('drag-over');
            });
            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZone.classList.remove('drag-over');
                this.handleFileUpload(e.dataTransfer.files);
            });
            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
        }
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            const document = {
                id: Date.now() + Math.random(),
                name: file.name,
                size: file.size,
                type: file.type,
                uploadDate: new Date().toISOString(),
                caseId: this.currentCaseId || null
            };
            this.documents.push(document);
        });
        localStorage.setItem('documents', JSON.stringify(this.documents));
        this.displayDocuments();
        this.showNotification('Documents uploaded successfully!', 'success');
    }

    displayDocuments() {
        const container = document.getElementById('documentsContainer');
        if (!container) return;

        container.innerHTML = this.documents.map(doc => `
            <div class="document-item">
                <div class="doc-icon">
                    <i class="fas fa-${this.getFileIcon(doc.type)}"></i>
                </div>
                <div class="doc-info">
                    <div class="doc-name">${doc.name}</div>
                    <div class="doc-meta">${this.formatFileSize(doc.size)} • ${new Date(doc.uploadDate).toLocaleDateString()}</div>
                </div>
                <div class="doc-actions">
                    <button onclick="window.features.viewDocument('${doc.id}')" class="btn-icon">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="window.features.deleteDocument('${doc.id}')" class="btn-icon delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Feature 2: Real-time Notification System
    setupNotificationSystem() {
        this.createNotificationCenter();
        this.startNotificationPolling();
    }

    createNotificationCenter() {
        const notificationHTML = `
            <div id="notificationCenter" class="notification-center">
                <div class="notification-toggle" onclick="window.features.toggleNotifications()">
                    <i class="fas fa-bell"></i>
                    <span class="notification-count" id="notificationCount">0</span>
                </div>
                <div class="notification-dropdown" id="notificationDropdown">
                    <div class="notification-header">
                        <h4>Notifications</h4>
                        <button onclick="window.features.markAllRead()" class="btn-text">Mark all read</button>
                    </div>
                    <div class="notification-list" id="notificationList"></div>
                </div>
            </div>
        `;
        document.querySelector('.nav-menu').insertAdjacentHTML('beforeend', notificationHTML);
    }

    addNotification(type, title, message, caseId = null) {
        const notification = {
            id: Date.now(),
            type,
            title,
            message,
            caseId,
            read: false,
            timestamp: new Date().toISOString()
        };
        this.notifications.unshift(notification);
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
        this.updateNotificationDisplay();
    }

    updateNotificationDisplay() {
        const countElement = document.getElementById('notificationCount');
        const listElement = document.getElementById('notificationList');
        
        const unreadCount = this.notifications.filter(n => !n.read).length;
        if (countElement) {
            countElement.textContent = unreadCount;
            countElement.style.display = unreadCount > 0 ? 'block' : 'none';
        }

        if (listElement) {
            listElement.innerHTML = this.notifications.slice(0, 10).map(notification => `
                <div class="notification-item ${notification.read ? 'read' : 'unread'}" onclick="window.features.markAsRead('${notification.id}')">
                    <div class="notification-icon ${notification.type}">
                        <i class="fas fa-${this.getNotificationIcon(notification.type)}"></i>
                    </div>
                    <div class="notification-content">
                        <div class="notification-title">${notification.title}</div>
                        <div class="notification-message">${notification.message}</div>
                        <div class="notification-time">${this.formatTimeAgo(notification.timestamp)}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Feature 3: Advanced Case Tracking
    setupCaseTracking() {
        this.createCaseTrackingModal();
    }

    createCaseTrackingModal() {
        const trackingHTML = `
            <div id="caseTrackingModal" class="modal">
                <div class="modal-content tracking-modal">
                    <span class="close" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
                    <h3><i class="fas fa-chart-line"></i> Case Progress Tracking</h3>
                    <div class="tracking-timeline" id="trackingTimeline"></div>
                    <div class="tracking-stats">
                        <div class="stat-card">
                            <i class="fas fa-clock"></i>
                            <div>
                                <div class="stat-number" id="avgResponseTime">2.5 hrs</div>
                                <div class="stat-label">Avg Response Time</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-percentage"></i>
                            <div>
                                <div class="stat-number" id="completionRate">87%</div>
                                <div class="stat-label">Completion Rate</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-star"></i>
                            <div>
                                <div class="stat-number" id="clientSatisfaction">4.8</div>
                                <div class="stat-label">Client Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', trackingHTML);
    }

    trackCaseProgress(caseId, status, description) {
        const update = {
            id: Date.now(),
            caseId,
            status,
            description,
            timestamp: new Date().toISOString()
        };
        this.caseUpdates.push(update);
        localStorage.setItem('caseUpdates', JSON.stringify(this.caseUpdates));
        
        // Add notification
        this.addNotification('case-update', 'Case Update', description, caseId);
    }

    // Feature 4: Video Consultation Scheduling
    setupVideoConsultation() {
        this.createConsultationModal();
    }

    createConsultationModal() {
        const consultationHTML = `
            <div id="consultationModal" class="modal">
                <div class="modal-content consultation-modal">
                    <span class="close" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
                    <h3><i class="fas fa-video"></i> Schedule Video Consultation</h3>
                    <div class="consultation-form">
                        <div class="form-group">
                            <label>Select Lawyer</label>
                            <select id="consultationLawyer">
                                <option value="">Choose a lawyer...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Preferred Date</label>
                            <input type="date" id="consultationDate" min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label>Preferred Time</label>
                            <select id="consultationTime">
                                <option value="09:00">9:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="15:00">3:00 PM</option>
                                <option value="16:00">4:00 PM</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Consultation Topic</label>
                            <textarea id="consultationTopic" placeholder="Brief description of what you'd like to discuss..."></textarea>
                        </div>
                        <button class="btn-primary" onclick="window.features.scheduleConsultation()">
                            <i class="fas fa-calendar-plus"></i> Schedule Consultation
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', consultationHTML);
    }

    scheduleConsultation() {
        const lawyer = document.getElementById('consultationLawyer').value;
        const date = document.getElementById('consultationDate').value;
        const time = document.getElementById('consultationTime').value;
        const topic = document.getElementById('consultationTopic').value;

        if (!lawyer || !date || !time || !topic) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        const consultation = {
            id: Date.now(),
            lawyer,
            date,
            time,
            topic,
            status: 'scheduled',
            createdAt: new Date().toISOString()
        };

        const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
        consultations.push(consultation);
        localStorage.setItem('consultations', JSON.stringify(consultations));

        this.addNotification('consultation', 'Consultation Scheduled', `Video call scheduled for ${date} at ${time}`);
        document.getElementById('consultationModal').style.display = 'none';
        this.showNotification('Consultation scheduled successfully!', 'success');
    }

    // Utility functions
    getFileIcon(type) {
        if (type.includes('pdf')) return 'file-pdf';
        if (type.includes('word') || type.includes('doc')) return 'file-word';
        if (type.includes('image')) return 'file-image';
        return 'file';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getNotificationIcon(type) {
        const icons = {
            'case-update': 'briefcase',
            'consultation': 'video',
            'document': 'file',
            'message': 'envelope',
            'payment': 'credit-card'
        };
        return icons[type] || 'bell';
    }

    formatTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = now - time;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'Just now';
    }

    toggleNotifications() {
        const dropdown = document.getElementById('notificationDropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id == notificationId);
        if (notification) {
            notification.read = true;
            localStorage.setItem('notifications', JSON.stringify(this.notifications));
            this.updateNotificationDisplay();
        }
    }

    markAllRead() {
        this.notifications.forEach(n => n.read = true);
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
        this.updateNotificationDisplay();
    }

    showNotification(message, type = 'info') {
        // Use existing notification system from app.js
        if (window.app && window.app.showNotification) {
            window.app.showNotification(message, type);
        }
    }

    startNotificationPolling() {
        // Simulate real-time notifications
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 30 seconds
                const messages = [
                    'New lawyer response received',
                    'Case status updated',
                    'Document review completed',
                    'Consultation reminder'
                ];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                this.addNotification('case-update', 'System Update', randomMessage);
            }
        }, 30000);
    }
}

// Global functions for feature access
function openDocumentManager() {
    document.getElementById('documentModal').style.display = 'block';
    if (window.features) {
        window.features.displayDocuments();
    }
}

function openCaseTracking(caseId) {
    document.getElementById('caseTrackingModal').style.display = 'block';
    if (window.features) {
        window.features.currentCaseId = caseId;
    }
}

function openVideoConsultation() {
    document.getElementById('consultationModal').style.display = 'block';
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.features = new EnhancedFeatures();
});