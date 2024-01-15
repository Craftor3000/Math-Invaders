# Projet 2 : Math Invaders

## Cahier des charges

### Demandes

En vous inspirant de ce qui a été fait en TP avec le jeu Eisbär, vous devez créer par équipe de 2 ou de 3 maximum un jeu interactif simple à destination d’un enfant du CP-CE1 mettant en jeu ses compétences de lecture, calcul et de logique.
L’enfant pourra jouer via une page Web interactive ( html + css + JavaScript ) dans laquelle la partie dynamique comporte :
• des images libres de droits
• des entrées
• des boutons

### Description

Math Invaders est un jeu de type space invaders où il faut entrer le résultat de l'opération mathématique apparaissant sur les vaisseaux aliens arrivant en haut de l'écran. 
A la validation d'un résultat, si le résultat est correct, le vaisseau alien concerné disparaitra, sinon, il ne se passera rien.
Le score de la partie est calculé en fonction du nombre d'opérations réalisées et du temps passé à les résoudre.
Au fur et à mesure de la partie, les vaisseaux aliens avancent plus vite.
De temps en temps, des boss pourront apparaitre. Ils nécessitent la résolution de plusieurs opérations, mais sont plus lents.
La partie se termine lorsqu'un vaisseau alien parvient à toucher le vaisseau du joueur. Le score de la partie sera alors affiché.

<img src="images/logo.png"
     alt="Logo"
     style="width: 100px; height: 100px;" />

### Solutions techniques

Pour l'affichage des différents menus, 3 div ont été utilisé pour regrouper les éléments de chaque menu. Elles apparaissent et disparaissent selon le bouton de navigation appuyé.

Lors de l'appui du bouton de commencement du jeu, la fonction debut_jeu() enclenche les méchanisme principaux du jeu, en mettant le score à 0, en rendant le joueur visible et en déclarant le jeu commencé. Cette fonction ne s'active que quand le jeu n'est pas déjà en cours. Elle active par la suite la fonction main_jeu().
La fonction main_jeu() est la boucle principale du jeu, tournant jusqu'à ce que le jeu s'arrête. Elle est composée d'une boucle while qui appelle les fonctions nécessaires à la bonne conduites du jeu en permanence.
Parmis ces dernières, elle vérifie si une vague d'ennemis est bien en cours. Si ce n'est pas le cas, elle la fait apparaitre avec la fonction apparition_vaisseaux(), et choisit ses opérations aléatoirement par la fonction affichage_operation(). Une de ces opérations est alors choisie au hasard par la fonction selection_vaisseau(). 
Lors de la validation d'une réponse de l'utilisateur, la fonction validation() vérifie la validité de la réponse et en répercute le score. Si la réponse est bonne, le vaisseau concerné est éliminé par la fonction elimination(), et le score du joueur augmente en fonction du temps mis à répondre. A l'inverse, si la réponse est fausse, le score diminue.
Si 5 vagues on été battues, un boss apparaitra. Il possède des fonctions très similaires aux noms quasiment identiques aux vaisseaux normaux ( affichage_operations_boss() , apparition_boss() , selection_boss() , validation_boss() , elimination_boss() ). Ainsi, le combat contre le boss se passera comme celui des vaisseaux, mais avec 5 opérations au total au lieu de 3. Cependant, le boss est légèrement plus lent que les vaisseaux normaux. A la suite du boss, les vaisseaux ennemis seront légèrement plus lents.
A chaque itération de la boucle principale de la fonction main_jeu(), la fonction avancement_vaisseaux() fait descendre un peu plus les vaisseaux ennemis. Pour cela, la propriété de style margin-top est incrémentée de 1.
Afin de brider la vitesse de la boucle de main_jeu(), à chaque itération de cette dernière, la fonction timer() est attendue avant de continuer l'exécution de la suite de la boucle.
Le jeu se termine lorsqu'un vaisseau ennemi touche, ou arrive à la hauteur du vaisseau du joueur. Cette valeur de hauteur a été définie préalablement pour garantir une meilleure expérience de jeu. Ainsi, la fonction fin_jeu() est appelée et remet toutes les variables à leur état initial tandis que le meilleur score est enregistré et affiché, si il est meilleur que le précédent.


##### DOM

