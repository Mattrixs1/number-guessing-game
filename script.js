    let numberToGuess = Math.round(Math.random() * 100);
let tries = 0;

function guessTheNumber() {
    tries = tries + 1;
    displayTries.innerHTML = 'Versuche: ' + tries;

    if(numberToGuess == myNumber.value) {
    headline.innerHTML ='🎉Du hast Gewonnen!!!🎉'
    }

if(numberToGuess > myNumber.value) {
    headline.innerHTML ='Die Zahl ist Größer!';
}

if(numberToGuess < myNumber.value) {
    headline.innerHTML ='Die Zahl ist Kleiner!';

}
   myNumber.value = '';
}

    
    document.getElementById('theme-toggle').addEventListener('click', function () {
        const body = document.body;
        const currentMode = body.getAttribute('darkmode');
        body.setAttribute('darkmode', currentMode === 'on' ? 'off' : 'on');
    });

 