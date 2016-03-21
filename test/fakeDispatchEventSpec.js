import fakeDispatchEvent from '../src/lib/fakeDispatchEvent';

describe('fakeDispatchEvent', () => {
  let mockListener, event, args, result;

  beforeEach(() => {
    mockListener = {
      handler: (event, arg1, arg2, arg3) => {
        result = [event, arg1, arg2, arg3];
      }
    };

    event = {
      name: 'MyEvent'
    };

    args = [1, 2, 3];
  });

  it('result should be set when fakeDispatchEvent have been called.', () => {
    fakeDispatchEvent(mockListener, event, args);
    expect(result).toEqual([event, 1, 2, 3]);
  });
});
