// fonction ajout avis
export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");
    for (let i = 0; i < piecesElements.length; i++) {
        piecesElements[i].addEventListener("click", async function (event) {
            const id = event.target.dataset.id;
            const reponse = await fetch(
                "http://localhost:8081/pieces/" + id + "/avis"
            );
            const avis = await reponse.json();
            const pieceElement = event.target.parentElement;
            const avisElement = document.createElement("p");
            for (let i = 0; i < avis.length; i++) {
                avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
            }
            pieceElement.appendChild(avisElement);
        });
    }
}

// fonction ajout nouveaux commentaires
export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
        /* blocage du comportement par defaut du formulaire */
        event.preventDefault();
        /* creation de l'objet de la charge utile du nouvel avis */
        const avis = {
            pieceId: parseInt(
                event.target.querySelector("[name=piece-id]").value
            ),
            utilisateur: event.target.querySelector("[name=utilisateur]").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
            nbEtoiles: parseInt(
                event.target.querySelector("[name=nbEtoiles]").value
            ),
        };
        // transformation de la charge utile au format JSON
        const chargeUtile = JSON.stringify(avis);
        // appel de la fonction avec toutes les informations
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile,
        });
    });
}
