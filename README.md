# pseudoRandomBytes

[![NPM Package](https://img.shields.io/npm/v/pseudorandombytes.svg?style=flat-square)](https://www.npmjs.org/package/pseudorandombytes)
[![Build Status](https://img.shields.io/travis/crypto-browserify/pseudorandombytes.svg?branch=master&style=flat-square)](https://travis-ci.org/crypto-browserify/pseudorandombytes)
[![Dependency status](https://img.shields.io/david/crypto-browserify/pseudorandombytes.svg?style=flat-square)](https://david-dm.org/crypto-browserify/pseudorandombytes#info=dependencies)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

`crypto.pseudoRandomBytes` but for use with browserify. In node it just returns `crypto.pseudoRandomBytes` but in the browser it uses  [crypto-browserify/randombytes](https://github.com/crypto-browserify/randombytes) if available else it seeds a [XorShift128Plus from xorshift.js](http://github.com/fanatid/xorshift.js).

## Example

```js
var pseudoRandomBytes = require('pseudorandomBbytes')
var bytes = pseudoRandomBytes(34)
```

To be clear there is no legitimate reason for you ever to want to use this.

# The algorithms used in this module are **NOT** suitable for cryptographical usage.
