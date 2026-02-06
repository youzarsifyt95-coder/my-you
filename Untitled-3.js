// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const app = document.getElementById('app');
    const backgroundHearts = document.getElementById('backgroundHearts');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebrationArea = document.getElementById('celebrationArea');
    const messageBox = document.getElementById('messageBox');
    const touchHint = document.getElementById('touchHint');
    const celebrationContainer = document.getElementById('celebrationContainer');
    const toastContainer = document.getElementById('toastContainer');
    
    // State
    let hasAnswered = false;
    let noButtonTransform = '';
    
    // Data
    const messages = [
        "Yay! You made me the happiest! 💕",
        "This is the best Valentine's ever! 😍",
        "My heart is dancing with joy! 💃",
        "You just made my whole year! 🌟",
        "I'm the luckiest person alive! 🍀",
        "This made my day perfect! ✨",
        "You have the sweetest heart! 🥰"
    ];
    
    const alerts = [
        "Hey! Come back here! 😊",
        "Try the YES button instead! 💝",
        "Pretty please? 🥺",
        "I'll keep asking until you say yes! 😉",
        "You can't escape love! 💘"
    ];
    
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💘', '💝', '💞'];
    const colors = ['#ff6b9d', '#ff8fab', '#ffafcc', '#ff006e', '#ff4d8d', '#ff85a1', '#fb6f92', '#ff477e', '#ff9ebb', '#ffb3c6', '#ffccd5'];
    
    // Helper functions
    function getRandomHeart() {
        return hearts[Math.floor(Math.random() * hearts.length)];
    }
    
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Create background hearts
    function createBackgroundHearts() {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-bg';
            heart.innerHTML = '❤️';
            
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.fontSize = `${12 + Math.random() * 20}px`;
            heart.style.opacity = `${0.3 + Math.random() * 0.4}`;
            heart.style.animationDuration = `${3 + Math.random() * 3}s`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            
            backgroundHearts.appendChild(heart);
        }
    }
    
    // Celebration effect
    function createCelebration() {
        const count = window.innerWidth < 768 ? 30 : 50;
        celebrationContainer.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            // Create heart
            const heart = document.createElement('div');
            heart.className = 'celebration-heart';
            heart.innerHTML = getRandomHeart();
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.color = getRandomColor();
            heart.style.fontSize = `${20 + Math.random() * 25}px`;
            heart.style.animationDelay = `${Math.random()}s`;
            heart.style.animationDuration = `${1.5 + Math.random()}s`;
            
            celebrationContainer.appendChild(heart);
            
            // Create confetti (every other)
            if (i % 2 === 0) {
                const confetti = document.createElement('div');
                confetti.className = 'celebration-confetti';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.backgroundColor = getRandomColor();
                confetti.style.width = '12px';
                confetti.style.height = '12px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                confetti.style.animationDelay = `${Math.random()}s`;
                confetti.style.animationDuration = `${1 + Math.random()}s`;
                
                celebrationContainer.appendChild(confetti);
            }
        }
        
        // Clear after 3 seconds
        setTimeout(() => {
            celebrationContainer.innerHTML = '';
        }, 3000);
    }
    
    // Toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        // Remove after 2 seconds
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
    
    // Handle YES click
    function handleYes() {
        if (hasAnswered) return;
        
        hasAnswered = true;
        yesBtn.querySelector('.btn-text').textContent = 'THANK YOU! 💖';
        yesBtn.style.opacity = '0.7';
        yesBtn.disabled = true;
        
        noBtn.style.opacity = '0.7';
        noBtn.disabled = true;
        
        // Show celebration
        celebrationArea.style.display = 'block';
        
        // Random message
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        messageBox.textContent = randomMessage;
        
        // Create celebration effect
        createCelebration();
        
        // Change background
        app.style.background = 'linear-gradient(135deg, #ffafcc 0%, #ffc8dd 30%, #ffafcc 100%)';
        
        // Hide hint
        touchHint.style.display = 'none';
        
        // Vibration
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }
    
    // Handle NO click
    function handleNo() {
        if (hasAnswered) return;
        
        const maxX = 100;
        const maxY = 50;
        const newX = (Math.random() - 0.5) * maxX;
        const newY = (Math.random() - 0.5) * maxY;
        
        noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
        
        // Random alert
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        showToast(randomAlert);
        
        // Vibration
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    // Initialize
    function init() {
        createBackgroundHearts();
        
        // Event listeners
        yesBtn.addEventListener('click', handleYes);
        noBtn.addEventListener('click', handleNo);
        
        // Auto-hide hint after 5 seconds
        setTimeout(() => {
            touchHint.style.opacity = '0';
            setTimeout(() => {
                touchHint.style.display = 'none';
            }, 500);
        }, 5000);
        
        // Close button
        document.querySelector('.close-btn').addEventListener('click', function() {
            if (confirm('Close this Valentine card?')) {
                window.close();
            }
        });
    }
    
    // Start the app
    init();
});