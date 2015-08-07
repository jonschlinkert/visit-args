'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var VisitArgs = require('./').VisitArgs;
var minimist = require('minimist');
var App = require('./examples/app');
var app = new App();
var cli;

describe('cli', function () {
  beforeEach(function () {
    cli = new VisitArgs();
  });

  it('should emit an event for a flag:', function () {
    var called = 0;
    cli.on('set', function (key) {
      called++;
      assert.equal(key, 'a');
    });

    cli.on('get', function (key) {
      called++;
      assert.equal(key, 'a');
    });
    cli.visit(app, minimist(['--set=a', '--get=a']));
    assert.equal(called, 2);
  });

  it('should emit `end`:', function () {
    var called = 0;

    cli.on('set', function (key) {
      called++;
      assert.equal(key, 'a');
    });

    cli.on('get', function (key) {
      called++;
      assert.equal(key, 'a');
    });

    cli.on('end', function () {
      called++;
      assert.equal(called, 2);
    });

    process.nextTick(function() {
      cli.visit(app, minimist(['--set=a', '--get=a']));
      assert.equal(called, 3);
    })
  });
});
