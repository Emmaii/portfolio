document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // TYPING ANIMATION (Video Editing Track Mix)
    // ============================================
    const typedText = document.getElementById('typed-text');
    const words = [
        'Emmanuel Silas Kelechi',
        'Professional Video Editor',
        'Visual Storyteller',
        'Post-Production Specialist'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80; 
    let deletingSpeed = 40; 
    let pauseDuration = 2200; 

    function type() {
        if (!typedText) return;
        
        const currentWord = words[wordIndex];
        
        if (!isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentWord.length) {
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, pauseDuration);
                return;
            }
        } else {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 400);
                return;
            }
        }
        
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }

    if (typedText) {
        setTimeout(type, 800);
    }

    // ============================================
    // MOBILE MENU SYSTEM
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const body = document.body;
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // ============================================
    // UI CORE TRACKING (Scroll & Form Validation)
    // ============================================
    const backToTop = document.querySelector('.back-to-top');
    
    function toggleBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    // Form Intercept Handling
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (toast) {
                toast.classList.add('show');
                setTimeout(() => { toast.classList.remove('show'); }, 3500);
            }
            this.reset();
        });
    }
});

// Dynamic Card Entrance Effects Configuration
const style = document.createElement('style');
style.textContent = `
    .dynamic-card {
        opacity: 0;
        transform: translateY(40px);
        animation: cardFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .dynamic-card:nth-child(1) { animation-delay: 0.1s; }
    .dynamic-card:nth-child(2) { animation-delay: 0.25s; }
    .dynamic-card:nth-child(3) { animation-delay: 0.4s; }

    @keyframes cardFadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
