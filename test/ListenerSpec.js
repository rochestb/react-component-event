import React from 'React';

import Listener from '../src/lib/Listener';

describe('ComponentEvent', () => {

  let listener, eventName, uid, handler, component, option, result;

  class Component extends React.Component {
    render() {
      return <div></div>
    }
  }

  beforeEach(() => {
    eventName = 'FireInTheHole';
    uid = 123456;
    handler = function eventHandler(event, arg1, arg2, arg3) {
      result = [event, arg1, arg2, arg3]
    };
    component = <Component/>;
    option = {
      once: true
    };
    listener = new Listener(eventName, uid, handler, component, option);
  });

  it('should has attribute handler which is handler.', () => {
    expect(listener.handler).toBe(handler);
  });

  it('should has attribute uid which equals uid.', () => {
    expect(listener.uid).toBe(uid);
  });

  it('should has attribute component which is component.', () => {
    expect(listener.component).toBe(component);
  });

  it('should has attribute option which is option.', () => {
    expect(listener.option).toBe(option);
  });

  it('should has attribute name which is handle.name.', () => {
    expect(listener.name).toBe(handler.name);
  });

  it('result should be set when fire have been called.', () => {
    const event = {type: 'FireInTheHole'};
    const args = [1, 2, 3];
    listener.fire(event, args);
    expect(result).toEqual([event].concat(args));
  });
});
