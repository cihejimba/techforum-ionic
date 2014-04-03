/*** TechForum 2014 Atos Worldline ***/

Mobile Application for Worldline TechForum

Service : SDCO - Software Engineering - Web & Mobile Framework
Developer : Maxime Gens

Launch application :

*** install Node.js
=> http://nodejs.org/

*** install cordova and ionic
npm install -g cordova
npm install -g ionic

*** install node_modules with :
npm install

*** install dependencies
bower install

*** launch server
node server.js

Application is now available in http://localhost:3000


/***probleme **/
Fichier config.xml non balide dans ripple chrome
solution, le fichier config.xml doti être au même niveau que le fichier "index.html"
attention en déplacant le fichier config.xml dans www ( pour le mettre au meme niveau que "index.html"
il n'est plus possible de build et de run avec la command cordova => solution copier en deux exemplaire le fichier...
=> http://stackoverflow.com/questions/14832776/phonegap-ripple-emulator-always-reports-malformed-config-xml


Utilisation des fonctionnalite phionegapCordova
=>http://stackoverflow.com/questions/17695875/how-to-use-ripple-emulator-for-windows-to-test-phonegap-application



