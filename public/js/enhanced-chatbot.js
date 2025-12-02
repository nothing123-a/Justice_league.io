// Enhanced Legal Chatbot with Advanced Features
class EnhancedLegalChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.userContext = {
            userType: null,
            currentPage: window.location.pathname,
            sessionStart: new Date()
        };
        
        this.responses = {
            greeting: [
                "Hello! I'm your AI legal assistant. I can help with real estate law questions, platform navigation, and case guidance. What can I help you with?",
                "Hi there! I'm here to assist with your real estate legal needs. Whether you're a broker or lawyer, I'm ready to help!",
                "Welcome to Justice Path! I'm your virtual legal assistant, ready to guide you through our platform and answer legal questions."
            ],
            
            // Real Estate Law Categories
            propertyLaw: [
                "Property law covers ownership rights, boundaries, easements, and property transfers. Common issues include boundary disputes, title problems, and ownership conflicts. Would you like specific guidance on any property law matter?",
                "Property rights include fee simple ownership (full ownership), life estates, and easements. Key laws: Property Rights Act, Adverse Possession statutes, and local zoning ordinances."
            ],
            
            contractLaw: [
                "Real estate contracts must be in writing (Statute of Frauds), include essential terms (parties, property, price, terms), and be signed by both parties. Common issues: breach of contract, specific performance, and contract interpretation.",
                "Purchase agreements typically include: property description, purchase price, financing terms, contingencies (inspection, appraisal, financing), and closing date. All parties must sign for validity."
            ],
            
            zoningLaw: [
                "Zoning laws regulate land use (residential, commercial, industrial). Common issues: variance applications, non-conforming uses, zoning violations, and rezoning requests. Each municipality has specific zoning ordinances.",
                "Zoning compliance requires checking: permitted uses, setback requirements, height restrictions, parking requirements, and density limits. Violations can result in fines or forced compliance."
            ],
            
            titleIssues: [
                "Title issues include: liens, encumbrances, easements, boundary disputes, and ownership clouds. Title insurance protects against these defects. Always conduct thorough title searches before closing.",
                "Common title problems: unpaid taxes, mechanic's liens, judgment liens, easements, and chain of title breaks. Resolution may require quiet title actions or lien releases."
            ],
            
            landlordTenant: [
                "Landlord-tenant law covers: lease agreements, security deposits, evictions, habitability, and rent control. Key laws: Fair Housing Act, state landlord-tenant statutes, and local rent ordinances.",
                "Tenant rights include: habitable conditions, privacy, non-discrimination, and proper notice for entry/eviction. Landlord duties: maintenance, repairs, and following eviction procedures."
            ],
            
            // Platform Guidance
            platformHelp: [
                "Our platform connects brokers with specialized real estate lawyers. Brokers can post cases for free, while lawyers have subscription plans. Need help with a specific feature?",
                "Platform features: Case posting, lawyer search, subscription management, and secure messaging. All lawyers are verified professionals with real estate expertise."
            ],
            
            casePosting: [
                "To post a case: 1) Click 'Post New Case', 2) Describe your legal issue, 3) Select category and priority, 4) Set budget range, 5) Add property details. Cases are visible to subscribed lawyers immediately.",
                "Include these details for better responses: property address, issue description, timeline, budget, and any relevant documents. More details = better lawyer matches."
            ],
            
            lawyerSearch: [
                "Find lawyers by: specialization, location, rating, and experience. Use filters to narrow results. View profiles to see expertise, reviews, and success rates before contacting.",
                "Our lawyers specialize in: property disputes, contract issues, zoning problems, title matters, landlord-tenant law, and commercial real estate. All are licensed and verified."
            ],
            
            // Legal Procedures
            procedures: [
                "Common legal procedures: 1) Initial consultation, 2) Case evaluation, 3) Document review, 4) Strategy development, 5) Negotiation or litigation, 6) Resolution. Timeline varies by case complexity.",
                "Legal process typically involves: fact gathering, legal research, document preparation, negotiations, and if needed, court proceedings. Most real estate disputes settle out of court."
            ],
            
            // Emergency/Urgent
            urgent: [
                "For urgent legal matters: 1) Post case with 'Urgent' priority, 2) Contact lawyers directly, 3) Consider emergency legal services. For immediate threats, consult local emergency legal aid.",
                "Urgent real estate issues: foreclosure notices, eviction proceedings, contract deadlines, and closing emergencies. Time-sensitive matters need immediate professional attention."
            ],
            
            // Costs and Fees
            costs: [
                "Legal costs vary by case complexity: Simple contracts ($500-2000), Property disputes ($2000-10000), Complex litigation ($10000+). Many lawyers offer free consultations.",
                "Fee structures: Hourly rates ($200-500/hour), flat fees for simple matters, contingency fees (rare in real estate), and retainer agreements. Always discuss fees upfront."
            ],
            
            // Default responses
            help: [
                "I can help with:\n• Real estate law questions\n• Platform navigation\n• Case posting guidance\n• Lawyer selection\n• Legal procedures\n• Cost estimates\n\nWhat specific topic interests you?",
                "Available assistance:\n• Property law basics\n• Contract guidance\n• Zoning issues\n• Title problems\n• Landlord-tenant matters\n• Platform features\n\nHow can I help today?"
            ],
            
            fallback: [
                "I'm not sure about that specific question, but I can connect you with our specialized real estate lawyers who can provide detailed guidance. Would you like to post a case or browse our lawyer directory?",
                "That's a complex question that may require professional legal advice. I recommend posting your case on our platform or consulting with one of our verified real estate attorneys.",
                "For specific legal advice, please consult with a qualified attorney. I can help you find the right lawyer for your situation or guide you through posting a case."
            ]
        };
        
        this.quickActions = [
            { text: "📝 How to post a case", action: "casePosting" },
            { text: "👨‍⚖️ Find lawyers", action: "lawyerSearch" },
            { text: "🏠 Property law basics", action: "propertyLaw" },
            { text: "📋 Contract issues", action: "contractLaw" },
            { text: "🏢 Zoning problems", action: "zoningLaw" },
            { text: "📄 Title issues", action: "titleIssues" },
            { text: "🏠 Landlord-tenant law", action: "landlordTenant" },
            { text: "💰 Legal costs", action: "costs" },
            { text: "⚡ Urgent matters", action: "urgent" },
            { text: "❓ Platform help", action: "platformHelp" }
        ];
        
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.setupEventListeners();
        this.loadConversationHistory();
        setTimeout(() => this.addWelcomeMessage(), 1000);
    }

    createChatbotHTML() {
        if (document.getElementById('enhanced-chatbot')) return;
        
        const chatbotHTML = `
            <div id="enhanced-chatbot" class="enhanced-chatbot-widget">
                <div class="chatbot-toggle" onclick="window.enhancedChatbot.toggle()">
                    <i class="fas fa-robot"></i>
                    <div class="notification-badge" id="chatNotification" style="display: none;">1</div>
                </div>
                <div class="chatbot-container">
                    <div class="chatbot-header">
                        <div class="header-info">
                            <i class="fas fa-robot"></i>
                            <div>
                                <span class="bot-name">Legal AI Assistant</span>
                                <span class="bot-status">Online • Ready to help</span>
                            </div>
                        </div>
                        <button onclick="window.enhancedChatbot.toggle()" class="close-chat">×</button>
                    </div>
                    <div class="chatbot-messages" id="enhancedChatbotMessages"></div>
                    <div class="quick-actions" id="quickActions"></div>
                    <div class="chatbot-input">
                        <input type="text" id="enhancedChatbotInput" placeholder="Ask about real estate law, cases, or platform features...">
                        <button onclick="window.enhancedChatbot.sendMessage()">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    setupEventListeners() {
        const input = document.getElementById('enhancedChatbotInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    }

    toggle() {
        const chatbot = document.getElementById('enhanced-chatbot');
        if (!chatbot) return;
        
        this.isOpen = !this.isOpen;
        chatbot.classList.toggle('open', this.isOpen);
        
        if (this.isOpen) {
            document.getElementById('enhancedChatbotInput')?.focus();
            this.hideNotification();
        }
    }

    addWelcomeMessage() {
        const greeting = this.getRandomResponse('greeting');
        this.addMessage('bot', greeting);
        this.showQuickActions();
    }

    analyzeMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting patterns
        if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
            return 'greeting';
        }
        
        // Legal categories
        if (lowerMessage.includes('property') || lowerMessage.includes('ownership') || lowerMessage.includes('boundary')) {
            return 'propertyLaw';
        }
        
        if (lowerMessage.includes('contract') || lowerMessage.includes('agreement') || lowerMessage.includes('purchase')) {
            return 'contractLaw';
        }
        
        if (lowerMessage.includes('zoning') || lowerMessage.includes('variance') || lowerMessage.includes('land use')) {
            return 'zoningLaw';
        }
        
        if (lowerMessage.includes('title') || lowerMessage.includes('deed') || lowerMessage.includes('lien')) {
            return 'titleIssues';
        }
        
        if (lowerMessage.includes('landlord') || lowerMessage.includes('tenant') || lowerMessage.includes('lease') || lowerMessage.includes('rent')) {
            return 'landlordTenant';
        }
        
        // Platform features
        if (lowerMessage.includes('post') || lowerMessage.includes('case') || lowerMessage.includes('submit')) {
            return 'casePosting';
        }
        
        if (lowerMessage.includes('lawyer') || lowerMessage.includes('attorney') || lowerMessage.includes('find')) {
            return 'lawyerSearch';
        }
        
        if (lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('price') || lowerMessage.includes('expensive')) {
            return 'costs';
        }
        
        if (lowerMessage.includes('urgent') || lowerMessage.includes('emergency') || lowerMessage.includes('immediate')) {
            return 'urgent';
        }
        
        if (lowerMessage.includes('procedure') || lowerMessage.includes('process') || lowerMessage.includes('steps')) {
            return 'procedures';
        }
        
        if (lowerMessage.includes('platform') || lowerMessage.includes('how') || lowerMessage.includes('help')) {
            return 'help';
        }
        
        return 'fallback';
    }

    generateResponse(message) {
        const category = this.analyzeMessage(message);
        let response = this.getRandomResponse(category);
        
        // Add contextual follow-ups
        if (category === 'casePosting') {
            response += "\n\n💡 Tip: Include property address, timeline, and budget for better lawyer matches.";
        } else if (category === 'costs') {
            response += "\n\n📞 Most lawyers offer free initial consultations to discuss your case and fees.";
        } else if (category === 'urgent') {
            response += "\n\n⚠️ For legal emergencies, also consider contacting local emergency legal services.";
        }
        
        return response;
    }

    getRandomResponse(category) {
        const responses = this.responses[category] || this.responses.fallback;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(sender, message, showActions = false) {
        const messagesContainer = document.getElementById('enhancedChatbotMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'bot' ? 'robot' : 'user'}"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${message}</div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store in conversation history
        this.conversationHistory.push({ sender, message, timestamp: new Date() });
        this.saveConversationHistory();
        
        if (sender === 'bot' && showActions) {
            setTimeout(() => this.showQuickActions(), 500);
        }
    }

    showQuickActions() {
        const actionsContainer = document.getElementById('quickActions');
        if (!actionsContainer) return;
        
        const randomActions = this.quickActions
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
        
        actionsContainer.innerHTML = `
            <div class="actions-title">Quick Help:</div>
            <div class="action-buttons">
                ${randomActions.map(action => 
                    `<button class="action-btn" onclick="window.enhancedChatbot.handleQuickAction('${action.action}', '${action.text}')">${action.text}</button>`
                ).join('')}
            </div>
        `;
    }

    handleQuickAction(action, text) {
        this.addMessage('user', text);
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            const response = this.getRandomResponse(action);
            this.addMessage('bot', response, true);
        }, 1500);
    }

    sendMessage() {
        const input = document.getElementById('enhancedChatbotInput');
        if (!input) return;
        
        const message = input.value.trim();
        if (!message) return;
        
        this.addMessage('user', message);
        input.value = '';
        
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage('bot', response, true);
        }, 1500);
    }

    showTyping() {
        const messagesContainer = document.getElementById('enhancedChatbotMessages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-animation">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) typingIndicator.remove();
    }

    showNotification() {
        const badge = document.getElementById('chatNotification');
        if (badge && !this.isOpen) {
            badge.style.display = 'block';
        }
    }

    hideNotification() {
        const badge = document.getElementById('chatNotification');
        if (badge) badge.style.display = 'none';
    }

    saveConversationHistory() {
        try {
            localStorage.setItem('chatHistory', JSON.stringify(this.conversationHistory.slice(-50)));
        } catch (e) {
            console.log('Could not save chat history');
        }
    }

    loadConversationHistory() {
        try {
            const history = localStorage.getItem('chatHistory');
            if (history) {
                this.conversationHistory = JSON.parse(history);
            }
        } catch (e) {
            console.log('Could not load chat history');
        }
    }
}

// Initialize enhanced chatbot
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedChatbot = new EnhancedLegalChatbot();
});