// importation des fonctions sur avis.js
import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "../avis.js";

// Récupération des pièces depuis l'API
const reponse = await fetch("http://localhost:8081/pieces/");
// recuperation des pieces depuis le fichier json
const pieces = await reponse.json();

// on appelle la fonction pour ajouter le listener au formulaire
ajoutListenerEnvoyerAvis();

// generation des cards de chaque piece
function generatePieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        // recuperation du parent pour la creation des elements
        const sectionFiches = document.querySelector(".fiches");
        // creation d'une balise article dediee à chaque pièce automobile
        const pieceElement = document.createElement("article");
        // creation d'une img et acces a son indice
        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image;
        pieceElement.appendChild(imageElement);
        // creation d'un titre h2 et acces au nom
        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;
        pieceElement.appendChild(nomElement);
        // creation d'un p et acces au prix
        const prixElement = document.createElement("p");
        prixElement.innerText = pieces[i].prix + " €";
        pieceElement.appendChild(prixElement);
        // creation d'un p et acces a categorie
        const categorieElement = document.createElement("p");
        categorieElement.innerText =
            pieces[i].categorie ?? "Pas de catégorie pour l'instant";
        pieceElement.appendChild(categorieElement);
        // creation d'un p et acces a la description
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText =
            pieces[i].description ?? "(Pas de description pour le moment)";
        pieceElement.appendChild(descriptionElement);
        // creation d'un p et acces au stock
        const stockElement = document.createElement("p");
        stockElement.innerText = pieces[i].disponibilite = true
            ? "En stock"
            : "Rupture de stock";
        pieceElement.appendChild(stockElement);
        //Code ajouté pour BTN Avis
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = pieces[i].id;
        avisBouton.textContent = "Afficher les avis";
        pieceElement.appendChild(avisBouton);

        // display all balises
        sectionFiches.appendChild(pieceElement);
    }
    // ajout de la fonction ajoutListenersAvis
    ajoutListenersAvis();
}
//Premier affichage de la page
generatePieces(pieces);

// fonction trier en ordre croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    generatePieces(piecesOrdonnees);
});

// fonction filtrer les prix <= 35
// Ajout du listener pour filtrer les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    generatePieces(piecesFiltrees);
});

// Ajout de la fonction range pour filtrer les prix
const filterPrice = document.querySelector("#filterRange");
filterPrice.addEventListener("input", function () {
    const pieceFiltrees = pieces.filter(function (piece) {
        return piece.prix <= filterPrice.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    generatePieces(pieceFiltrees);
});

// fonction no description
const boutonNoDescription = document.querySelector(".btn-nodesc");
boutonNoDescription.addEventListener("click", function () {
    const pieceDescription = pieces.filter(function (piece) {
        return piece.description;
    });
    console.log(pieceDescription);
});
// fonction filtrer les prix en ordre décroissant
const boutonDecroissant = document.querySelector(".btn-ordreDecroissant");
boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
});

// Elements abordables
// fonction map => recuperer le nom des pieces
// const nomPieces = pieces.map(piece => piece.nom);
// for (let i = pieces.length - 1; i >= 0; i--) {
//     if (pieces[i].prix > 35) {
//         nomPieces.splice(i, 1);
//     }
// }
// creation de la liste des pieces abordables sur la page web
// const abordablesElements = document.createElement("ul");
// iteration des elements de la liste
// for (let i = 0; i < nomPieces.length; i++) {
//     const nomElement = document.createElement("li");
//     nomElement.innerText = nomPieces[i];
//     abordablesElements.appendChild(nomElement);
// }

// Elements disponibles
// fonction map => recuperer le nom des pieces
// const nomsDisponibles = pieces.map(piece => piece.nom);
// const prixDisponibles = pieces.map(piece => piece.prix);
// for (let i = pieces.length - 1; i >= 0; i--) {
//     if ((pieces[i].disponibilite = false)) {
//         nomsDisponibles.splice(i, 1);
//         prixDisponibles.splice(i, 1);
//     }
// }
// creation de la liste des pieces disponibles sur la page web
// const disponiblesElements = document.createElement("ul");
// iteration des elements de la liste
// for (let i = 0; i < nomsDisponibles.length; i++) {
//     const nomElement = document.createElement("li");
//     nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]}`;
//     disponiblesElements.appendChild(nomElement);
// }
// affichage de la liste avec le ratachement au parent
// document.querySelector(".disponibles").appendChild(disponiblesElements);
