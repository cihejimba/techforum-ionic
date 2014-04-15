TechForum 2014 Ionic - Atos Worldline
==========================

_A Mobile Application for Worldline TechForum 2014_

**Service :** SDCO - Software Engineering - Web & Mobile Framework

**Technology :** Cordova - HTML5 CSS3

**FrameWork :** Ionic

**Developer :** Maxime Gens

> **Warning**

> Ionic Framework doesn't work correctly with Android version below 4.0.
> Use a natif Android Application TechForum 2014 for these versions 

> [Here a link to futur android app](https://github.com/got5/techforum-ionic)

## To build

Install a follow components

### Node.js
[http://nodejs.org/](http://nodejs.org/)

### Cordova
```bash
npm install -g cordova
```

then run:

```bash
$ cd www
$ npm install
$ bower install
$ cd ..
$ cordova platform add android
$ cordova plugin add org.apache.cordova.splashscreen
$ cordova plugin add org.apache.cordova.geolocation
$ cordova build android
```
To launch a emulator
```bash
$ cordova emulate android
```

or to launch in your phone
```bash
$ cordova run
```

_If you have a problem to install Cordova plugin_

Download the git of the plugin using the zip download of git site
* [https://github.com/apache/cordova-plugin-splashscreen](https://github.com/apache/cordova-plugin-splashscreen)
* [https://github.com/apache/cordova-plugin-geolocation](https://github.com/apache/cordova-plugin-geolocation)

Extract the zip to some path
```bash
run cordova plugin add pathtotheextractedplugingit
```

## To test in local 

Install Ripple emulator for Google Chrome

[https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc](https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc)

Launch server
```bash
$ cd www
$ node server.js
```

Application is now running in :

[localhost:3000](localhost:3000)