'use strict'
var test = require('tape')
var proxyquire = require('proxyquire')

test('uses crypto.pseudoRandomBytes', function (t) {
  var pseudoRandomBytes = proxyquire('../index', {
    crypto: {
      pseudoRandomBytes: function () { throw new Error('special error') }
    }
  })
  t.throws(function () {
    pseudoRandomBytes(10)
  }, /^Error: special error$/)
  t.end()
})
