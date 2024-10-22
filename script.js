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
let nombreADeviner;
let essais = 0;
let maxEssais;
let numerosEssais = [];

function choisirDifficulte() {
    const difficulte = document.getElementById("difficulte").value;

    if (difficulte === "facile") {
        nombreADeviner = Math.floor(Math.random() * 20) + 1;
        maxEssais = 8;
    } else if (difficulte === "moyen") {
        nombreADeviner = Math.floor(Math.random() * 50) + 1;
        maxEssais = 5;
    } else if (difficulte === "difficile") {
        nombreADeviner = Math.floor(Math.random() * 100) + 1;
        maxEssais = 3;
    }

    essais = 0;
    numerosEssais = [];
    document.getElementById("message").textContent = "";
    document.getElementById("compteurEssais").textContent = `Essais : ${essais}`;
    document.getElementById("guessInput").disabled = false;
    document.getElementById("guessButton").disabled = false;
    document.getElementById("historique").textContent = "";
}

function devinerNombre() {
    let userGuess = parseInt(document.getElementById("guessInput").value);
    essais++;
    numerosEssais.push(userGuess);

    let message = document.getElementById("message");
    let compteurEssais = document.getElementById("compteurEssais");


    if (isNaN(userGuess) || userGuess < 1 || (userGuess > 20 && maxEssais == 8) || (userGuess > 50 && maxEssais == 5) || (userGuess > 100 && maxEssais == 3)) {
        message.textContent = `Veuillez entrer un nombre valide pour le mode de difficulté choisi !`;
        essais--; 
        numerosEssais.pop();
    } else if (userGuess < nombreADeviner) {
        message.textContent = "C'est plus !";
    } else if (userGuess > nombreADeviner) {
        message.textContent = "C'est moins !";
    } else {
        message.textContent = `Félicitations ! Vous avez trouvé le nombre ${nombreADeviner} en ${essais} essais.`;
        finDuJeu();
    }

    compteurEssais.textContent = `Essais : ${essais}`;

    if (essais >= maxEssais && userGuess !== nombreADeviner) {
        message.textContent = `Désolé, vous avez atteint la limite de ${maxEssais} essais. Le nombre était ${nombreADeviner}.`;
        finDuJeu();
    }
}

function finDuJeu() {
    document.getElementById("guessInput").disabled = true;
    document.getElementById("guessButton").disabled = true;

    let historique = document.getElementById("historique");
    historique.textContent = `Nombres essayés : ${numerosEssais.join(", ")}`;

    afficherBoutonRejouer();
}

function afficherBoutonRejouer() {
    let rejouerButton = document.createElement("button");
    rejouerButton.textContent = "Rejouer";
    rejouerButton.onclick = () => location.reload();
    document.getElementById("gameContainer").appendChild(rejouerButton);
}
