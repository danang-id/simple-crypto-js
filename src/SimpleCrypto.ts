/**
 * SimpleCryptoJS
 *
 * Simplified AES cryptography for safer and easier encryption and decryption processes
 * of any JavaScript objects.
 **/
import {
	Encoder,
	WordArray,
	AES,
	enc,
	lib,
	mode,
	pad,
	HmacSHA256,
	PBKDF2,
	SHA3
} from "crypto-js"

/**
 * SimpleCrypto
 *
 * @class
 */
export class SimpleCrypto {

	private _dataBuffer: string
	private _encoder: Encoder
	private _secret: WordArray
	private readonly _keySize: number
	private readonly _iterations: number

	/**
	 * Represent a SimpleCrypto instance
	 *
	 * @constructor
	 * @param	{string}	secret		The secret key for cryptographic process.
	 */
	public constructor(secret: string | WordArray) {
		if (secret === void 0) {
			throw new Error("SimpleCrypto object MUST BE initialised with a SECRET KEY.")
		}
		this._dataBuffer = ""
		this._encoder = enc.Utf8
		this._secret = SHA3(typeof secret === "string" ? secret : secret.toString())
		this._keySize = 256
		this._iterations = 100
	}

	private static sanitiseData(data: PlainData): PlainText {
		if (data === void 0 || data === null || data === "") {
			throw new Error("There is no data provided. Process halted.")
		}
		const sanitised: string = typeof data === "object"
			? JSON.stringify(data)
			: typeof data === "string" || typeof data === "number" || typeof data === "boolean"
				? data.toString()
				: null
		if (null === sanitised) {
			throw new Error("Invalid data type. Only object, string, number and boolean data types are allowed.")
		}
		return sanitised
	}

	private static transform(src: CipherText): PlainData {
		if (src.toLowerCase() === "true" || src.toLowerCase() === "false") {
			return src.toLowerCase() === "true"
		}
		try {
			return JSON.parse(src)
		} catch (jsonError) {
			return !isNaN(parseInt(src)) ? parseInt(src) : src
		}
	}

	/**
	 * Encoders
	 *
	 * Get Encoder instance available.
	 *
	 * @since		2017.10.16
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @see     WordArray
	 *
	 * @return  {object}  Returns object of Encoder instances.
	 */
	public static get encoders(): {
		Default: Encoder
		Base64: Encoder
		Hex: Encoder
		Latin1: Encoder
		Utf8: Encoder
		Utf16: Encoder
		Utf16LE: Encoder
	} {
		return {
			Default: enc.Utf8,
			...enc
		}
	}

	/**
	 * Generate Random
	 *
	 * Generate a random string or WordArray.
	 *
	 * @since		2017.10.16
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @see     WordArray
	 *
	 * @param   {number}    length      		The length of random to be generated.
	 * @param   {boolean}   expectsWordArray	Set to true to return WordArray instance.
	 * Default is false and return a string.
	 *
	 * @return  {string | WordArray}  Returns a random string or WordArray.
	 */
	public static generateRandom(
		length: number = 128,
		expectsWordArray: boolean = false
	): string | WordArray {
		const random = lib.WordArray.random(length/8)
		return expectsWordArray ? random : random.toString()
	}

	/**
	 * Generate Random String
	 *
	 * Generate a random string
	 *
	 * @since		2020.05.09
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @see     WordArray
	 *
	 * @param   {number}    length      		The length of random to be generated.
	 *
	 * @return  {string | WordArray}  Returns a random string.
	 */
	public static generateRandomString(length: number = 128): string {
		return <string>SimpleCrypto.generateRandom(length, false)
	}

	/**
	 * Generate Random Word Array
	 *
	 * Generate a random WordArray.
	 *
	 * @since		2020.05.09
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @see     WordArray
	 *
	 * @param   {number}    length      		The length of random to be generated.
	 *
	 * @return  {string | WordArray}  Returns a random WordArray.
	 */
	public static generateRandomWordArray(length: number = 128): WordArray {
		return <WordArray>SimpleCrypto.generateRandom(length, true)
	}

