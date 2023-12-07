function de() {
/* param     : aucun
   résultat  : entier
               entier au hasard entre 1 et 6 inclus 
*/
  return Math.floor(Math.random()* 6 + 1);
}
      
function somme(tab,des){
/* param     : un tableau tab de taille 7
               trois entiers i,j,k compris entre 1 et 6 ,
               valeurs d'un tableau des
   résultat  : un entier tab[i]+tab[j]+tab[k]   
*/
   let resultat = 0;
   for (let i = 0; i < 3; i++) {
      resultat += tab[des[i]];
   }
   console.log(resultat)
   return resultat;
}

function nom_image(nombre){
/* param     : un entier entre 1 et 6
   résultat  : une chaine de caractères
               le nom du fichier image png 
               associé au lancer de dé nombre
*/
   return "images/" + nombre.toString() + ".png";
 
 }
 
 function affiche_images(){
 /* param     : aucun
   résultat  : aucun
   
  lance 3 dés et affiche dans la page eisbar.html les images des 3 dés 
  on utilise les variables globales  lancers_des et imgs

  Utiliser la méthode setAttribute(attribut,valeur)
*/
  for (let i = 0; i < 3; i++) {
     des[i] = de();
     imgs[i].setAttribute("src",nom_image(des[i]));
  }
}
 
function verifie_solution(){
/* param     : aucun
   résultat  : aucun
  
  Si les valeurs entrées sont correctes on affiche un message de félicitations et exécute la fonction fin_du_jeu()
  Sinon on affiche la correction et on exécute la  fonction fin_du_jeu()
*/
//Pour convertir une chaîne de caractères en nombre utiliser
//la méthode Number()
//Attention === est  un test d'égalité plus fort que ==
//'6' == 6 renvoie true alors que '6' === 6 renvoie false
;
   let sol_trous = somme(liste_trous, des);
   let sol_ours = somme(liste_ours, des);
   let sol_poissons = somme(liste_poissons, des);

   if ((sol_trous == nb_trous.value) && (sol_ours == nb_ours.value) && (sol_poissons == nb_poissons)) {
      resultat.textContent = "Gagné !";
   }

}
function fin_du_jeu() {
/* param     : aucun
   résultat  : aucun
  
  fonction semblable à celle du TP "Devine un nombre"
*/
    
}

function rejouer() {
/* param     : aucun
   résultat  : aucun
  
  fonction semblable à celle du TP "Devine un nombre"
*/
 
  
}
//---------------------main----------------------------------
let liste_trous = [0,1,0,1,0,1,0];
let liste_ours = [0,0,2,2,4,4,6];
let liste_poissons = [0,6,5,4,3,2,1];
let nb_trous = document.querySelector('#nb_trous');
let nb_ours  = document.querySelector('#nb_ours');
let nb_poissons = document.querySelector('#nb_poissons');
let bouton = document.querySelector('button');
let resultats = document.querySelector('.resultats');
let des = new Array(3);
let imgs = new Array(3);
//le tableau imgs contient les variables JavaScript
//associées aux sélecteurs .img0,img1 et .img2
for(let i = 0;i < 3;i++){
    imgs[i] = document.querySelector('.img'+ i.toString());
}
affiche_images();
bouton.addEventListener('click', verifie_solution);