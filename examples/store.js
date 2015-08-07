var Store = require('data-store');
var store = new Store('test-map-args');

var args = require('..');
var cli = {};

var minimist = require('minimist')([
  '--set=a.b.c.d:e',
  '--set=c:d',
  '--get=a',
  '--set=e:f+g:h+i:j',

  '--store.set=a.b.c.d:e',
  '--store.set=c:d',
  '--store.bar=a:b',
  '--store.del=force:true',

  '--del=e',
  '--del=a',
  'a',
  'b'
]);

var argv = require('minimist-expand')(minimist);
cli.store = args;

cli.store.on('del', function (key, val) {
  if (typeof key === 'object' && key.force) {
    console.log(arguments)
    store.del({force: true});
  }
});

cli.store.on('set', function (key, val) {
  console.log('SET:', key, val);
});

cli.store.visit(store, argv.store);
console.log(cli)

