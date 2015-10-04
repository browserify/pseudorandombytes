var PRNG = require('./prng');

var prng = new PRNG(function () {
  return (Math.random().toString() + Date.now().toString());
});

module.exports = psudoRandomBytes;
function psudoRandomBytes(len) {
  return prng.getBytes(len);
}
