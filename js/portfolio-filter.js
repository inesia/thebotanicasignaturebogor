// Portfolio Filter - Simple & Functional with Conversion Optimization
document.addEventListener('DOMContentLoaded', function() {
    
    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.folioNav3 .filter');
    const portfolioItems = document.querySelectorAll('.folioItem3');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter portfolio items
            filterPortfolioItems(filterValue);
            
            // Track filter usage for conversion optimization
            trackEvent('portfolio_filter', filterValue);
        });
    });
    
    // Simple filter function
    function filterPortfolioItems(filterValue) {
        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }
    
    // Simple hover effects
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click events to action buttons with conversion tracking
    const detailButtons = document.querySelectorAll('.btnDetail');
    const contactButtons = document.querySelectorAll('.btnContact');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Track detail view clicks
            const unitType = this.closest('.folioItem3').classList.contains('areca') ? 'Areca' : 
                           this.closest('.folioItem3').classList.contains('arelia') ? 'Arelia' : 'Shophouse';
            trackEvent('detail_view', unitType);
            
            // Add your detail view logic here
            console.log('Detail button clicked for:', unitType);
            // You can add modal popup or navigation logic here
        });
    });
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track contact clicks
            const unitType = this.closest('.folioItem3').classList.contains('areca') ? 'Areca' : 
                           this.closest('.folioItem3').classList.contains('arelia') ? 'Arelia' : 'Shophouse';
            trackEvent('contact_click', unitType);
            
            // Let the link proceed naturally
        });
    });
    
    // Add click events to bottom CTA buttons
    const whatsappButtons = document.querySelectorAll('.btnWhatsApp');
    const brochureButtons = document.querySelectorAll('.btnBrochure');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('whatsapp_contact', 'bottom_cta');
        });
    });
    
    brochureButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('brochure_download', 'bottom_cta');
        });
    });
    
    // Simple table row hover effects
    const tableRows = document.querySelectorAll('.comparisonTable tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Simple responsive table functionality
    function handleResponsiveTable() {
        const table = document.querySelector('.comparisonTable');
        if (window.innerWidth <= 768 && table) {
            table.classList.add('mobile-table');
        } else {
            table.classList.remove('mobile-table');
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', handleResponsiveTable);
    handleResponsiveTable(); // Initial check
    
    // Conversion Optimization Features
    
    // 1. Urgency Timer
    function createUrgencyTimer() {
        const urgencyElements = document.querySelectorAll('.urgencyBadge span');
        urgencyElements.forEach(element => {
            if (element.textContent.includes('15 Unit')) {
                // Create countdown timer
                let timeLeft = 24 * 60 * 60; // 24 hours in seconds
                
                const timer = setInterval(() => {
                    const hours = Math.floor(timeLeft / 3600);
                    const minutes = Math.floor((timeLeft % 3600) / 60);
                    const seconds = timeLeft % 60;
                    
                    element.innerHTML = `Hanya ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} tersisa!`;
                    
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        element.innerHTML = 'Promo Berakhir!';
                    }
                    timeLeft--;
                }, 1000);
            }
        });
    }
    
    // 2. Social Proof Counter
    function animateSocialProof() {
        const counters = document.querySelectorAll('.popularity span');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.match(/\d+/)[0]);
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = `Terjual ${Math.floor(current)} unit`;
            }, 50);
        });
    }
    
    // 3. Price Highlight Animation
    function animatePriceHighlight() {
        const priceElements = document.querySelectorAll('.highlightPrice');
        priceElements.forEach(price => {
            price.style.animation = 'pricePulse 2s ease-in-out infinite';
        });
    }
    
    // 4. Trust Indicator Animation
    function animateTrustIndicators() {
        const trustItems = document.querySelectorAll('.trustItem');
        trustItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }
    
    // 5. Conversion Tracking
    function trackEvent(action, label) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'portfolio',
                'event_label': label
            });
        }
        
        // Console log for development
        console.log('Conversion Event:', action, label);
        
        // You can add more tracking services here
        // Facebook Pixel, LinkedIn Insight, etc.
    }
    
    // 6. Scroll-based Conversion Triggers
    function setupScrollTriggers() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('unitComparison')) {
                        trackEvent('comparison_table_view', 'scroll');
                    }
                    
                    if (element.classList.contains('bottomCTA')) {
                        trackEvent('bottom_cta_view', 'scroll');
                        // Trigger trust indicator animation
                        animateTrustIndicators();
                    }
                }
            });
        }, observerOptions);
        
        // Observe key conversion elements
        const comparisonTable = document.querySelector('.unitComparison');
        const bottomCTA = document.querySelector('.bottomCTA');
        
        if (comparisonTable) observer.observe(comparisonTable);
        if (bottomCTA) observer.observe(bottomCTA);
    }
    
    // 7. Mobile Conversion Optimization
    function optimizeMobileConversion() {
        if (window.innerWidth <= 768) {
            // Make CTA buttons more prominent on mobile
            const ctaButtons = document.querySelectorAll('.btnDetail, .btnContact');
            ctaButtons.forEach(button => {
                button.style.fontSize = '14px';
                button.style.padding = '16px 20px';
            });
            
            // Add sticky CTA for mobile
            createStickyCTA();
        }
    }
    
    // 8. Sticky CTA for Mobile
    function createStickyCTA() {
        const stickyCTA = document.createElement('div');
        stickyCTA.className = 'stickyCTA';
        stickyCTA.innerHTML = `
            <a href="https://wa.me/6285183212045?text=Halo,%20Saya%20tertarik%20dengan%20Botanica%20Signature" target="_blank" class="stickyWhatsApp">
                <i class="fa fa-whatsapp"></i>
                Konsultasi Sekarang
            </a>
        `;
        
        document.body.appendChild(stickyCTA);
        
        // Add CSS for sticky CTA
        const stickyCSS = `
            .stickyCTA {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                display: none;
            }
            .stickyWhatsApp {
                background: #25d366;
                color: white;
                padding: 15px 20px;
                border-radius: 50px;
                text-decoration: none;
                font-weight: 600;
                box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .stickyWhatsApp:hover {
                background: #128c7e;
                color: white;
            }
            @media (max-width: 768px) {
                .stickyCTA {
                    display: block;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = stickyCSS;
        document.head.appendChild(style);
    }
    
    // Initialize conversion features
    function initConversionFeatures() {
        // Start urgency timer after a delay
        setTimeout(createUrgencyTimer, 2000);
        
        // Animate social proof after page load
        setTimeout(animateSocialProof, 1000);
        
        // Animate price highlights
        setTimeout(animatePriceHighlight, 1500);
        
        // Setup scroll triggers
        setupScrollTriggers();
        
        // Optimize mobile conversion
        optimizeMobileConversion();
    }
    
    // Initialize after page load
    setTimeout(initConversionFeatures, 500);
    
    // Add CSS for price pulse animation
    const pricePulseCSS = `
        @keyframes pricePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = pricePulseCSS;
    document.head.appendChild(style);
});

// Simple CSS for mobile table
const mobileTableCSS = `
    @media (max-width: 768px) {
        .mobile-table {
            display: block;
        }
        .mobile-table thead {
            display: none;
        }
        .mobile-table tbody,
        .mobile-table tr,
        .mobile-table td {
            display: block;
            width: 100%;
        }
        .mobile-table tr {
            margin-bottom: 15px;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 12px;
            background: #f8f9fa;
        }
        .mobile-table td {
            border: none;
            padding: 6px 0;
            text-align: left;
        }
        .mobile-table td:first-child {
            font-weight: 600;
            color: #b89840;
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 8px;
            margin-bottom: 8px;
        }
    }
`;

// Inject mobile table CSS
const style = document.createElement('style');
style.textContent = mobileTableCSS;
document.head.appendChild(style);
