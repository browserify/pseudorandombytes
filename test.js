'use strict';
var spawn = require('child_process').spawn;

var child = spawn('ent', ['-b']);
var prng = require('./browser');
var Readable = require('stream').Readable;
var bytes = 1024 * 1024 * 1024;
var stream = new Readable();
var sofar = 0;
stream._read = function (num) {
  this.push(prng(num));
  sofar += num;
  if (sofar > bytes) {
    this.push(null);
  }
};
stream.pipe(child.stdin);
child.stdout.on('data',function (d) {
  console.log(d.toString());
});
