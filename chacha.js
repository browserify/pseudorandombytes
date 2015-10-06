function ROTATE(v, c) {
  return (v << c) | (v >>> (32 - c));
}
var createHash = require('create-hash');
function createU32(buf) {
  var u8 = new Uint8Array(buf);
  return new Uint32Array(u8.buffer);
}
function createState(buf) {
  return createU32(createHash('sha512').update(buf).digest());
}
module.exports = Chacha20;
function Chacha20(key) {
  this.input = createState(key);

  this.cachePos = 64;
  this.buffer = new Uint32Array(16);
  this.output = new Buffer(64);
}

function quarterRound(x, a, b, c, d) {
  x[a] += x[b]; x[d] = ROTATE(x[d] ^ x[a], 16);
  x[c] += x[d]; x[b] = ROTATE(x[b] ^ x[c], 12);
  x[a] += x[b]; x[d] = ROTATE(x[d] ^ x[a],  8);
  x[c] += x[d]; x[b] = ROTATE(x[b] ^ x[c],  7);
}
Chacha20.prototype.makeBlock = function (output, start) {
  var i = -1;
  // copy input into working buffer
  while (++i < 16) {
    this.buffer[i] = this.input[i];
  }
  i = -1;
  while (++i < 10) {
    // straight round
    quarterRound(this.buffer, 0, 4, 8,12);
    quarterRound(this.buffer, 1, 5, 9,13);
    quarterRound(this.buffer, 2, 6, 10,14);
    quarterRound(this.buffer, 3, 7, 11,15);


    //diaganle round
    quarterRound(this.buffer, 0, 5,10,15);
    quarterRound(this.buffer, 1, 6,11,12);
    quarterRound(this.buffer, 2, 7, 8,13);
    quarterRound(this.buffer, 3, 4, 9,14);
  }
  i = -1;
  // copy working buffer into output
  while (++i < 16) {
    this.buffer[i] += this.input[i];
    output.writeUInt32LE(this.buffer[i], start);
    start += 4;
  }

  this.input[12]++;
};
Chacha20.prototype.getBytes = function(len) {
  var dpos = 0;
  var dst = new Buffer(len);
  var cacheLen = 64 - this.cachePos;
  if (cacheLen) {
    if (cacheLen >= len) {
      this.output.copy(dst, 0, this.cachePos, 64);
      this.cachePos += len;
      return dst;
    } else {
      this.output.copy(dst, 0, this.cachePos, 64);
      len -= cacheLen;
      dpos += cacheLen;
      this.cachePos = 64;
    }
  }
  while (len > 0 ) {
    if (len <= 64) {
      this.makeBlock(this.output, 0);
      this.output.copy(dst, dpos, 0, len);
      if (len < 64) {
        this.cachePos = len;
      }
      return dst;
    } else {
      this.makeBlock(dst, dpos);
    }
    len -= 64;
    dpos += 64;
  }
  throw new Error('something bad happended');
};
