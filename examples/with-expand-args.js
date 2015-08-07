var cli = require('..');
var App = require('./app');
var app = new App();

var minimist = require('minimist');
var expand = require('minimist-expand')(minimist);
var argv = expand([
  '--set=a.b.c.d:e',
  '--set=c:d',
  '--get=a',
  '--set=e:f+g:h+i:j',
  '--del=g',
  '--del=e',
  '--del=a',
  'a',
  'b'
]);

cli.on('set', function (key, val) {
  console.log('set', key, val);
});

cli.on('get', function (key) {
  console.log('get', key);
});

cli.on('del', function (key) {
  console.log('deleted', key);
});

cli.on('*', function () {
  console.log(arguments);
});

cli.visit(app, argv);
