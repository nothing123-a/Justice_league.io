// Chatbot System
class LegalChatbot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            greeting: [
                "Hello! I'm your legal assistant. How can I help you today?",
                "Hi there! I'm here to guide you through our platform. What would you like to know?",
                "Welcome! I can help you with questions about our legal services. How may I assist you?"
            ],
            about: [
                "RealEstate Legal Hub connects brokerage companies with specialized real estate lawyers. We help resolve property disputes, contract issues, zoning problems, and more.",
                "Our platform specializes in real estate law, offering a marketplace where brokers can find qualified lawyers for their legal needs.",
                "We have a 95% success rate with over 10,000 cases resolved, average 2-hour response time, and 24/7 support."
            ],
            cases: [
                "You can post legal cases by clicking 'Post New Case' on the Cases page. Include property details, budget, and case description for best results.",
                "Our platform handles various real estate legal matters: property disputes, contract issues, zoning problems, title issues, and lease disputes.",
                "To view cases, visit our Cases page where you can filter by category, priority, and search for specific issues."
            ],
            lawyers: [
                "We have over 150 verified real estate lawyers with various specializations. You can browse them on our Lawyers page.",
                "Our lawyers specialize in property law, contract disputes, zoning issues, commercial and residential real estate, and landlord-tenant law.",
                "All lawyers on our platform are verified professionals with proven experience in real estate law."
            ],
            pricing: [
                "We offer three subscription plans for lawyers: Free (5 cases/month), Basic ($49/month for 25 cases), and Premium ($99/month for unlimited cases).",
                "Brokerage companies can use our platform for free to post cases and find lawyers.",
                "You can upgrade or downgrade your subscription at any time. We also offer yearly plans with 20% savings."
            ],
            help: [
                "I can help you with:\n• Understanding our platform\n• How to post cases\n• Finding lawyers\n• Subscription plans\n• General legal guidance\n\nWhat specific topic interests you?",
                "Need help navigating? Try asking about 'cases', 'lawyers', 'pricing', or 'how it works'."
            ],
            legal: [
                "For specific legal advice, please consult with one of our qualified lawyers. I can help you find the right specialist for your case.",
                "While I can provide general information, for legal matters specific to your situation, please post a case or contact one of our lawyers directly."
            ],
            laws: [
                "Key real estate laws include: Fair Housing Act (1968) - prohibits housing discrimination, Truth in Lending Act (1968) - requires loan disclosure, RESPA (1974) - protects in settlement process, and Statute of Frauds - requires written contracts.",
                "Important legal concepts: Property Rights (fee simple, easements), Contract Law (purchase agreements, leases), and Zoning Laws (residential, commercial, mixed-use)."
            ],
            expertise: [
                "Our lawyers specialize in Property Rights, Contract Law, and Zoning Laws. We cover fee simple ownership, easements, purchase agreements, lease contracts, and variance applications.",
                "We're the best choice because: 1) Specialized expertise in real estate law, 2) 2-hour average response time, 3) 100% verified professionals, 4) Transparent pricing, 5) 95% success rate, 6) 24/7 support."
            ]
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addWelcomeMessage();
    }

    setupEventListeners() {
        const chatInput = document.getElementById('chatbotInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('bot', this.getRandomResponse('greeting'));
            this.showSuggestions();
        }, 1000);
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    analyzeMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting patterns
        if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
            return 'greeting';
        }
        
        // About patterns
        if (lowerMessage.includes('about') || lowerMessage.includes('what is') || lowerMessage.includes('platform')) {
            return 'about';
        }
        
        // Cases patterns
        if (lowerMessage.includes('case') || lowerMessage.includes('post') || lowerMessage.includes('dispute') || lowerMessage.includes('contract')) {
            return 'cases';
        }
        
        // Lawyers patterns
        if (lowerMessage.includes('lawyer') || lowerMessage.includes('attorney') || lowerMessage.includes('legal professional')) {
            return 'lawyers';
        }
        
        // Pricing patterns
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('subscription') || lowerMessage.includes('plan')) {
            return 'pricing';
        }
        
        // Help patterns
        if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('guide')) {
            return 'help';
        }
        
        // Legal advice patterns
        if (lowerMessage.includes('legal advice') || lowerMessage.includes('my case') || lowerMessage.includes('should i')) {
            return 'legal';
        }
        
        // Laws patterns
        if (lowerMessage.includes('law') || lowerMessage.includes('act') || lowerMessage.includes('regulation') || lowerMessage.includes('statute')) {
            return 'laws';
        }
        
        // Expertise patterns
        if (lowerMessage.includes('why choose') || lowerMessage.includes('best') || lowerMessage.includes('expertise') || lowerMessage.includes('specialization')) {
            return 'expertise';
        }
        
        return 'help';
    }

    generateResponse(message) {
        const category = this.analyzeMessage(message);
        let response = this.getRandomResponse(category);
        
        // Add contextual suggestions
        if (category === 'cases') {
            response += "\n\nWould you like me to guide you to the Cases page?";
        } else if (category === 'lawyers') {
            response += "\n\nShall I show you our Lawyers directory?";
        } else if (category === 'pricing') {
            response += "\n\nWould you like to see our detailed pricing page?";
        }
        
        return response;
    }

    addMessage(sender, message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = message;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add typing animation for bot messages
        if (sender === 'bot') {
            messageDiv.classList.add('typing');
            setTimeout(() => {
                messageDiv.classList.remove('typing');
            }, 1000);
        }
    }
    
    showSuggestions() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'chat-suggestions';
        suggestionsDiv.innerHTML = `
            <div class="suggestions-title">Quick questions:</div>
            <div class="suggestion-buttons">
                <button class="suggestion-btn" onclick="window.legalChatbot.handleSuggestion('How to post a case?')">📝 How to post a case?</button>
                <button class="suggestion-btn" onclick="window.legalChatbot.handleSuggestion('Find lawyers')">👨‍⚖️ Find lawyers</button>
                <button class="suggestion-btn" onclick="window.legalChatbot.handleSuggestion('What laws should I know?')">📚 Important laws</button>
                <button class="suggestion-btn" onclick="window.legalChatbot.handleSuggestion('Why choose this platform?')">⭐ Why choose us?</button>
                <button class="suggestion-btn" onclick="window.legalChatbot.handleSuggestion('Pricing plans')">💰 Pricing plans</button>
                <button class="suggestion-btn" onclick="window.legalChatbot.handleSuggestion('Property rights')">🏠 Property rights</button>
            </div>
        `;
        
        messagesContainer.appendChild(suggestionsDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    handleSuggestion(suggestion) {
        // Remove existing suggestions
        const existingSuggestions = document.querySelector('.chat-suggestions');
        if (existingSuggestions) {
            existingSuggestions.remove();
        }
        
        // Add user message
        this.addMessage('user', suggestion);
        
        // Show typing indicator
        this.showTyping();
        
        // Generate and add bot response
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(suggestion);
            this.addMessage('bot', response);
            
            // Show suggestions again after response
            setTimeout(() => {
                this.showSuggestions();
            }, 500);
        }, 1500);
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        if (!input) return;
        
        const message = input.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage('user', message);
        input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Generate and add bot response
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage('bot', response);
            
            // Show suggestions after response
            setTimeout(() => {
                this.showSuggestions();
            }, 500);
        }, 1500);
    }

    showTyping() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Global chatbot functions
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (!chatbot) return;
    
    chatbot.classList.toggle('open');
    
    // Initialize chatbot if first time opening
    if (!window.legalChatbot) {
        window.legalChatbot = new LegalChatbot();
    }
}

function sendChatMessage() {
    if (window.legalChatbot) {
        window.legalChatbot.sendMessage();
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add chatbot to pages that don't have it
    if (!document.getElementById('chatbot')) {
        const chatbotHTML = `
            <div id="chatbot" class="chatbot-widget">
                <div class="chatbot-toggle" onclick="toggleChatbot()">
                    <i class="fas fa-comments"></i>
                </div>
                <div class="chatbot-container">
                    <div class="chatbot-header">
                        <i class="fas fa-robot"></i>
                        <span>Legal Assistant</span>
                        <button onclick="toggleChatbot()" class="close-chat">×</button>
                    </div>
                    <div class="chatbot-messages" id="chatbotMessages"></div>
                    <div class="chatbot-input">
                        <input type="text" id="chatbotInput" placeholder="Ask me anything...">
                        <button onclick="sendChatMessage()"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }
});