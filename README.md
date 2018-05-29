# SimpleCrypto 2.0.2


[![GitHub Release](https://img.shields.io/github/release/danang-id/simple-crypto-js.svg)](https://github.com/danang-id/simple-crypto-js/releases)
[![Build Status](https://travis-ci.org/danang-id/simple-crypto-js.svg?branch=master)](https://travis-ci.org/danang-id/simple-crypto-js) 
[![Coverage Status](https://coveralls.io/repos/github/danang-id/simple-crypto-js/badge.svg?branch=master)](https://coveralls.io/github/danang-id/simple-crypto-js?branch=master)
[![Dependencies Status](https://img.shields.io/david/danang-id/simple-crypto-js.svg)](https://www.npmjs.com/package/simple-crypto-js?activeTab=dependencies)
[![DevDependencies Status](https://img.shields.io/david/dev/danang-id/simple-crypto-js.svg)](https://www.npmjs.com/package/simple-crypto-js?activeTab=dependencies)

[![NPM Version](https://img.shields.io/npm/v/simple-crypto-js.svg)](https://www.npmjs.com/package/simple-crypto-js?activeTab=versions)
[![License](https://img.shields.io/npm/l/simple-crypto-js.svg)](#license)
[![Monthly Downloads](https://img.shields.io/npm/dm/simple-crypto-js.svg)](https://www.npmjs.com/package/simple-crypto-js)

**_SimpleCrypto_** is a JavaScript library that simplify the process of encryption and decryption of JavaScript objects, as simple as just calling `encrypt()` and `decrypt()` function. This library implements brix's [crypto-js](https://github.com/brix/crypto-js) library. This library is pure JavaScript library built with TypeScript targeting CommonJS ECMAScript 5 (ES5), so it is compatible with most NodeJS back-end applications or JavaScript front-end (client browser).

## List of Contents

* [SimpleCrypto 2.0.2](#simplecrypto-201)
  * [List of Contents](#list-of-contents)
  * [Changes Log (What's New)](#changes-log-whats-new)
  * [Getting Started](#getting-started)
    * [Installation](#installation)
  * [Documentation](#documentation)
    * [SimpleCrypto Class](#simplecrypto-class)
    * [Using `encrypt()` and `decrypt()`](#using-encrypt-and-decrypt)
    * [Working on Multiple Instances](#working-on-multiple-instances)
    * [Change the Secret Key](#change-the-secret-key)
    * [Object Encryption](#object-encryption)
    * [Random Key Generator](#random-key-generator)
  * [Built With](#built-with)
  * [Contribution](#contribution)
  * [Versioning](#versioning)
  * [Authors](#authors)
  * [License](#license)
  * [Acknowledgments](#acknowledgments)

## Changes Log (What's New)

**What's New in 2.0.2**

* Bugs fixed

**Included from 2.0.1**

* Add coverage service

**Included from 2.0.0**

* Using only these functions to encrypt or decrypt: `encrypt()` and `decrypt()` (accepts string, object, number, or boolean data type). Function `encryptObject()` and `decryptObject()` is in deprecation as these functions are enough.
* Securing instance's properties from public access. Access to instance properties, like `instance.secret`, is not allowed anymore.
* New TypeScript definition file of this library is now available.
* Fixed documentation (typos, diction, etc).
* For contributor: Using `mocha`, `chai` and `coveralls` to create full unit-testing of the library. You could see testing result on top of this README.
* For contributor: Using `gulp` to compile the TypeScript source code into JavaScript ES5.

## Getting Started

This library is availabe through package manager ([npm](https://www.npmjs.org/) and [yarn](https://www.yarnpkg.com/)) and through [CDN](https://cdn.jsdelivr.net/npm/simple-crypto-js@2.0.2/src/SimpleCrypto.js).

### Installation

To get this library included on your project, first, you can use package manager like [npm](https://www.npmjs.org/) or [yarn](https://www.yarnpkg.com/) command to get **_SimpleCrypto_**.

```bash
# If you're using NPM
npm install --save simple-crypto-js

# If you're using Yarn
yarn add simple-crypto-js
```

Then, include **_SimpleCrypto_** your project. If you are using the new ECMAScript 6 (ECMAScript 2015) and later, you may use the new import statement:

```javascript
// ES6 and later
import SimpleCrypto from "simple-crypto-js";
```

However, if you are using ECMAScript 5 and older, use the require statement:

```javascript
// ES5 and older
var SimpleCrypto = require("simple-crypto-js").default;
```

## Documentation

**_SimpleCrypto_** has a single class with only two instance's functions and a single static function. This is by intention to keep it's simplicity. This is full documentation about the library and how to use it on your project. All examples work on both ECMAScript 6 (and later) and ECMAScript 5 (and older).

### SimpleCrypto Class

List of **_SimpleCrypto_** constructor parameter.

| Parameter | Type     | Information                                                                                                           | Default     |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------- | ----------- |
| _secret_  | required | The secret string (key or password) that will be used to create the secret key for encryption and decryption process. | _undefined_ |

List of **_SimpleCrypto_** instance's properties.

| Property       | Information                                                                                                                    | Default     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| \__secret_     | Contains the secret string (key or password) that will be used to create the secret key for encryption and decryption process. | _undefined_ |
| \__keySize_    | Contains a number that represent the size of the secret key.                                                                   | 256         |
| \__iterations_ | Contains a number that represent the number of iterations done to create the secret key.                                       | 100         |

List of **_SimpleCrypto_** functions.

| Functions                                                     | Information                                                                            | Parameter                                                                                                                                                                                                                                                                                                                                             | Return                                                                                                           |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| _static_ **generateRandom()**                                 | Generate a random string based on the key length.                                      | _length_: number (optional) - The length of key used to generating random. (default: `128`) </br> _expectsWordArray_: boolean (optional) - If set to `true`, this function will return a `CryptoJS.WordArray` instance instead of string. (default: `false`)                                                                                          | _random_: string - Generated random key.                                                                         |
| **encrypt()**                                                 | Encrypt data.                                                                          | **data**: object/string/number/boolean - The data to be encrypted.                                                                                                                                                                                                                                                                                    | _ciphered_: string - Ciphered data.                                                                              |
| **decrypt()**                                                 | Decrypt ciphered data.                                                                 | **ciphered**: string - Ciphered data to be decrypted. </br> _expectsObject_: boolean (optional) - If set to `true`, this function will return an object instead of string. Set to `true` if decrypted data is expected as object. (default: `false`) </br> _enc_: string (optional) - Encoding method used to bring the data back. (default: `UTF-8`) | _data_: string/object - The decrypted data (it might be string or object, depends on `expectsObject` parameter). |
| _deprecation_ **encryptObject()**</br>use `encrypt()` instead | Encrypt JavaScript object literal.                                                     | **object**: object - The object to be enrypted.                                                                                                                                                                                                                                                                                                       | _ciphered_: string - Ciphered data.                                                                              |
| _deprecation_ **decryptObject()**</br>use `decrypt()` instead | Decrypt ciphered data that is expected as object and turn it back into object literal. | **ciphered**: string - Ciphered data to be decrypted. </br> _enc_: string (optional) - Encoding method used to bring the data back. (default: `UTF-8`)                                                                                                                                                                                                | _object_: object - The decrypted object.                                                                         |
| **setSecret()** | Change the secret of the instance. | **secret**: string - The new secret string.                                                                                                                                                                                                 | _void_                                                                        |

Note:

1.  Function marked with _static_ indicating a static function.
2.  Function marked with _deprecation_ indicating deprecated function that still can be used. However, it would be deprecated (and fully gone) in future version.
3.  Function marked with _deprecated_ indicating deprecated function that has been removed in this version of release.
4.  The rest (not marked with anything) are normal instance's functions.

### Using `encrypt()` and `decrypt()`

To use **_SimpleCrypto_**, first create a **_SimpleCrypto_** instance with a secret key (password). Secret key parameter **MUST be defined** when creating a **_SimpleCrypto_** instance.

To encrypt and decrypt data, simply use `encrypt()` and `decrypt()` function from an instance. This will use AES-CBC encryption algorithm.

```javascript
// If you would like to generate a random unique key, you may use static function generateRandom() like so
// var _secretKey = SimpleCrypto.generateRandom();
// You may also set the strength of the random key, as example 256 (default is 128);
// var _secretKey = SimpleCrypto.generateRandom(256);
// Or just defined the key by yourself (key is must!)
var _secretKey = "some-unique-key";

var simpleCrypto = new SimpleCrypto(_secretKey);

var plainText = "Hello World!";
var chiperText = simpleCrypto.encrypt(plainText);
console.log("Encryption process...");
console.log("Plain Text    : " + plainText);
console.log("Cipher Text   : " + cipherText);
var decipherText = simpleCrypto.decrypt(cipherText);
console.log("... and then decryption...");
console.log("Decipher Text : " + decipherText);
console.log("... done.");
```

### Working on Multiple Instances

You could also perform the encryption and decryption process using different **_SimpleCrypto_** instances, **PROVIDED THAT the secret key ARE STAY THE SAME between the instances**. For example:

```javascript
var _secretKey = "some-unique-key";
var simpleCrypto1 = new SimpleCrypto(_secretKey);
var simpleCrypto2 = new SimpleCrypto(_secretKey);

var plainText = "Hello World!";
// Encryption using the first instance (simpleCrypto1)
var chiperText = simpleCrypto1.encrypt(plainText);
console.log("Encryption process...");
console.log("Plain Text    : " + plainText);
console.log("Cipher Text   : " + cipherText);
// Decyption using the second instance (simpleCrypto2)
var decipherText = simpleCrypto2.decrypt(cipherText);
console.log("... and then decryption...");
console.log("Decipher Text : " + decipherText);
console.log("... done.");
```

### Change the Secret Key

If you want to change the secret key of a **_SimpleCrypto_** instance, call the `setSecret()` function with the new secret as paramter.

```javascript
var simpleCrypto = new SimpleCrypto("some-unique-key");
simpleCrypto.setSecret("new-more-unique-key");
```

On version 1.1.1 and before, you may programmatically get and set the secret using it's `secret` property. However, since version 2.0, direct access to instance's properties are deprecated. You can't get the `secret` property programmatically, but still allowed to re-set the secret using the `setSecret()` function.

### Object Encryption

Encryption and decryption of JavaScript object literal has never been simpler than this. 

To encrypt and decrypt JavaScript object literal, simply use `encrypt()` and `decrypt()` function from an instance. This will use AES-CBC encryption algorithm.


```javascript
var _secretKey = SimpleCrypto.generateRandom();
var simpleCrypto = new SimpleCrypto(_secretKey);

var object = {
  SimpleCrypto: "is great.",
  You: "should try it!"
};
var encrypted = simpleCrypto.encrypt(plainObject);
console.log("Encryption process...");
console.log("Plain Object     : " + plainObject);
console.log("Encrypted Object : " + encrypted);
// Set the second paramter to true, then it will return object instead of string
var decrypted = simpleCrypto.decrypt(encrypted, true);
console.log("... and then decryption...");
console.log("Decrypted object : " + decrypted);
console.log("... done.");
```

On version 1.1.1 and before, you might have use `encryptObject()` and `decryptObject()` function. In version 2.0, this function is in `deprecation` and soon would be gone in future release. This is because our goal is to keep the simplicity and a single function is enough to do encryption or decryption process.

### Random Key Generator

Anywhere, after importing **_SimpleCrypto_**, you may use static function `generateRandom()` to produce a random key based on the length of key you have provided on the parameter (default is `128`).

```javascript
var randomString = SimpleCrypto.generateRandom();
var randomStringCustomKey = SimpleCrypto.generateRandom(256);
```

Yes, and of course it is obvious, because it is a static function, you are not required to create any SimpleCrypto instances.

## Built With

Written in [TypeScript](https://typscriptlang.org/), built into ECMAScript 5.

## Contribution

To contribute, simply fork this project, and issue a pull request.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/danang-id/simple-crypto-js/tags).

## Authors

* **Danang Galuh Tegar Prasetyo** - _Initial work_ - [danang-id](https://github.com/danang-id)

See also the list of [contributors](https://github.com/danang-id/simple-crypto-js/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* This library was developed to support and simplify the [Secure Cookies](https://github.com/danang-id/secure-cookies) library.
* Made available by open source and of course brix's [crypto-js](https://github.com/brix/crypto-js) library
