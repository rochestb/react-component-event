import React from 'React';

import Listener from '../src/lib/Listener';

describe('ComponentEvent', () => {

  let listener, eventName, uid, handler, component, option;

  class Component extends React.Component {
    render() {
      return <div></div>
    }
  }

  beforeEach(() => {
    eventName = 'FireInTheHole';
    uid = 123456;
    handler =
      component = <Component/>;
    listener = new Listener(eventName, uid, handler, component, option);
  });

  it('should has attribute dispatchUID which equals listener.uid.', () => {
    expect(componentEvent.dispatchUID).toBe(listener.uid);
  });

  it('should has attribute bubbles which is true.', () => {
    expect(componentEvent.bubbles).toBe(true);
  });

  it('bubbles should be false after stopPropagation be called.', () => {
    componentEvent.stopPropagation();
    expect(componentEvent.bubbles).toBe(false);
  });

  it('should has attribute dispatchListeners which is listener.', () => {
    expect(componentEvent.dispatchListeners).toBe(listener);
  });

  it('should has attribute target which is component.', () => {
    expect(componentEvent.target).toBe(component);
  });

  it('should has attribute timeStamp.', () => {
    expect(componentEvent.timeStamp).toBeDefined();
  });

  it('should has attribute type which is .', () => {
    expect(componentEvent.type).toBe(eventName);
  });

  it('should has attribute isImmediatePropagationStopped which is false.', () => {
    expect(componentEvent.isImmediatePropagationStopped).toBe(false);
  });

  it('isImmediatePropagationStopped should be true when stopImmediatePropagation have been called.', () => {
    componentEvent.stopImmediatePropagation();
    expect(componentEvent.isImmediatePropagationStopped).toBe(true);
  });
});
