'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
  parents: function parents(component, callback) {

    return function parentsIterator(component, parents) {

      if (callback(_instance(component))) {

        if (_owner(component)) {
          return parentsIterator(_owner(component), parents);
        } else {
          return parents;
        }
      }
    }(component._reactInternalInstance, []);
  },
  children: function children(component, callback) {
    var children = [];
    (function childrenIterator(component) {

      var keep = true;
      var tempComponent = component;

      while (keep && _instance(tempComponent)) {
        keep = callback(_instance(tempComponent));
        tempComponent = _renderedComponent(tempComponent);
      }

      if (!keep) return;

      if (_renderedChildren(tempComponent)) {

        _lodash2.default.forOwn(_renderedChildren(tempComponent), function (subComponent) {

          childrenIterator(subComponent);
        });
      }
    })(component._reactInternalInstance);

    return children;
  }
};