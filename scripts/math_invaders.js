/* FONCTIONS */
/*
function debut_jeu(){
	const image = new Image();
	image.src ="images/ennemy1.png";
	image.id ="enemy1"
	image.onload = function(){
		document.body.appendChild(image);
	};
};
*/
function affiche_regles() {
	f_regles.visibility = "visible";
	f_jeu.visibility = "hidden";
	f_parametres.visibility = "hidden";
};
function affiche_jeu() {
	f_regles.visibility = "hidden";
	f_jeu.visibility = "visible";
	f_parametres.visibility = "hidden";
};
function affiche_parametres() {
	f_regles.visibility = "hidden";
	f_jeu.visibility = "hidden";
	f_parametres.visibility = "visible";
};


/* MAIN */

const regles = document.querySelector("#regles");
const jeu = document.querySelector("#jeu");
const parametres = document.querySelector("#parametres");
const f_regles = document.querySelector("#f_regles");
const f_jeu = document.querySelector("#f_jeu");
const f_parametres = document.querySelector("#f_parametres");

regles.addEventListener("click", affiche_regles);
jeu.addEventListener("click", affiche_jeu);
parametres.addEventListener("click", affiche_parametres);