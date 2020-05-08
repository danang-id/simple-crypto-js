## Changes Log (What's New)

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
