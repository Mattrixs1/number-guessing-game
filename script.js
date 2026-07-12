var numberToGuess;
let tries = 0;

// Determine the level from the current page
function getLevel() {
    const currentPage = window.location.pathname;
    if (currentPage.includes('level2')) return 2;
    if (currentPage.includes('level3')) return 3;
    if (currentPage.includes('level4')) return 4;
    if (currentPage.includes('level5')) return 5;
    return 1; // Default to level 1
}

// Generate number based on level
function generateNumberToGuess() {
    const level = getLevel();
    switch(level) {
        case 1:
            numberToGuess = Math.floor(Math.random() * 10) + 1; // 1-10
            break;
        case 2:
            numberToGuess = Math.floor(Math.random() * 100) + 1; // 1-100
            break;
        default:
            numberToGuess = Math.floor(Math.random() * 100) + 1; // 1-100
    }
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'off';
    document.body.setAttribute('darkmode', savedTheme);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    generateNumberToGuess();
    initializeTheme();
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const body = document.body;
            const currentMode = body.getAttribute('darkmode');
            const newMode = currentMode === 'on' ? 'off' : 'on';
            body.setAttribute('darkmode', newMode);
            localStorage.setItem('theme', newMode);
        });
    }
});

function guessTheNumber() {
    tries = tries + 1;
    displayTries.innerHTML = 'Versuche: ' + tries;    
    if(numberToGuess == myNumber.value) {
        headline.innerHTML ='Du hast Gewonnen!!!'
    }
    if(numberToGuess > myNumber.value) {
        headline.innerHTML ='Die Zahl ist Größer!';
    }
    if(numberToGuess < myNumber.value) {
        headline.innerHTML ='Die Zahl ist Kleiner!';
    }
    myNumber.value = '';
}

function navigateToLevel(level) {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.remove('hidden');
    
    setTimeout(() => {
        const levelPages = {
            1: 'index.html',
            2: 'level2.html',
            3: 'level3.html',
            4: 'level4.html',
            5: 'level5.html'
        };
        
        window.location.href = levelPages[level] || 'index.html';
    }, 1500);
}
