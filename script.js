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
    // PREVENTING CONFLICT BETWEEN CLICK AND SCROLL LOGIC
    // ========================================================
    const dialTrack = document.getElementById('dial-wheel');
    const ticks = document.querySelectorAll('.dial-tick[data-video-id]');
    const masterIframe = document.getElementById('main-viewfinder');
    const lensBlurEffect = document.getElementById('lens-effect');
    const mediaViewport = document.querySelector('.media-viewport');
    const metaCards = document.querySelectorAll('.meta-content-card');

    let scrollTimeout;
    let isProgrammaticScrolling = false; 

    function scrollTickToCenter(targetTick) {
        if (!dialTrack || !targetTick) return;
        
        isProgrammaticScrolling = true; 
        
        const trackCenter = dialTrack.offsetWidth / 2;
        const tickCenter = targetTick.offsetLeft + (targetTick.offsetWidth / 2);
        const targetScrollLeft = tickCenter - trackCenter;

        dialTrack.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        });

        // Release lock once programmatic scroll settles
        setTimeout(() => {
            isProgrammaticScrolling = false;
        }, 400);
    }

    function switchActiveProject(selectedTick) {
        if (selectedTick.classList.contains('active')) return;

        const targetVideoId = selectedTick.getAttribute('data-video-id');
        const cardIndex = selectedTick.getAttribute('data-index');
        if (!targetVideoId || !masterIframe) return;

        ticks.forEach(t => t.classList.remove('active'));
        selectedTick.add = selectedTick.classList.add('active');

        if (lensBlurEffect && mediaViewport) {
            lensBlurEffect.classList.add('active-snap');
            mediaViewport.classList.add('lens-zoom-snap');

            setTimeout(() => {
                masterIframe.src = `https://www.youtube.com/embed/${targetVideoId}?autoplay=1&modestbranding=1&rel=0&enablejsapi=1`;
                
                metaCards.forEach(card => card.classList.remove('active'));
                const targetedMeta = document.getElementById(`meta-${cardIndex}`);
                if (targetedMeta) targetedMeta.classList.add('active');
            }, 200);

            setTimeout(() => {
                lensBlurEffect.classList.remove('active-snap');
                mediaViewport.classList.remove('lens-zoom-snap');
            }, 550);
        }
    }

    ticks.forEach(tick => {
        tick.addEventListener('click', function() {
            scrollTickToCenter(this);
            switchActiveProject(this);
        });
    });

    if (dialTrack) {
        dialTrack.addEventListener('scroll', function() {
            if (isProgrammaticScrolling) return; // Skip logic if triggered via click sequence

            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
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
            }, 100);
        });
    }

    // Force layout alignment calculation at script initiation stage
    setTimeout(() => {
        const initialActive = document.querySelector('.dial-tick.active');
        if (initialActive) scrollTickToCenter(initialActive);
    }, 400);

    // ========================================================
    // PIPELINE TRANSMISSION DISPATCH
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