	private _decrypt(): PlainData {
		if (this._dataBuffer === "") {
			throw new Error("No data was provided to be decrypted. Decryption halted.")
		}

		if (this._dataBuffer.length <= 64) {
			throw new Error("Invalid cipher text. Decryption halted.")
		}

		const salt: string = enc.Hex.parse(this._dataBuffer.substr(0, 32))
		const initialVector: string = enc.Hex.parse(this._dataBuffer.substr(32, 32))
		const encrypted: string = this._dataBuffer.substring(64, this._dataBuffer.length-64)

		const key: string | WordArray = PBKDF2(this._secret.toString(), salt, {
			keySize: this._keySize / 32,
			iterations: this._iterations
		})

		const hashedCipherText = this._dataBuffer.substring(this._dataBuffer.length-64)
		const cipherText = this._dataBuffer.substring(0,this._dataBuffer.length-64)

		if (hashedCipherText != HmacSHA256(cipherText, key).toString()) {
			throw new Error("Invalid encrypted text received. Decryption halted.")
		}

		const decrypted = AES.decrypt(encrypted, key, {
			iv: initialVector,
			padding: pad.Pkcs7,
			mode: mode.CBC
		})

		return SimpleCrypto.transform(decrypted.toString(SimpleCrypto.encoders.Default))
	}

	private _encrypt(): string {
		if (this._dataBuffer === "") {
			throw new Error("No data was provided to be encrypted. Encryption halted.")
		}

		const salt: string | WordArray = SimpleCrypto.generateRandom(128, true)
		const initialVector: string | WordArray = SimpleCrypto.generateRandom(128, true)

		const key: WordArray = PBKDF2(this._secret.toString(), salt, {
			keySize: this._keySize / 32,
			iterations: this._iterations
		})

		const encrypted: WordArray = AES.encrypt(this._dataBuffer, key, {
			iv: initialVector as string,
			padding: pad.Pkcs7,
			mode: mode.CBC
		})

		// Combining the encrypted string with salt and IV to form cipher-text
		const cipherText = salt.toString()
			+ initialVector.toString()
			+ encrypted.toString()

		// Generate authentication tag and append that to the cipher-text using the key derived from PBKDF2.
		// (Optional TODO: Include a module to generate authentication key. Possibly HKDF-SHA256.)
		const hashedCipherText = HmacSHA256(cipherText, key).toString()
		return cipherText + hashedCipherText
	}

	/**
	 * Decrypt
	 *
	 * Decrypt a encrypted string backs to its proper type, either it JavaScript
	 * object, string, number, or boolean.
	 *
	 * @since		2020.05.09
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @return  {string}	The decrypted data of the encrypted string.
	 */
	public decrypt(): PlainData

	/**
	 * Decrypt
	 *
	 * Decrypt a encrypted string backs to its proper type, either it JavaScript
	 * object, string, number, or boolean.
	 *
	 * @since		2020.05.09
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @param   {string}	cipher			The encrypted string of the data.
	 *
	 * @return  {string}	The decrypted data of the encrypted string.
	 */
	public decrypt(cipher: string): PlainData

	/**
	 * Decrypt
	 *
	 * Decrypt a encrypted string backs to its proper type, either it JavaScript
	 * object, string, number, or boolean.
	 *
	 * @since		2020.05.09
	 * @access		public
	 * @deprecated	Since version 2.4.0, use decrypt(cipher: CipherText, encoder: Encoder) instead.
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @param   {string}	cipher			The encrypted string of the data.
	 * @param   {boolean}	expectsObject	Setting this to true will return an object instead of string.
	 *
	 * @return  {string}	The decrypted data of the encrypted string.
	 */
	public decrypt(cipher: CipherText, expectsObject: boolean): PlainData

	/**
	 * Decrypt
	 *
	 * Decrypt a encrypted string backs to its proper type, either it JavaScript
	 * object, string, number, or boolean.
	 *
	 * @since		2020.05.09
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @param   {string}	cipher			The encrypted string of the data.
	 * @param   {Encoder}	encoder			Set the encoding for the string conversion.
	 *
	 * @return  {string}	The decrypted data of the encrypted string.
	 */
	public decrypt(cipher: CipherText, encoder: Encoder): PlainData

	/**
	 * Decrypt
	 *
	 * Decrypt a encrypted string backs to its proper type, either it JavaScript
	 * object, string, number, or boolean.
	 *
	 * @since		2017.10.16
	 * @access		public
	 * @deprecated	Since version 2.4.0, use decrypt(cipher: CipherText, encoder: Encoder) instead.
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @param   {string}	cipher			The encrypted string of the data.
	 * @param   {boolean}	expectsObject	Setting this to true will return an object instead of string.
	 * @param   {Encoder}	encoder			Set the encoding for the string conversion.
	 *
	 * @return  {string}	The decrypted data of the encrypted string.
	 */
	public decrypt(cipher: CipherText, expectsObject: boolean, encoder: Encoder): PlainData

