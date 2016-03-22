'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentHandler = void 0,
    currentComponent = void 0,
    currentArgs = void 0;

var dispatchFakeEvent = function dispatchFakeEvent() {
  try {
    currentHandler.apply(currentComponent, currentArgs);
  } catch (err) {
    console.error(err);
  }
};

if (document.addEventListener) {
  document.addEventListener('fakeEvents', function () {
    // execute the callback
    if ((0, _isFunction2.default)(currentHandler)) currentHandler.apply(currentComponent, currentArgs);
  }, false);

  dispatchFakeEvent = function dispatchFakeEvent() {
    var fakeEvent = document.createEvent("UIEvents");
    fakeEvent.initEvent("fakeEvents", false, false);
    document.dispatchEvent(fakeEvent);
  };
}

exports.default = function (listener, event, args) {

  currentHandler = listener.handler;
  currentComponent = listener.component;
  currentArgs = [event].concat(args);

  dispatchFakeEvent();
};