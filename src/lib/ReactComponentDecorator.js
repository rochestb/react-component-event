import trim from 'lodash/trim';
import isFunction from 'lodash/isFunction';
import random from 'lodash/random';
import isUndefined from 'lodash/isUndefined';
import ReactDOM from 'react-dom';

import iterator from './iterator';
import Listener from './Listener';
import ComponentEvent from './ComponentEvent';

const slice = Array.prototype.slice;
let currentUID = 0;
let rootComponent;

function getUId() {
  return currentUID++;
}

function triggerEvent(eventName, component, args) {

  const _listeners = component._reactComponentEventListeners || {};

  let _bubbles = true;

  for (let key in _listeners) {
    if (_listeners.hasOwnProperty(key) && key.indexOf(eventName + '$$') === 0) {

      const listener = _listeners[key];

      const event = new ComponentEvent(eventName, listener, component);

      _listeners[key].fire(event, args);

      if (_listeners[key].option.once)
        delete _listeners[key];

      _bubbles = event.bubbles;

      if (event.isImmediatePropagationStopped) {
        break;
      }
    }
  }

  return _bubbles;
}

function componentOn(component, option) {

  return (eventName, handler) => {

    if (trim(eventName) !== '' && isFunction(handler)) {

      const uid = getUId();

      component._reactComponentEventListeners[eventName + '$$' + uid] = new Listener(
        eventName, uid, handler, component, option
      );

      return true;
    }

    return false;
  }
}

function componentOff(component) {

  return (eventName, handler) => {

    const _listeners = component._reactComponentEventListeners || {};

    for (let key in _listeners) {
      if (_listeners.hasOwnProperty(key) && key.indexOf(eventName + '$$') === 0) {
        if (isFunction(handler)) {
          if (_listeners[key].handler === handler)
            delete _listeners[key];
        } else {
          delete _listeners[key];
        }
      }
    }
  }
}

function componentEmit(component) {

  return function () {

    const eventName = arguments[0];
    const args = arguments::slice(1, arguments.length);

    if (isUndefined(rootComponent)) {
      //console.warn('Please set rootComponent first!');
      iterator.parents(iterator.root(component), component, _component => {
        return triggerEvent(eventName, _component, args);
      });
    } else {
      iterator.parents(rootComponent, component, _component => {
        return triggerEvent(eventName, _component, args);
      });
    }
  }
}

function componentBroadcast(component) {

  return function () {

    const eventName = arguments[0];
    const args = arguments::slice(1, arguments.length);

    iterator.children(component, (_component) => {

      return triggerEvent(eventName, _component, args);

    });
  }
}

export default (component, option) => {

  if (option && option.root)
    rootComponent = component;

  component._reactComponentEventListeners = {};

  component.on = componentOn(component, {});
  component.once = componentOn(component, {
    once: true
  });
  component.off = componentOff(component);
  component.emit = componentEmit(component);
  component.broadcast = componentBroadcast(component);

}