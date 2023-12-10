/* FONCTIONS */
function debut_jeu(){
	const image = new Image();
	image.src ="images/ennemy1.png";
	image.id ="enemy1"
	image.onload = function(){
		document.body.appendChild(image);
	};
}


/* MAIN */

var regles = document.querySelector("#regles");
var jeu = document.querySelector("#jeu");
var parametres = document.querySelector("#parametres");
