import isFunction from 'lodash/isFunction';

let currentHandler, currentComponent, currentArgs;

// Dispatch event in try catch default
let dispatchFakeEvent = () => {
  try {
    currentHandler.apply(currentComponent, currentArgs);
  } catch (err) {
    console.error(err);
  }
};

// Using document event if in browser
if (document && document.addEventListener) {
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
}

export default (listener, event, args) => {

  currentHandler = listener.handler;
  currentComponent = listener.component;
  currentArgs = [event].concat(args);

  dispatchFakeEvent();
};