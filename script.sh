#!/bin/bash

echo "-- Creation de l'application TechForum 2014 pour la mise production --"

if test -d www; then
	echo ""
else
	mkdir www
fi

echo "Creation des repertoires"
mkdir www/app
mkdir www/app/css
mkdir www/app/data
mkdir www/app/img
mkdir www/app/js
mkdir www/app/libs
mkdir www/app/views

echo "Copie des fichiers html"
cp dev/app/*.html www/app/
cp -r dev/app/views/* www/app/views

echo "Copie des data"
cp -r dev/app/data/* www/app/data
echo "Copie des images"
cp -r dev/app/img/* www/app/img
echo "Copie du fichier config.xml"
cp dev/config.xml www
cd dev

echo "Execution des taches grunt - Verification - Concatenation - Minification"
grunt
cd ..

echo "Suppression des fichiers inutile"
rm -rf www/app/js/techforum.js

echo "Copier des references JavaScript et CSS"
mkdir -p www/app/libs/ionic/release/js
cp dev/app/libs/ionic/release/js/ionic.bundle.min.js www/app/libs/ionic/release/js

mkdir -p www/app/libs/ionic/release/css
cp dev/app/libs/ionic/release/css/ionic.min.css www/app/libs/ionic/release/css

mkdir -p www/app/libs/angular-resource
cp dev/app/libs/angular-resource/angular-resource.min.js www/app/libs/angular-resource

mkdir -p www/app/libs/underscore
cp dev/app/libs/underscore/underscore-min.js www/app/libs/underscore

mkdir -p www/app/libs/angular-google-maps/dist
cp dev/app/libs/angular-google-maps/dist/angular-google-maps.min.js www/app/libs/angular-google-maps/dist

echo "Copie des icons ionic"

mkdir -p www/app/libs/ionic/release/fonts
cp dev/app/libs/ionic/release/fonts/*.* www/app/libs/ionic/release/fonts

echo "-- L'application TechForum 2014 contenu dans le dossier \"www\" peut être mise en production --"