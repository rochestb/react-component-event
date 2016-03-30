import isFunction from 'lodash/isFunction';

let currentHandler, currentComponent, currentArgs, dispatchFakeEvent;

if (typeof document === 'object' && document.addEventListener) {
  // Using document event if in browser
  document.addEventListener('fakeEvents', function () {
    // execute the callback
    if (isFunction(currentHandler))
      currentHandler.apply(currentComponent, currentArgs)
  }, false);

  dispatchFakeEvent = () => {
    var fakeEvent = document.createEvent("UIEvents");
    fakeEvent.initEvent("fakeEvents", false, false);
    document.dispatchEvent(fakeEvent);
  };
} else {
  // Dispatch event in try catch default
  dispatchFakeEvent = () => {
    try {
      currentHandler.apply(currentComponent, currentArgs);
    } catch (err) {
      console.error(err);
    }
  };
}

export default (listener, event, args) => {

  currentHandler = listener.handler;
  currentComponent = listener.component;
  currentArgs = [event].concat(args);

  dispatchFakeEvent();
};