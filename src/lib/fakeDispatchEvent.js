let currentHandler, currentComponent, currentArgs;

let dispatchFakeEvent = () => {
  try {
    currentHandler.apply(currentComponent, currentArgs);
  } catch (err) {
    console.error(err);
  }
};

if (document.addEventListener) {
  document.addEventListener('fakeEvents', function () {
    // execute the callback
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