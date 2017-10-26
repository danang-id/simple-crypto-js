"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var SimpleCrypto = /** @class */ (function () {
    function SimpleCrypto(secret) {
        if (secret === void 0)
            throw new Error("SimpleCrypto object MUST have a secret.");
        this.secret = secret;
        this.keySize = 256;
        this.iterations = 100;
    }
    SimpleCrypto.prototype.encrypt = function (string) {
        var salt = SimpleCrypto.generateRandom(128, true);
        var key = CryptoJS.PBKDF2(this.secret, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        var initialVector = SimpleCrypto.generateRandom(128, true);
        var encrypted = CryptoJS.AES.encrypt(string, key, {
            iv: initialVector,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        return salt.toString() + initialVector.toString() + encrypted.toString();
    };
    SimpleCrypto.prototype.decrypt = function (string, enc) {
        if (enc === void 0) { enc = CryptoJS.enc.Utf8; }
        var salt = CryptoJS.enc.Hex.parse(string.substr(0, 32));
        var initialVector = CryptoJS.enc.Hex.parse(string.substr(32, 32));
        var encrypted = string.substring(64);
        var key = CryptoJS.PBKDF2(this.secret, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: initialVector,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        return decrypted.toString(enc);
    };
    SimpleCrypto.prototype.encryptObject = function (object) {
        return this.encrypt(JSON.stringify(object));
    };
    SimpleCrypto.prototype.decryptObject = function (string) {
        return JSON.parse(this.decrypt(string));
    };
    SimpleCrypto.generateRandom = function (length, wordArray) {
        if (length === void 0) { length = 128; }
        if (wordArray === void 0) { wordArray = false; }
        var random = CryptoJS.lib.WordArray.random(length / 8);
        return (wordArray) ? random : random.toString();
    };
    return SimpleCrypto;
}());
exports.default = SimpleCrypto;
