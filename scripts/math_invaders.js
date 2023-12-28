/* FONCTIONS */

function nb_random(n) {
/*  paramètre : un entier fixant la borne maximum de l'aléatoire
	résultat : un entier aléatoire entre 1 et n 
*/
	return Math.floor(Math.random() * n + 1);
}

function timer(t) {
/*	paramètre : un entier
	résultat : succès de la promesse avec la valeur 1

	Attend un temps t avant de résoudre la promesse
	Cette méthode est utilisée comme un timer
*/
    return new Promise((resolve, reject) => {
	  	setTimeout(() => {
	  		resolve(1);
	  	}, t);
	});
}

function debut_jeu(){
/*	paramètre : aucun
	résultat : aucun

	Initialise quelques valeurs avant de lancer la boucle principale du jeu
*/
	if (!jeu_en_cours) {
		joueur.style.visibility = "visible";
		score.textContent = "0";
		jeu_en_cours = true;
		main_jeu();
	};
};

function fin_jeu() {
/*	paramètre : aucun
	résultat : aucun

	Attribue à un grand nombre de variable leur valeur par défault
	Permet au jeu de se terminer en laissant la possibilité de le recommencer
*/
	if (jeu_en_cours) {
		jeu_en_cours = false;
		boss_en_cours = false;
		texte_commencer.textContent = "Commencer !";
		texte_banniere.textContent = "Appuyez pour commencer !";
		grp_boss.style.visibility = "hidden";
		boss.style.visibility = "hidden";
		boss_1.style.visibility = "hidden";
		boss_2.style.visibility = "hidden";
		boss_3.style.visibility = "hidden";
		boss_4.style.visibility = "hidden";
		boss_5.style.visibility = "hidden";
		grp_gauche.style.visibility = "hidden";
		grp_centre.style.visibility = "hidden";
		grp_droite.style.visibility = "hidden";
		joueur.style.visibility = "hidden";
		grp_gauche.style.border = "0px";
		grp_centre.style.border = "0px";
		grp_droite.style.border = "0px";
		boss_1.style.border = "0px";
		boss_2.style.border = "0px";
		boss_3.style.border = "0px";
		boss_4.style.border = "0px";
		boss_5.style.border = "0px";
		avancement = 0;
		vaisseau_choisit = null;
		vaisseaus_vivants = [false, false, false];
		boss_choisit = null;
		boss_vivant = [false, false, false, false, false];
		vitesse = 1000;
		phase = 0;
		resolutions = 3;
		if (parseInt(score.textContent) > hi_score) {
			hi_score = parseInt(score.textContent);
			meilleur_score.textContent = hi_score;
		}	
	};
};


async function main_jeu() {
/*	paramètre : aucun
	résultat : aucun

	Boucle principale du jeu, fonctionnant jusqu'à ce qu'il se termine
	Vérification permanente de la présence d'opérations à résoudre
	Marque le rythme de l'avancement des vaisseaux ennemis
	Gestion de la fin du jeu, lorsque l'avancement est trop grand
*/
	while(jeu_en_cours) {
		if(resolutions == 3 && !boss_en_cours || resolutions == 5 && boss_en_cours) {
			phases();
			resolutions = 0;
			avancement = 0;
			temps_vaisseau = 0;
			boss_en_cours = false;
			boss.style.visibility = "hidden";
			if (phase % 5 == 0) {
				boss_en_cours = true;
				affichage_operations_boss();
				apparition_boss();
			} 
			else {
				affichage_operations();
				apparition_vaisseaux();
			}
		}
		if (!vaisseau_choisit && !boss_en_cours) {
			selection_vaisseau();
		}
		else if (!boss_choisit && boss_en_cours){
			selection_boss();
		}

		avancement_vaisseaux();
		if (boss_en_cours) {
			limite_avancement = (espace.offsetHeight * 0.95) - 300;
		} else {
			limite_avancement = (espace.offsetHeight * 0.95) - 165;
		}

		await timer(vitesse);

		if (avancement >= limite_avancement) {
			fin_jeu();
			break;
		}
	}
}

