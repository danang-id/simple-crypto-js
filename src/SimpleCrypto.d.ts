/// <reference types="crypto-js" />
import * as CryptoJS from 'crypto-js';
export default class SimpleCrypto {
    private _secret;
    private _keySize;
    private _iterations;
    constructor(secret: any);
    static generateRandom(length?: number, expectsWordArray?: boolean): string | CryptoJS.WordArray;
    encrypt(data: object | string | number | boolean): string;
    decrypt(ciphered: string, expectsObject?: boolean, enc?: CryptoJS.Encoder): string | object;
    encryptObject(object: object): string;
    decryptObject(string: string): object;
    setSecret(secret: string): void;
}
