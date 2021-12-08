## Changes Log (What's New)

Latest Current: [![Latest Version](https://img.shields.io/npm/v/simple-crypto-js/latest.svg)](https://www.npmjs.com/package/simple-crypto-js)
Latest Legacy: [![Legacy Version](https://img.shields.io/npm/v/simple-crypto-js/legacy.svg)](https://www.npmjs.com/package/simple-crypto-js/v/legacy)

**What's New in 3.0.1 (latest current)**

* Upgrade `crypto-js` dependency to version `4.1.1`.
* Improving typings.
* Add eslint and prettier for code cleaning.
* Upgrade devDependencies.

**What's New in 2.5.1 (latest legacy)**

* Improving typings.
* Add eslint and prettier for code cleaning.
* Upgrade devDependencies.

**What's New in 3.0.0**

* Upgrade `crypto-js` dependency to version `4.0.0`. This version of `crypto-js` replaces `Math.random()` method with native crypto module, and will cause breaking changes in some environments that does not support native crypto module, like IE 10 earlier and React Native. If you are affected by these changes, please use SimpleCrypto `^2.5.0`.

**What's New in 2.5.0**

* As the same with `2.4.1`, but rollback `crypto-js` dependency to version `3.3.0` to maintain compatibility with environment that does not support native crypto module.

**What's New in 2.4.2**

* Removed empty string check to allow decryption and encryption on empty string (as suggested by [@TransmissionsDev](https://github.com/TransmissionsDev) on [issue#21](https://github.com/danang-id/simple-crypto-js/issues/21)).

**What's New in 2.4.1**

* Fix a bug on type detection mechanism where a string that begins with number detected as number when decryption, thus cutting the rest of the string result (thanks [@TransmissionsDev](https://github.com/TransmissionsDev)).

**What's New in 2.4.0**

* Added data type detection. Decryption process will now return data with its proper data type. For now, object, string, number and boolean are supported.
* Added `append()` and `update()` functions, both to append and update the data buffer respectively.
* Added overload functions for `decrpyt()` and `encrypt()`.
* Added initial support for encoding (see static variable `SimpleCrypto.encoders`). However, for now, it only supports UTF-8 even if you set another encoder.
* Added chaining functions support. Functions that initially have no return, like `append()`, `update()`, `setSecret()`, `setEncoder()`, now will returning its instance.
* Added static function `SimpleCrypto.generateRandomString()` and `SimpleCrypto.generateRandomWordArray()`.

**What's New in 2.3.1**

* Fix npm dependencies security audit.

**What's New in 2.3.0**

* Fix chosen cipher text attacks vulnerability (thanks [@paragonie-scott](https://github.com/paragonie-scott) and [@adi928](https://github.com/adi928)).
* Upgrade [crypto-js](https://github.com/brix/crypto-js) to version 4.0.0.
* Fix security risk in dev dependencies by upgrading them.

**What's New in 2.2.0**

* Fix CDN release, setting webpack output as UMD with default library name of SimpleCrypto.
* CDN now have two files you may use, the distribution file and minified distribution one.

**What's New in 2.1.3**

* Fix jsDelivr link

**What's New in 2.1.2**

* Update missing file in NPM release.

**What's New in 2.1.0**

* Update dependency.
* Fix missing web bundler as distribution build tool for the Web (using webpack).
* Use of partial import instead of full import to minimise the size of distributed build file .

**What's New in 2.0.2**

* Bugs fixed.
* Remove gulp.

**What's New in 2.0.1**

* Add coverage service.

**What's New in 2.0.0**

* Using only these functions to encrypt or decrypt: `encrypt()` and `decrypt()` (accepts string, object, number, or boolean data type). Function `encryptObject()` and `decryptObject()` is in deprecation as these functions are enough.
* Securing instance's properties from public access. Access to instance properties, like `instance.secret`, is not allowed anymore.
* New TypeScript definition file of this library is now available.
* Fixed documentation (typos, diction, etc).
* For contributors: Using `mocha`, `chai` and `coveralls` to create full unit-testing of the library. You could see testing result on top of this README.
* For contributors: Using `gulp` to compile the TypeScript source code into JavaScript ES5.

**What's New in 1.0.0**

* Initial release
