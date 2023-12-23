/* FONCTIONS */

function nb_random() {
	return Math.floor(Math.random() * 10 + 1);
}

function random_boss() {
	return Math.floor(Math.random() * 20 + 1);

}

function debut_jeu(){
	if (!jeu_en_cours) {
		jeu_en_cours = true;
		texte_commencer.textContent = "Phase 1";
		texte_banniere.textContent = "Phase 1";
		grp_gauche.style.visibility = "visible";
		grp_centre.style.visibility = "visible";
		grp_droite.style.visibility = "visible";		
		joueur.style.visibility = "visible";
		for (var i = 0; i < 3; i++) {
			operations[i][0] = nb_random();
			operations[i][1] = nb_random();
		};
		console.log(operations)
		affiche_operation();
	};
};

function fin_jeu() {
	if (jeu_en_cours) {
		jeu_en_cours = false
		texte_commencer.textContent = "Commencer !";
		texte_banniere.textContent = "Appuyez pour commencer !";
		grp_gauche.style.visibility = "hidden";
		grp_centre.style.visibility = "hidden";
		grp_droite.style.visibility = "hidden";
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
		grp_gauche.style.visibility = "hidden";
		grp_centre.style.visibility = "hidden";
		grp_droite.style.visibility = "hidden";
		joueur.style.visibility = "hidden";
	};	
};
function affiche_parametres() {
	f_regles.style.visibility = "hidden";
	f_jeu.style.visibility = "hidden";
	f_parametres.style.visibility = "visible";
	fin_jeu();
};

function affiche_operation() {
	droite.textContent = operations[0][0].toString() + " x " + operations[0][1].toString();
	centre.textContent = operations[1][0].toString() + " x " + operations[1][1].toString();
	gauche.textContent = operations[2][0].toString() + " x " + operations[2][1].toString();
}

/* MAIN */

const regles = document.querySelector("#regles");
const jeu = document.querySelector("#jeu");
const parametres = document.querySelector("#parametres");
const commencer = document.querySelector("#commencer");
const texte_commencer = document.querySelector("#texte_commencer");
const texte_banniere = document.querySelector("#texte_banniere");
const proprietes = document.querySelector("#proprietes");

const f_regles = document.querySelector("#f_regles");
const f_jeu = document.querySelector("#f_jeu");
const f_parametres = document.querySelector("#f_parametres");
const espace = document.querySelector("#espace_jeu");

const joueur = document.querySelector("#joueur");
const ennemi_gauche = document.querySelector("#ennemi_gauche");
const ennemi_centre = document.querySelector("#ennemi_centre");
const ennemi_droite = document.querySelector("#ennemi_droite");
const grp_gauche = document.querySelector("#grp_gauche");
const grp_centre = document.querySelector("#grp_centre");
const grp_droite = document.querySelector("#grp_droite");
const gauche = document.querySelector("#operation_gauche");
const centre = document.querySelector("#operation_centre");
const droite = document.querySelector("#operation_droite");




const boss = document.querySelector("#boss");

var jeu_en_cours = false;
var operations = [[0,0],[0,0],[0,0]];


regles.addEventListener("click", affiche_regles);
jeu.addEventListener("click", affiche_jeu);
parametres.addEventListener("click", affiche_parametres);
commencer.addEventListener("click", debut_jeu);