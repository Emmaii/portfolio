document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================================
    // IDENTITY TYPING LOGIC ENGINE
    // ========================================================
    const typedText = document.getElementById('typed-text');
    const roles = [
        'Emmanuel Silas Kelechi',
        'Timeline Architect',
        'Visual Storyteller'
    ];
    
    let roleIdx = 0;
    let charIdx = 0;
    let isReversing = false;
    
    function handleTypingSequence() {
        if (!typedText) return;
        const currentString = roles[roleIdx];
        
        if (!isReversing) {
            typedText.textContent = currentString.substring(0, charIdx + 1);
            charIdx++;
            
            if (charIdx === currentString.length) {
                setTimeout(() => { isReversing = true; handleTypingSequence(); }, 2200);
                return;
            }
        } else {
            typedText.textContent = currentString.substring(0, charIdx - 1);
            charIdx--;
            
            if (charIdx === 0) {
                isReversing = false;
                roleIdx = (roleIdx + 1) % roles.length;
                setTimeout(handleTypingSequence, 400);
                return;
            }
        }
        setTimeout(handleTypingSequence, isReversing ? 30 : 70);
    }
    
    setTimeout(handleTypingSequence, 600);

    // ========================================================
    // APPLE CAMERA APP HORIZONTAL DIAL WHEEL MECHANISM
    // ========================================================
    const dialTrack = document.getElementById('dial-wheel');
    const ticks = document.querySelectorAll('.dial-tick[data-video-id]');
    const masterIframe = document.getElementById('main-viewfinder');
    const lensBlurEffect = document.getElementById('lens-effect');
    const mediaViewport = document.querySelector('.media-viewport');
    const metaCards = document.querySelectorAll('.meta-content-card');

    let clickHoldTimeout;

    // Center active elements relative to tracking view bounds
    function scrollTickToCenter(targetTick) {
        if (!dialTrack || !targetTick) return;
        
        const trackCenter = dialTrack.offsetWidth / 2;
        const tickCenter = targetTick.offsetLeft + (targetTick.offsetWidth / 2);
        const targetScrollLeft = tickCenter - trackCenter;

        dialTrack.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        });
    }

    function switchActiveProject(selectedTick) {
        if (selectedTick.classList.contains('active')) return;

        const targetVideoId = selectedTick.getAttribute('data-video-id');
        const cardIndex = selectedTick.getAttribute('data-index');
        if (!targetVideoId || !masterIframe) return;

        // Step 1: Manage styling toggle shifts
        ticks.forEach(t => t.classList.remove('active'));
        selectedTick.classList.add('active');

        // Step 2: Trigger Camera Glass Shutter/Blur Pulse
        if (lensBlurEffect && mediaViewport) {
            lensBlurEffect.classList.add('active-snap');
            mediaViewport.classList.add('lens-zoom-snap');

            // Step 3: Swap video assets during absolute dark/blur peaks
            setTimeout(() => {
                masterIframe.src = `https://www.youtube.com/embed/${targetVideoId}?autoplay=1&modestbranding=1&rel=0`;
                
                // Step 4: Handle Meta card content visibility state crossfades
                metaCards.forEach(card => card.classList.remove('active'));
                const targetedMeta = document.getElementById(`meta-${cardIndex}`);
                if (targetedMeta) targetedMeta.classList.add('active');
            }, 200);

            // Step 5: Smoothly remove blur overlays to reveal sharp new timeline focus
            setTimeout(() => {
                lensBlurEffect.classList.remove('active-snap');
                mediaViewport.classList.remove('lens-zoom-snap');
            }, 550);
        }
    }

    // Intercept click inputs on explicit focal point ticks
    ticks.forEach(tick => {
        tick.addEventListener('click', function() {
            scrollTickToCenter(this);
            switchActiveProject(this);
        });
    });

    // Native Rolling Scroll detection framework mechanics
    if (dialTrack) {
        dialTrack.addEventListener('scroll', function() {
            clearTimeout(clickHoldTimeout);
            
            // Wait for scroll kinetic momentum vectors to stabilize
            clickHoldTimeout = setTimeout(() => {
                const trackCenter = dialTrack.scrollLeft + (dialTrack.offsetWidth / 2);
                let closestTick = null;
                let minimumDelta = Infinity;

                ticks.forEach(tick => {
                    const tickCenter = tick.offsetLeft + (tick.offsetWidth / 2);
                    const delta = Math.abs(tickCenter - trackCenter);
                    if (delta < minimumDelta) {
                        minimumDelta = delta;
                        closestTick = tick;
                    }
                });

                if (closestTick && !closestTick.classList.contains('active')) {
                    scrollTickToCenter(closestTick);
                    switchActiveProject(closestTick);
                }
            }, 150);
        });
    }

    // Initialize layout centering coordinates cleanly at boot
    setTimeout(() => {
        const initialActive = document.querySelector('.dial-tick.active');
        if (initialActive) scrollTickToCenter(initialActive);
    }, 300);

    // ========================================================
    // DIRECT PIPELINE TRANSMISSION CONTACT INTERCEPTS
    // ========================================================
    const applicationForm = document.getElementById('contactForm');
    const toastNotification = document.getElementById('toast');

    if (applicationForm) {
        applicationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (toastNotification) {
                toastNotification.classList.add('active');
                setTimeout(() => {
                    toastNotification.classList.remove('active');
                }, 3500);
            }
            this.reset();
        });
    }
});
