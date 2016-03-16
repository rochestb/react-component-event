'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
    _iterator2.default.children(component, function (_component_) {
      console.log(_component_);

      var _propagation_ = true;

      if (_component_.__eventQueue && _component_.__eventQueue[event]) {
        _component_.__eventQueue[event] = _component_.__eventQueue[event].filter(function (_listener_) {

          var event = {
            stopPropagation: function stopPropagation() {
              _propagation_ = false;
            }
          };

          _listener_.callback(event, args);

          return !_listener_.option.once;
        });
      }

      return _propagation_;
    });
  };
}

exports.default = function (target, key, descriptor) {

  console.log(descriptor);

  //const method = descriptor.value;
  //let moreDef = 100;
  //let ret;
  //descriptor.value = (...args) => {
  //  args[0] += moreDef;
  //  ret = method.apply(target, args);
  //};
  //return descriptor;

  //console.dir(target, key, descriptor);
  //
  //const con = target.prototype.constructor;
  //
  //
  //
  ////target.prototype.constructor = (props) => {
  ////  //con(props);
  ////  console.log(this);
  ////};
  //
  //target.prototype.componentDidMount = () => {
  //
  //  target.prototype.componentDidMount();
  //  console.log(this)
  //};

  //target.__eventQueue = [];
  //
  //target.on = componentOn(target, {});
  //
  //target.once = componentOn(target, {
  //  once: true
  //});
  //target.off = componentOff(target);
  //target.emit = componentEmit(target);
  //target.broadcast = componentBroadcast(target);
};