function phases() {
/*	paramètre : aucun
	résultat : aucun

	Marque le changement de phase
	Augmente la vitesse des ennemis
*/
	phase++;
	texte_banniere.textContent = "Phase " + phase.toString();
	if (vitesse > 30) {
		vitesse /= 1.5;
	}
	if (phase % 5 == 0) {
		vitesse -= 10;
	}
	if (phase % 5 == 1) {
		vitesse += 10;
	}
}

function apparition_vaisseaux() {
/*	paramètre : aucun
	résultat : aucun

	Fait apparaitre tous les vaisseaux ennemis
*/
	grp_gauche.style.visibility = "visible";
	grp_centre.style.visibility = "visible";
	grp_droite.style.visibility = "visible";
}

function apparition_boss() {
/*	paramètre : aucun
	résultat : aucun

	Fait apparaitre le boss et ses composants
*/
	grp_boss.style.visibility = "visible";
	boss.style.visibility = "visible";
	boss_1.style.visibility = "visible";
	boss_2.style.visibility = "visible";
	boss_3.style.visibility = "visible";
	boss_4.style.visibility = "visible";
	boss_5.style.visibility = "visible";
}

function selection_vaisseau() {
/*	paramètre : aucun
	résultat : aucun

	Choisit un vaisseau ennemi dont l'opération va être à résoudre, parmis les vaisseaux encore vivants
*/
	while (vaisseau_choisit == null){
		proposition_vaisseau = nb_random(3) - 1;
		if (vaisseaus_vivants[proposition_vaisseau]) {
			groupes[proposition_vaisseau].style.border = "1px solid red";
			reponse_joueur.focus();
			vaisseau_choisit = proposition_vaisseau;
			texte_commencer.textContent = operations[vaisseau_choisit][0].toString() + " + " + operations[vaisseau_choisit][1].toString();
		}
	}
}

function selection_boss() {
/*	paramètre : aucun
	resultat : aucun

	Une opération du boss est choisie au hasard et son résultat est enregistré dans operations_boss
	L'opération choisie est affichée dans 'texte_commencer'
*/

	while (boss_choisit == null){
		proposition_boss = nb_random(5) - 1;
		if (boss_vivant[proposition_boss]) {
			groupes_boss[proposition_boss].style.border = "1px solid red";
			reponse_joueur.focus();
			boss_choisit = proposition_boss;
			texte_commencer.textContent = operations_boss[boss_choisit][0].toString() + " + " + operations_boss[boss_choisit][1].toString();
		}
	}
}

function validation() {
/*	paramètre : aucun
	résultat : aucun

	Vérifie si la réponse du joueur est égale à celle demandée
	Fait évoluer le score du joueur en fonction de la rapidité de réponse
	Diminue le score si la réponse est fausse
	Empêche que le score soit négatif
*/
	if (reponse_joueur.valueAsNumber == operations[vaisseau_choisit][0] + operations[vaisseau_choisit][1]) {
		elimination();
		score.textContent = parseInt(score.textContent) + calcul_score();
		temps_vaisseau = 0;
	}
	else {
		score.textContent = parseInt(score.textContent) - calcul_score();
	}
	reponse_joueur.valueAsNumber = NaN;
	if (parseInt(score.textContent) < 0){
				score.textContent = 0;
	}
}

function validation_boss() {
/*	paramètre : aucun
	resultat : aucun

	Vérifie si la réponse du joueur est égale à celle demandée
	Fait évoluer le score du joueur en fonction de la rapidité de réponse
	Diminue le score si la réponse est fausse
	Empêche que le score soit négatif
*/
	if (reponse_joueur.valueAsNumber == operations_boss[boss_choisit][0] + operations_boss[boss_choisit][1]) {
 			elimination_boss();
			score.textContent = parseInt(score.textContent) + calcul_score() * 2;
			temps_vaisseau = 0;
		}
		else {
			score.textContent = parseInt(score.textContent) - calcul_score();
		}
	reponse_joueur.valueAsNumber = NaN;
	if (parseInt(score.textContent) < 0){
				score.textContent = 0;
	}
}
	
