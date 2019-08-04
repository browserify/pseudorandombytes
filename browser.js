'use strict'
var randombytes = require('randombytes')
var XorShift128Plus = require('xorshift.js').XorShift128Plus

try {
  randombytes(8)
  module.exports = randombytes
} catch (err) {
  var seed = []
  seed[0] = (Math.random() * 0xffffffff) >>> 0
  seed[1] = Date.now() >>> 0
  seed[2] = (seed[0] * seed[1]) >>> 0
  seed[3] = (seed[0] + seed[1]) >>> 0

  var prng = new XorShift128Plus(seed)
  prng.randomBytes(160) // prevent bad seed

  module.exports = function (size) { return prng.randomBytes(size) }
}
