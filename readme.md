pseudoRandomBytes
===

crypto.pseudoRandomBytes but for use with browserify.  In node it just returns crypto.pseudoRandomBytes but in the browser it uses window.crypto.getRandomValues (via [crypto-browserify/randombytes](https://github.com/crypto-browserify/randombytes)) to generate a random key and iv for [chacha20poly1305](https://github.com/calvinmetcalf/chacha20poly1305) which is used as a prng. It is reseeded in the same manner before the counter is exhausted.

To use:
====

```js
var pseudoRandomBytes = require('pseudorandomBbytes');

var bytes = pseudoRandomBytes(34);
```


To be clear there is no legitimate reason for you ever to want to use this.
