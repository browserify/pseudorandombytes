var ChaCha = require('./chacha');
var createHmac = require('create-hmac')
module.exports = PRNG;
function PRNG(seed, _maxInt) {
  this._seed = seed;
  this.chacha = new ChaCha(this._seed());
}
PRNG.prototype.seed = function () {
  var blendedSeed = createHmac('sha512', this.chacha.getBytes(64))
    .update(this._seed())
    .digest();
  this.chacha = new ChaCha(blendedSeed);
};
PRNG.prototype._seed = function () {
  throw new Error('you must impliment me');
};

PRNG.prototype.getBytes = function (len) {
  this.seed(len);
  return this.chacha.getBytes(len);
};
