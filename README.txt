/*** TechForum 2014 Atos Worldline ***/

Mobile Application for Worldline TechForum

Service : SDCO - Software Engineering - Web & Mobile Framework
Developer : Maxime Gens

First :

*** install Node.js
=> http://nodejs.org/

*** install cordova and ionic
npm install -g cordova

*** install node_modules with :
npm install

*** install dependencies
bower install


*** English Version ***

Launch application  :

*** launch server
node server.js

Application is now available in http://localhost:3000

Launch in your phone :

Create a folder with

*** Version Française ***

Lancement sur votre téléphone :

Créer un dossier avec la commande
cordova create TechForum com.worldline.techforum "TechForum 2014"

Rendez vous dans le dossier "TechForum"
cd TechForum

Vous devez ajouter une plate-forme (android - ios - window8 - blackberry10 ...)
Pour compiler sur IOS
cordova platforms add ios
Pour compiler sur Android
cordova platforms add android

Vous devez ensuite ajouter les plugins Cordova utilisé dans l'application
Plugin SplashScreen
cordova plugin add org.apache.cordova.splashscreen
Plugin Geolocalisation
cordova plugin add org.apache.cordova.geolocation
Plugin globalization
cordova plugin add org.apache.cordova.globalization

Si vous rencontré des problémes pour récupérer les plugins
download the git of the plugin using the zip download of git site
https://github.com/apache/cordova-plugin-splashscreen
https://github.com/apache/cordova-plugin-geolocation
https://github.com/apache/cordova-plugin-globalization

extract the zip to some path
run cordova plugin add pathtotheextractedplugingit

Remplacez le contenu du fichier config.xml par :

<?xml version='1.0' encoding='utf-8'?>
<widget id="com.worldline.techforum" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:gap="http://phonegap.com/ns/1.0">>
    <name>TechForum 2014</name>
    <description>
        Application TechForum 2014 Atos WorldLine.
    </description>
    <author email="maxime.gens@worldline.com" href="http://worldline.com/en/1/Home.html">
        Maxime Gens - SDCO - Software Engineering - Web and Mobile Frameworks
    </author>
    <content src="app/index.html" />
    <access origin="*" />

    <!-- config android -->
    <preference name="Fullscreen" value="true" />
    <preference name="SplashScreen" value="splashscreen" />
    <preference name="AutoHideSplashScreen" value="false" />
    <preference name="webviewbounce" value="false" />
    <preference name="UIWebViewBounce" value="false" />
    <preference name="DisallowOverscroll" value="true" />
</widget>

Supprimer le contenu du dossier "www"
Copier ensuite le contenu que vous avez récupéré avec git dans le dossier "www"
Récupérez les dépendances.
cd www
npm install
bower install

Placez vous à la racine du projet

Compilez
cordova build

branchez votre téléphone et vérifier que adb le repére correctement
adb devices
votre téléphone doit apparaitre sinon un émulateur se lancera

Exécutez l'application
cordova run

L'application se lancera sur votre téléphone





/***probleme **/
Fichier config.xml non balide dans ripple chrome
solution, le fichier config.xml doti être au même niveau que le fichier "index.html"
attention en déplacant le fichier config.xml dans www ( pour le mettre au meme niveau que "index.html"
il n'est plus possible de build et de run avec la command cordova => solution copier en deux exemplaire le fichier...
=> http://stackoverflow.com/questions/14832776/phonegap-ripple-emulator-always-reports-malformed-config-xml


Utilisation des fonctionnalite phionegapCordova
=>http://stackoverflow.com/questions/17695875/how-to-use-ripple-emulator-for-windows-to-test-phonegap-application



