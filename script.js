// ============================================
// POSITIVITY LIFE - ADVANCED JAVASCRIPT
// ============================================

// Array of daily affirmations
const affirmations = [
    "You are stronger than you think.",
    "Every day is a fresh start.",
    "Your potential is limitless.",
    "You deserve happiness.",
    "You are worthy of love and respect.",
    "Your dreams are within reach.",
    "You have the power to create change.",
    "You are enough, just as you are.",
    "Your kindness makes a difference.",
    "You are capable of amazing things.",
    "Today brings new opportunities.",
    "Your voice matters.",
    "You are a beacon of positivity.",
    "You inspire others more than you know.",
    "Your future is bright.",
    "You are resilient and strong.",
    "You choose to be positive today.",
    "Your efforts are appreciated.",
    "You grow stronger each day.",
    "You are loved and valued.",
    "Your journey is unique and special.",
    "You radiate positive energy."
];

// Quotes array
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
];

let affirmationIndex = 0;
let currentQuoteIndex = 0;
let affirmationCountToday = 0;

// ============================================
// PARTICLE ANIMATION
// ============================================

function createParticle(x, y, emoji) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = emoji;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.querySelector('.particles').appendChild(particle);
    
    setTimeout(() => particle.remove(), 3000);
}

// ============================================
// GRATITUDE FUNCTIONS
// ============================================

function saveGratitude() {
    const gratitude1 = document.getElementById('gratitude1').value.trim();
    const gratitude2 = document.getElementById('gratitude2').value.trim();
    const gratitude3 = document.getElementById('gratitude3').value.trim();

    if (!gratitude1 || !gratitude2 || !gratitude3) {
        showMessage('Please fill in all three gratitude fields! 🙏', false);
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    const gratitudeData = {
        date: today,
        items: [gratitude1, gratitude2, gratitude3],
        timestamp: new Date().getTime()
    };

    localStorage.setItem('todayGratitude', JSON.stringify(gratitudeData));
    showMessage('✨ Your gratitude has been saved! Thank you for reflecting today. 🙏', true);

    // Create celebration particles
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const emojis = ['✨', '💖', '🌟', '💝', '🎉', '🎊', '🌈'];
        createParticle(x, y, emojis[Math.floor(Math.random() * emojis.length)]);
    }

    document.getElementById('gratitude1').value = '';
    document.getElementById('gratitude2').value = '';
    document.getElementById('gratitude3').value = '';

    displayGratitude();
    updateTracker();
    checkAchievements();
}

function displayGratitude() {
    const gratitudeList = document.getElementById('gratitude-list');
    const savedGratitude = localStorage.getItem('todayGratitude');

    if (savedGratitude) {
        const gratitudeData = JSON.parse(savedGratitude);
        const today = new Date().toISOString().split('T')[0];

        if (gratitudeData.date === today) {
            gratitudeList.innerHTML = '';
            gratitudeData.items.forEach((item, index) => {
                const gratitudeItem = document.createElement('div');
                gratitudeItem.className = 'gratitude-item';
                gratitudeItem.innerHTML = `${item}`;
                gratitudeList.appendChild(gratitudeItem);
            });
        }
    }
}

function showMessage(message, isSuccess) {
    const messageElement = document.getElementById('gratitude-message');
    messageElement.textContent = message;
    messageElement.classList.add('show');

    if (isSuccess) {
        messageElement.style.background = '#D4EDDA';
        messageElement.style.color = '#155724';
    } else {
        messageElement.style.background = '#F8D7DA';
        messageElement.style.color = '#721C24';
    }

    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 5000);
}

// ============================================
// AFFIRMATION FUNCTIONS
// ============================================

function getAffirmation() {
    const affirmationText = document.getElementById('affirmation-text');
    affirmationText.style.animation = 'none';

    affirmationIndex = Math.floor(Math.random() * affirmations.length);
    const randomAffirmation = affirmations[affirmationIndex];

    affirmationText.textContent = `"${randomAffirmation}"`;

    setTimeout(() => {
        affirmationText.style.animation = 'fadeIn 0.5s ease';
    }, 10);

    // Increment counter
    updateAffirmationCounter();

    const affirmationData = {
        date: new Date().toISOString().split('T')[0],
        affirmation: randomAffirmation,
        time: new Date().getTime()
    };
    localStorage.setItem('dailyAffirmation', JSON.stringify(affirmationData));

    // Check achievements
    checkAchievements();
}