ARTICLE
| - DIV id="f_regles" (-> const f_regles)
|    | - TABLE
|    |    | - THEAD
|    |    |    | - TR
|    |    |    |    | - TH colspan="2"
|    |    |    |    |    | - #text: Math invaders : regles du jeu
|    |    | - TBODY
|    |    |    | - TR
|    |    |    |    | - TD
|    |    |    |    |    | - H2
|    |    |    |    |    |    | - #text: Bienvenue dans Maths invaders, 
|    |    |    |    |    | - P
|    |    |    |    |    |   | - #text: Les
|    |    |    |    |    |   | - B
|    |    |    |    |    |   |   | - #text: Chiffre-x
|    |    |    |    |    |   | -  #text: , extraterrestres connus pour coloniser des planètes sont venus de leur royaume, orthonormé, pour envahir notre Terre.
|    |    |    |    |    | - P
|    |    |    |    |    |   | - #text: Heureusement nous pouvons riposter grâce à notre vaisseau le
|    |    |    |    |    |   | - B
|    |    |    |    |    |   |   | - #text: Wing-Calculette
|    |    |    |    |    |   | -  #text: dont vous êtes le pilote, représentant ainsi le dernier espoir de notre belle planète bleue.
|    |    |    |    |    | - P
|    |    |    |    |    |   | - #text: Pour détruire les vaisseaux ennemis rien de plus simple, entrer les coordonnées de tir, résultat de l'opération sur le vaisseau ennemi. Mais attention! Leur chef
|    |    |    |    |    |   | 
|    |    |    |    |    |   | - B
|    |    |    |    |    |   |   | - #text: Integralix
|    |    |    |    |    |   | - #text: qui dérive en ce moment dans l'espace pourrait venir à votre rencontre pour une bataille des plus épiques !
|    |    |    |    |    | - P
|    |    |    |    |    |   | - #text: Saurez-vous faire face à cette armée grandissante et surtout, saurez-vous tirer le plus rapidement possible ?
|    |    |    |    | - TD id="demo"
|    |    |    |    |    | - IMG src="images/joueur.png" id="joueur_demo" alt="joueur démo"
|    |    |    |    |    | - IMG src="images/ennemi.png" class="ennemi_demo" alt="ennemi démo" (-> const ennemi_demo)
|    |    |    |    |    | - IMG src="images/ennemi.png" class="ennemi_demo" alt="ennemi démo" (-> const ennemi_demo)
|    |    |    |    |    | - IMG src="images/ennemi.png" class="ennemi_demo" alt="ennemi démo" (-> const ennemi_demo)
| - DIV id="f_jeu" (-> const f_jeu)
|    | - DIV id="entrees"
|    |    | - DIV id="banniere"
|    |    |    | - H2 id="texte_banniere" (-> const texte_banniere)
|    |    |    |    | - #text: Appuyez pour commencer !
|    |    | - DIV id="commencer" (-> const commencer)
|    |    |    | - P id="texte_commencer" (-> const texte_commencer)
|    |    |    |   | - #text: Commencer !
|    |    | - DIV id="resultat"
|    |    |    | - LABEL for="entree_resultat"
|    |    |    |    | - #text: Résultat de l'opération
|    |    |    | - INPUT type="number" name="reponse" required="" min="0" max="400" id="entree_resultat" (-> const reponse_joueur)
|    |    |    | - BUTTON id="valider" (-> const valider)
|    |    |    |   | - #text: Valider
|    | - DIV id="espace_jeu" (-> const espace)
|    |    | - DIV id="grp_gauche" (-> const grp_gauche)
|    |    |    | - IMG src="images/ennemi.png" id="ennemi_gauche" alt="ennemi gauche" (-> const ennemi_gauche)
|    |    |    | - P id="operation_gauche" (-> const gauche)
|    |    | - DIV id="grp_centre" (-> const grp_centre)
|    |    |    | - IMG src="images/ennemi.png" id="ennemi_centre" alt="ennemi centre" (-> const ennemi_centre)
|    |    |    | - P id="operation_centre" (-> const centre)
|    |    | - DIV id="grp_droite" (-> const grp_droite)
|    |    |    | - IMG src="images/ennemi.png" id="ennemi_droite" alt="ennemi droite" (-> const ennemi_droite)
|    |    |    | - P id="operation_droite" (-> const droite)
|    |    | - DIV id="grp_boss" (-> const grp_boss)
|    |    |    | - IMG src="images/boss.png" id="boss" alt="boss" (-> const boss)
|    |    |    | - DIV id="operation_boss"
|    |    |    |    | - P id="boss_1" (-> const boss_1)
|    |    |    |    | - P id="boss_2" (-> const boss_2)
|    |    |    |    | - P id="boss_3" (-> const boss_3)
|    |    |    |    | - P id="boss_4" (-> const boss_4)
|    |    |    |    | - P id="boss_5" (-> const boss_5)
|    |    | - IMG src="images/joueur.png" id="joueur" alt="joueur" (-> const joueur)
|    | - DIV id="score"
|    |    | - H2 id="affichage_score"
|    |    |    | - #text: Votre score :
|    |    | - P id="score_joueur" (-> const score)
|    |    |    | - #text: 0
|    | - DIV id="hi_score"
|    |    | - H2 id="affichage_hi_score"
|    |    |    | - #text: Votre meilleur score :
|    |    | - P id="meilleur_score"
|    |    |    | - #text: 0
| - DIV id="f_parametres"
|    | - DIV id="difficulte"
|    |    | - H2
|    |    |    | - #text: Difficulté
|    |    | - DIV id="facile" (-> const facile)
|    |    |    | - P
|    |    |    |   | - #text: FACILE
|    |    |    | - P
|    |    |    |   | - #text: (1 - 10)
|    |    | - DIV id="moyen" (-> const moyen)
|    |    |    | - P
|    |    |    |   | - #text: MOYEN
|    |    |    | - P
|    |    |    |   | - #text: (1 - 20)
|    |    | - DIV id="difficile" (-> const difficile)
|    |    |    | - P
|    |    |    |   | - #text: DIFFICILE
|    |    |    | - P
|    |    |    |   | - #text: (1 - 30)
|    | - DIV id="type_operation"
|    |    | - H2
|    |    |    | - #text: Type d'opération
|    |    | - DIV id="additions" (-> const additions)
|    |    |    | - P
|    |    |    |   | - #text: ADDITIONS
|    |    |    | - P
|    |    |    |   | - #text: CP - CE1
|    |    | - DIV id="multiplications" (-> const multiplications)
|    |    |    | - P
|    |    |    |   | - #text: MULTIPLICATIONS
|    |    |    | - P
|    |    |    |   | - #text: CE2 et +
|    | - P id="css-validator"
|    |    | - A href="http://jigsaw.w3.org/css-validator/check/referer"
|    |    |   | - IMG style="border:0;width:88px;height:31px" src="http://jigsaw.w3.org/css-validator/images/vcss-blue" alt="CSS Valide !"