	public decrypt(
		cipher?: CipherText,
		secondArg?: boolean | Encoder,
		thirdArg?: boolean | Encoder
	): PlainData {
		const setDecryptionOption = (arg: boolean | Encoder): void => {
			if (typeof arg !== "boolean")this.setEncoder(arg) 
		}
		try {
			if (cipher !== void 0) {
				this.update(cipher)
			}
			if (secondArg !== void 0) {
				setDecryptionOption(secondArg)
			}
			if (thirdArg !== void 0) {
				setDecryptionOption(thirdArg)
			}
			return this._decrypt()
		} catch (error) {
			throw error
		}
	}

	/**
	 * Encrypt
	 *
	 * Encrypt the data provided using append() or update.
	 *
	 * @since		2020.05.09
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @return  {string}	The encrypted string of the data.
	 */
	public encrypt(): CipherText

	/**
	 * Encrypt
	 *
	 * Encrypt any JavaScript object, string, number or boolean.
	 *
	 * @since		2017.10.16
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @param   {object | string | number | boolean}	data	The data to be encrypted.
	 *
	 * @return  {string}	The encrypted string of the data.
	 */
	public encrypt(data: PlainData): CipherText

	public encrypt(data?: PlainData): CipherText {
		try {
			if (data !== void 0) { this.update(data) }
			return this._encrypt()
		} catch (error) {
			throw error
		}
	}

	/**
	 * Decrypt Object
	 *
	 * Decrypt a encrypted string and try to convert it back to object.
	 *
	 * @since		2017.10.16
	 * @access		public
	 * @deprecated	Since version 2.0.0, use decrypt(cipher: CipherText) instead.
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @see		decrypt
	 *
	 * @param   {string}	cipher		The encrypted string of the data.
	 *
	 * @return  {string}	The decrypted data of the encrypted string in the form
	 * of object.
	 */
	public decryptObject(cipher: CipherText): object {
		return <object>this.update(cipher).decrypt()
	}

	/**
	 * Encrypt Object
	 *
	 * Encrypt an object.
	 *
	 * @since		2017.10.16
	 * @access		public
	 * @deprecated	Since version 2.0.0, use encrypt(data: PlainData) instead.
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @see		encrypt
	 *
	 * @param   {object}	object		The object to be encrypted.
	 *
	 * @return  {string}	The encrypted string of the object.
	 */
	public encryptObject(object: object): string {
		return this.update(object).encrypt()
	}

	/**
	 * Append
	 *
	 * Append the data to be encrypted or decrypted.
	 *
	 * @since		2020.05.09
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @param   {object | string | number | boolean}	data	Data to be encrypted or decrypted.
	 *
	 * @return  {SimpleCrypto}		Current SimpleCrypto instance.
	 */
	public append(data: PlainData): SimpleCrypto {
		try {
			this._dataBuffer = this._dataBuffer + SimpleCrypto.sanitiseData(data)
			return this
		} catch (error) {
			throw error
		}
	}

	/**
	 * Update
	 *
	 * Change data to be encrypted or decrypted.
	 *
	 * @since		2020.05.09
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @param   {object | string | number | boolean}	data	Data to be encrypted or decrypted.
	 *
	 * @return  {SimpleCrypto}		Current SimpleCrypto instance.
	 */
	public update(data: PlainData): SimpleCrypto {
		try {
			this._dataBuffer = SimpleCrypto.sanitiseData(data)
			return this
		} catch (error) {
			throw error
		}
	}

	/**
	 * Set Encoder
	 *
	 * Change the default encoding type for the decryption process.
	 *
	 * @since		2020.05.09
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @param   {Encoder}	encoder		The new Encoder object.
	 *
	 * @return  {SimpleCrypto}		Current SimpleCrypto instance.
	 */
	public setEncoder(encoder: Encoder): SimpleCrypto {
		/*
		* TODO: Encoding support is dropped at the moment, both for encryption
		*  and decryption. We should figure out how we have to implement encoding
		*  support in the simplest way possible.
		* */
		this._encoder = encoder
		return this
	}

	/**
	 * Set Secret
	 *
	 * Change the secret key by setting a new one. By changing the secret key,
	 * any encrypted string that encrypted by previous secret key will not be
	 * able to decrypted, unless the secret key is set to the one used to
	 * encrypt the data.
	 *
	 * @since		2017.10.16
	 * @access		public
	 *
	 * @memberOf    SimpleCrypto
	 *
	 * @param   {string}	secret		The new secret key as string.
	 *
	 * @return  {SimpleCrypto}		Current SimpleCrypto instance.
	 */
	public setSecret(secret: string | WordArray): SimpleCrypto {
		this._secret = SHA3(typeof secret === "string" ? secret : secret.toString())
		return this
	}

}

export default SimpleCrypto

export type PlainData = object | string | number | boolean
export type PlainText = string
export type CipherText = string