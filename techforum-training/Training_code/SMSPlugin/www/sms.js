var exec = require('cordova/exec');

var SMS = function(){};

SMS.prototype.send = function(number, message, success, error) {
    var args = [number, message];
    exec(success, error, "SMSPlugin", "send", args);
}
module.exports = new SMS();