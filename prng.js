var Chacha = require('chacha/chacha20');
var randomBytes = require('randombytes');
var maxInt = Math.pow(2, 32);
module.exports = PRNG;
function PRNG() {
  this.bytes = void 0;
  this.chacha = void 0;
  this.seed();
}
PRNG.prototype.seed = function () {
  this.chacha = new Chacha(randomBytes(32), randomBytes(12));
  this.bytes = 0;
};

PRNG.prototype.checkReseed = function (len) {
  if ((this.bytes + len) >= maxInt) {
    this.seed();
  }
};

PRNG.prototype.getBytes = function (len) {
  this.checkReseed();
  this.bytes += len;
  return this.chacha.getBytes(len);
};