### Patch note
15/01/24 : Clément : (maison)
- Optimisation massive du code avec la suppression de toutes les fonctions dupliquées dédiées aux boss

29/12/23 : Clément : (maison)
- Correction de la position des vaisseaux de présentation
- Correction de l'affichage des background
- Correction de la vitesse des vaisseaux ennemis
- Ajout des paramètres de la difficulté et du type d'opération
- Ajout d'une police d'écriture sans-serif pour une meilleure lecture des enfants
- Mise en gras des opérations pour plus de lisibilité

28/12/23 : Clément : (maison)
- Ajout d'une animation présentant le jeu sur l'écran des règles
- Ajout des images des ennemis et du boss
- Optimisation des vérifications de la boucle principale du jeu
- Alignement des composants du boss
- Rédaction du DOM
- Rédaction des solutions techniques
- Optimisations des variables utilisées
- Rangement des déclarations de variables
- Ajout de quelques commentaires pour une meilleure compréhension
- Changement des valeurs d'évolution de la vitesse
- Correction d'un bug dédoublant les vaisseaux de démonstration

28/12/23 : Maximilien : (maison)
- Ajout des spécification de certaines fonctions
- Ajout d'un systeme de high-score
- Réglage d'un bug avec la séléction des opérations du boss (mal optimisé mais ça marchait pas en utilisant les divs)

28/12/23 : Julien : (maison)
- Création du vaisseau boss en pixel
- Ajout des règles dans la page d'accueil
- Correction de bug dans la page paramètre 
- Ajout de bouton pour régler la difficulté
- ajout de la modification des additions dans paramètre

