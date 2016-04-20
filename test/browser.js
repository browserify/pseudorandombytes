'use strict'
var test = require('tape')
var proxyquire = require('proxyquire')

test('uses randombytes', function (t) {
  var pseudoRandomBytes = proxyquire('../browser', {
    randombytes: function (x) { return x }
  })
  t.same(pseudoRandomBytes(10), 10)
  t.end()
})

test('uses xorshift.js', function (t) {
  var pseudoRandomBytes = proxyquire('../browser', {
    randombytes: function () { throw new Error('does not matter') },
    'xorshift.js': {
      XorShift128Plus: function () {
        return { randomBytes: function (x) { return x } }
      }
    }
  })
  t.same(pseudoRandomBytes(10), 10)
  t.end()
})
