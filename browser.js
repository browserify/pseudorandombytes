var PRNG = require('./prng');

var prng = new PRNG();

module.exports = psudoRandomBytes;
function psudoRandomBytes(len) {
  return prng.getBytes(len);
}