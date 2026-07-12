document.addEventListener('DOMContentLoaded', () => {
    const dialTrack = document.getElementById('dialTrack');
    const ticks = document.querySelectorAll('.dial-tick');
    const projects = document.querySelectorAll('.project-card');
    const timecodeEl = document.getElementById('timecode');

    let activeIndex = 0;
    const tickGap = 68; // Based on elements metrics styling (width + layout gap)

    // 1. Dynamic System Real-time Timecode Generator (HH:MM:SS:FF)
    function updateTimecode() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Calculate artificial frame sequences matching 60 FPS profile limits
        const milliseconds = now.getMilliseconds();
        const frames = String(Math.floor((milliseconds / 1000) * 60)).padStart(2, '0');

        timecodeEl.textContent = `${hours}:${minutes}:${seconds}:${frames}`;
        requestAnimationFrame(updateTimecode);
    }
    requestAnimationFrame(updateTimecode);

    // 2. Timeline Sequence Navigation Switching Controller
    function switchActiveProject(index) {
        if (index < 0 || index >= projects.length) return;
        activeIndex = index;

        // Reset and update project cards visibility bounds
        projects.forEach(card => card.classList.remove('active'));
        projects[activeIndex].classList.add('active');

        // Center selected item inside the apple-style track selector bounds
        const offset = -activeIndex * tickGap;
        dialTrack.style.transform = `translateX(${offset}px)`;

        // Update active class properties across specific timeline ticks
        ticks.forEach(t => t.classList.remove('active'));
        
        const selectedTick = ticks[activeIndex];
        if (selectedTick) {
            selectedTick.classList.add('active'); // Fixed assignment bug safely
        }
    }

    // 3. Attach Interaction Callbacks to Tick Interfaces
    ticks.forEach((tick, i) => {
        tick.addEventListener('click', () => {
            switchActiveProject(i);
        });
    });

    // 4. Capture Standard Trackpad/Mousewheel Scrolling Signals
    let scrollTimeout;
    window.addEventListener('wheel', (e) => {
        clearTimeout(scrollTimeout);
        
        // Use debounce tracking architecture to prevent erratic step skips
        scrollTimeout = setTimeout(() => {
            if (e.deltaY > 30) {
                // Scroll down or forward sequence boundary checking
                if (activeIndex < projects.length - 1) {
                    switchActiveProject(activeIndex + 1);
                }
            } else if (e.deltaY < -30) {
                // Scroll up or reverse timeline alignment pathing
                if (activeIndex > 0) {
                    switchActiveProject(activeIndex - 1);
                }
            }
        }, 50);
    });
});
