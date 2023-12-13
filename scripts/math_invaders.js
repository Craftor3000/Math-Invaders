/* FONCTIONS */

function debut_jeu(){
	if (!jeu_en_cours) {
		jeu_en_cours = true;
		texte_commencer.textContent = "Phase 1";
		ennemis.style.visibility = "visible";
		joueur.style.visibility = "visible";
	};
};

function fin_jeu() {
	if (jeu_en_cours) {
		jeu_en_cours = false
		texte_commencer.textContent = "Commencer !";
		ennemis.style.visibility = "hidden";
		joueur.style.visibility = "hidden";
	};
};

function affiche_regles() {
	f_regles.style.visibility = "visible";
	f_jeu.style.visibility = "hidden";
	f_parametres.style.visibility = "hidden";
	fin_jeu();
};
function affiche_jeu() {
	f_regles.style.visibility = "hidden";
	f_jeu.style.visibility = "visible";
	f_parametres.style.visibility = "hidden";
	if (!jeu_en_cours) {
		ennemis.style.visibility = "hidden";
		joueur.style.visibility = "hidden";
	};	
};
function affiche_parametres() {
	f_regles.style.visibility = "hidden";
	f_jeu.style.visibility = "hidden";
	f_parametres.style.visibility = "visible";
	fin_jeu();
};


/* MAIN */

const regles = document.querySelector("#regles");
const jeu = document.querySelector("#jeu");
const parametres = document.querySelector("#parametres");
const commencer = document.querySelector("#commencer");
const texte_commencer = document.querySelector("#texte_commencer");

const f_regles = document.querySelector("#f_regles");
const f_jeu = document.querySelector("#f_jeu");
const f_parametres = document.querySelector("#f_parametres");
const espace = document.querySelector("#espace_jeu");

const joueur = document.querySelector("#joueur");
const ennemis = document.querySelector("#ennemis");
const ennemi_gauche = document.querySelector("#ennemi_gauche");
const ennemi_centre = document.querySelector("#ennemi_centre");
const ennemi_droite = document.querySelector("#ennemi_droite");
const boss = document.querySelector("#boss");

var jeu_en_cours = false;

regles.addEventListener("click", affiche_regles);
jeu.addEventListener("click", affiche_jeu);
parametres.addEventListener("click", affiche_parametres);
commencer.addEventListener("click", debut_jeu);