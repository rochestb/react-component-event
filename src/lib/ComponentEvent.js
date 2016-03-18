export default class ComponentEvent {
  constructor(eventName, listener, component) {
    this._type = eventName;
    this._dispatchUID = listener.uid;
    this._timeStamp = Date.now();
    this._dispatchListeners = listener;
    this._target = component;

    this._bubbles = true;
    this._isImmediatePropagationStopped = false;
  }

  get dispatchUID() {
    return this._dispatchUID;
  }

  get bubbles() {
    return this._bubbles;
  }

  get dispatchListeners() {
    return this._dispatchListeners;
  }

  get target() {
    return this._target;
  }

  get timeStamp() {
    return this._timeStamp;
  }

  get type() {
    return this._type;
  }

  get isImmediatePropagationStopped() {
    return this._isImmediatePropagationStopped;
  }

  stopPropagation() {
    this._bubbles = false;
  }

  stopImmediatePropagation() {
    this._isImmediatePropagationStopped = true;
    this._bubbles = false;
  }
}