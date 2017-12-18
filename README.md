# E-Monitor - Projet d'intégration

Ce projet est réalisé dans le cadre du "Projet d'intégration" organisé par l'EPHEC pour les 3e BAC.      
Nous sommes 6 étudiants : MUTEBA Jean-Luc, LAGACHE Jordan, EEROLA Juhani, MEYERS Nathan, RENARD Arnaud et NOEL Jonathan.      

Nous défendons ici le "Groupe 7".                

En partenariat avec "La maison du développement durable de Louvain-la-Neuve".            



Notre projet se base principalement sur le monitoring des consommations électriques, d'eau et de gaz.      



## Traitement de l'image

Différentes utilisations du sytème de reconnaisance de caractères peut être envisagées.  

Premièrement, une utilisation de développement, sur une machine virtuelle Linux, par exemple. Cette utilisation se fait via le fichier [traiter.v0.9.sh](https://github.com/jonathannoel/Projet_Integration_Developpement_Durable/blob/master/TDS_TraitementImage/traiter.v0.9.sh). Ce script utilisera l'image captureWebcam.jpg qui est l'image d'un compteur électrique. Grâce au script, vos données seront envoyées vers votre base de données, vous devriez par conséquent modifier les données concernant le nom de la base de données, l'utilisateur, le mot de passe et le nom de vos colonnes/tables. Par ailleurs, le nom du client se trouve dans un fichier texte appelé : nomClient.txt. Dans ce fichier le format est : Nom&Prenom. "&" permettant une séparation des noms car lorsqu'une personne a un nom comme : Jean-Luc Muteba, cela permet une séparation des deux noms sans fausser celui-ci. 

Afin de capturer et de traiter les images des compteurs électriques, d'eau et de gaz, nous utilisons un OCR programmé en Shell Script. La version finale de celui-ci se trouve dans le dossier [TDS_Traitement de signal]( https://github.com/jonathannoel/Projet_Integration_Developpement_Durable/tree/master/TDS_TraitementImage)et se nomme [traiter.v0.9.sh](https://github.com/jonathannoel/Projet_Integration_Developpement_Durable/blob/master/TDS_TraitementImage/traiter.v0.9.sh) pour une utilisation dans un linux et [traiter.v0.10.sh](https://github.com/jonathannoel/Projet_Integration_Developpement_Durable/blob/master/TDS_TraitementImage/traiter.v0.10.sh) pour une utilisation sur un Raspberry Pi, par exemple.    


## Site web

Le site web a été implémenté en language HTML5, Css3, Php. Si vous disposez des outils permettant de lancer un site web côté serveur, vous n'aurez aucune difficulté à faire fonctionner Emonitor en local. 

Des tests unitaires sont de même implémentés dans le dossier contenant ceux-ci : [Tests Unitaires](https://github.com/jonathannoel/Projet_Integration_Developpement_Durable/tree/master/Source%20code/tests)
