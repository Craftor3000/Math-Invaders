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
A la validation d'un résultat, un missile contenant le résultat entré est propulsé vers le vaisseau alien indiqué. 
Lors de l'impact, si le résultat est correct, le vaisseau alien disparaitra. Sinon, le missile n'aura aucun effet, et il faudra attendre 3 secondes avant de pouvoir relancer à nouveau un missile.
Au fur et à mesure de la partie, les vaisseaux aliens avancent plus vite et portent des opérations de plus en plus dures.
De temps en temps, des boss pourront apparaitre. Ils nécessitent la résolution de plusieurs opérations, mais sont plus lents.
La partie se termine lorsqu'un vaisseau alien parvient à toucher la ligne rouge. Le score de partie sera alors affiché.

<img src="images/logo.png"
     alt="Logo"
     style="width: 100px; height: 100px;" />

### Solutions techniques



### Patch note
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
- Structure générale des menus (majeur)
- Gestion des missiles (majeur)
- Gestion des boss (majeur)
- Gestion du score (mineur)

##### Julien
- Embellissement général avec CSS (majeur)
- Design graphique (majeur)
- Paramètres (mineur)

##### Maximilien
- Génération des vaisseaux aliens (majeur)
- Gestion des mouvements des vaisseaux aliens (majeur)
- Présentation ludique du jeu (mineur)