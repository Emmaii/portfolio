document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CLEAN RESUME TYPING LOGIC
    // ============================================
    const typedText = document.getElementById('typed-text');
    const words = [
        'Emmanuel Silas Kelechi',
        'Video Editor',
        'Visual Storyteller',
        'Post-Production Specialist'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80; 
    let deletingSpeed = 40; 
    let pauseDuration = 2000; 

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
    // MINIMAL PLAYLIST MIX DECK LOGIC
    // ============================================
    const playlistItems = document.querySelectorAll('.playlist-item');
    const mainVideoPlayer = document.getElementById('main-video-player');

    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active classes from all items
            playlistItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to the selected item
            this.classList.add('active');
            
            // Extract specific ID and dynamically update video frame
            const videoId = this.getAttribute('data-video-id');
            if (mainVideoPlayer && videoId) {
                mainVideoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
        });
    });

    // ============================================
    // RESPONSIVE INTERFACES (Mobile Menu)
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

    // Back to top scroll validation triggers
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Form Intercept Handling
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (toast) {
                toast.classList.add('show');
                setTimeout(() => { toast.classList.remove('show'); }, 3000);
            }
            this.reset();
        });
    }
});