27/12/23 : Maximilien : (maison)
- Ajout de fonctions servant au fonctionnement du boss (verification_boss, selection_boss, elimination_boss)
- Spécification de ces fonctions
- Ajustement de la position du boss et de ses opérations

27/12/23 : Julien : (maison)
- Embellissement de la page de jeu 
- Embellisement de la navigation 
- Ajout de vaisseau tombant dans la page d'accueil
- Commencement du réglage de la difficulté dans les paramètres

27/12/23 : Clément : (maison)
- Ajout des boss, apparaissant une fois toutes les cinq phases
- Ajout d'une limite variable de progression des vaisseaux ennemis
- Optimisation des variables
- Optimisation du changement de fenêtre
- Optimisation des sélecteurs CSS
- Correction des erreurs d'accessibilité HTML

26/12/23 : Clément : (maison)
- Correction du bug par lequel le jeu plantait lors du démarrage d'une deuxième partie
- Amélioration de la qualité de l'image du joueur

26/12/23 : Maximilien : (maison)
- Ajout d'une bannière faisant apparaitre le score du joueur
- Modification de fonctions existantes pour calculer le score du joueur
- Ajout d'une fonction ajustant le score obtenu par le joueur en fonction du temps mis à calculer une opération
- Correction d'un défaut laissant le score atteindre des valeurs négatives

26/12/23 : Julien : (maison)
- Ajout de l'image du vaisseau du joueur
- Création du vaisseau ennemi
- Embellisement de la page des règles du jeu
- Tableau créé dans la page des règles du jeu

25/12/23 : Clément : (maison)
- Optimisation des fonctions
- Correction du traitement des entrées utilisateur
- Ajout du système d'élimination des vaisseaux
- Ajout du système de phases de combat, la vitesse des vaisseaux ennemis augmente au fur et à mesure des phases

25/12/23 : julien : (maison)
- Création du vaisseau joueur pixel

25/12/23 : Maximilien : (maison)
- Ajout d'une fonction qui selectionne un vaisseau au hasard
- Ajout d'une fonction qui vérifie la réponse donnée par le joueur
- Ajout d'un détecteur pour activer la fonction précedente en appuyant sur la touche entrée
- Ajustement très léger des positions des vaisseaux

24/12/23 : Clément : (maison)
- Ajout des mouvements des vaisseaux
- Ajout d'un input pour entrer les résultats

21/12/23 : Maximilien : (cours)
- Ajout des alt pour les images pour une meilleure accessibilité

21/12/23 : Julien : (cours)
- mise en place de la structure d'accueil

15/12/23 : Clément : (maison)
- Mise en place des vaisseaux et de leur opération
- Réorganisation de l'esthétique de l'espace de jeu

13/12/23 : Clément : (maison)
- Création de la structure générale de l'espace de jeu
- Ajout d'un bouton commençant le jeu et faisant apparaitre les vaisseaux
- Ajout d'une fonction arrêtant le jeu automatiquement en raison de certaines actions utilisateur
- Ajout d'une dizaine de constantes et variables sélectionnant divers éléments
- Effet de survol des boutons de navigation

12/12/23 : Clément : (maison)
- Organisation de la fenêtre de jeu
- Embellissement de la barre de navigation

11/12/23 : Clément : (maison)
- Mise en service des boutons de navigation en les faisant cacher ou apparaitre des fenêtres

10/12/23 : Maximilien : (maison)
- Création d'un bouton qui fait apparaitre l'image du vaisseau ennemi, au mauvais endroits

08/12/23 : Clément : (maison)
- Création de la structure générale des fichiers
- Rédaction du cahier des charges
- Organisation des moyens de partage de code
- Implémentation du logo du projet
- Création de la structure générale du fichier HTML
- Mise en forme temporaire avec le fichier CSS
- Création des variables importantes dans le fichier JS


### Répartition du travail

##### Clément
- Structure générale des menus
- Mouvements des vaisseaux aliens
- Elimination des vaisseaux aliens
- Gestion des boss

##### Julien
- Présentation ludique du jeu
- Embellissement général avec CSS
- Design graphique
- Paramètres

##### Maximilien
- Génération des vaisseaux aliens
- Gestion des entrées utilisateur
- Gestion du score
