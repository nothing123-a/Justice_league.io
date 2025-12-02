// Animation System
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupCounterAnimations();
        this.setupParticleEffects();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupPageTransitions();
        this.addScrollReveal();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                    
                    // Trigger counter animation
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                    
                    // Stagger animation for grids
                    if (entry.target.classList.contains('animate-stagger')) {
                        this.staggerChildren(entry.target);
                    }
                }
            });
        }, { threshold: 0.1 });

        // Observe all animated elements
        document.querySelectorAll('[class*="animate-"]').forEach(el => {
            observer.observe(el);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(progress * target);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    staggerChildren(container) {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate-visible');
            }, index * 100);
        });
    }

    setupCounterAnimations() {
        // Update active counts
        setTimeout(() => {
            const activeCases = document.getElementById('activeCases');
            const activeLawyers = document.getElementById('activeLawyers');
            
            if (activeCases) activeCases.textContent = '23';
            if (activeLawyers) activeLawyers.textContent = '47';
        }, 1000);
    }

    setupParticleEffects() {
        // Create floating particles for hero sections
        const heroes = document.querySelectorAll('.page-hero, .hero');
        heroes.forEach(hero => {
            this.createParticles(hero);
        });
    }

    createParticles(container) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(47, 93, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
                animation-delay: ${Math.random() * 2}s;
            `;
            container.appendChild(particle);
        }
    }

    setupScrollAnimations() {
        let ticking = false;
        
        const updateScrollAnimations = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        });
    }

    setupHoverEffects() {
        // Add wiggle effect to icons on hover
        document.querySelectorAll('.fas, .fab').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.classList.add('animate-wiggle');
            });
            icon.addEventListener('animationend', () => {
                icon.classList.remove('animate-wiggle');
            });
        });

        // Add rubber band effect to buttons on click
        document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.classList.add('animate-rubber-band');
                setTimeout(() => {
                    e.target.classList.remove('animate-rubber-band');
                }, 1000);
            });
        });
    }

    setupPageTransitions() {
        document.body.classList.add('page-transition');
    }

    addScrollReveal() {
        const revealElements = document.querySelectorAll('.expertise-card, .law-card, .benefit-card, .step-card');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.classList.add('scroll-reveal');
            revealObserver.observe(el);
        });
    }
}

// Pricing toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    
    const pricingToggle = document.getElementById('pricingToggle');
    if (pricingToggle) {
        pricingToggle.addEventListener('change', (e) => {
            const monthlyPrices = document.querySelectorAll('.monthly-price');
            const yearlyPrices = document.querySelectorAll('.yearly-price');
            
            if (e.target.checked) {
                monthlyPrices.forEach(price => price.classList.add('hidden'));
                yearlyPrices.forEach(price => price.classList.remove('hidden'));
            } else {
                monthlyPrices.forEach(price => price.classList.remove('hidden'));
                yearlyPrices.forEach(price => price.classList.add('hidden'));
            }
        });
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});