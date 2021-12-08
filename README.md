# SimpleCrypto

[![GitHub Release](https://img.shields.io/github/release/danang-id/simple-crypto-js.svg)](https://github.com/danang-id/simple-crypto-js/releases)
[![Build Distribution](https://github.com/danang-id/simple-crypto-js/actions/workflows/build-distribution.yml/badge.svg)](https://github.com/danang-id/simple-crypto-js/actions/workflows/build-distribution.yml)
[![Coverage Status](https://coveralls.io/repos/github/danang-id/simple-crypto-js/badge.svg?branch=master)](https://coveralls.io/github/danang-id/simple-crypto-js?branch=master)
[![Dependencies Status](https://img.shields.io/librariesio/release/npm/simple-crypto-js/latest.svg)](https://www.npmjs.com/package/simple-crypto-js?activeTab=dependencies)

[![NPM Version](https://img.shields.io/npm/v/simple-crypto-js/latest.svg)](https://www.npmjs.com/package/simple-crypto-js)
[![License](https://img.shields.io/npm/l/simple-crypto-js.svg)](#license)
[![Monthly Downloads](https://img.shields.io/npm/dm/simple-crypto-js.svg)](https://www.npmjs.com/package/simple-crypto-js)

**_SimpleCrypto_** is a JavaScript library that simplify the process of encryption and decryption of JavaScript objects, as simple as just calling `encrypt()` and `decrypt()` function. This library implements brix's [crypto-js](https://github.com/brix/crypto-js) library. This library is pure JavaScript library built with TypeScript targeting CommonJS ECMAScript 5 (ES5), so it is compatible with most NodeJS back-end applications or JavaScript front-end (client browser).

## Breaking Changes

**v2.3.0: New Algorithm**

SimpleCrypto v2.3.0 onward will use a new algorithm, because the older one was vulnerable to chosen cipher attack. Any **data that encrypted using v2.2.0 and earlier will NOT be able to be decrypted using v2.3.0 onward**; vice versa: data encrypted using v2.3.0 onward will NOT be able to be decrypted using v2.2.0 and earlier.

**v3.0.0: New Native Crypto Module**

SimpleCrypto v3.0.0 onward will use new `crypto-js` dependency version `^4.0.0`. This version of `crypto-js` replaces `Math.random()` method with native crypto module. Because of this, **SimpleCrypto might not be able to run on some environments without native crypto module support, such as IE 10 (and earlier) or React Native**.

Please [read more here](https://github.com/brix/crypto-js#400).

## List of Contents

* [SimpleCrypto](#simplecrypto)
    * [Breaking Changes](#breaking-changes)
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

**What's New in 3.0.1 (latest current)**

* Upgrade `crypto-js` dependency to version `4.1.1`.
* Improving typings.

**What's New in 2.5.1 (latest legacy)**

* Improving typings.

For full change-log, please refer to [CHANGELOG](CHANGELOG.md) file.

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

## How to Use SimpleCrypto

Full documentation about **_SimpleCrypto_** API is [available here](https://simplecrypto.js.org/docs).

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
