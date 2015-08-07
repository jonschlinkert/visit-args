var cli = require('..');
var App = require('./app');
var app = new App();

var minimist = require('minimist');
var argv = minimist([
  '--set=a',
  '--set=b',
  '--get=a',
  '--get=b',
  '--del=a'
]);

cli.on('set', function (key, val) {
  console.log('set', key, val);
});

cli.on('get', function (val) {
  console.log('get', val);
});

cli.on('del', function (key) {
  console.log('deleted', key);
});

cli.visit(app, argv);
