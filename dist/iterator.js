'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forOwn = require('lodash/forOwn');

var _forOwn2 = _interopRequireDefault(_forOwn);

var _last = require('lodash/last');

var _last2 = _interopRequireDefault(_last);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _owner(component) {
  return component._currentElement._owner;
}

function _instance(component) {
  return component._instance;
}

function _renderedComponent(reactComponent) {
  return reactComponent._renderedComponent;
}

function _renderedChildren(reactComponent) {
  return reactComponent._renderedChildren;
}

exports.default = {
  parents: function parents(rootComponent, endComponent, callback) {
    var result = [];

    (function traverse(component, path) {

      var keep = true;
      var tempComponent = component;

      while (keep && _instance(tempComponent)) {
        path.push(_instance(tempComponent));
        keep = _instance(tempComponent) !== endComponent;
        tempComponent = _renderedComponent(tempComponent);
      }

      if (!keep) {

        result = path;
      } else if (_renderedChildren(tempComponent)) {

        (0, _forOwn2.default)(_renderedChildren(tempComponent), function (subComponent) {
          traverse(subComponent, path.concat());
        });
      }
    })(rootComponent._reactInternalInstance, []);

    (0, _forEach2.default)(result.reverse(), function (_component) {
      return callback(_component);
    });
  },
  children: function children(component, callback) {

    (function childrenIterator(component) {

      var keep = true;
      var tempComponent = component;

      while (keep && _instance(tempComponent)) {
        keep = callback(_instance(tempComponent));
        tempComponent = _renderedComponent(tempComponent);
      }

      if (!keep) return;

      if (_renderedChildren(tempComponent)) {

        (0, _forOwn2.default)(_renderedChildren(tempComponent), function (subComponent) {

          childrenIterator(subComponent);
        });
      }
    })(component._reactInternalInstance);
  }
};