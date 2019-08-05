import { lib, PBKDF2, AES, pad, mode, enc } from 'crypto-js';
import { WordArray, Encoder } from 'crypto-js';

export class SimpleCrypto {

	private _secret: string;
	private readonly _keySize: number;
	private readonly _iterations: number;
	private readonly _defaultEncoder: Encoder;

	public constructor(secret: string) {
		if (secret === void 0) {
			throw new Error('SimpleCrypto object MUST BE initialised with a SECRET KEY.');
		}
		this._secret = secret;
		this._keySize = 256;
		this._iterations = 100;
		this._defaultEncoder = enc.Utf8;
	}

	public static generateRandom(
		length: number = 128,
		expectsWordArray: boolean = false
	): string | WordArray {
		const random = lib.WordArray.random(length/8);
		return expectsWordArray ? random : random.toString();
	}

	public encrypt(data: object | string | number | boolean): string {
		if (data == void 0) {
			throw new Error('No data was attached to be encrypted. Encryption halted.');
		}
		const string: string = typeof data == "object"
			? JSON.stringify(data)
			: typeof data == "string" || typeof data == "number" || typeof data == 'boolean'
				? data.toString()
				: null;
		if (null === string) {
			throw new Error('Only object, string, number and boolean data types that can be encrypted.');
		}
		const salt: string | WordArray = SimpleCrypto.generateRandom(128, true);
		const key: WordArray = PBKDF2(this._secret, salt, {
			keySize: this._keySize / 32,
			iterations: this._iterations
		});
		const initialVector: string | WordArray = SimpleCrypto.generateRandom(128, true);
		const encrypted: WordArray = AES.encrypt(string, key, {
			iv: initialVector as string,
			padding: pad.Pkcs7,
			mode: mode.CBC
		});
		return salt.toString() + initialVector.toString() + encrypted.toString();
	}

	public decrypt(
		ciphered: string,
		expectsObject: boolean = false,
		encoder: Encoder = this._defaultEncoder
	): string | object {
		if (ciphered == void 0) {
			throw new Error('No encrypted string was attached to be decrypted. Decryption halted.');
		}
		const salt: string = enc.Hex.parse(ciphered.substr(0, 32));
		const initialVector: string = enc.Hex.parse(ciphered.substr(32, 32));
		const encrypted: string = ciphered.substring(64);
		const key: string | WordArray = PBKDF2(this._secret, salt, {
			keySize: this._keySize / 32,
			iterations: this._iterations
		});
		const decrypted = AES.decrypt(encrypted, key, {
			iv: initialVector,
			padding: pad.Pkcs7,
			mode: mode.CBC
		});
		return expectsObject ? JSON.parse(decrypted.toString(encoder)) : decrypted.toString(encoder);
	}

	public encryptObject(object: object): string {
		return this.encrypt(object);
	}

	public decryptObject(string: string): object {
		const decrypted: string | object = this.decrypt(string, true);
		return typeof decrypted == 'object' ? decrypted : JSON.parse(decrypted);
	}

	public setSecret(secret: string): void {
		this._secret = secret;
	}

}

export default SimpleCrypto;