function updateAffirmationCounter() {
    const today = new Date().toISOString().split('T')[0];
    const key = `affirmation-count-${today}`;
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++;
    localStorage.setItem(key, count);
    document.getElementById('affirmation-count').textContent = count;
    affirmationCountToday = count;
}

// ============================================
// QUOTES CAROUSEL
// ============================================

function initQuotes() {
    renderQuotes();
    updateCarouselDots();
}

function renderQuotes() {
    const quotesGrid = document.getElementById('quotes-grid');
    quotesGrid.innerHTML = '';
    
    quotes.forEach((quote, index) => {
        const quoteCard = document.createElement('div');
        quoteCard.className = 'quote-card';
        quoteCard.innerHTML = `
            <p class="quote-text">${quote.text}</p>
            <p class="quote-author">— ${quote.author}</p>
        `;
        quotesGrid.appendChild(quoteCard);
    });
}

function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    updateCarouselDots();
}

function prevQuote() {
    currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
    updateCarouselDots();
}

function updateCarouselDots() {
    const dotsContainer = document.getElementById('carousel-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < quotes.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === currentQuoteIndex ? ' active' : '');
        dot.onclick = () => {
            currentQuoteIndex = i;
            updateCarouselDots();
        };
        dotsContainer.appendChild(dot);
    }
}

// ============================================
// TRACKER FUNCTIONS
// ============================================

function updateTracker() {
    const gratitudeHistory = JSON.parse(localStorage.getItem('gratitudeHistory')) || [];
    const today = new Date().toISOString().split('T')[0];
    
    if (!gratitudeHistory.includes(today)) {
        gratitudeHistory.push(today);
        localStorage.setItem('gratitudeHistory', JSON.stringify(gratitudeHistory));
    }

    updateTrackerStats();
    updateCalendar();
}

function updateTrackerStats() {
    const gratitudeHistory = JSON.parse(localStorage.getItem('gratitudeHistory')) || [];
    
    // Total reflections
    document.getElementById('total-reflections').textContent = gratitudeHistory.length;
    
    // Current streak
    const streak = calculateCurrentStreak(gratitudeHistory);
    document.getElementById('current-streak').textContent = streak;
    
    // Longest streak
    const longestStreak = calculateLongestStreak(gratitudeHistory);
    document.getElementById('longest-streak').textContent = longestStreak;
    
    // Progress percentage
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const monthPrefix = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0');
    const daysThisMonth = gratitudeHistory.filter(d => d.startsWith(monthPrefix)).length;
    const percentage = Math.round((daysThisMonth / daysInMonth) * 100);
    document.getElementById('gratitude-percentage').textContent = percentage + '%';
}

function calculateCurrentStreak(history) {
    if (history.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        if (history.includes(dateStr)) {
            streak++;
        } else if (i > 0) {
            break;
        }
    }
    
    return streak;
}

function calculateLongestStreak(history) {
    if (history.length === 0) return 0;
    
    let longestStreak = 1;
    let currentStreak = 1;
    
    for (let i = 1; i < history.length; i++) {
        const date1 = new Date(history[i - 1]);
        const date2 = new Date(history[i]);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
        } else {
            currentStreak = 1;
        }
    }
    
    return longestStreak;
}

function updateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';
    
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const gratitudeHistory = JSON.parse(localStorage.getItem('gratitudeHistory')) || [];
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = '0.5rem';
        calendarGrid.appendChild(dayHeader);
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add day cells
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        const dateStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        
        if (gratitudeHistory.includes(dateStr)) {
            dayCell.classList.add('completed');
        }
        
        dayCell.textContent = day;
        calendarGrid.appendChild(dayCell);
    }
}

function resetTracker() {
    if (confirm('Are you sure you want to reset your tracker? This cannot be undone.')) {
        localStorage.removeItem('gratitudeHistory');
        localStorage.removeItem('unlockedAchievements');
        updateTrackerStats();
        updateCalendar();
        resetAchievements();
        alert('✨ Tracker has been reset! Start a new journey! ✨');
    }
}

