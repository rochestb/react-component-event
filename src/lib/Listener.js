import fakeDispatchEvent from './fakeDispatchEvent'

export default class Listener {
  constructor(eventName, uid, handler, component, option) {
    this._eventName = eventName;
    this._uid = uid;
    this._handler = handler;
    this._component = component;
    this._option = option;
  }

  get handler() {
    return this._handler;
  }

  get uid() {
    return this._uid;
  }

  get component() {
    return this._component;
  }

  get option() {
    return this._option;
  }

  get name() {
    return this._handler.name
  }

  fire(event, args) {
    fakeDispatchEvent(this, event, args);
  }
}