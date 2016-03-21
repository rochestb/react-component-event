import forOwn from 'lodash/forOwn';
import last from 'lodash/last';
import forEach from 'lodash/forEach';

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

export default {

  parents(rootComponent, endComponent, callback) {
    let result = [];

    (function traverse(component, path) {

      let keep = true;
      let tempComponent = component;

      while (keep && _instance(tempComponent)) {
        path.push(_instance(tempComponent));
        keep = _instance(tempComponent) !== endComponent;
        tempComponent = _renderedComponent(tempComponent);
      }

      if (!keep) {

        result = path;

      } else if (_renderedChildren(tempComponent)) {

        forOwn(_renderedChildren(tempComponent), subComponent => {
          traverse(subComponent, path.concat());
        });
      }

    })(rootComponent._reactInternalInstance, []);

    forEach(result.reverse(), _component => {
      return callback(_component);
    });
  },

  children (component, callback){

    (function childrenIterator(component) {

      let keep = true;
      let tempComponent = component;

      while (keep && _instance(tempComponent)) {
        keep = callback(_instance(tempComponent));
        tempComponent = _renderedComponent(tempComponent);
      }

      if (!keep)
        return;

      if (_renderedChildren(tempComponent)) {

        forOwn(_renderedChildren(tempComponent), subComponent => {

          childrenIterator(subComponent);
        });
      }
    })(component._reactInternalInstance);
  }
}