var Chacha = require('chacha/chacha20');

var createHash = require('create-hash');
module.exports = PRNG;
function PRNG(seed) {
  this.chacha = void 0;
  this.nextBytes = void 0;
  if (seed) {
    this.seed(seed);
  }
}
PRNG.prototype.seed = function (bytes) {
  bytes = createHash('sha384').update(bytes).digest();
  var key = bytes.slice(0, 32);
  var iv = bytes.slice(32, 44);
  this.chacha = new Chacha(key, iv);
  this.nextBytes = this.chacha.getBytes(44);
};

PRNG.prototype.reseed = function () {
  this.seed(this.nextBytes);
};

PRNG.prototype.getBytes = function (len) {
  try {
    return this.chacha.getBytes(len);
  } catch(e) {
    if (e.message === 'counter is exausted') {
      this.reseed();
      return this.chacha.getBytes(len);
    }
    throw e;
  }
};