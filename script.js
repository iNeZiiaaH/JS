//Version 1.0
// let nombreADeviner = Math.floor(Math.random() * 100) + 1;
// let essais = 0;

// function devinerNombre() {
//     let userGuess = document.getElementById("guessInput").value;
//     essais++;
//     userGuess = parseInt(userGuess);

//     let message = document.getElementById("message");

//     if (isNaN(userGuess)) {
//         message.textContent = "Veuillez entrer un nombre valide !";
//     } else if (userGuess < nombreADeviner) {
//         message.textContent = "C'est plus !";
//     } else if (userGuess > nombreADeviner) {
//         message.textContent = "C'est moins !";
//     } else {
//         message.textContent = `Félicitations ! Vous avez trouvé le nombre ${nombreADeviner} en ${essais} essais.`;
//     }
// }

//Version 2.0 
// let nombreADeviner = Math.floor(Math.random() * 100) + 1;
// let essais = 0;
// const maxEssais = 10; 

// function devinerNombre() {
//     let userGuess = parseInt(document.getElementById("guessInput").value);
//     essais++;

//     let message = document.getElementById("message");
//     let compteurEssais = document.getElementById("compteurEssais");

//     if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
//         message.textContent = "Veuillez entrer un nombre valide entre 1 et 100.";
//         essais--; 
//     } else if (userGuess < nombreADeviner) {
//         message.textContent = "C'est plus !";
//     } else if (userGuess > nombreADeviner) {
//         message.textContent = "C'est moins !";
//     } else {
//         message.textContent = `Félicitations ! Vous avez trouvé le nombre ${nombreADeviner} en ${essais} essais.`;
//         document.getElementById("guessButton").disabled = true; 
//         document.getElementById("guessInput").disabled = true;  
//         afficherBoutonRejouer();
//     }

//     compteurEssais.textContent = `Essais : ${essais}`;

//     if (essais >= maxEssais && userGuess !== nombreADeviner) {
//         message.textContent = `Désolé, vous avez atteint la limite de ${maxEssais} essais. Le nombre était ${nombreADeviner}.`;
//         document.getElementById("guessButton").disabled = true;
//         document.getElementById("guessInput").disabled = true;
//         afficherBoutonRejouer();
//     }
// }

// function afficherBoutonRejouer() {
//     let rejouerButton = document.createElement("button");
//     rejouerButton.textContent = "Rejouer";
//     rejouerButton.onclick = () => location.reload(); 
//     document.getElementById("gameContainer").appendChild(rejouerButton);
// }


//Version 3.0
let nombreADeviner, essais, maxEssais, numerosEssais = [];

function choisirDifficulte() {
    const difficulte = document.getElementById("difficulte").value;
    const paramsDifficulte = {
        "facile": { max: 20, essais: 8 },
        "moyen": { max: 50, essais: 5 },
        "difficile": { max: 100, essais: 3 }
    };

    if (paramsDifficulte[difficulte]) {
        nombreADeviner = Math.floor(Math.random() * paramsDifficulte[difficulte].max) + 1;
        maxEssais = paramsDifficulte[difficulte].essais;
        essais = 0;
        numerosEssais = [];
        miseAJourAffichage(true);
        afficherMessage("🎉 Jeu démarré ! Devinez le nombre entre 1 et " + paramsDifficulte[difficulte].max + ".", "info");
    } else {
        afficherMessage("⚠️ Choisissez un niveau de difficulté pour commencer le jeu.", "error");
    }
}

function devinerNombre() {
    const userGuess = parseInt(document.getElementById("guessInput").value);

    if (!estNombreValide(userGuess)) {
        afficherMessage(`🚫 Entrée invalide. Saisissez un nombre entre 1 et ${maxNombreSelonDifficulte()}.`, "error");
        return;
    }

    essais++;
    numerosEssais.push(userGuess);

    if (userGuess === nombreADeviner) {
        afficherMessage(`🎉 Bravo ! Vous avez trouvé le nombre ${nombreADeviner} en ${essais} essais !`, "success");
        finDuJeu();
    } else if (essais >= maxEssais) {
        afficherMessage(`😞 Vous avez épuisé vos essais. Le nombre correct était ${nombreADeviner}.`, "warning");
        finDuJeu();
    } else {
        const hint = userGuess < nombreADeviner ? "C'est plus !" : "C'est moins !";
        afficherMessage(`❌ Incorrect. ${hint} Essayez encore !`, "info");
        miseAJourAffichage();
    }
}

function estNombreValide(nombre) {
    return !isNaN(nombre) && nombre >= 1 && nombre <= maxNombreSelonDifficulte();
}

function miseAJourAffichage(reset = false) {
    document.getElementById("compteurEssais").textContent = `Essais : ${essais}`;
    document.getElementById("historique").textContent = `Nombres essayés : ${numerosEssais.join(", ")}`;
    if (reset) {
        document.getElementById("message").textContent = "";
        document.getElementById("guessInput").disabled = false;
        document.getElementById("guessButton").disabled = false;
        document.getElementById("historique").textContent = "";
        document.getElementById("rejouerButton")?.remove();
    }
}

function maxNombreSelonDifficulte() {
    return maxEssais === 8 ? 20 : maxEssais === 5 ? 50 : 100;
}

function finDuJeu() {
    document.getElementById("guessInput").disabled = true;
    document.getElementById("guessButton").disabled = true;
    afficherBoutonRejouer();
}

function afficherBoutonRejouer() {
    const rejouerButton = document.createElement("button");
    rejouerButton.id = "rejouerButton";
    rejouerButton.textContent = "🔄 Rejouer";
    rejouerButton.onclick = () => location.reload();
    document.getElementById("gameContainer").appendChild(rejouerButton);
}

function afficherMessage(texte, type) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = texte;
    messageElement.className = `message ${type} fade`;
}


