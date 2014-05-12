TechForum 2014 Ionic - Atos Worldline
==========================

_A Mobile Application for Worldline TechForum 2014_

**Service :** SDCO - Software Engineering - Web & Mobile Framework

**Technology :** Cordova - HTML5 - CSS3 - JavaScript - AngularJS

**FrameWork :** Ionic

**Developer :** Maxime Gens


> **It's a mobile app for TechForum 2014 in WorldLine. TechForum eXplore is an internal conference dedicated to topics related to technology, through 2 main lines: technical breakthroughs & achievements, and exploratory works on various topics.**

![techForum](https://raw.githubusercontent.com/got5/techforum-ionic/master/bin/mise_en_situation.png)

> **Download application**

> [Techforum 2014 Android](https://raw.githubusercontent.com/got5/techforum-ionic/master/bin/mise_en_situation.png)

> [Techforum 2014 IOS](https://raw.githubusercontent.com/got5/techforum-ionic/master/bin/TechForum2014.ipa)

## To install development development and production environments

Install a follow components

Use "**sudo**" if you buil with Mac and Linux

**Node.js**

[http://nodejs.org/](http://nodejs.org/)

_Configure NPM proxy_
```bash
npm config set proxy http://[proxy]:[PORT]
npm config set https-proxy http://[proxy]:[PORT]
```

**Cordova**
```bash
npm install -g cordova
```
**Bower**
```bash
npm install -g bower
```
_Configure Bower proxy_

Add in .bowerrc
```bash
"proxy":"http://[proxy]:[PORT]",
"https-proxy":"http://[proxy]:[PORT]"
```

**Grunt**
```bash
npm install -g grunt-cli
```

Then run:

```bash
$ cd dev
$ npm install
$ bower install
$ cd ..
```

The development environment is now installed

***

**To install prod environnement**

If you use mac ou linux
```bash
chmod u+x script.sh
perl -i -pe 'y|\r||d' script.sh
```

```bash
$ sh script
```

**Add cordova plugin**
```bash
For Android and IOS
$ cordova plugin add org.apache.cordova.splashscreen
$ cordova plugin add org.apache.cordova.geolocation
Only for Android
$ cordova plugin add org.apache.cordova.network-information
```

### To build for Android
```bash
$ cordova platform add android
Add Splascreen and Icon
$  cp -r dev/res/android/res platforms/android/
$ cordova build android
To launch a emulator (you must have Android ADB and a AVD (Android virtual Device)
$ cordova emulate android
or to launch in your phone
$ cordova run android
```

### To build for IOS
```bash
$ cordova platform add ios
Add Splascreen and Icon
$  cp -r dev/res/ios/icons/ platforms/ios/TechForum\ 2014/Resources/icons
$  cp -r dev/res/ios/splash platforms/ios/TechForum\ 2014/Resources/
To launch a emulator (update xcode before)
$ cordova build ios
$ cordova emulate ios
```


_If you have a problem to install Cordova plugin_

Download the git of the plugin using the zip download of git site
* [https://github.com/apache/cordova-plugin-splashscreen](https://github.com/apache/cordova-plugin-splashscreen)
* [https://github.com/apache/cordova-plugin-geolocation](https://github.com/apache/cordova-plugin-geolocation)
* [https://github.com/apache/cordova-plugin-network-information](https://github.com/apache/cordova-plugin-network-information)

Extract the zip to some path
```bash
cordova plugin add [pathtotheextractedplugingit]cordova-plugin-geolocation-master
cordova plugin add [pathtotheextractedplugingit]cordova-plugin-splashscreen-master
```

## To test in Development Environments

Install Ripple emulator for Google Chrome

[https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc](https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc)

Launch server
```bash
$ cd www
$ node server.js
```

Application is now running in :

[localhost:3000](localhost:3000)
