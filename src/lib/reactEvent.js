import _ from 'lodash';
import iterator from './iterator';
import ReactDOM from 'react-dom';

function componentOn(component, option) {

  return (event, listener) => {
    if (_.isFunction(listener)) {
      if (_.isUndefined(component.__eventQueue[event])) {
        component.__eventQueue[event] = [];
      }
      component.__eventQueue[event].push({
        callback: listener,
        option: option
      });
      return true;
    }

    return false;
  }
}

function componentOff(component) {

  return (event, listener) => {
    if (_.isUndefined(listener)) {

      delete component.__eventQueue[event];

    } else if (_.isFunction(listener)) {
      component.__eventQueue[event] = component.__eventQueue[event].filter((_listener_) => {
        return _listener_.callback.name !== listener.name
      });
    }
  }
}

function componentEmit(component, option) {

  return (event, args) => {
    iterator.parents(component, parent => {
      console.log(parent);
      return false;
    });

  }
}

function componentBroadcast(component, option) {

  return (event, args) => {
    iterator.children(component, (_component_) => {
      console.log(_component_);

      let _propagation_ = true;

      if (_component_.__eventQueue && _component_.__eventQueue[event]) {
        _component_.__eventQueue[event] = _component_.__eventQueue[event].filter((_listener_) => {

          let event = {
            stopPropagation(){
              _propagation_ = false;
            }
          };

          _listener_.callback(event, args);

          return !_listener_.option.once;
        });
      }

      return _propagation_;
    });
  }
}

export default (component, option) => {

  component.__eventQueue = {};


  component.on = componentOn(component, {});
  component.once = componentOn(component, {
    once: true
  });
  component.off = componentOff(component);
  component.emit = componentEmit(component);
  component.broadcast = componentBroadcast(component);

}