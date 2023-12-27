/* FONCTIONS */

function nb_random(n) {
	return Math.floor(Math.random() * n + 1);
}

function timer(t) {
    return new Promise((resolve, reject) => {
	  	setTimeout(() => {
	  		resolve(1);
	  	}, t);
	});
}

function debut_jeu(){
	if (!jeu_en_cours) {
		joueur.style.visibility = "visible";
		jeu_en_cours = true;
		main_jeu();
	};
};

function fin_jeu() {
	if (jeu_en_cours) {
		jeu_en_cours = false
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
		avancement = 0;
		vaisseau_choisit = null;
		vaisseaus_vivants = [false, false, false];
		vitesse = 1000;
		phase = 0;
		resolutions = 3;
		score.textContent = "0";
	};
};


async function main_jeu() {
	while(jeu_en_cours) {

		if(resolutions == 3) {

			phases();
			resolutions = 0;
			avancement = 0;
			temps_vaisseau = 0;

			if (phase == 1) {
				boss_en_cours = true;
				affichage_operations_boss();
				apparition_boss();

			} else {
				affichage_operations();
				apparition_vaisseaux();
			}
		}

		if (!vaisseau_choisit && !boss_en_cours) {
			selection_vaisseau();
		}

		limite_avancement = espace.offsetHeight - (espace.offsetHeight / 10);
		avancement_vaisseaux();
		await timer(vitesse);

		if (avancement == limite_avancement) {
			fin_jeu();
			break;
		}
	}
}

function phases() {
	phase++;
	texte_banniere.textContent = "Phase " + phase.toString();
	vitesse /= 1.5;
}

function apparition_vaisseaux() {
	grp_gauche.style.visibility = "visible";
	grp_centre.style.visibility = "visible";
	grp_droite.style.visibility = "visible";
}

function apparition_boss() {
	grp_boss.style.visibility = "visible";
	boss.style.visibility = "visible";
	boss_1.style.visibility = "visible";
	boss_2.style.visibility = "visible";
	boss_3.style.visibility = "visible";
	boss_4.style.visibility = "visible";
	boss_5.style.visibility = "visible";
}

function selection_vaisseau() {
	while (vaisseau_choisit == null){
		proposition_vaisseau = nb_random(3) - 1;
		if (vaisseaus_vivants[proposition_vaisseau]) {
			groupes[proposition_vaisseau].style.border = "1px solid red";
			reponse_joueur.focus();
			vaisseau_choisit = proposition_vaisseau;
			texte_commencer.textContent = operations[vaisseau_choisit][0].toString() + " x " + operations[vaisseau_choisit][1].toString();
		}
	}
}

function validation() {
	if (reponse_joueur.valueAsNumber == operations[vaisseau_choisit][0] * operations[vaisseau_choisit][1]) {
		elimination();
		score.textContent = parseInt(score.textContent) + calcul_score();
		temps_vaisseau = 0;
	}
	else {
		score.textContent = parseInt(score.textContent) - calcul_score();
		if (parseInt(score.textContent) < 0){
			score.textContent = 0;
		}
	}
	reponse_joueur.valueAsNumber = NaN;
}

function elimination() {
	vaisseaus_vivants[vaisseau_choisit] = false;
	groupes[proposition_vaisseau].style.border = "0px";
	groupes[vaisseau_choisit].style.visibility = "hidden";
	vaisseau_choisit = null;
	resolutions++;
}

function calcul_score() {
	let pourcentage_tps_restant = (limite_avancement - temps_vaisseau) / limite_avancement;
	return Math.round(((phase * 100) * pourcentage_tps_restant) / 10) * 10;
}


function affichage_operations() {
	for (var i = 0; i < 3; i++) {
		operations[i][0] = nb_random(10);
		operations[i][1] = nb_random(10);
	};
	gauche.textContent = operations[0][0].toString() + " x " + operations[0][1].toString();
	centre.textContent = operations[1][0].toString() + " x " + operations[1][1].toString();
	droite.textContent = operations[2][0].toString() + " x " + operations[2][1].toString();
	vaisseaus_vivants = [true, true, true];
};

function affichage_operations_boss() {
	for (var i = 0; i < 5; i++) {
		operations_boss[i][0] = nb_random(10);
		operations_boss[i][1] = nb_random(10);
	};
	boss_1.textContent = operations_boss[0][0].toString() + " x " + operations_boss[0][1].toString();
	boss_2.textContent = operations_boss[1][0].toString() + " x " + operations_boss[1][1].toString();
	boss_3.textContent = operations_boss[2][0].toString() + " x " + operations_boss[2][1].toString();
	boss_4.textContent = operations_boss[3][0].toString() + " x " + operations_boss[3][1].toString();
	boss_5.textContent = operations_boss[4][0].toString() + " x " + operations_boss[4][1].toString();
}

function avancement_vaisseaux() {
	avancement++;
	temps_vaisseau++;
	grp_gauche.style.margin = avancement.toString() + "px 0px 0px 0px";
	grp_centre.style.margin = avancement.toString() + "px 0px 0px 0px";
	grp_droite.style.margin = avancement.toString() + "px 0px 0px 0px";
	grp_boss.style.margin = avancement.toString() + "px 0px 0px 0px";
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
const texte_banniere = document.querySelector("#texte_banniere");
const proprietes = document.querySelector("#proprietes");
const score = document.querySelector("#score_joueur");
const reponse_joueur = document.querySelector("#entree_resultat");
const valider = document.querySelector("#valider");

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

var jeu_en_cours = false;
var boss_en_cours = false;
var phase = 0;
var vitesse = 1000;
var operations = [[0,0],[0,0],[0,0]];
var operations_boss = [[0,0],[0,0],[0,0],[0,0],[0,0]]
var avancement = 0;
var temps_vaisseau = 0;
var limite_avancement = espace.offsetHeight - (espace.offsetHeight / 10);
var resolutions = 3;
var vaisseau_choisit = null;
var vaisseaus_vivants = [false, false, false];
var boss_vivant = [false, false, false, false, false];
var proposition_vaisseau = 0;



regles.addEventListener("click", affiche_regles);
jeu.addEventListener("click", affiche_jeu);
parametres.addEventListener("click", affiche_parametres);
commencer.addEventListener("click", debut_jeu);
valider.addEventListener("click", validation)

reponse_joueur.addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		validation();
	};
});
