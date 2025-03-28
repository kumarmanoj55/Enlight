document.addEventListener('DOMContentLoaded', () => {
    const powerBtn = document.getElementById('powerBtn');
    const brightnessSlider = document.getElementById('brightness');
    const colorPicker = document.getElementById('color');
    const presetButtons = document.querySelectorAll('.preset-btn');
    const bulbBody = document.querySelector('.bulb-body');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');

    let isOn = true;
    let currentColor = '#ffffff';
    let currentBrightness = 100;

    // Power button functionality
    powerBtn.addEventListener('click', () => {
        isOn = !isOn;
        powerBtn.classList.toggle('off');
        
        if (isOn) {
            bulbBody.style.opacity = '1';
            bulbBody.style.boxShadow = `0 0 50px ${currentColor}`;
            bulbBody.style.filter = `brightness(${currentBrightness / 100})`;
            statusDot.style.backgroundColor = '#4CAF50';
            statusText.textContent = 'Connected';
            statusText.style.color = '#4CAF50';
        } else {
            bulbBody.style.opacity = '0.3';
            bulbBody.style.boxShadow = 'none';
            bulbBody.style.filter = 'brightness(0.3)';
            statusDot.style.backgroundColor = '#ff4444';
            statusText.textContent = 'Disconnected';
            statusText.style.color = '#ff4444';
        }
    });

    // Brightness control
    brightnessSlider.addEventListener('input', (e) => {
        currentBrightness = e.target.value;
        updateBulb();
    });

    // Color picker functionality
    colorPicker.addEventListener('input', (e) => {
        currentColor = e.target.value;
        updateBulb();
    });

    // Preset colors functionality
    presetButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentColor = button.dataset.color;
            colorPicker.value = currentColor;
            updateBulb();
        });
    });

    // Update bulb appearance
    function updateBulb() {
        if (isOn) {
            const brightness = currentBrightness / 100;
            const rgbaColor = hexToRgba(currentColor, brightness);
            bulbBody.style.backgroundColor = currentColor;
            bulbBody.style.boxShadow = `0 0 50px ${rgbaColor}`;
            bulbBody.style.filter = `brightness(${brightness})`;
        }
    }

    // Helper function to convert hex to rgba
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Add touch feedback for mobile devices
    document.querySelectorAll('button, input').forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.95)';
        });

        element.addEventListener('touchend', () => {
            element.style.transform = 'scale(1)';
        });
    });
});