/* global Chart */
export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
        piecesElements[i].addEventListener("click", async function (event) {
            const id = event.target.dataset.id;
            const reponse = await fetch(
                "http://localhost:8081/pieces/" + id + "/avis"
            );
            const avis = await reponse.json();
            window.localStorage.setItem(
                `avis-piece-${id}`,
                JSON.stringify(avis)
            );
            const pieceElement = event.target.parentElement;
            afficherAvis(pieceElement, avis);
        });
    }
}

export function afficherAvis(pieceElement, avis) {
    const avisElement = document.createElement("p");
    for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
    }
    pieceElement.appendChild(avisElement);
}

export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        event.preventDefault();
        // Création de l’objet du nouvel avis.
        const avis = {
            pieceId: parseInt(
                event.target.querySelector("[name=piece-id]").value
            ),
            utilisateur: event.target.querySelector("[name=utilisateur").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
            nbEtoiles: parseInt(
                event.target.querySelector("[name=nbEtoiles]").value
            ),
        };
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(avis);
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile,
        });
    });
}
// Graphique des notes et commentaires
export async function afficherGraphiqueAvis() {
    // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
    const avis = await fetch("http://localhost:8081/avis").then(avis =>
        avis.json()
    );
    // calcul du nb de commentaires pour chaque niveau d'étoiles de 1 à 5
    const nb_commentaires = [0, 0, 0, 0, 0];
    // parcours des avis avec une boucle For
    for (let commentaire of avis) {
        nb_commentaires[commentaire.nbEtoiles - 1]++;
    }
    // Configuration du graphique avec pour commencer les labels
    // légende qui s'affichera sur la gauche à côté de la barre horizontale
    const labels = ["5", "4", "3", "2", "1"];
    // Les données et la personnalisation des datas
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Etoiles attribuées",
                data: nb_commentaires.reverse(),
                backgroundColor: "rgba(255, 230, 0, 1)",
            },
        ],
    };
    // Objet de configuration final avec
    const config = {
        // le type de graphique
        type: "bar",
        // les données
        data: data,
        // et l'axe principal
        options: {
            indexAxis: "y",
        },
    };
    // Rendu du graphique dans l'element canvas
    new Chart(document.querySelector("#graphique-avis"), config);
    // Graphique des piéces
    // récupération liste pieces depuis le localstorage
    const piecesJSON = window.localStorage.getItem("pieces");
    const pieces = JSON.parse(piecesJSON);

    // calcul du nombre de commentaires en créant 2 variables
    let nbCommentaireDispo = 0;
    let nbCommentaireNonDispo = 0;

    // boucle pour parcourir la liste des pièces
    for (let i = 0; i < avis.length; i++) {
        const piece = pieces.find(p => p.id === avis[i].pieceId);
        if (piece) {
            if (piece.disponibilite) {
                nbCommentaireDispo++;
            }
        } else {
            nbCommentaireNonDispo++;
        }
    }
    // légende qui s'affichera sur la gauche à côté de la barre horizontale
    const labelsDispo = ["Disponibles", "Non Dispo."];
    // Données et la personnalisation du graphique
    const dataDispo = {
        labels: labelsDispo,
        datasets: [
            {
                label: "Nombre de commentaires",
                data: [nbCommentaireDispo, nbCommentaireNonDispo],
                backgroundColor: "rgba(0, 230, 255, 1)",
            },
        ],
    };
    // Objet de configuration final avec
    const configDispo = {
        // le type de graphique
        type: "bar",
        // les données
        data: dataDispo,
    };
    // Rendu du graphique dans l'element canvas
    new Chart(document.querySelector("#graphique-dispo"), configDispo);
}
