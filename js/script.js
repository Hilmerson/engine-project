const throttleButton = document.getElementById('throttle');
const engineSound = document.getElementById('engine-sound');

throttleButton.addEventListener('mousedown', () => {
    engineSound.play();
});

throttleButton.addEventListener('mouseup', () => {
    engineSound.pause();
    engineSound.currentTime = 0;
});
