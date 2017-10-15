"use strict";
exports.__esModule = true;
var crypto_js_1 = require("crypto-js");
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
        var key = crypto_js_1["default"].PBKDF2(this.secret, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        var initialVector = SimpleCrypto.generateRandom(128, true);
        var encrypted = crypto_js_1["default"].AES.encrypt(string, key, {
            iv: initialVector,
            padding: crypto_js_1["default"].pad.Pkcs7,
            mode: crypto_js_1["default"].mode.CBC
        });
        return salt.toString() + initialVector.toString() + encrypted.toString();
    };
    SimpleCrypto.prototype.decrypt = function (string, enc) {
        if (enc === void 0) { enc = crypto_js_1["default"].enc.Utf8; }
        var salt = crypto_js_1["default"].enc.Hex.parse(string.substr(0, 32));
        var initialVector = crypto_js_1["default"].enc.Hex.parse(string.substr(32, 32));
        var encrypted = string.substring(64);
        var key = crypto_js_1["default"].PBKDF2(this.secret, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        var decrypted = crypto_js_1["default"].AES.decrypt(encrypted, key, {
            iv: initialVector,
            padding: crypto_js_1["default"].pad.Pkcs7,
            mode: crypto_js_1["default"].mode.CBC
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
        var random = crypto_js_1["default"].lib.WordArray.random(length / 8);
        return (wordArray) ? random : random.toString();
    };
    return SimpleCrypto;
}());
exports["default"] = SimpleCrypto;
