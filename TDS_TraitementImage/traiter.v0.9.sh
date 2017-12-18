#!/bin/bash

#
# AUTEURS : NOËL Jonathan, LAGACHE Jordan
# 
# COLLABORATEURS : 
#   MEYER Nathan, EEROLA Juhani, MUTEBA Jean-Luc, RENARD Arnaud
#
#
# Dans le cadre du Projet d intégration organisé par l EPHEC-Louvain-la-Neuve
# 	et réalisé par des élèves de 3e BAC
#
#
#
# SOURCES
#
# crop.morphology.py
# https://github.com/danvk/oldnyc/blob/master/ocr/tess/crop_morphology.py
# 
# otsuthresh.py
# http://www.fmwconcepts.com/imagemagick/otsuthresh/
#

# VERIFICATION SYSTEME A JOUR
apt-get -y update
apt-get upgrade -y


# VERIFICATION ET INSTALLATION DU DRIVER MYSQL
apt-get install -y mysql-server

# VERIFICATION ET INSTALLATION DU DRIVER TESSERACT-OCR
apt-get install -y tesseract-ocr

# VERIFICATION ET INSTALLATION DU DRIVER CONVERT (ImageMagick)
apt-get install -y imagemagick

# VERIFICATION ET INSTALLATION DU DRIVER FSWEBCAM
apt-get install -y fswebcam

# VERIFICATION ET INSTALLATION DU DRIVER POUR LE SCRIPT DE DECOUPAGE
apt-get install -y python-scipy

# VERIFICATION ET INSTALLATION DU DRIVER POUR LE SCRIPT DE DECOUPAGE
apt-get install -y python-imaging

# VERIFICATION ET INSTALLATION DU DRIVER CV2
apt-get install -y python-opencv

# MISE A NIVEAU DU SYSTEME
apt-get -y update
apt-get -y upgrade


# LE NOM DANS FICHIER nomClient.txt = LE NOM DU CLIENT AVEC UN "-" ENTRE NOM ET PRENOM
# EXEMPLE : Philippe-Lemaitre / Jean.Luc-Muteba
# hostname=$(uname -n)
hostname=$(cat nomClient.txt)
hostnameSplit=(${hostname//&/ })
firstname=$(echo "${hostnameSplit[0]}")
lastname=$(echo "${hostnameSplit[1]}")
echo $firstname
echo $lastname

meter_id=$(mysql -h 137.74.172.37 -ujon -proot emonitor -se "CALL findMeterIdFromName('$firstname', '$lastname')")
echo "Meter ID = ----------------->   $meter_id"

module_id=$(mysql -h 137.74.172.37 -ujon -proot emonitor -se "CALL findModuleIdFromMeterId ($meter_id)")
echo "Module ID = ----------------->   $module_id"

valeurPrecedente=0
valeurEcartMax=10

#
# BOUCLE DE TRAITEMENT
#
while true
do
	# GENERER LA DATE	
	DATE=$(date +%d-%m-%Y-%H-%M)


	# CONVERTIR L'IMAGE EN IMAGE TRAITABLE
	# Premier essai fonctionnel avec erreur = 1
	# convert imageATraiter.tif -resize 2000 -threshold 90% -density 300 -depth 8 -negate -strip -background white -alpha off out-$DATE.tif

	# Second essai avec crop.py et erreur = 0
	# ./crop_morphology.py test.jpg
	# imageATraiter=$(base64 test.crop.png)
	# convert test.crop.png -resize 2000 -threshold 33% -density 300 -depth 8 -negate -strip -background white -alpha off out-$DATE.tif

	# Troisième essai avec ImageMagick
	# SOLUTION OK !!!! convert reel8.jpg -crop 1600x260+343+1750 reel8.cropMagick.jpg
	# convert reel9.jpg -crop 1600x270+260+1290 reel9.cropMagick.jpg
	convert captureWebcam.jpg -crop 1135x189+33+239 captureWebcamCrop.jpg	
	# imageATraiter=$(base64 reel9.cropMagick.jpg)
	imageATraiter=$(base64 captureWebcamCrop.jpg)
	# convert reel9.cropMagick.jpg -resize 300 -colorspace Gray -density 300 -depth 8 -negate -strip -background white -alpha off out-$DATE.tif
	convert captureWebcamCrop.jpg -resize 300 -colorspace Gray -density 300 -depth 8 -negate -strip -background white -alpha off out-$DATE.tif

	./otsuthresh out-$DATE.tif out-$DATE.tif

	# GENERATION DU NUMERO DE COMPTEUR
	# Premier essai fonctionnel
	# tesseract out-$DATE.tif output-$DATE -c tessedit_char_whitelist=0123456789 -psm 6;

	# Second essai avec erreur = 0
	# tesseract out-$DATE.tif output-$DATE -c tessedit_char_whitelist=0123456789 -psm 12;

	# Troisième essai avec ImageMagick
	tesseract out-$DATE.tif output-$DATE -c tessedit_char_whitelist=0123456789 -psm 12;

	rmSpaceOutput=$(cat output-$DATE.txt | tr -d ' ')
	echo "$rmSpaceOutput" > output-$DATE.txt

	# Pour la comparaison de la valeur actuelle avec le précédent	
	valeurActuelle=$(cat output-$DATE.txt)	
	echo "Valeur précédente = ----------------->   $valeurPrecedente"	
	echo "Valeur actuelle = ----------------->   $valeurActuelle"


	if [ "$valeurActuelle" -gt "$valeurPrecedente" ]
	then		
		if [ $((valeurPrecedente + valeurEcartMax)) -lt "$valeurActuelle" ]
		then 
			# REMPLACER LA VALEUR PRECEDENTE PAR L'ACTUELLE
			valeurPrecedente=$valeurActuelle

			# NOTER LE NOM DU LOCATAIRE (ON NOMME LA MACHINE A SON NOM)	
			echo " $hostname" >> output-$DATE.txt
			# NOTER LA DATE-HEURE DE LA PRISE
			echo " $DATE" >> output-$DATE.txt

			# GESTION DES ESPACES INUTILES / FACILITER POUR INSERT BDD
			contenuFichier="$(cat output-$DATE.txt)"
			contenuFichierSansEspaces="$(echo -e $contenuFichier | tr -d '\v')"
			echo $contenuFichierSansEspaces > output-$DATE.txt
			cat output-$DATE.txt

			# INSERTION DES DONNEES DANS LA BDD
			inputfile="output-$DATE.txt"
			cat $inputfile | while read compteur nom heure; do
				echo "INSERT INTO Control (Me_id, Mod_id, Con_measure, Con_time, Con_image) VALUES ('$meter_id', '$module_id', '$compteur', '$heure', '$imageATraiter');"
			done | mysql -h IpDeVotreBDD -uUtilisateur -pMotDePasse BaseDeDonnées;

			# DEPLACEMENT DES FICHIERS DANS UN DOSSIER D'ARCHIVAGE
			mv output-$DATE.txt Archives/$DATE.txt
			mv out-$DATE.tif Archives/$DATE.tif

			# RELANCER LA PRISE UNE MINUTE APRES
			sleep 60
		else
			# RELANCER LA CAPTURE			
			echo "C'EST PAS POSSIBLE"
			sleep 5		
		fi
	else	
		# RELANCER LA CAPTURE	
		sleep 5	
	fi
done
