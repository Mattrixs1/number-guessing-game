function shareProfile(){

    const username =
    localStorage.getItem("username") || "Spieler";

    const about =
    localStorage.getItem("about") || "Keine Beschreibung";

    const score =
    localStorage.getItem("score") || 0;

    const wins =
    localStorage.getItem("wins") || 0;

    const games =
    localStorage.getItem("gamesPlayed") || 0;

    const rank =
    getRankForShare(Number(score));

    const totalGuesses = 
    Number(localStorage.getItem("totalGuesses")) || 0;

const highestLevel = 
localStorage.getItem("highestLevel") || "Noch keines gespielt";

    const joinDate = 
    localStorage.getItem("joinDate");

    const winRate = 
    localStorage.getItem('winRate') || 0;

    const profileText =
     `🎮 Number Guessing Game Profil

     👤 Spieler: ${username}

     📝 ${about}

     ⭐ Punkte: ${score}

     🏆 Siege: ${wins}

     🎮 Spiele: ${games}

     🎯Gesamte Tipps: ${totalGuesses}

     📈Siegesquote: ${winRate}

     🎯Höchstes Level: ${highestLevel}

     📅 Registriert seit: ${joinDate}

     🏅 Rang: ${rank}

      Spiele auch Number Guessing Game!
       https://mattrixs1.github.io/number-guessing-game/
       `;


    // Handy Teilen

    if(navigator.share){

        navigator.share({

            title:
            "Mein Number Guessing Game Profil",

            text:
            profileText

        })

        .catch(error => {
            console.log("Teilen abgebrochen");
        });


    }

    // PC Fallback

    else{

        navigator.clipboard.writeText(profileText);


        alert(
        "Profil wurde in die Zwischenablage kopiert!"
        );

    }

}



function getRankForShare(score){

    if(score >= 10000) return "👑 Legende";
    if(score >= 5000) return "💎 Meister";
    if(score >= 2500) return "💠 Diamant";
    if(score >= 1000) return "🏆 Platin";
    if(score >= 500) return "🥇 Gold";
    if(score >= 250) return "🥈 Silber";
    if(score >= 100) return "🥉 Bronze";

    return "🎮 Anfänger";

}