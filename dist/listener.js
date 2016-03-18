'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fakeDispatchEvent = require('./fakeDispatchEvent');

var _fakeDispatchEvent2 = _interopRequireDefault(_fakeDispatchEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listener = function () {
  function Listener(eventName, uid, handler, component, option) {
    _classCallCheck(this, Listener);

    this._eventName = eventName;
    this._uid = uid;
    this._handler = handler;
    this._component = component;
    this._option = option;
  }

  _createClass(Listener, [{
    key: 'fire',
    value: function fire(event, args) {
      (0, _fakeDispatchEvent2.default)(this, event, args);
    }
  }, {
    key: 'handler',
    get: function get() {
      return this._handler;
    }
  }, {
    key: 'uid',
    get: function get() {
      return this._uid;
    }
  }, {
    key: 'component',
    get: function get() {
      return this._component;
    }
  }, {
    key: 'option',
    get: function get() {
      return this._option;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._handler.name;
    }
  }]);

  return Listener;
}();

exports.default = Listener;