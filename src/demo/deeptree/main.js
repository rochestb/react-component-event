import React from 'react';
import { render } from 'react-dom';
import random from 'lodash/random';
import ReactComponentDecorator from '../../lib/ReactComponentDecorator';

const FireInTheHole = 'FireInTheHole';

function randomColor() {
  return {
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255)
  };
}

function rgb(color) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

class Component extends React.Component {

  constructor(props) {
    super(props);
    ReactComponentDecorator(this);
    this.state = {
      style: {},
      bubbles: true
    };
  }

  componentDidMount() {

    this.on(FireInTheHole, (event, arg) => {
      this.setState({
        style: {
          background: rgb(arg)
        }
      });
      if (!this.state.bubbles) {
        event.stopPropagation();
      }
    });
  }

  render() {
    return <div id={this.props.id} className="node">
      <h1>
        <i style={this.state.style}></i>&nbsp;
        <span>id:{this.props.id}</span>&nbsp;
        <button onClick={event => {
          this.broadcast(FireInTheHole, randomColor());
        }}>
          broadcast
        </button>
        <button onClick={event => {
          this.emit(FireInTheHole, randomColor());
        }}>
          emit
        </button>
        <button onClick={event => {
          this.setState({
            bubbles: !this.state.bubbles
          });
        }}>
          bubbles:{this.state.bubbles ? 'on' : 'off'}
        </button>
      </h1>
      {this.props.children}
    </div>
  }
}

class ComponentTree extends React.Component {

  constructor(props) {
    super(props);
    ReactComponentDecorator(this, {root: true});
    this.state = {
      msg: {}
    };
  }

  componentDidMount() {
    this.on(FireInTheHole, (event, arg) => {
      this.setState({
        style: {
          background: rgb(arg)
        }
      });
    });
  }

  render() {

    return <div id="node.0" className="node">
      <h1>
        <i style={this.state.style}></i>&nbsp;
        <span>id:{this.props.id}</span>&nbsp;
        <button onClick={event => {
          this.broadcast(FireInTheHole, randomColor());
        }}>
          broadcast
        </button>
      </h1>
      <Component id="node.0.0">
        <div>
          <Component id="node.0.0.0"></Component>
          <Component id="node.0.0.1">
            <div>
              <Component id="node.0.0.1.0"></Component>
              <Component id="node.0.0.1.1">
                <Component id="node.0.0.1.1.0"></Component>
                <Component id="node.0.0.1.1.1"></Component>
              </Component>

              <div>
                <Component id="node.0.0.1.2"></Component>
              </div>
            </div>
          </Component>
        </div>
      </Component>

      <div>
        <div>
          <div>
            <Component id="node.0.1">
              <div>
                <Component id="node.0.1.0"></Component>
                <Component id="node.0.1.1">
                  <Component id="node.0.1.1.0">
                    <Component id="node.0.1.1.0.0">
                      <Component id="node.0.1.1.0.0.0">
                      </Component>
                    </Component>
                  </Component>
                </Component>
              </div>
            </Component>
          </div>
        </div>
      </div>
    </div>
  }
}

const target = document.createElement('div');
target.id = 'tree';
document.body.appendChild(target);

render(<ComponentTree id="root"/>, target);