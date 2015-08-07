/*!
 * visit-args <https://github.com/jonschlinkert/visit-args>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var extend = require('extend-shallow');
var Emitter = require('component-emitter');
var toEmitter = require('to-emitter');
var forward = require('forward-object');
var visit = require('collection-visit');

function VisitArgs(opts) {
  if (!(this instanceof VisitArgs)) {
    return new VisitArgs(opts);
  }
  Emitter.call(this);
  this.options = opts || {};
}

Emitter(VisitArgs.prototype);

VisitArgs.prototype.visit = function(obj, args) {
  var opts = this.options;
  var self = this;

  toEmitter(self, obj);
  if (args) return iterator(args);

  function iterator(args) {
    if (Array.isArray(args)) {
      args.forEach(self.visit(obj));
    }

    for (var key in args) {
      if (args.hasOwnProperty(key) && (key in obj)) {
        var val = args[key];

        if (typeof val === 'object') {
          visit(obj, key, val);
        } else {
          obj[key](val, opts.toBoolean ? true : undefined);
        }
      }
    }
    self.emit('end');
    return obj;
  }
  return iterator;
};

/**
 * Expose an instance of `VisitArgs`
 */

module.exports = new VisitArgs();

/**
 * Expose the `VisitArgs` constructor
 */

module.exports.VisitArgs = VisitArgs;

