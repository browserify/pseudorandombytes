pseudoRandomBytes
===

crypto.pseudoRandomBytes but for use with browserify.  In node it just returns crypto.pseudoRandomBytes but in the browser it uses  [crypto-browserify/randombytes](https://github.com/crypto-browserify/randombytes) if available else it seeds a prng based on [chacha20poly1305](https://github.com/calvinmetcalf/chacha20poly1305).

To use:
====

```js
var pseudoRandomBytes = require('pseudorandomBbytes');

var bytes = pseudoRandomBytes(34);
```

To be clear there is no legitimate reason for you ever to want to use this.

# The algorithms used in this module are **NOT** suitable for cryptographical usage. 