function exportStats() {
    const stats = {
        totalReflections: document.getElementById('total-reflections').textContent,
        currentStreak: document.getElementById('current-streak').textContent,
        longestStreak: document.getElementById('longest-streak').textContent,
        progress: document.getElementById('gratitude-percentage').textContent,
        exportDate: new Date().toLocaleString()
    };
    
    const dataStr = JSON.stringify(stats, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'positivity-stats.json';
    link.click();
}

// ============================================
// ACHIEVEMENTS SYSTEM
// ============================================

const achievementsList = [
    { id: 'first-step', name: 'First Step', description: 'Save your first gratitude', condition: (stats) => stats.totalReflections >= 1 },
    { id: 'week-warrior', name: 'Week Warrior', description: '7 day streak', condition: (stats) => stats.currentStreak >= 7 },
    { id: 'month-master', name: 'Month Master', description: '30 day streak', condition: (stats) => stats.currentStreak >= 30 },
    { id: 'affirmation-master', name: 'Affirmation Master', description: '10 affirmations', condition: (stats) => affirmationCountToday >= 10 },
    { id: 'positivity-expert', name: 'Positivity Expert', description: '50 reflections', condition: (stats) => stats.totalReflections >= 50 },
    { id: 'life-enthusiast', name: 'Life Enthusiast', description: '100 reflections', condition: (stats) => stats.totalReflections >= 100 }
];

function checkAchievements() {
    const gratitudeHistory = JSON.parse(localStorage.getItem('gratitudeHistory')) || [];
    const stats = {
        totalReflections: gratitudeHistory.length,
        currentStreak: calculateCurrentStreak(gratitudeHistory),
        longestStreak: calculateLongestStreak(gratitudeHistory)
    };
    
    const unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];
    
    achievementsList.forEach(achievement => {
        if (!unlockedAchievements.includes(achievement.id) && achievement.condition(stats)) {
            unlockAchievement(achievement.id, achievement.name);
            unlockedAchievements.push(achievement.id);
            localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
        }
    });
    
    updateAchievementDisplay();
}

function unlockAchievement(id, name) {
    alert(`🎉 Achievement Unlocked: ${name}! 🎉`);
    
    // Create celebration
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const emojis = ['🏆', '⭐', '✨', '🎉', '💫', '🎊', '🌟'];
        createParticle(x, y, emojis[Math.floor(Math.random() * emojis.length)]);
    }
}

function updateAchievementDisplay() {
    const unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];
    
    document.querySelectorAll('.achievement').forEach(element => {
        const name = element.getAttribute('data-name');
        const achievement = achievementsList.find(a => a.name === name);
        
        if (achievement && unlockedAchievements.includes(achievement.id)) {
            element.classList.remove('locked');
            element.classList.add('unlocked');
        }
    });
}

function resetAchievements() {
    document.querySelectorAll('.achievement').forEach(element => {
        element.classList.add('locked');
        element.classList.remove('unlocked');
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    displayGratitude();
    updateTracker();
    initQuotes();
    
    const savedAffirmation = localStorage.getItem('dailyAffirmation');
    if (savedAffirmation) {
        const affirmationData = JSON.parse(savedAffirmation);
        const today = new Date().toISOString().split('T')[0];

        if (affirmationData.date === today) {
            const affirmationText = document.getElementById('affirmation-text');
            affirmationText.textContent = `"${affirmationData.affirmation}"`;
        }
    }
    
    // Load affirmation count for today
    const today = new Date().toISOString().split('T')[0];
    const key = `affirmation-count-${today}`;
    const count = parseInt(localStorage.getItem(key)) || 0;
    document.getElementById('affirmation-count').textContent = count;
    affirmationCountToday = count;

    addSmoothScroll();
    addKeyboardShortcuts();
    updateAchievementDisplay();
});

// ============================================
// SMOOTH SCROLL
// ============================================

function addSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'a' || e.key === 'A') {
            getAffirmation();
        }
        if (e.key === 'g' || e.key === 'G') {
            document.getElementById('gratitude1').focus();
        }
    });
}

// ============================================
// CONSOLE MESSAGES
// ============================================

console.log('%c✨ Welcome to Positivity Life! ✨', 'font-size: 20px; color: #FF6B9D; font-weight: bold;');
console.log('%cTips:', 'font-size: 14px; color: #C44569; font-weight: bold;');
console.log('Press "A" to get a random affirmation');
console.log('Press "G" to focus on gratitude input');
console.log('Track your progress and unlock achievements!');
console.log('%c💪 Have an amazing day! 💪', 'font-size: 14px; color: #FFA502; font-weight: bold;');