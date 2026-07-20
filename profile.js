// ==========================
// Standardwerte
// ==========================

if (!localStorage.getItem("joinDate")) {
    const heute = new Date();

    localStorage.setItem(
        "joinDate",
        heute.toLocaleDateString("de-DE")
    );
}

// ==========================
// Daten laden
// ==========================

function loadProfile() {

    const username = localStorage.getItem("username") || "Spieler";
    const about = localStorage.getItem("about") || "Noch keine Beschreibung.";
    const image = localStorage.getItem("profileImage");

    const score = Number(localStorage.getItem("score")) || 0;
    const wins = Number(localStorage.getItem("wins")) || 0;
    const gamesPlayed = Number(localStorage.getItem("gamesPlayed")) || 0;
    const totalGuesses = Number(localStorage.getItem("totalGuesses")) || 0;
const highestLevel = localStorage.getItem("highestLevel") || "Noch keines gespielt";
    const joinDate = localStorage.getItem("joinDate");

    // Profilseite

    if(document.getElementById("username"))
        document.getElementById("username").textContent = username;

    if(document.getElementById("about"))
        document.getElementById("about").textContent = about;

    if(document.getElementById("score"))
        document.getElementById("score").textContent = score;

    if(document.getElementById("wins"))
        document.getElementById("wins").textContent = wins;

    if(document.getElementById("gamesPlayed"))
        document.getElementById("gamesPlayed").textContent = gamesPlayed;

    if(document.getElementById("totalGuesses"))
    document.getElementById("totalGuesses").textContent = totalGuesses;

    if(document.getElementById("highestLevel"))
        document.getElementById("highestLevel").textContent = highestLevel;

    if(document.getElementById("joinDate"))
        document.getElementById("joinDate").textContent = joinDate;

    // Siegquote

    let rate = 0;

    if(gamesPlayed > 0){

        rate = Math.round((wins/gamesPlayed)*100);

    }

    if(document.getElementById("winRate"))
        document.getElementById("winRate").textContent = rate + "%";

    // Rang

    if(document.getElementById("rank"))
        document.getElementById("rank").textContent = getRank(score);

    // Profilbild

    if(image){

        if(document.getElementById("profileImage"))
            document.getElementById("profileImage").src = image;

        if(document.getElementById("previewImage"))
            document.getElementById("previewImage").src = image;

    }

    // Einstellungen

    if(document.getElementById("usernameInput"))
        document.getElementById("usernameInput").value = username;

    if(document.getElementById("aboutInput"))
        document.getElementById("aboutInput").value = about;


}

// ==========================
// Rangsystem
// ==========================

function getRank(score){

    if(score >= 10000) return "👑 Legende";
    if(score >= 5000) return "💠 Meister";
    if(score >= 2500) return "💎 Diamant";
    if(score >= 1000) return "🏆 Platin";
    if(score >= 500) return "🥇 Gold";
    if(score >= 250) return "🥈 Silber";
    if(score >= 100) return "🥉 Bronze";
    if(score < 100) return "Anfänger"
    return 

}

// ==========================
// Speichern
// ==========================

function saveProfile(){

    localStorage.setItem(
        "username",
        document.getElementById("usernameInput").value
    );

    localStorage.setItem(
        "about",
        document.getElementById("aboutInput").value
    );


        // Registrierungsdatum setzen

    const oldDate =
    localStorage.getItem("joinDate");


    if(!oldDate || oldDate === "Nicht registriert"){

        const date = new Date();


        localStorage.setItem(
            "joinDate",
            date.toLocaleDateString("de-DE")
        );

    }

    alert("Profil gespeichert.");

}

// ==========================
// Bild hochladen
// ==========================

const upload = document.getElementById("imageUpload");

if(upload){

upload.addEventListener("change",function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload=function(e){

        localStorage.setItem(
            "profileImage",
            e.target.result
        );

        document.getElementById("previewImage").src=e.target.result;

    }

    reader.readAsDataURL(file);

});

}

// ==========================
// Zurücksetzen
// ==========================

function resetProfile(){

    if(!confirm("Profil wirklich löschen?"))
        return;

    localStorage.removeItem("username");
    localStorage.removeItem("about");
    localStorage.removeItem("profileImage");
        localStorage.setItem("joinDate", "Nicht registriert");

    alert("Profil zurückgesetzt.");

    location.reload();

}

function resetAllStats(){

    let sicher = confirm(
        "Bist du sicher?\n\nAlle Punkte, Siege und Statistiken werden gelöscht."
    );


    if(!sicher){
        return;
    }


    // Spielstatistiken löschen

    localStorage.removeItem("score");
    localStorage.removeItem("wins");
    localStorage.removeItem("gamesPlayed");
    localStorage.removeItem("highestLevel");
    localStorage.removeItem("totalGuesses");


    // Werte neu setzen

    localStorage.setItem("score",0);
    localStorage.setItem("wins",0);
    localStorage.setItem("gamesPlayed",0);
    localStorage.setItem("highestLevel",0);
    localStorage.setItem("totalGuesses",0);



    document.getElementById("resetMessage").innerHTML =
    "✅ Alle Statistiken wurden gelöscht.";


}

// ==========================

document.addEventListener("DOMContentLoaded",loadProfile);