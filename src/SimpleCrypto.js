"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var SimpleCrypto = /** @class */ (function () {
    function SimpleCrypto(secret) {
        if (secret === void 0)
            throw new Error('SimpleCrypto object MUST BE initialised with a SECRET KEY.');
        this._secret = secret;
        this._keySize = 256;
        this._iterations = 100;
    }
    SimpleCrypto.generateRandom = function (length, expectsWordArray) {
        if (length === void 0) { length = 128; }
        if (expectsWordArray === void 0) { expectsWordArray = false; }
        var random = CryptoJS.lib.WordArray.random(length / 8);
        return expectsWordArray ? random : random.toString();
    };
    SimpleCrypto.prototype.encrypt = function (data) {
        if (data == void 0)
            throw new Error('No data was attached to be encrypted. Encryption halted.');
        var string = typeof data == "object" ? JSON.stringify(data) : typeof data == "string" || typeof data == "number" || typeof data == 'boolean' ? data.toString() : null;
        if (null === string)
            throw new Error('Only object, string, number and boolean data types that can be encrypted.');
        var salt = SimpleCrypto.generateRandom(128, true);
        var key = CryptoJS.PBKDF2(this._secret, salt, {
            keySize: this._keySize / 32,
            iterations: this._iterations
        });
        var initialVector = SimpleCrypto.generateRandom(128, true);
        var encrypted = CryptoJS.AES.encrypt(string, key, {
            iv: initialVector,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        var ciphered = salt.toString() + initialVector.toString() + encrypted.toString();
        return ciphered;
    };
    SimpleCrypto.prototype.decrypt = function (ciphered, expectsObject, enc) {
        if (expectsObject === void 0) { expectsObject = false; }
        if (enc === void 0) { enc = CryptoJS.enc.Utf8; }
        if (ciphered == void 0)
            throw new Error('No encrypted string was attached to be decrypted. Decryption halted.');
        var salt = CryptoJS.enc.Hex.parse(ciphered.substr(0, 32));
        var initialVector = CryptoJS.enc.Hex.parse(ciphered.substr(32, 32));
        var encrypted = ciphered.substring(64);
        var key = CryptoJS.PBKDF2(this._secret, salt, {
            keySize: this._keySize / 32,
            iterations: this._iterations
        });
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: initialVector,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        var data = expectsObject ? JSON.parse(decrypted.toString(enc)) : decrypted.toString(enc);
        return data;
    };
    SimpleCrypto.prototype.encryptObject = function (object) {
        return this.encrypt(object);
    };
    SimpleCrypto.prototype.decryptObject = function (string) {
        var decrypted = this.decrypt(string, true);
        var object = typeof decrypted == 'object' ? decrypted : JSON.parse(decrypted);
        return object;
    };
    SimpleCrypto.prototype.setSecret = function (secret) {
        this._secret = secret;
    };
    return SimpleCrypto;
}());
exports.default = SimpleCrypto;
//# sourceMappingURL=SimpleCrypto.js.map