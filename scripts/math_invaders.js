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
		main_jeu();
		selection_operation();
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
		avancement = 0;
	};
};

function timer() {
    return new Promise((resolve, reject) => {
	  	setTimeout(() => {
	  		resolve(1);
	  	}, 200);
	});
}


async function main_jeu() {
	while(jeu_en_cours) {
		if(resolutions == 3) {
			affichage_operations();
			resolutions = 0;
		}
		avancement_vaisseaux();
		await timer();

		if (avancement == 300) {
			fin_jeu();
		}
	}
}



function selection_operation() {
	lequel = Math.floor(Math.random() * 3 + 1);
	vaisseau_choisit = false;
	while (vaisseau_choisit == false){
		if (lequel == 1) {
			if (vaisseau_d_vivant == true) {
				gauche.style.border = "0px solid red";
				centre.style.border = "0px solid red";
				droite.style.border = "1px solid red";
				reponse_recherchee = operations[0][0] * operations[0][1];
				console.log(reponse_recherchee);
				reponse_joueur.focus();
				vaisseau_choisit = true;
			}
		}
		if (lequel == 2) {
			if (vaisseau_c_vivant == true) {
				gauche.style.border = "0px solid red";
				centre.style.border = "1px solid red";
				droite.style.border = "0px solid red";
				reponse_recherchee = operations[1][0] * operations[1][1];	
				console.log(reponse_recherchee);
				reponse_joueur.focus();
				vaisseau_choisit = true;
			}
		}
		if (lequel == 3) {
			if (vaisseau_g_vivant == true) {
				gauche.style.border = "1px solid red";
				centre.style.border = "0px solid red";
				droite.style.border = "0px solid red";
				reponse_recherchee = operations[2][0] * operations[2][1];			
				console.log(reponse_recherchee);	
				reponse_joueur.focus();
				vaisseau_choisit = true;
			}
		}
		vaisseau_choisit = true
	}
}


function affichage_operations() {
	for (var i = 0; i < 3; i++) {
		operations[i][0] = nb_random();
		operations[i][1] = nb_random();
	};
	droite.textContent = operations[0][0].toString() + " x " + operations[0][1].toString();
	centre.textContent = operations[1][0].toString() + " x " + operations[1][1].toString();
	gauche.textContent = operations[2][0].toString() + " x " + operations[2][1].toString();
};

function avancement_vaisseaux() {
	avancement += 1;
	grp_gauche.style.margin = avancement.toString() + "px 0px 0px 0px";
	grp_centre.style.margin = avancement.toString() + "px 0px 0px 0px";
	grp_droite.style.margin = avancement.toString() + "px 0px 0px 0px";
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

function valide() {
	if (reponse_joueur.textContent = reponse_recherchee){
		etape += 1;
		reponse_joueur.textContent = ""
		// avancement -= 50
		if (lequel = 1){
			vaisseau_d_vivant = false;
			selection_operation();		
		}
		if (lequel = 2){
			vaisseau_c_vivant = false;
			selection_operation();
		}
		if (lequel = 3){
			vaisseau_g_vivant = false;
			selection_operation();
		}
	} 
	else {
		reponse_joueur.textContent = "C'EST FAUX !!!!!!!!!!!"
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
const reponse_joueur = document.querySelector("#entree_resultat")

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
var avancement = 0;
var resolutions = 3;
var reponse_recherchee = 0;
var etape = 0;
var vaisseau_choisit = false;
var vaisseau_g_vivant = true;
var vaisseau_c_vivant = true;
var vaisseau_d_vivant = true;
var lequel = 0;



regles.addEventListener("click", affiche_regles);
jeu.addEventListener("click", affiche_jeu);
parametres.addEventListener("click", affiche_parametres);
commencer.addEventListener("click", debut_jeu);

reponse_joueur.addEventListener("keydown",function (e){
	if (e.key === "Enter") {
		return valide();
	}
});