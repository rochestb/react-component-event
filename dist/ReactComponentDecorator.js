'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim = require('lodash/trim');

var _trim2 = _interopRequireDefault(_trim);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _random = require('lodash/random');

var _random2 = _interopRequireDefault(_random);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _iterator = require('./iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _Listener = require('./Listener');

var _Listener2 = _interopRequireDefault(_Listener);

var _ComponentEvent = require('./ComponentEvent');

var _ComponentEvent2 = _interopRequireDefault(_ComponentEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slice = Array.prototype.slice;
var currentUID = 0;
var rootComponent = void 0;

function getUId() {
  return currentUID++;
}

function triggerEvent(eventName, component, args) {

  var _listeners = component._reactComponentEventListeners || {};

  var _bubbles = true;

  for (var key in _listeners) {
    if (_listeners.hasOwnProperty(key) && key.indexOf(eventName + '$$') === 0) {

      var listener = _listeners[key];

      var event = new _ComponentEvent2.default(eventName, listener, component);

      _listeners[key].fire(event, args);

      if (_listeners[key].option.once) delete _listeners[key];

      _bubbles = event.bubbles;

      if (event.isImmediatePropagationStopped) {
        break;
      }
    }
  }

  return _bubbles;
}

function componentOn(component, option) {

  return function (eventName, handler) {

    if ((0, _trim2.default)(eventName) !== '' && (0, _isFunction2.default)(handler)) {

      var uid = getUId();

      component._reactComponentEventListeners[eventName + '$$' + uid] = new _Listener2.default(eventName, uid, handler, component, option);

      return true;
    }

    return false;
  };
}

function componentOff(component) {

  return function (eventName, handler) {

    var _listeners = component._reactComponentEventListeners || {};

    for (var key in _listeners) {
      if (_listeners.hasOwnProperty(key) && key.indexOf(eventName + '$$') === 0) {
        if ((0, _isFunction2.default)(handler)) {
          if (_listeners[key].handler === handler) delete _listeners[key];
        } else {
          delete _listeners[key];
        }
      }
    }
  };
}

function componentEmit(component) {

  return function () {

    var eventName = arguments[0];
    var args = slice.call(arguments, 1, arguments.length);

    if ((0, _isUndefined2.default)(rootComponent)) {
      //console.warn('Please set rootComponent first!');
      _iterator2.default.parents(_iterator2.default.root(component), component, function (_component) {
        return triggerEvent(eventName, _component, args);
      });
    } else {
      _iterator2.default.parents(rootComponent, component, function (_component) {
        return triggerEvent(eventName, _component, args);
      });
    }
  };
}

function componentBroadcast(component) {

  return function () {

    var eventName = arguments[0];
    var args = slice.call(arguments, 1, arguments.length);

    _iterator2.default.children(component, function (_component) {

      return triggerEvent(eventName, _component, args);
    });
  };
}

exports.default = function (component, option) {

  if (option && option.root) rootComponent = component;

  component._reactComponentEventListeners = {};

  component.on = componentOn(component, {});
  component.once = componentOn(component, {
    once: true
  });
  component.off = componentOff(component);
  component.emit = componentEmit(component);
  component.broadcast = componentBroadcast(component);
};