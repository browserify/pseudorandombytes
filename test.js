var spawn = require('child_process').spawn;

var child = spawn('ent', ['-b']);
var csv = require('csv-parser');
var prng = require('./browser');
var Readable = require('stream').Readable;
var bytes = 1024 * 1024 * 1024;
var stream = new Readable();
var sofar = 0;
// var buf = new Buffer(num);
//   var i = -1;
//   while (++i < num) {
//     buf[i] = Math.random() * 8*8*4;
//   }
stream._read = function (num) {
  var buf = new Buffer(num);
  var i = -1;
  while (++i < num) {
    buf[i] = Math.random() * 8*8*4;
  }
  this.push(buf);
  //this.push(prng(num));
  sofar += num;
  if (sofar > bytes) {
    this.push(null);
  }
};
stream.pipe(child.stdin);
child.stdout/*.pipe(csv())*/.on('data',function (d) {
  console.log(d.toString());
});