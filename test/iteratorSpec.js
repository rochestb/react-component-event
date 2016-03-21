import React from 'React';
import {render} from 'react-dom';

import iterator from '../dist/iterator';

describe('iterator', () => {

  let rootComponent, endComponent, target;

  class Component extends React.Component {

    componentDidMount() {
      if (this.props.id === 'node.0.0.1.2')
        endComponent = this;
    }

    render() {
      return <div id={this.props.id}>
        <h1>{this.props.id}</h1>
        {this.props.children}
      </div>
    }
  }

  class ComponentTree extends React.Component {

    componentDidMount() {
      rootComponent = this;
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

  it('children', () => {
    const ids = [];

    iterator.children(rootComponent, (component) => {
      ids.push(component.props.id);
      return true;
    });

    expect(ids).toEqual([
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
    ]);
  });

  it('parents', () => {
    const ids = [];

    iterator.parents(rootComponent, endComponent, component => {
      ids.push(component.props.id);
      return true;
    });

    expect(ids).toEqual([
      'node.0.0.1.2',
      'node.0.0.1',
      'node.0.0',
      'node'
    ]);
  });
});
