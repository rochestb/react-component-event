import React from 'React';
import {render} from 'react-dom';
import forOwn from 'lodash/forOwn';

import ReactComponentDecorator from '../src/lib/ReactComponentDecorator';

describe('ReactComponentDecorator', () => {

  const expectedStateOfNoTriggered = {
    triggered: false,
    arg1: null,
    arg2: null
  };

  const expectedStateOfTriggered = {
    triggered: true,
    arg1: 1,
    arg2: 2
  };

  describe('broadcast and emit', () => {

    const FireInTheHole = 'FireInTheHole';
    const components = {};
    let triggeredIds = [];
    let rootComponent, target;

    class Component extends React.Component {

      constructor(props) {
        super(props);
        ReactComponentDecorator(this);
        this.state = {
          triggered: false,
          arg1: null,
          arg2: null
        };
      }

      componentDidMount() {
        components[this.props.id] = this;

        this.on(FireInTheHole, (event, arg1, arg2) => {
          this.setState({
            triggered: true,
            arg1: arg1,
            arg2: arg2
          });
          triggeredIds.push(this.props.id);
        });
      }

      emitFire() {
        this.emit(FireInTheHole, 1, 2);
      }

      render() {
        return <div id={this.props.id}>
          <h1>{this.props.id}</h1>
          {this.props.children}
        </div>
      }
    }

    class ComponentTree extends React.Component {

      constructor(props) {
        super(props);
        ReactComponentDecorator(this, {root: true});
        this.state = {
          triggered: false,
          arg1: null,
          arg2: null
        };
      }

      componentDidMount() {
        rootComponent = this;

        this.on(FireInTheHole, (event, arg1, arg2) => {
          this.setState({
            triggered: true,
            arg1: arg1,
            arg2: arg2
          });
          triggeredIds.push(this.props.id);
        });
      }

      broadcastFire() {
        this.broadcast(FireInTheHole, 1, 2);
      }

      render() {

        return <div id="node.0">
          <Component id="node.0.0">
            <div>
              <Component id="node.0.0.0"></Component>
              <Component id="node.0.0.1">
                <div>
                  <Component id="node.0.0.1.0"></Component>
                  <Component id="node.0.0.1.1"></Component>

                  <div>
                    <Component id="node.0.0.1.2"></Component>
                  </div>
                </div>
              </Component>
            </div>
          </Component>
          <Component id="node.0.1">
            <div>
              <Component id="node.0.1.0"></Component>
              <Component id="node.0.1.1"></Component>
            </div>
          </Component>
        </div>
      }
    }

    beforeEach(() => {
      target = document.createElement('div');
      document.body.appendChild(target);

      render(<ComponentTree id="node"/>, target);
    });

    afterEach(() => {
      document.body.removeChild(target);
    });

    describe('when rootComponent broadcast the event', () => {

      const expectedPathIds = [
        'node',
        'node.0.0',
        'node.0.0.0',
        'node.0.0.1',
        'node.0.0.1.0',
        'node.0.0.1.1',
        'node.0.0.1.2',
        'node.0.1',
        'node.0.1.0',
        'node.0.1.1'
      ];

      beforeEach(() => {
        triggeredIds = [];
        rootComponent.broadcastFire();
      });

      it('all listeners will be called in a certain order.', () => {
        expect(triggeredIds).toEqual(expectedPathIds);
      });

      it('the listener in rootComponent will be called with args.', () => {
        expect(rootComponent.state).toEqual(expectedStateOfTriggered);
      });

      it('the listeners in component will be called with args.', () => {
        forOwn(components, component => {
          expect(component.state).toEqual(expectedStateOfTriggered);
        });
      });
    });

    describe('when component node.0.0.1.2 emit the event', () => {
      let expectedPathIds = [
        'node.0.0.1.2',
        'node.0.0.1',
        'node.0.0',
        'node'
      ];
      beforeEach(() => {
        triggeredIds = [];
        components['node.0.0.1.2'].emitFire();
      });

      it('the listeners of its parents will be called in a certain order.', () => {
        expect(triggeredIds).toEqual(expectedPathIds);
      });

      it('the listener in rootComponent will be called with args.', () => {
        expect(rootComponent.state).toEqual(expectedStateOfTriggered);
      });

      it('the listeners of its parents will be called with args.', () => {
        forOwn(components, component => {
          if (expectedPathIds.indexOf(component.props.id) > -1) {
            expect(component.state).toEqual(expectedStateOfTriggered);
          } else {
            expect(component.state).toEqual(expectedStateOfNoTriggered);
          }
        });
      });
    });
  });

  describe('stopPropagation', () => {

    const FireInTheHole = 'FireInTheHole';
    const components = {};
    let triggeredIds = [];
    let rootComponent, target;

    class Component extends React.Component {

      constructor(props) {
        super(props);
        ReactComponentDecorator(this);
        this.state = {
          triggered: false,
          arg1: null,
          arg2: null
        };
      }

      componentDidMount() {
        components[this.props.id] = this;

        this.on(FireInTheHole, (event, arg1, arg2) => {
          this.setState({
            triggered: true,
            arg1: arg1,
            arg2: arg2
          });

          triggeredIds.push(this.props.id);

          if (this.props.id === 'node.0.0.1') {
            event.stopPropagation();
          }
        });
      }

      emitFire() {
        this.emit(FireInTheHole, 1, 2);
      }

      render() {
        return <div id={this.props.id}>
          <h1>{this.props.id}</h1>
          {this.props.children}
        </div>
      }
    }

    class ComponentTree extends React.Component {

      constructor(props) {
        super(props);
        ReactComponentDecorator(this, {root: true});
        this.state = {
          triggered: false,
          arg1: null,
          arg2: null
        };
      }

      componentDidMount() {
        rootComponent = this;

        this.on(FireInTheHole, (event, arg1, arg2) => {
          this.setState({
            triggered: true,
            arg1: arg1,
            arg2: arg2
          });
          triggeredIds.push(this.props.id);
        });
      }

      broadcastFire() {
        this.broadcast(FireInTheHole, 1, 2);
      }

      render() {

        return <div id="node.0">
          <Component id="node.0.0">
            <div>
              <Component id="node.0.0.0"></Component>
              <Component id="node.0.0.1">
                <div>
                  <Component id="node.0.0.1.0"></Component>
                  <Component id="node.0.0.1.1"></Component>

                  <div>
                    <Component id="node.0.0.1.2"></Component>
                  </div>
                </div>
              </Component>
            </div>
          </Component>
          <Component id="node.0.1">
            <div>
              <Component id="node.0.1.0"></Component>
              <Component id="node.0.1.1"></Component>
            </div>
          </Component>
        </div>
      }
    }

    beforeEach(() => {
      target = document.createElement('div');
      document.body.appendChild(target);

      render(<ComponentTree id="node"/>, target);
    });

    afterEach(() => {
      document.body.removeChild(target);
    });

    describe('when rootComponent broadcast the event', () => {

      const expectedPathIds = [
        'node',
        'node.0.0',
        'node.0.0.0',
        'node.0.0.1',
        'node.0.1',
        'node.0.1.0',
        'node.0.1.1'
      ];

      beforeEach(() => {
        triggeredIds = [];
        rootComponent.broadcastFire();
      });

      it('all listeners will be called in a certain order.', () => {
        expect(triggeredIds).toEqual(expectedPathIds);
      });

      it('the listener in rootComponent will be called with args.', () => {
        expect(rootComponent.state).toEqual(expectedStateOfTriggered);
      });

      it('the listeners in component will be called with args.', () => {
        forOwn(components, component => {
          if (expectedPathIds.indexOf(component.props.id) > -1) {
            expect(component.state).toEqual(expectedStateOfTriggered);
          } else {
            expect(component.state).toEqual(expectedStateOfNoTriggered);
          }
        });
      });
    });

    describe('when component node.0.0.1.2 emit the event', () => {

      let expectedPathIds = [
        'node.0.0.1.2',
        'node.0.0.1'
      ];

      beforeEach(() => {
        triggeredIds = [];
        components['node.0.0.1.2'].emitFire();
      });

      it('the listeners of its parents will be called in a certain order.', () => {
        expect(triggeredIds).toEqual(expectedPathIds);
      });

      it('the listeners of its parents will be called with args.', () => {
        forOwn(components, component => {
          if (expectedPathIds.indexOf(component.props.id) > -1) {
            expect(component.state).toEqual(expectedStateOfTriggered);
          } else {
            expect(component.state).toEqual(expectedStateOfNoTriggered);
          }
        });
      });
    });
  });

  xdescribe('stopImmediatePropagation', () => {

    const FireInTheHole = 'FireInTheHole';
    const components = {};
    let triggeredIds = [];
    let rootComponent, target;

    class Component extends React.Component {

      constructor(props) {
        super(props);
        ReactComponentDecorator(this);
        this.state = {
          triggered: 0
        };
      }

      componentDidMount() {
        components[this.props.id] = this;

        this.on(FireInTheHole, (event) => {
          this.setState({
            triggered: ++this.state.triggered
          });

          triggeredIds.push(this.props.id);

          if (this.props.id === 'node.0.0.1') {
            event.stopImmediatePropagation();
          }
        });

        this.on(FireInTheHole, (event) => {
          this.setState({
            triggered: ++this.state.triggered
          });

          triggeredIds.push(this.props.id);
        });
      }

      emitFire() {
        this.emit(FireInTheHole);
      }

      render() {
        return <div id={this.props.id}>
          <h1>{this.props.id}</h1>
          {this.props.children}
        </div>
      }
    }

    class ComponentTree extends React.Component {

      constructor(props) {
        super(props);
        ReactComponentDecorator(this, {root: true});
        this.state = {
          triggered: 0
        };
      }

      componentDidMount() {
        rootComponent = this;

        this.on(FireInTheHole, (event) => {
          this.setState({
            triggered: ++this.state.triggered
          });
          triggeredIds.push(this.props.id);
        });
      }

      broadcastFire() {
        this.broadcast(FireInTheHole);
      }

      render() {

        return <div id="node.0">
          <Component id="node.0.0">
            <div>
              <Component id="node.0.0.0"></Component>
              <Component id="node.0.0.1">
                <div>
                  <Component id="node.0.0.1.0"></Component>
                  <Component id="node.0.0.1.1"></Component>

                  <div>
                    <Component id="node.0.0.1.2"></Component>
                  </div>
                </div>
              </Component>
            </div>
          </Component>
          <Component id="node.0.1">
            <div>
              <Component id="node.0.1.0"></Component>
              <Component id="node.0.1.1"></Component>
            </div>
          </Component>
        </div>
      }
    }

    beforeEach(() => {
      target = document.createElement('div');
      document.body.appendChild(target);

      render(<ComponentTree id="node"/>, target);
    });

    afterEach(() => {
      document.body.removeChild(target);
    });

    describe('when rootComponent broadcast the event', () => {

      const expectedPathIds = [
        'node',
        'node.0.0',
        'node.0.0',
        'node.0.0.0',
        'node.0.0.0',
        'node.0.0.1',
        'node.0.1',
        'node.0.1',
        'node.0.1.0',
        'node.0.1.0',
        'node.0.1.1',
        'node.0.1.1'
      ];

      beforeEach(() => {
        triggeredIds = [];
        rootComponent.broadcastFire();
      });

      it('all certain listeners will be called in a certain order.', () => {
        expect(triggeredIds).toEqual(expectedPathIds);
      });
    });

    describe('when component node.0.0.1.2 emit the event', () => {

      let expectedPathIds = [
        'node.0.0.1.2',
        'node.0.0.1.2',
        'node.0.0.1'
      ];

      beforeEach(() => {
        triggeredIds = [];
        components['node.0.0.1.2'].emitFire();
      });

      it('all certain listeners will be called in a certain order.', () => {
        expect(triggeredIds).toEqual(expectedPathIds);
      });
    });
  });

  describe('once & stopImmediatePropagation', () => {

    const FireInTheHole = 'FireInTheHole';
    const components = {};
    let triggeredIds = [];
    let rootComponent, target;

    class Component extends React.Component {

      constructor(props) {
        super(props);
        ReactComponentDecorator(this);
        this.state = {
          triggered: 0
        };
      }

      componentDidMount() {
        components[this.props.id] = this;

        this.once(FireInTheHole, (event) => {
          this.setState({
            triggered: ++this.state.triggered
          });

          triggeredIds.push(this.props.id);

          if (this.props.id === 'node.0.0.1') {
            event.stopImmediatePropagation();
          }
        });

        this.on(FireInTheHole, (event) => {
          this.setState({
            triggered: ++this.state.triggered
          });

          triggeredIds.push(this.props.id);
        });
      }

      emitFire() {
        this.emit(FireInTheHole);
      }

      render() {
        return <div id={this.props.id}>
          <h1>{this.props.id}</h1>
          {this.props.children}
        </div>
      }
    }

    class ComponentTree extends React.Component {

      constructor(props) {
        super(props);
        ReactComponentDecorator(this, {root: true});
        this.state = {
          triggered: 0
        };
      }

      componentDidMount() {
        rootComponent = this;

        this.on(FireInTheHole, (event) => {
          this.setState({
            triggered: ++this.state.triggered
          });
          triggeredIds.push(this.props.id);
        });
      }

      broadcastFire() {
        this.broadcast(FireInTheHole);
      }

      render() {

        return <div id="node.0">
          <Component id="node.0.0">
            <div>
              <Component id="node.0.0.0"></Component>
              <Component id="node.0.0.1">
                <div>
                  <Component id="node.0.0.1.0"></Component>
                  <Component id="node.0.0.1.1"></Component>

                  <div>
                    <Component id="node.0.0.1.2"></Component>
                  </div>
                </div>
              </Component>
            </div>
          </Component>
          <Component id="node.0.1">
            <div>
              <Component id="node.0.1.0"></Component>
              <Component id="node.0.1.1"></Component>
            </div>
          </Component>
        </div>
      }
    }

    beforeEach(() => {
      target = document.createElement('div');
      document.body.appendChild(target);

      render(<ComponentTree id="node"/>, target);
    });

    afterEach(() => {
      document.body.removeChild(target);
    });

    describe('when rootComponent broadcast the event in first', () => {

      const expectedPathIds = [
        'node',
        'node.0.0',
        'node.0.0',
        'node.0.0.0',
        'node.0.0.0',
        'node.0.0.1',
        'node.0.1',
        'node.0.1',
        'node.0.1.0',
        'node.0.1.0',
        'node.0.1.1',
        'node.0.1.1'
      ];

      beforeEach(() => {
        triggeredIds = [];
        rootComponent.broadcastFire();
      });

      it('all certain listeners will be called in a certain order.', () => {
        expect(triggeredIds).toEqual(expectedPathIds);
      });

      describe('when rootComponent broadcast the event in second', () => {

        const expectedPathIds = [
          'node',
          'node.0.0',
          'node.0.0.0',
          'node.0.0.1',
          'node.0.0.1.0',
          'node.0.0.1.0',
          'node.0.0.1.1',
          'node.0.0.1.1',
          'node.0.0.1.2',
          'node.0.0.1.2',
          'node.0.1',
          'node.0.1.0',
          'node.0.1.1'
        ];

        beforeEach(() => {
          triggeredIds = [];
          rootComponent.broadcastFire();
        });

        it('all certain listeners will be called in a certain order.', () => {
          expect(triggeredIds).toEqual(expectedPathIds);
        });

        describe('when rootComponent broadcast the event in third', () => {

          const expectedPathIds = [
            'node',
            'node.0.0',
            'node.0.0.0',
            'node.0.0.1',
            'node.0.0.1.0',
            'node.0.0.1.1',
            'node.0.0.1.2',
            'node.0.1',
            'node.0.1.0',
            'node.0.1.1'
          ];

          beforeEach(() => {
            triggeredIds = [];
            rootComponent.broadcastFire();
          });

          it('all certain listeners will be called in a certain order.', () => {
            expect(triggeredIds).toEqual(expectedPathIds);
          });
        });
      });
    });

    describe('when component node.0.0.1.2 emit the event in first', () => {

      let expectedPathIds = [
        'node.0.0.1.2',
        'node.0.0.1.2',
        'node.0.0.1'
      ];

      beforeEach(() => {
        triggeredIds = [];
        components['node.0.0.1.2'].emitFire();
      });

      it('all certain listeners will be called in a certain order.', () => {
        expect(triggeredIds).toEqual(expectedPathIds);
      });

      describe('when component node.0.0.1.2 emit the event in second', () => {

        let expectedPathIds = [
          'node.0.0.1.2',
          'node.0.0.1',
          'node.0.0',
          'node.0.0',
          'node'
        ];

        beforeEach(() => {
          triggeredIds = [];
          components['node.0.0.1.2'].emitFire();
        });

        it('all certain listeners will be called in a certain order.', () => {
          expect(triggeredIds).toEqual(expectedPathIds);
        });

        describe('when component node.0.0.1.2 emit the event in third', () => {

          let expectedPathIds = [
            'node.0.0.1.2',
            'node.0.0.1',
            'node.0.0',
            'node'
          ];

          beforeEach(() => {
            triggeredIds = [];
            components['node.0.0.1.2'].emitFire();
          });

          it('all certain listeners will be called in a certain order.', () => {
            expect(triggeredIds).toEqual(expectedPathIds);
          });
        });
      });
    });
  });
});
