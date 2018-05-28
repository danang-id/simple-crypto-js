import * as CryptoJS from 'crypto-js';

export default class SimpleCrypto {

  private _secret: string;
  private _keySize: number;
  private _iterations: number;

  public constructor(secret) {
    if (secret === void 0) throw new Error('SimpleCrypto object MUST BE initialised with a SECRET KEY.');
    this._secret = secret;
    this._keySize = 256;
    this._iterations = 100;
  }

  public static generateRandom(length: number = 128, expectsWordArray: boolean = false): string | CryptoJS.WordArray {
    const random = CryptoJS.lib.WordArray.random(length/8);
    return expectsWordArray ? random : random.toString();
  }

  public encrypt(data: object | string | number | boolean): string {
    if (data == void 0) throw new Error('No data was attached to be encrypted. Encryption halted.');    
    const string: string = typeof data == "object" ? JSON.stringify(data) : typeof data == "string" || typeof data == "number" || typeof data == 'boolean' ? data.toString() : null;
    if (null === string) throw new Error('Only object, string, number and boolean data types that can be encrypted.');
    const salt: string | CryptoJS.WordArray = SimpleCrypto.generateRandom(128, true);
    const key: CryptoJS.WordArray = CryptoJS.PBKDF2(this._secret, salt, {
      keySize: this._keySize / 32,
      iterations: this._iterations
    });
    const initialVector: string | CryptoJS.WordArray = SimpleCrypto.generateRandom(128, true);
    const encrypted: CryptoJS.WordArray = CryptoJS.AES.encrypt(string, key, {
      iv: initialVector,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    const ciphered: string = salt.toString() + initialVector.toString() + encrypted.toString();
    return ciphered;
  }

  public decrypt(ciphered: string, expectsObject: boolean = false, enc: CryptoJS.Encoder = CryptoJS.enc.Utf8): string | object {
    if (ciphered == void 0) throw new Error('No encrypted string was attached to be decrypted. Decryption halted.'); 
    const salt: string = CryptoJS.enc.Hex.parse(ciphered.substr(0, 32));
    const initialVector: string = CryptoJS.enc.Hex.parse(ciphered.substr(32, 32));
    const encrypted: string = ciphered.substring(64);
    const key: string | CryptoJS.WordArray = CryptoJS.PBKDF2(this._secret, salt, {
      keySize: this._keySize / 32,
      iterations: this._iterations
    });
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
      iv: initialVector, 
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    const data: string | object = expectsObject ? JSON.parse(decrypted.toString(enc)) : decrypted.toString(enc);
    return data;
  }

  public encryptObject(object: object): string {
    return this.encrypt(object);
  }

  public decryptObject(string: string): object {
    const decrypted: string | object = this.decrypt(string, true);
    const object: object = typeof decrypted == 'object' ? decrypted : JSON.parse(decrypted);
    return object;
  }

  public setSecret(secret: string): void {
    this._secret = secret;
  }

}
