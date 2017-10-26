import * as CryptoJS from 'crypto-js';

export default class SimpleCrypto {

  private secret : string;
  private keySize : number;
  private iterations : number;

  constructor(secret) {
    if (secret === void 0) throw new Error(`SimpleCrypto object MUST have a secret.`);
    this.secret = secret;
    this.keySize = 256;
    this.iterations = 100;
  }

  encrypt(string) {
    let salt = SimpleCrypto.generateRandom(128, true);
    let key = CryptoJS.PBKDF2(this.secret, salt, {
      keySize: this.keySize/32,
      iterations: this.iterations
    });
    let initialVector = SimpleCrypto.generateRandom(128, true);
    let encrypted = CryptoJS.AES.encrypt(string, key, {
      iv: initialVector, 
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    return salt.toString() + initialVector.toString() + encrypted.toString();
  }

  decrypt(string, enc = CryptoJS.enc.Utf8) {
    let salt = CryptoJS.enc.Hex.parse(string.substr(0, 32));
    let initialVector = CryptoJS.enc.Hex.parse(string.substr(32, 32));
    let encrypted = string.substring(64);
    let key = CryptoJS.PBKDF2(this.secret, salt, {
      keySize: this.keySize/32,
      iterations: this.iterations
    });
    let decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
      iv: initialVector, 
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    return decrypted.toString(enc);
  }

  encryptObject(object) {
    return this.encrypt(JSON.stringify(object));
  }

  decryptObject(string) {
    return JSON.parse(this.decrypt(string));
  }

  static generateRandom(length = 128, wordArray = false) {
    let random = CryptoJS.lib.WordArray.random(length/8);
    return (wordArray) ? random : random.toString();
  }

}
