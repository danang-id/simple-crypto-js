# SimpleCrypto

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

* [SimpleCrypto](#simplecrypto)
  * [List of Contents](#list-of-contents)
  * [What's New?](#whats-new)
  * [Getting Started](#getting-started)
  * [How to Use SimpleCrypto](#how-to-use-simplecrypto)
  * [Built With](#built-with)
  * [Contribution](#contribution)
  * [Version Management](#version-management)
  * [Authors](#authors)
  * [License](#license)
  * [Acknowledgments](#acknowledgments)

## What's New?

**What's New in 2.4.0**

* Added data type detection. Decryption process will now return data with its proper data type. For now, object, string, number and boolean are supported.
* Added `append()` and `update()` functions, both to append and update the data buffer respectively.
* Added overload functions for `decrpyt()` and `encrypt()`.
* Added initial support for encoding (see static variable `SimpleCrypto.encoders`). However, for now, it only supports UTF-8 even if you set another encoder.
* Added chaining functions support. Functions that initially have no return, like `append()`, `update()`, `setSecret()`, `setEncoder()`, now will returning its instance.
* Added static function `SimpleCrypto.generateRandomString()` and `SimpleCrypto.generateRandomWordArray()`.

For full change-log, please refer to [CHANGELOG](CHANGELOG.md) file.

## Getting Started

This library is available through package manager ([npm](https://www.npmjs.org/) and [yarn](https://www.yarnpkg.com/)) and through [jsDelivr CDN](https://cdn.jsdelivr.net/npm/simple-crypto-js@latest/dist/SimpleCrypto.min.js).

```bash
# If you're using NPM
npm install --save simple-crypto-js

# If you're using Yarn
yarn add simple-crypto-js
```

Then, include **_SimpleCrypto_** your project. If you are using the new ECMAScript 6 (ECMAScript 2015) and later, you may use the new import statement:

```javascript
// ES6 and later
import SimpleCrypto from "simple-crypto-js"
```

However, if you are using ECMAScript 5 and older, use the require statement:

```javascript
// ES5 and older
var SimpleCrypto = require("simple-crypto-js").default
```

## How to Use SimpleCrypto

Full documentation about **_SimpleCrypto_** API is [available here](docs).

## Built With

Written in [TypeScript](https://typscriptlang.org/), built into ECMAScript 5 using the TypeScript compiler and webpack bundler.

## Contribution

To contribute, simply fork this project, and issue a pull request. However, before issuing a pull request, you have to make sure that your changes will not break current API, its parameter and its expected output.

You may test your changes by running the test script.

```bash
npm run test
```

If all tests were passed, you are good to go.

## Version Management

We use [Semantic Versioning](http://semver.org/) for version management. For the versions available, see the [tags on this repository](https://github.com/danang-id/simple-crypto-js/tags).

## Authors

* **Danang Galuh Tegar Prasetyo** - _Initial work_ - [danang-id](https://github.com/danang-id)

See also the list of [contributors](https://github.com/danang-id/simple-crypto-js/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

## Acknowledgments

* This library was developed to support and simplify the [Secure Cookies](https://github.com/danang-id/secure-cookies) library.
* Made available by open source and of course brix's [crypto-js](https://github.com/brix/crypto-js) library