function elimination() {
/*	paramètre : aucun
	résultat : aucun

	Elimine un vaisseau ennemi à la suite de la résolution de son équation
*/
	vaisseaus_vivants[vaisseau_choisit] = false;
	groupes[proposition_vaisseau].style.border = "0px";
	groupes[vaisseau_choisit].style.visibility = "hidden";
	vaisseau_choisit = null;
	resolutions++
}

function elimination_boss() {
/*	paramètre : aucun
	resultat : aucun
	
	Elimine une opération du boss à la suite de la résolution de son équation
*/
	boss_vivant[boss_choisit] = false;
	groupes_boss[proposition_boss].style.border = "0px";
	groupes_boss[boss_choisit].style.visibility = "hidden";
	boss_choisit = null;
	resolutions++;

}

function calcul_score() {
/*	paramètre : aucun
	résultat : un entier compris entre 0 et phase * 100

	Calcule le score du joueur
*/
	let pourcentage_tps_restant = (limite_avancement - temps_vaisseau) / limite_avancement;
	return Math.round((phase * 100) * pourcentage_tps_restant);
}


function affichage_operations() {
/*	paramètre : aucun
	résultat : aucun

	Définie les opérations des vaisseaux à calculer aléatoirement
*/
	for (var i = 0; i < 3; i++) {
		operations[i][0] = nb_random(10);
		operations[i][1] = nb_random(10);
	};
	gauche.textContent = operations[0][0].toString() + " + " + operations[0][1].toString();
	centre.textContent = operations[1][0].toString() + " + " + operations[1][1].toString();
	droite.textContent = operations[2][0].toString() + " + " + operations[2][1].toString();
	vaisseaus_vivants = [true, true, true];
};

function affichage_operations_boss() {
/*	paramètre : aucun
	résultat : aucun

	Définie les opérations du boss à calculer aléatoirement
*/
	for (var i = 0; i < 5; i++) {
		operations_boss[i][0] = nb_random(10);
		operations_boss[i][1] = nb_random(10);
	};
	boss_1.textContent = operations_boss[0][0].toString() + " + " + operations_boss[0][1].toString();
	boss_2.textContent = operations_boss[1][0].toString() + " + " + operations_boss[1][1].toString();
	boss_3.textContent = operations_boss[2][0].toString() + " + " + operations_boss[2][1].toString();
	boss_4.textContent = operations_boss[3][0].toString() + " + " + operations_boss[3][1].toString();
	boss_5.textContent = operations_boss[4][0].toString() + " + " + operations_boss[4][1].toString();
	boss_vivant = [true, true, true, true, true];
}

function avancement_vaisseaux() {
/*	paramètre : aucun
	résultat : aucun

	Met la position verticale des vaisseaux et du boss à la valeur 'avancement'
*/
	avancement++;
	temps_vaisseau++;
	grp_gauche.style.margin = avancement.toString() + "px 0px 0px 0px";
	grp_centre.style.margin = avancement.toString() + "px 0px 0px 0px";
	grp_droite.style.margin = avancement.toString() + "px 0px 0px 0px";
	grp_boss.style.margin = avancement.toString() + "px 0px 0px 0px";
};



function affiche_regles() {
/*	paramètre : aucun
	résultat : aucun

	Rend l'espace de jeu et l'espace des paramètres invisibles
*/
	fenetre = [true, false, false];
	demo();
	f_regles.style.visibility = "visible";
	f_jeu.style.visibility = "hidden";
	f_parametres.style.visibility = "hidden";
	fin_jeu();
};
function affiche_jeu() {
/*	paramètre : aucun
	résultat : aucun

	Rend l'espace des règles et l'espace des paramètres invisibles
*/
	fenetre = [false, true, true];
	f_regles.style.visibility = "hidden";
	f_jeu.style.visibility = "visible";
	f_parametres.style.visibility = "hidden";
};
function affiche_parametres() {
/*	paramètre : aucun
	résultat : aucun

	Rend l'espace de jeu et l'espace des règles invisibles
*/
	fenetre = [false, false, true];
	f_regles.style.visibility = "hidden";
	f_jeu.style.visibility = "hidden";
	f_parametres.style.visibility = "visible";
	fin_jeu();
};

