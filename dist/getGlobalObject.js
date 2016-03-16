'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (mock) {
  if (mock) return mock;

  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object')
    // running in browser
    return window;

  if ((typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object')
    // running in node
    return global;

  throw new Error('There is no window or global in env.');
};