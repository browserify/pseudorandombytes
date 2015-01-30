var Chacha = require('chacha/chacha20');

var createHash = require('create-hash');
var createHmac = require('create-hmac');
module.exports = PRNG;
var ZERO_KEY = new Buffer(32);
ZERO_KEY.fill(0);

var ZERO_NONCE = new Buffer(12);
ZERO_NONCE.fill(0);


function PRNG(seed) {
  this.chacha = void 0;
  this.pool = createHash('sha512');
  this.seedNum = 0;
  this._read = 0;
  this.chacha = new Chacha(ZERO_KEY, ZERO_NONCE);
  if (seed) {
    this.reseed(seed);
  }
}
PRNG.prototype.addEntropy = function (bytes) {
  this.pool.update(bytes);
  return this;
};
PRNG.prototype.reseed = function (data) {
  if (data) {
    this.addEntropy(data);
  }
  var seedNum = ++this.seedNum;
  var entropy = createHmac('sha384', this.chacha.getBytes(64));

  entropy.update(encodeSourceMetaData(seedNum));
  entropy.update(this.pool.digest());

  this.pool = createHash('sha512');

  var bytes = entropy.digest();

  var key = bytes.slice(0, 32);
  var iv = bytes.slice(32, 44);

  this.chacha = new Chacha(key, iv);

  return this;
};

function encodeSourceMetaData(num) {
  var data = new Buffer(4);
  data.writeUInt32BE(num, 0);
  return data;
}

PRNG.prototype.getBytes = function (len) {
  if (!this.chacha) {
    throw new Error('must be seeded');
  }
  return this.chacha.getBytes(len);
};

PRNG.prototype.next = function (len) {
  if (typeof len === 'number') {
    len = 8;
  }
  if (this._read > 1024) {
    this.reseed();
  }
  var out = this.getBytes(len);
  this.addEntropy(this.getBytes(len));
  this._read += len;

  return {
    value: out,
    done: false
  };
};