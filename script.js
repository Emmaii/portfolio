document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================================
    // HYPER-CLEAN MONOSPACE NAME PRINT LOGIC
    // ========================================================
    const typedText = document.getElementById('typed-text');
    const positions = [
        'Emmanuel Silas Kelechi',
        'Timeline Architect',
        'Visual Storyteller'
    ];
    
    let arrayIndex = 0;
    let characterIndex = 0;
    let isReversing = false;
    
    function playTypingEffect() {
        if (!typedText) return;
        const completeWord = positions[arrayIndex];
        
        if (!isReversing) {
            typedText.textContent = completeWord.substring(0, characterIndex + 1);
            characterIndex++;
            
            if (characterIndex === completeWord.length) {
                setTimeout(() => { isReversing = true; playTypingEffect(); }, 2500);
                return;
            }
        } else {
            typedText.textContent = completeWord.substring(0, characterIndex - 1);
            characterIndex--;
            
            if (characterIndex === 0) {
                isReversing = false;
                arrayIndex = (arrayIndex + 1) % positions.length;
                setTimeout(playTypingEffect, 400);
                return;
            }
        }
        setTimeout(playTypingEffect, isReversing ? 35 : 75);
    }
    
    setTimeout(playTypingEffect, 600);

    // ========================================================
    // INTERACTIVE CAMERA LENS DECK APERTURE SHUTTER FX
    // ========================================================
    const dialCards = document.querySelectorAll('.dial-lens-card');
    const mainViewfinderPlayer = document.getElementById('portfolio-player');
    const cameraShutterOverlay = document.getElementById('lens-shutter');

    dialCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('active')) return;

            const targetVideoId = this.getAttribute('data-video-id');
            if (!targetVideoId || !mainViewfinderPlayer) return;

            // Step 1: Active card highlight swap
            dialCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // Step 2: Trigger the lens shutter snap animation
            if (cameraShutterOverlay) {
                cameraShutterOverlay.classList.add('shut');
                
                // Step 3: Swap source frame while shutter is closed (150ms mark)
                setTimeout(() => {
                    mainViewfinderPlayer.src = `https://www.youtube.com/embed/${targetVideoId}?autoplay=1&modestbranding=1&rel=0`;
                }, 150);

                // Step 4: Re-open the aperture lens structure
                setTimeout(() => {
                    cameraShutterOverlay.classList.remove('shut');
                }, 350);
            }
        });
    });

    // ========================================================
    // CONTACT DISPATCHER FORMS
    // ========================================================
    const inquiryForm = document.getElementById('portfolioContact');
    const globalToast = document.getElementById('form-toast');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (globalToast) {
                globalToast.classList.add('active');
                setTimeout(() => {
                    globalToast.classList.remove('active');
                }, 3500);
            }
            this.reset();
        });
    }
});
