const throttleButton = document.getElementById('throttle');
const engineSound = document.getElementById('engine-sound');

let playbackRate = 1; // Default speed (idle)
let accelerationInterval;
let decelerationTimeout;

// Function to gradually increase playback speed
const accelerate = () => {
    clearTimeout(decelerationTimeout); // Cancel deceleration if it's running
    accelerationInterval = setInterval(() => {
        if (playbackRate < 5) { // Max engine speed
            playbackRate += 0.05;
            engineSound.playbackRate = playbackRate;
        }
    }, 100);
};

// Function to gradually decrease playback speed
const decelerate = () => {
    clearInterval(accelerationInterval);
    decelerationTimeout = setTimeout(() => {
        let decelerationInterval = setInterval(() => {
            if (playbackRate > 1) { // Idle speed
                playbackRate -= 0.05;
                engineSound.playbackRate = playbackRate;
            } else {
                clearInterval(decelerationInterval);
            }
        }, 100);
    }, 300); // Small delay before slowing down
};

// Start accelerating when throttle is pressed
throttleButton.addEventListener('mousedown', () => {
    engineSound.play();
    accelerate();
});

// Stop accelerating & start decelerating when throttle is released
throttleButton.addEventListener('mouseup', () => {
    decelerate();
});

// Also allow touch events for mobile
throttleButton.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents ghost clicks on mobile
    engineSound.play();
    accelerate();
});

throttleButton.addEventListener('touchend', () => {
    decelerate();
});
