'use strict';

var PRNG = require('./prng');
var randombytes = require('randombytes');
try {
  randombytes(8);
  module.exports = randombytes;
} catch (e) {
  module.exports = psudoRandomBytes;
}
var prng = new PRNG(function () {
  return (Math.random().toString() + Date.now().toString());
});

function psudoRandomBytes(len) {
  return prng.getBytes(len);
}
