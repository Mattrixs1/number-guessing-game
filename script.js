var numberToGuess;
let tries = 0;
let wrongGuesses = [];
let score = Number(localStorage.getItem("score")) || 0;
let wins = Number(localStorage.getItem("wins")) || 0;
let gamesPlayed = Number(localStorage.getItem("gamesPlayed")) || 0;
let highestLevel = Number(localStorage.getItem("highestLevel")) || 1;
let totalGuesses = Number(localStorage.getItem("totalGuesses")) || 0;

function getLevel() {
    const currentPage = window.location.pathname;
    if (currentPage.includes('level2')) return 2;
    if (currentPage.includes('level3')) return 3;
    if (currentPage.includes('level4')) return 4;
    if (currentPage.includes('level5')) return 5;
    return 1; // Default to level 1
}


function givePoints() {

    const level = getLevel();

    let points = 0;

    switch(level){

        case 1:
            points = 10;
            break;

        case 2:
            points = 25;
            break;

        case 3:
            points = 50;
            break;

        case 4:
            points = 100;
            break;

        case 5:
            points = 200;
            break;

    }

        // Multiplikator abhängig von Versuchen
    let multiplier = Math.max(1, 10 - tries);

    points = points * multiplier;
    console.log('ok')

    score += points;

    localStorage.setItem("score", score);

}


function saveWin(){

    wins++;

    gamesPlayed++;

    localStorage.setItem(
        "wins",
        wins
    );

    localStorage.setItem(
        "gamesPlayed",
        gamesPlayed
    );


}


function saveHighestLevel(){

    const level = getLevel();

    if(level > highestLevel){

        highestLevel = level;

        localStorage.setItem(
            "highestLevel",
            highestLevel
        );

    }

}



function generateNumberToGuess() {
    const level = getLevel();
    switch(level) {
        case 1:
            numberToGuess = Math.floor(Math.random() * 10) + 1; // 1-10
            break;
        case 2:
            numberToGuess = Math.floor(Math.random() * 50) + 1; // 1-50
            break;
        case 3:
            numberToGuess = Math.floor(Math.random() * 100) + 1; // 1-100
            break;
        case 4:
            numberToGuess = Math.floor(Math.random()* 250) + 1; // 1-250
    }
}




function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'off';
    document.body.setAttribute('darkmode', savedTheme);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    generateNumberToGuess();
    initializeTheme();
 updateHistoryVisibility();


// Hard Mode laden
const showHistoryCheckbox = document.getElementById("showHistory");

if (showHistoryCheckbox) {
    const hideHistory = localStorage.getItem("hideHistory") === "true";
    showHistoryCheckbox.checked = hideHistory;
    showHistoryCheckbox.addEventListener("change", function () {
        localStorage.setItem("hideHistory", this.checked);
    });
}


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

    const guess = Number(myNumber.value);
    const guessbtn = document.getElementById('guess')
    const input = document.getElementById('myNumber')
    const giveUp = document.getElementById('Aufgeben')
    const BackToStartmenu = document.getElementById('BackToStartmenu')
    
    
    tries++;
    displayTries.innerHTML = "Versuche: " + tries;

    totalGuesses++;

localStorage.setItem(
    "totalGuesses",
    totalGuesses
);

    let direction = "";

    if (guess === numberToGuess) {
        headline.innerHTML = "Du hast gewonnen!";
        direction = "✔ Richtig";
        guessbtn.style.display = 'none'
        input.style.display = 'none'
        giveUp.style.display = 'none'
        BackToStartmenu.style.display = 'block'
           givePoints();
        saveWin();
        saveHighestLevel();


    } else if (guess < numberToGuess) {
        headline.innerHTML = "Die Zahl ist größer!";
        direction = "⬆ Zu klein";
    } else {
        headline.innerHTML = "Die Zahl ist kleiner!";
        direction = "⬇ Zu groß";
    }

    const history = document.getElementById("guessHistory");

    const li = document.createElement("li");
    li.textContent = guess + " → " + direction;
    history.appendChild(li);

    myNumber.value = "";
}



function navigateToLevel(level) {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.remove('hidden');
    
    setTimeout(() => {
        const levelPages = {
            1: 'level1.html',
            2: 'level2.html',
            3: 'level3.html',
            4: 'level4.html',
            5: 'level5.html'
        };
        
        window.location.href = levelPages[level] || 'index.html';
    }, 1000);
}


//document.addEventListener(
//'DOMContentLoaded',
//function() {

  //  generateNumberToGuess();
    //initializeTheme(); 
  //  updateHistoryVisibility();


// Hard Mode laden
//const showHistoryCheckbox = document.getElementById("showHistory");

//if (showHistoryCheckbox) {
  //  const hideHistory = localStorage.getItem("hideHistory") === "true";
    //showHistoryCheckbox.checked = hideHistory;
    //showHistoryCheckbox.addEventListener("change", function () {
      //  localStorage.setItem("hideHistory", this.checked);
//    });
//}

//}}
//)



function updateHistoryVisibility() {
    const hideHistory = localStorage.getItem("hideHistory") === "true";

    const history = document.getElementById("guessHistory");
    const info = document.getElementById("infoP");

    if (!history || !info) return;

    if (hideHistory) {
        history.style.display = "none";
        info.style.display = "block";
    } else {
        history.style.display = "block";
        info.style.display = "none";
    }
}