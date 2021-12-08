# SimpleCrypto

[![GitHub Release](https://img.shields.io/github/release/danang-id/simple-crypto-js.svg)](https://github.com/danang-id/simple-crypto-js/releases)
[![Build Distribution](https://github.com/danang-id/simple-crypto-js/actions/workflows/build-distribution.yml/badge.svg)](https://github.com/danang-id/simple-crypto-js/actions/workflows/build-distribution.yml)
[![Coverage Status](https://coveralls.io/repos/github/danang-id/simple-crypto-js/badge.svg?branch=master)](https://coveralls.io/github/danang-id/simple-crypto-js?branch=master)
[![Dependencies Status](https://img.shields.io/librariesio/release/npm/simple-crypto-js/legacy.svg)](https://www.npmjs.com/package/simple-crypto-js/v/legacy?activeTab=dependencies)

[![NPM Version](https://img.shields.io/npm/v/simple-crypto-js/legacy.svg)](https://www.npmjs.com/package/simple-crypto-js/v/legacy)
[![License](https://img.shields.io/npm/l/simple-crypto-js.svg)](#license)
[![Monthly Downloads](https://img.shields.io/npm/dm/simple-crypto-js/legacy.svg)](https://www.npmjs.com/package/simple-crypto-js/v/legacy)

**_SimpleCrypto_** is a JavaScript library that simplify the process of encryption and decryption of JavaScript objects, as simple as just calling `encrypt()` and `decrypt()` function. This library implements brix's [crypto-js](https://github.com/brix/crypto-js) library. This library is pure JavaScript library built with TypeScript targeting CommonJS ECMAScript 5 (ES5), so it is compatible with most NodeJS back-end applications or JavaScript front-end (client browser).

## Breaking Changes

**v2.3.0: New Algorithm**

SimpleCrypto v2.3.0 onward will use a new algorithm, because the older one was vulnerable to chosen cipher attack. Any **data that encrypted using v2.2.0 and earlier will NOT be able to be decrypted using v2.3.0 onward**; vice versa: data encrypted using v2.3.0 onward will NOT be able to be decrypted using v2.2.0 and earlier.

## Getting Started

This library is available through [jsDelivr CDN](https://cdn.jsdelivr.net/npm/simple-crypto-js@legacy/dist/SimpleCrypto.min.js) and package manager (like [npm](https://www.npmjs.org/) or [yarn](https://www.yarnpkg.com/)).

### Vanilla JavaScript + HTML

To get started, add SimpleCrypto script to your HTML page. **Only legacy version of SimpleCrypto is supported.**

```html
<head>
    <!-- Another line -->
    <script src="//cdn.jsdelivr.net/npm/simple-crypto-js@legacy/dist/SimpleCrypto.min.js"></script>
    <!-- Another line -->
</head>
```

Then, your script section, you may use `SimpleCrypto` as Class to create a new SimpleCrypto instance.

```html
<body>
    <!-- Another line -->
    <script lang="js">
        var simpleCrypto = new SimpleCrypto("a very secret key")
        <!-- Do your cryptographic logic here  -->
    </script>
    <!-- Another line -->
</body>
```

### NodeJS

If you are using NodeJS, add `simple-crypto-js` as your project dependency.

```bash
# If you're using NPM
npm install --save simple-crypto-js

# If you're using Yarn
yarn add simple-crypto-js
```

Then, include **_SimpleCrypto_** your project.

```javascript
var SimpleCrypto = require("simple-crypto-js").default
```

If you are using Babel or TypeScript that support import statement, you could go that way.

```javascript
import SimpleCrypto from "simple-crypto-js"
```

## Documentation

**_SimpleCrypto_** has a very few and simple functions, but powerful. The ful list of all APIs and how to use those APIs are [available here](https://simplecrypto.js.org/docs/SimpleCrypto.html).

## Examples

All these examples work on ECMAScript 5 or newer.

### Using `encrypt()` and `decrypt()`

To use **_SimpleCrypto_**, first create a **_SimpleCrypto_** instance with a secret key (password). Secret key parameter **MUST be defined** when creating a **_SimpleCrypto_** instance.

To encrypt and decrypt data, simply use `encrypt()` and `decrypt()` function from an instance. This will use AES-CBC encryption algorithm.

```javascript
// If you would like to generate a random unique key, you may use static function generateRandom() like so
// const _secretKey = SimpleCrypto.generateRandom()
// You may also set the strength of the random key, as example 256 (default is 128)
// const _secretKey = SimpleCrypto.generateRandom(256)
// Or just defined the key by yourself (key is must!)
const secretKey = "some-unique-key"

const simpleCrypto = new SimpleCrypto(secretKey)

const plainText = "Hello World!"
const cipherText = simpleCrypto.encrypt(plainText)
console.log("Encryption process...")
console.log("Plain Text    : " + plainText)
console.log("Cipher Text   : " + cipherText)
const decipherText = simpleCrypto.decrypt(cipherText)
console.log("... and then decryption...")
console.log("Decipher Text : " + decipherText)
console.log("... done.")
```

### Working on Multiple Instances

You could also perform the encryption and decryption process using different **_SimpleCrypto_** instances, **PROVIDED THAT the secret key ARE STAY THE SAME between the instances**. For example:

```javascript
const secretKey = "some-unique-key"
const anotherSecretKey = "another-unique-key"
const simpleCrypto1 = new SimpleCrypto(secretKey)
const simpleCrypto2 = new SimpleCrypto(secretKey)

const plainText = "Hello World!"
// Encryption using the first instance (simpleCrypto1)
const cipherText = simpleCrypto1.encrypt(plainText)
console.log("Encryption process...")
console.log("Plain Text    : " + plainText)
console.log("Cipher Text   : " + cipherText)
// Decryption using the second instance (simpleCrypto2)
const decipherText = simpleCrypto2.decrypt(cipherText)
console.log("... and then decryption...")
console.log("Decipher Text : " + decipherText)
console.log("... done.")
// Decryption using DIFFERENT secret key
const failedDecipheredText = simpleCrypto2.setSecret(anotherSecretKey)
    .decrypt(cipherText) // Will FAIL because of different secretKey
```

### Updating or Appending Plain Data/Cipher Text

With SimpleCrypto version 2.4.0 onward, you are now able to update or append the data buffer, before you start the encryption or decryption process.

```javascript
const secretKey = "some-unique-key"
const simpleCrypto = new SimpleCrypto(secretKey)

const greeting = "Hello!"
const plainText = "SimpleCrypto is great."
// Calls update() will change the data buffer entirely
simpleCrypto.update(greeting) // dataBuffer = "Hello!"
// Calls append() to append the data buffer 
simpleCrypto.append(" ") // dataBuffer = "Hello! "
simpleCrypto.append(plainText) // dataBuffer = "Hello! SimpleCrypto is great."
// Finally calls encrypt() to do the encryption
const cipherText = simpleCrypto.encrypt()
console.log("Encryption process...")
console.log("Plain Text    : " + plainText)
console.log("Cipher Text   : " + cipherText)

// Cut the cipherText string into to tow pieces
const halfLength = Math.ceil(cipherText.length / 2)
const cipherTexts = [ cipherText.substr(0, halfLength), cipherText.substr(halfLength) ]
// Instead calling the append() and update() one by one, you call also linking call it.
const decipherText = simpleCrypto.update(cipherTexts[0])
    .append(cipherTexts[1])
    .decrypt()
console.log("... and then decryption...")
console.log("Decipher Text : " + decipherText)
console.log("... done.")
```

### Change the Secret Key

If you want to change the secret key of a **_SimpleCrypto_** instance, call the `setSecret()` function with the new secret as parameter.

```javascript
const simpleCrypto = new SimpleCrypto("some-unique-key")
simpleCrypto.setSecret("new-more-unique-key")
```

### Object, String, Number and Boolean Encryption

Encryption and decryption in JavaScript has never been simpler than this. 

Simply use `encrypt()` and `decrypt()` functions from an instance, and it will transform your data to its proper type, back and forth without hassle.

```javascript
const _secretKey = SimpleCrypto.generateRandom()
const simpleCrypto = new SimpleCrypto(_secretKey)

const plainObject = {
  SimpleCrypto: "is great.",
  You: "should try it!"
}
const plainString = "Hello from SimpleCrypto!"
const plainNumber = 65347
const plainBoolean = false
const encryptedObject = simpleCrypto.encrypt(plainObject)
const encryptedString = simpleCrypto.encrypt(plainString)
const encryptedNumber = simpleCrypto.encrypt(plainNumber)
const encryptedBoolean = simpleCrypto.encrypt(plainBoolean)
console.log("Plain Object     : " + plainObject)
console.log("Encrypted Object : " + encryptedObject)
console.log("Plain String     : " + plainString)
console.log("Encrypted String : " + encryptedString)
console.log("Plain Number     : " + plainNumber)
console.log("Encrypted Number : " + encryptedNumber)
console.log("Plain Boolean    : " + plainBoolean)
console.log("Encrypted Boolean: " + encryptedBoolean)
// decrypt() function will automatically detects and returns data with the proper data type
const decryptedObject = simpleCrypto.decrypt(encryptedObject) 
const decryptedString = simpleCrypto.decrypt(encryptedString) 
const decryptedNumber = simpleCrypto.decrypt(encryptedNumber) 
const decryptedBoolean = simpleCrypto.decrypt(encryptedBoolean) 
console.log("Decrypted Object : " + decryptedObject)
console.log("Type of Object   : " + typeof decryptedObject) // "object"
console.log("Decrypted String : " + decryptedString)
console.log("Type of String   : " + typeof decryptedString) // "string"
console.log("Decrypted Number : " + decryptedNumber)
console.log("Type of Number   : " + typeof decryptedNumber) // "number"
console.log("Decrypted Boolean : " + decryptedBoolean)
console.log("Type of Boolean   : " + typeof decryptedBoolean) // "boolean"
```

Prior to version 2.0.0, you may use `encryptObject()` and `decryptObject()` function. These functions are in `deprecation` and soon would be gone in future release. 

### Random Generator

Anywhere, after importing **_SimpleCrypto_**, you may use static function `generateRandom()`, `generateRandomString()`, or `generateRandomWordArray()` to produce a random based on the length you have provided on the parameter (default is `128`). This is useful if you would like to provide a random key. 

```javascript
const random = SimpleCrypto.generateRandom()
const randomCustomLength = SimpleCrypto.generateRandom(256)
const randomWordArrayCustomLength = SimpleCrypto.generateRandom(256, true)
```
Yes, and of course it is obvious, because it is a static function, you are not required to create any SimpleCrypto instances.
