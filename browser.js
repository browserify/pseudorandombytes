var PRNG = require('./prng');
var randomBytes = require('randombytes');
var prng = new PRNG(randomBytes(64));

module.exports = psudoRandomBytes;
function psudoRandomBytes(len) {
  return prng.next(len).value;
}