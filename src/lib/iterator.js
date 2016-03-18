import forOwn from 'lodash/forOwn';

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
  parents(component, callback) {

    return (function parentsIterator(component, parents) {

      if (callback(_instance(component))) {

        if (_owner(component)) {
          return parentsIterator(_owner(component), parents);
        } else {
          return parents;
        }
      }
    })(component._reactInternalInstance, []);
  },

  children (component, callback){
    var children = [];
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

    return children;
  }
}