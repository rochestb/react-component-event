'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ReactTestUtils = require('react/lib/ReactTestUtils');

var _ReactTestUtils2 = _interopRequireDefault(_ReactTestUtils);

var _traverseAllChildren = require('react/lib/traverseAllChildren');

var _traverseAllChildren2 = _interopRequireDefault(_traverseAllChildren);

var _iterator = require('./iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function componentOn(component, option) {

  return function (event, listener) {
    if (_lodash2.default.isFunction(listener)) {
      if (_lodash2.default.isUndefined(component.__eventQueue[event])) {
        component.__eventQueue[event] = [];
      }
      component.__eventQueue[event].push({
        callback: listener,
        option: option
      });
      return true;
    }

    return false;
  };
}
//import traverseAllChildren from 'react/lib/traverseAllChildren';


function componentOff(component) {

  return function (event, listener) {
    if (_lodash2.default.isUndefined(listener)) {

      delete component.__eventQueue[event];
    } else if (_lodash2.default.isFunction(listener)) {
      component.__eventQueue[event] = component.__eventQueue[event].filter(function (_listener_) {
        return _listener_.callback.name !== listener.name;
      });
    }
  };
}

function componentEmit(component, option) {

  return function (event, args) {
    _iterator2.default.parents(component, function (parent) {
      console.log(parent);
      return false;
    });
  };
}

function componentBroadcast(component, option) {

  return function (event, args) {
    //iterator.children(component, (_component_) => {
    //  console.log(_component_);
    //
    //  return true;
    //});
  };
}

function componentDiffuse(component) {

  return function (event, args) {
    //  const __global__ = getGlobalObject();
    //
    //  if (__global__.__ReactEventRoot) {
    //    traverseAllChildren(__global__.__ReactEventRoot._reactInternalInstance._currentElement, (_component_, b) => {
    //
    //      //console.log(__global__.__ReactEventRoot._reactInternalInstance._currentElement, b)
    //      //if (ReactTestUtils.isCompositeComponent(_component_)) {
    //      //  if (_component_.__eventQueue && _component_.__eventQueue[event]) {
    //      //    let index = null;
    //      //
    //      //    _component_.__eventQueue[event] = _component_.__eventQueue[event].filter((_listener_) => {
    //      //      _listener_.callback(args);
    //      //
    //      //      return !_listener_.option.once;
    //      //    });
    //      //  }
    //      //}
    //    });
    //  }
  };
}

exports.default = function (component, option) {

  //const __global__ = getGlobalObject();
  //
  //if (option && option.isRoot) {
  //  __global__.__ReactEventRoot = component;
  //}

  component.__eventQueue = {};

  component.on = componentOn(component, {});
  component.once = componentOn(component, {
    once: true
  });
  component.off = componentOff(component);
  component.emit = componentEmit(component);
  component.broadcast = componentBroadcast(component);
  component.diffuse = componentDiffuse(component);
};