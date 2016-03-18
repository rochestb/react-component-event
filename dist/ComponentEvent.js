"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentEvent = function () {
  function ComponentEvent(eventName, uid, listener, component) {
    _classCallCheck(this, ComponentEvent);

    this._type = eventName;
    this._dispatchUID = uid;
    this._timeStamp = Date.now();
    this._dispatchListeners = listener;
    this._target = component;

    this._bubbles = true;
    this._isImmediatePropagationStopped = false;
  }

  _createClass(ComponentEvent, [{
    key: "stopPropagation",
    value: function stopPropagation() {
      this._bubbles = false;
    }
  }, {
    key: "stopImmediatePropagation",
    value: function stopImmediatePropagation() {
      this._isImmediatePropagationStopped = true;
      this._bubbles = false;
    }
  }, {
    key: "dispatchUID",
    get: function get() {
      return this._dispatchUID;
    }
  }, {
    key: "bubbles",
    get: function get() {
      return this._bubbles;
    }
  }, {
    key: "dispatchListeners",
    get: function get() {
      return this._dispatchListeners;
    }
  }, {
    key: "target",
    get: function get() {
      return this._target;
    }
  }, {
    key: "timeStamp",
    get: function get() {
      return this._timeStamp;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "isImmediatePropagationStopped",
    get: function get() {
      return this._isImmediatePropagationStopped;
    }
  }]);

  return ComponentEvent;
}();

exports.default = ComponentEvent;