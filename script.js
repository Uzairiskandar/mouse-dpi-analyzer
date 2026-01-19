let isActive = false;
let startPointX = 0;
let movedPixels = 0;

const trackArea = document.getElementById('trackArea');
const pixelsDisplay = document.getElementById('pixelsCount');
const dpiDisplay = document.getElementById('dpiResult');
const distanceInput = document.getElementById('targetDistance');
const statusBadge = document.getElementById('status-badge');
const resetBtn = document.getElementById('resetBtn');

trackArea.addEventListener('mousedown', (e) => {
    isActive = true;
    startPointX = e.clientX;
    trackArea.classList.add('active');
    statusBadge.innerText = "Recording...";
    statusBadge.style.background = "#10b981";
});

window.addEventListener('mousemove', (e) => {
    if (!isActive) return;

    // Calculate movement distance from the starting click point
    movedPixels = Math.abs(e.clientX - startPointX);
    
    pixelsDisplay.innerText = Math.round(movedPixels);
    
    const physicalInches = parseFloat(distanceInput.value);
    if (physicalInches > 0) {
        const calculatedDpi = movedPixels / physicalInches;
        dpiDisplay.innerText = Math.round(calculatedDpi);
    }
});

window.addEventListener('mouseup', () => {
    if (isActive) {
        isActive = false;
        trackArea.classList.remove('active');
        statusBadge.innerText = "Done";
        statusBadge.style.background = "#334155";
    }
});

resetBtn.addEventListener('click', () => {
    movedPixels = 0;
    pixelsDisplay.innerText = "0";
    dpiDisplay.innerText = "0";
    statusBadge.innerText = "Idle";
});