async function demo(){
/*	paramètre : aucun
	résultat : aucun

	Fait bouger le vaisseau ennemi sur l'espace des règles
*/
	let avance = 0;
	while (fenetre[0]){
		avance += 1
		for (let i = ennemi_demo.length - 1; i >= 0; i--) {
			ennemi_demo[i].style.margin = avance.toString() + "px 20px 0px 20px";
		}
		await timer(50);
		if (avance == 350) {
			avance = 0;
		}
	}
}


/* MAIN */

const regles = document.querySelector("#regles");
const jeu = document.querySelector("#jeu");
const parametres = document.querySelector("#parametres");
const commencer = document.querySelector("#commencer");
const texte_commencer = document.querySelector("#texte_commencer");
const texte_banniere = document.querySelector("#texte_banniere");
const proprietes = document.querySelector("#proprietes");
const score = document.querySelector("#score_joueur");
const reponse_joueur = document.querySelector("#entree_resultat");
const valider = document.querySelector("#valider");

const f_regles = document.querySelector("#f_regles");
const f_jeu = document.querySelector("#f_jeu");
const f_parametres = document.querySelector("#f_parametres");
const espace = document.querySelector("#espace_jeu");

const ennemi_demo = document.querySelectorAll(".ennemi_demo");
const joueur = document.querySelector("#joueur");
const ennemi_gauche = document.querySelector("#ennemi_gauche");
const ennemi_centre = document.querySelector("#ennemi_centre");
const ennemi_droite = document.querySelector("#ennemi_droite");
const grp_gauche = document.querySelector("#grp_gauche");
const grp_centre = document.querySelector("#grp_centre");
const grp_droite = document.querySelector("#grp_droite");
const groupes = [grp_gauche, grp_centre, grp_droite];
const gauche = document.querySelector("#operation_gauche");
const centre = document.querySelector("#operation_centre");
const droite = document.querySelector("#operation_droite");

const boss = document.querySelector("#boss");
const grp_boss = document.querySelector("#grp_boss");
const boss_1 = document.querySelector("#boss_1");
const boss_2 = document.querySelector("#boss_2");
const boss_3 = document.querySelector("#boss_3");
const boss_4 = document.querySelector("#boss_4");
const boss_5 = document.querySelector("#boss_5");
const groupes_boss = [boss_1, boss_2, boss_3, boss_4, boss_5];

var fenetre = [true, false, false];
var jeu_en_cours = false;
var boss_en_cours = false;
var phase = 0;
var vitesse = 1000;
var operations = [[0,0],[0,0],[0,0]];
var operations_boss = [[0,0],[0,0],[0,0],[0,0],[0,0]]
var avancement = 0;
var temps_vaisseau = 0;
var limite_avancement = (espace.offsetHeight * 0.95) - 165;
var resolutions = 3;
var vaisseau_choisit = null;
var boss_choisit = null;
var vaisseaus_vivants = [false, false, false];
var boss_vivant = [false, false, false, false, false];
var proposition_vaisseau = 0;
var proposition_boss = 0;
var hi_score = 0;


document.addEventListener("DOMContentLoaded",demo);
regles.addEventListener("click", affiche_regles);
jeu.addEventListener("click", affiche_jeu);
parametres.addEventListener("click", affiche_parametres);
commencer.addEventListener("click", debut_jeu);
valider.addEventListener("click", validation)

reponse_joueur.addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		if(!boss_en_cours) {
			validation();
		}
		else{
			validation_boss();
		} 
	};
});
